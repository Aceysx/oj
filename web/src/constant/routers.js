const routers = {
  students: [
    {
      title: '我的班课',
      url: '/students/class-courses'
    }, {
      title: '错题本',
      url: '/students/wrong-quizzes'
    }
  ],
  teachers: [
    {
      title: '班课管理',
      url: '/teachers/class-courses'
    }, {
      title: '专业管理',
      url: '/teachers/majors'
    }, {
      title: '试卷管理',
      url: '/teachers/papers'
    }, {
      title: '题目管理',
      url: '/teachers/quizzes'
    }, {
      title: '图片管理',
      url: '/teachers/pictures'
    }
  ],
  admin: [
    {
      title: '用户管理',
      url: '/roles/users'
    }
  ]
}

export default routers
