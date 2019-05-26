'use strict'

;(function (window) {
  var _self // 该插件内的全局变量，用来获取 this
  function LabelImg (opt) {
    this.openModal = opt.openModal
    this.el = document.getElementById(opt.element ? opt.element : 'canva')
    this.shape = opt.shape || 'polygon'
    this.submit = opt.submit
    this.isPreview = opt.isPreview
    this.initData = opt.initData
    this.clean = () => {
      let elementById = document.getElementById('make-picture') || {}
      elementById.innerHTML = ''
    }
    this.x = 0
    this.y = 0

    this.color_active = '#ff0000' // 当前标注所使用的颜色
    this.polygonConfig = {
      points: [],
      stack: []
    }

    // 默认工具，暂时不可更改
    this.TOOLS = [
      {NAME: 'magnify', ICON: '\u29FE', TITLE: '放大'},
      {NAME: 'shrink', ICON: '\u29FF', TITLE: '缩小'},
      {NAME: 'repeal', ICON: '\u23F4', TITLE: '撤销'},
      {NAME: 'clean', ICON: '\u27F3', TITLE: '清空'}
    ]
    // 默认颜色，暂时不可更改
    this.COLORS = ['#ff0000', '#00db00', '#f9f900', '#0072e3']
    // 把 this 赋给 _self，以便在函数内调用
    _self = this
    render.call(this)
    draw()
  }

  LabelImg.prototype = {
    addImg: function (src) {
      var img = document.querySelector('.lbi-img')
      if (!img) {
        img = document.createElement('img')
        img.className = 'lbi-img'
      }
      img.src = src
      img.onload = function () {
        var svg = document.querySelector('.lbi-svg')
        // 保存图片原始尺寸，当图片放大或缩小后，需要与原始尺寸对比，计算比例系数
        _self.imgWidth = img.naturalWidth
        _self.imgHeight = img.naturalHeight
        svg.setAttribute('viewBox', '0, 0, ' + _self.imgWidth + ', ' + _self.imgHeight)

        // 初始化图片大小，让图片和父元素一样宽，提高体验
        img.style.width = img.naturalWidth > img.parentNode.clientWidth
          ? img.parentNode.clientWidth + 'px'
          : img.naturalWidth + 'px'
        syncSize(img, svg)
        tool.clean()
      }
    },
    output: function () {
      var _svg = document.querySelector('.lbi-svg')
      var outputData = []
      Array.prototype.forEach.call(_svg.children, function (item, index) {
        var dataItem = {}
        dataItem.index = index + 1
        dataItem.fill = item.attributes['fill'].nodeValue
        dataItem.label = item.dataset.name
        dataItem.position = JSON.parse(item.dataset.position)
        outputData.push(dataItem)
      })
      return outputData
    },
    init: function () {
      var parent = document.querySelector('.lbi-svg') || {}
      _self.initData.forEach(item => {
        const {position, title, fill} = item

        var attrs = {
          'class': 'svg-child-not-g',
          'points': position,
          'fill': fill,
          'style': 'stroke:purple;stroke-width:3;opacity:.3'
        }
        var polygon = createPolygon(attrs)
        polygon.setAttribute('data-position', JSON.stringify(position))
        console.log(polygon)
        if(!polygon || parent === undefined) return
        parent.appendChild(polygon)
        var infoItem = render.infoBox(title)
        var infoBox = document.querySelector('.lbi-info-box')
        if (infoBox) {
          infoBox.appendChild(infoItem)
        }

        // _self.labelsConfig.stack.push(infoItem)
        var svg = document.querySelector('.lbi-svg'),
          len = svg.children.length
        svg.children[len - 1].setAttribute('data-name', title)
        handleInfo()
      })
    }
  }

  function render () {
    // 获取 整体 UI 框架的 html 结构字符串并渲染
    this.el.innerHTML = render.ui()
    // 获取 toolbox 的 html 结构字符串并渲染
    if (!this.isPreview) {
      document.querySelector('.lbi-tool-box').innerHTML = render.toolBox(this.TOOLS)
      tool()

      // colorBox
      document.querySelector('.lbi-color-box').innerHTML = render.colorBox(this.COLORS)
      render.handleColor()
      render.handleSelect()
      render.axisSetting(document.querySelector('.lbi-svg-box'))
    }
  }

  // 整体UI框架的 html 结构
  render.ui = function () {
    if (_self.isPreview) {
      return `<div class="lbi-main">
				<div class="lbi-paint-box">
					<div class="lbi-svg-box">
						<img src="" alt="" class="lbi-img" />
						<svg class="lbi-svg"></svg>
					</div></div></div>
      `
    }
    var uiHtml = `
			<div class="lbi-main">
				<div class="lbi-tool-box"></div>
				<div class="lbi-paint-box">
					<div class="lbi-svg-box">
						<img src="" alt="" class="lbi-img" />
						<svg class="lbi-svg"></svg>
					</div>
					<svg class="lbi-axis">
						<line x1="0" y1="0" x2="870" y2="0" style="stroke:#1c79c6;stroke-width:3" />
						<line x1="0" y1="0" x2="0" y2="550" style="stroke:#1c79c6;stroke-width:3" />
					</svg>
				</div>
				<div class="lbi-mask">
					<div class="lbi-select-box">
						<div class="lbi-side-tt">标注对象</div>
						<label class="lbi-select-label">
							 标注内容：
							<input name="" id="lbi-select-names" class="lbi-select"></>
						</label>
						<button class="lbi-select-btn lbi-select-btn-submit" type="button">确认</button>
						<button class="lbi-select-btn lbi-select-btn-close" type="button">取消</button>
					</div>
				</div>
			</div>
			<div class="lbi-side">
				<div class="lbi-side-item">
					<p class="lbi-side-tt">颜色选择</p>
					<div class="lbi-color-box"></div>
				</div>
				<div class="lbi-side-item">
					<div class="lbi-side-tt">
						标注信息
					</div>
					<div class="lbi-info-box"></div>
				</div>
			</div>
		`
    return uiHtml
  }
  // 工具栏 lbi-tool-box 内的 html 结构
  render.toolBox = function (tools) {
    var toolboxHtml = ''
    tools.forEach(function (tool) {
      toolboxHtml += `
				<span class="lbi-tool" title="${tool.TITLE}" data-action="${tool.NAME}">
					${tool.ICON}
				</span>
			`
    })
    return toolboxHtml
  }

  // 颜色选择 lbi-color-box 的 html 结构
  render.colorBox = function (colors) {
    var colorHtml = ''
    colors.forEach(function (color) {
      colorHtml += `<span class="lbi-color-item" data-color="${color}" style="border-color: ${color};"></span>`
    })
    return colorHtml
  }
  // 标注信息 lbi-info-box 的 html 结构
  render.infoBox = function (name) {
    var infoItem = document.createElement('div')
    infoItem.className = 'lbi-info-item'

    var infoHtml = `
			<p class="lbi-info-name"><b>${name}</b></p>
		`
    infoItem.innerHTML = infoHtml
    return infoItem
  }
  // 标注对象弹出框操作
  render.handleSelect = function () {
    // 点击确认按钮的操作
    var submit = document.querySelector('.lbi-select-btn-submit')
    submit.onclick = function () {
      // 获取标注对象弹出层的值并渲染标注信息
      var name = document.getElementById('lbi-select-names').value
      var infoItem = render.infoBox(name)
      document.querySelector('.lbi-info-box').appendChild(infoItem)

      // _self.labelsConfig.stack.push(infoItem)
      var svg = document.querySelector('.lbi-svg'),
        len = svg.children.length
      svg.children[len - 1].setAttribute('data-name', name)
      handleInfo()
      // 还原标注对象弹出层并关闭
      document.getElementById('lbi-select-names').value = ''
      document.querySelector('.lbi-mask').style.display = 'none'
      _self.submit(_self.output())
    }
    // 点击取消按钮的操作
    var close = document.querySelector('.lbi-select-btn-close')
    close.onclick = function () {
      var svg = document.querySelector('.lbi-svg')
      svg.removeChild(svg.lastChild)

      // 还原标注对象弹出层并关闭
      document.getElementById('lbi-select-names').value = ''
      document.querySelector('.lbi-mask').style.display = 'none'
      _self.submit(_self.output())
    }
  }

  // 标注信息操作
  function handleInfo () {
    var infoItems = document.querySelectorAll('.lbi-info-item'),
      notg = document.querySelectorAll('.svg-child-not-g')
    for (let i = 0; i < infoItems.length; i++) {
      infoItems[i].onmouseenter = function (e) {
        notg[i].style.strokeWidth = 10
        notg[i].style.opacity = 0.6
      }
      infoItems[i].onmouseleave = function (e) {
        notg[i].style.strokeWidth = 1
        notg[i].style.opacity = 0.3
      }
    }
  }

  // 设置颜色选择操作
  render.handleColor = function () {
    var active = document.querySelector('span[data-color="' + _self.color_active + '"]')
    active.style.backgroundColor = _self.color_active
    var colors = document.querySelectorAll('.lbi-color-item')
    for (let i = 0; i < colors.length; i++) {
      colors[i].onclick = function (e) {
        _self.color_active = colors[i].style.backgroundColor = colors[i].dataset.color
        var siblings = getSiblings(colors, colors[i])
        siblings.forEach(function (item) {
          item.style.backgroundColor = '#fff'
        })
      }
    }
  }

  // 设置 svg
  render.svgSetting = function (parent) {
    var _svg = document.getElementById('lbi-svg')
    _svg.style.width = parent.clientWidth + 'px'
    _svg.style.height = parent.clientHeight + 'px'
    _svg.addEventListener('mouseover', function (e) {
    })
    _svg.addEventListener('mouseout', function () {
    })
  }
  // 设置辅助轴
  render.axisSetting = function (target) {
    var axis = document.querySelector('.lbi-axis'),
      xaxis = axis.firstElementChild,
      yaxis = axis.lastElementChild
    target.onmousemove = function (e) {
      xaxis.setAttribute('y1', e.offsetY - target.scrollTop)
      xaxis.setAttribute('y2', e.offsetY - target.scrollTop)
      yaxis.setAttribute('x1', e.offsetX - target.scrollLeft)
      yaxis.setAttribute('x2', e.offsetX - target.scrollLeft)
    }
  }

  // ===============================================================
  // toobar 里每个按钮被点击后所执行的操作
  // 在 renderToolbar() 函数的末尾调用，当 toobar 渲染完毕后执行
  // ===============================================================
  function tool () {
    var toolbox = document.querySelector('.lbi-tool-box')
    toolbox.addEventListener('click', function (e) {
      var target = e.target
      // 由于渲染顺序的原因，暂时需要在点击 toolbar 里的按钮时获取 svg 和 img
      var svg = document.querySelector('.lbi-svg'),
        img = document.querySelector('.lbi-img')
      if (target.tagName.toLowerCase() === 'span') {
        var action = target.dataset.action
        tool[action](img, svg)
      }
    })
  }

  tool.magnify = function (img, svg) {
    img.style.width = img.clientWidth + 100 + 'px'
    // svg 与标注图同步大小
    syncSize(img, svg)
  }
  tool.shrink = function (img, svg) {
    img.style.width = img.clientWidth - 100 + 'px'
    // svg 与标注图同步大小
    syncSize(img, svg)
  }
  tool.repeal = function () {
    var svg = document.querySelector('.lbi-svg')
    var infoBox = document.querySelector('.lbi-info-box')
    if (_self.polygonConfig.stack.length > 0) {
      svg.removeChild(_self.polygonConfig.stack[_self.polygonConfig.stack.length - 1])
      _self.polygonConfig.points.pop()
      _self.polygonConfig.stack.pop()

      return
    }

    if (svg.lastChild) {
      svg.removeChild(svg.lastChild)
      infoBox.removeChild(infoBox.lastChild)
    }
    _self.submit(_self.output())
  }
  tool.clean = function () {
    var svg = document.querySelector('.lbi-svg') || {}
    var infoBox = document.querySelector('.lbi-info-box') || {}
    infoBox.innerHTML = ''
    svg.innerHTML = ''
    _self.polygonConfig.points = []
    _self.polygonConfig.stack = []
  }

  // 同步标注图片和 svg 大小，使两者保持一致
  function syncSize (img, svg) {
    // svg 跟随图片一起缩放时，需要计算出 svg 缩放前后的宽高比例系数
    // 并且以后的坐标都会乘以这个系数，否则绘制的坐标是错误的
    svg.style.width = img.clientWidth + 'px'
    svg.style.height = img.clientHeight + 'px'
    _self.kx = _self.imgWidth / img.clientWidth
    _self.ky = _self.imgHeight / img.clientHeight
  }

  // ============================================================
  // 绘制图形的方法
  // ============================================================
  function draw () {
    var svg = document.querySelector('.lbi-svg')
    drawPolygon(svg)
  }

  function drawPolygon (parent) {
    if(_self.isPreview) return
    // 在执行 drawPolygon 函数之前，先把上个绘制函数事件删除，否则上个绘制函数也会一直执行
    parent.onmousedown = parent.onmousemove = parent.onmouseup = null
    // 绘制栈，保存起始点和每条线的 DOM 节点，当多边形绘制完毕后，需要删除之前的circle和line节点
    parent.onclick = function (e) {
      if (e.target.tagName === 'circle') {
        var points = _self.polygonConfig.points.join(' ')
        var attrs = {
          'class': 'svg-child-not-g',
          'points': points,
          'fill': _self.color_active,
          'style': 'stroke:purple;stroke-width:3;opacity:.3'
        }
        var polygon = createPolygon(attrs)
        polygon.setAttribute('data-position', JSON.stringify(_self.polygonConfig.points))
        parent.appendChild(polygon)
        _self.polygonConfig.stack.forEach(function (item) {
          parent.removeChild(item)
        })
        polygon.setAttribute('data-index', parent.children.length - parent.getElementsByTagName('g').length)
        document.querySelector('.lbi-mask').style.display = 'block'
        _self.polygonConfig.stack = []
        _self.polygonConfig.points = []
      } else {
        // 传给图形的坐标参数，需要乘以 svg 缩放前后的宽高比例系数
        _self.x = e.offsetX * _self.kx
        _self.y = e.offsetY * _self.ky
        _self.polygonConfig.points.push([_self.x, _self.y])
        var pointsLen = _self.polygonConfig.points.length
        if (pointsLen === 1) {
          var attrs = {
            'cx': _self.x,
            'cy': _self.y,
            'r': 4,
            'stroke': 'black',
            'fill': _self.color_active
          }
          var circle = createPoint(attrs)
          this.appendChild(circle)
          _self.polygonConfig.stack.push(circle)
          return
        }
        if (pointsLen > 1) {
          var attrs = {
            'x1': _self.polygonConfig.points[pointsLen - 2][0],
            'y1': _self.polygonConfig.points[pointsLen - 2][1],
            'x2': _self.polygonConfig.points[pointsLen - 1][0],
            'y2': _self.polygonConfig.points[pointsLen - 1][1],
            'stroke': _self.color_active,
            'style': 'stroke-width:3'
          }
          var line = createLine(attrs)
          this.appendChild(line)
          _self.polygonConfig.stack.push(line)
        }
      }
    }
  }

  // =============================================================
  // 创建 svg 图形，暂时给每个图形创建都写一个函数，因为以后可能会对不同的元素添加不同的操作
  // @param  {Object} attrs     圆的 html 属性
  // @return {DOM Node}     DOM节点
  // =============================================================
  function createPoint (attrs) {
    var circle = makeElementNS('circle', attrs)
    circle.addEventListener('mouseover', function (e) {
      e.target.style.strokeWidth = 10
    })
    circle.addEventListener('mouseout', function (e) {
      e.target.style.strokeWidth = 10
    })

    return circle
  }

  function createLine (attrs) {
    var line = makeElementNS('line', attrs)

    return line
  }

  function createPolygon (attrs) {
    var polygon = makeElementNS('polygon', attrs)

    return polygon
  }

  /**
   * 创建 XML 元素
   */
  function makeElementNS (name, attrs) {
    var ns = 'http://www.w3.org/2000/svg'
    var ele = document.createElementNS(ns, name)
    for (var k in attrs) {
      if (attrs.hasOwnProperty(k)) {
        ele.setAttribute(k, attrs[k])
      }
    }

    return ele
  }

  /**
   * 获取兄弟元素
   */
  function getSiblings (nodes, target) {
    var siblings = Array.prototype.filter.call(nodes, function (item, index) {
      return item !== target
    })

    return siblings
  }

  window.LabelImg = LabelImg
  module.exports = {
    LabelImg
  }
})(window)
