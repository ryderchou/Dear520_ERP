import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Header from '../views/Header.vue'
import UserInfo from '../views/UserInfo.vue'

const routes = [
 { path: '/login', name: 'Login', component: Login, meta: { requiresAuth: true } },
  
  { path: '/', name: 'Home', components: { default: Home, nav: Header}, meta: { requiresAuth: true } },
  
  { path: '/UserInfo', name: 'UserInfo', components: { default: UserInfo, nav: Header},  meta: { requiresAuth: true } },
    
   
    //   { path: '/user/:userId', name: 'User', component: () => import('../views/About.vue') ,props : true},


//vue3 壞掉了
//   { path: '*', redirect: '/' } // 當 url path 不符合 router 表的時候，預設轉址到登入頁   // 順序一定要最後面
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//導航守衛  未登入帳戶 導引至登入頁
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) { //判斷該頁面是否需要驗證
        const isLogin = localStorage.getItem('token') == 'ImLogin'; //查詢localStorage 是否已經登入過

        if (isLogin) {            //已經登入過 直接跳入主頁   無須跳入登入頁
          console.log(1)
            if (to.path == '/login') {
                next('/')
            } else {
                next() // 往下執行
            }
        } else {
            //如果使用者token無效則跳轉到login頁面
            console.log(2)
            if (to.path !== '/login') {
                next('/login')
            } else {
                next() // 往下執行
            }
        }
    } else {
        next() // 往下執行
    }
})

export default router
