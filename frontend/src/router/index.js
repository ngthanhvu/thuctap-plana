import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import HomeView from '../views/Home.vue'
import LoginView from '../views/auth/Login.vue'
import ProductList from '../views/products/ProductList.vue'
import ProductCreate from '../views/products/ProductCreate.vue'
import CategoriesCreate from '../views/categories/CategoriesCreate.vue'
import CategoriesList from '../views/categories/CategoriesList.vue'
import BrandList from '../views/brands/BrandList.vue'
import BrandCreate from '../views/brands/BrandCreate.vue'
import CustomerList from '../views/customers/CustomerList.vue'
import InventoryList from '../views/inventory/InventoryList.vue'
import InventoryImport from '../views/inventory/Import.vue'
import OrderList from '../views/orders/OrderList.vue'
import StaffList from '../views/staff/StaffList.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import { auth, admin } from './middleware/auth'

const routes = [
    {
        path: '/',
        component: DefaultLayout,
        meta: { middleware: auth },
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                    title: 'Tổng quan'
                }
            },
            {
                path: 'products/list',
                name: 'ProductList',
                component: ProductList,
                meta: {
                    title: 'Danh sách sản phẩm'
                }
            },
            {
                path: 'products/create',
                name: 'ProductCreate',
                component: ProductCreate,
                meta: {
                    title: 'Thêm sản phẩm'
                }
            },
            {
                path: 'products/categories/create',
                name: 'CategoriesCreate',
                component: CategoriesCreate,
                meta: {
                    title: 'Thêm danh mục'
                }
            },
            {
                path: 'products/categories',
                name: 'CategoriesList',
                component: CategoriesList,
                meta: {
                    title: 'Danh sách danh mục'
                }
            },
            {
                path: 'products/brands',
                name: 'BrandList',
                component: BrandList,
                meta: {
                    title: 'Danh sách thương hiệu'
                }
            },
            {
                path: 'products/brands/create',
                name: 'BrandCreate',
                component: BrandCreate,
                meta: {
                    title: 'Thêm thương hiệu'
                }
            },
            {
                path: 'customers',
                name: 'CustomerList',
                component: CustomerList,
                meta: {
                    title: 'Danh sách khách hàng'
                }
            },
            {
                path: 'inventory/stock',
                name: 'InventoryList',
                component: InventoryList,
                meta: {
                    title: 'Danh sách kho'
                }
            },
            {
                path: 'inventory/import',
                name: 'InventoryImport',
                component: InventoryImport,
                meta: {
                    title: 'Nhập kho'
                }
            },
            {
                path: 'orders',
                name: 'OrderList',
                component: OrderList,
                meta: {
                    title: 'Danh sách đơn hàng'
                }
            },
            {
                path: 'staff',
                name: 'StaffList',
                component: StaffList,
                meta: {
                    title: 'Danh sách nhân viên',
                    middleware: admin
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: {
            title: 'Đăng nhập'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    document.title = `${to.meta.title} | Quản lý bán hàng`

    if (to.meta.middleware) {
        return to.meta.middleware(to, from, next)
    }

    next()
})

export default router