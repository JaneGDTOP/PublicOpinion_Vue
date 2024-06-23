import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home', // 命名路由
              label: '首页',
              icon: 's-home',
              url: 'home/index.vue'
            },
            {
              path: '/dataset',
              name: 'dataset', // 命名路由
              label: '数据集展示',
              icon: 's-home',
              url: 'dataset/index.vue'
            },
            {
              path: '/extraction',
              name: 'extraction', // 命名路由
              label: '事件抽取（3.2）',
              icon: 's-home',
              url: 'extraction/index.vue'
            },
            {
              path: '/relation',
              name: 'relation', // 命名路由
              label: '关系抽取（3.4）',
              icon: 's-home',
              url: 'relation/index.vue'
            },
            {
              path: '/fusion',
              name: 'fusion', // 命名路由
              label: '表征融合（3.5）',
              icon: 's-home',
              url: 'fusion/index.vue'
            },
            {
              path: '/knowledge',
              name: 'knowledge', // 命名路由
              label: '知识图谱（3.3）',
              icon: 's-home',
              url: 'knowledge/index.vue'
            },
            {
              label: '其他',
              icon: 'location',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: '页面1',
                  icon: 'setting',
                  url: 'page/PageOne.vue'
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: '页面2',
                  icon: 'setting',
                  url: 'page/PageTwo.vue'
                },
                {
                  path: '/textEE',
                  name: 'textEE',
                  label: 'textEE',
                  icon: 'setting',
                  url: 'page/textEE.vue'
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'home/index.vue'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }
  }
}
