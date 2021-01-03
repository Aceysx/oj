// https://umijs.org/config/
import { defineConfig } from 'umi'
import defaultSettings from './defaultSettings'
import proxy from './proxy'

const { REACT_APP_ENV } = process.env
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true
  },
  history: {
    type: 'browser'
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index'
  },
  targets: {
    ie: 11
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login'
            },
            {
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: './user/login'
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result'
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register'
            },
            {
              component: '404'
            }
          ]
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/dashboard/analysis'
            },
            {
              name: '图片管理',
              icon: 'user',
              path: '/picture/list',
              component: './picture/list'
            }, {
              name: '图片标注',
              hideInMenu:true,
              icon: 'user',
              path: '/picture/:id/mark',
              component: './picture/mark'
            },
            {
              name: '角色管理',
              icon: 'user',
              path: '/role/list',
              component: './role/list'
            },
            {
              component: '404'
            }
          ]
        }
      ]
    }
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/'
  },
  exportStatic: {},
  esbuild: {}
})
