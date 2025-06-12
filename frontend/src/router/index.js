import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import LoginView from '../views/auth/Login.vue'
import ProductList from '../views/products/ProductList.vue'
import ProductCreate from '../views/products/ProductCreate.vue'
import ProductEdit from '../views/products/ProductEdit.vue'
import CategoriesCreate from '../views/categories/CategoriesCreate.vue'
import CategoriesList from '../views/categories/CategoriesList.vue'
import CategoriesEdit from '../views/categories/CategoriesEdit.vue'
import BrandList from '../views/brands/BrandList.vue'
import BrandCreate from '../views/brands/BrandCreate.vue'
import BrandEdit from '../views/brands/BrandEdit.vue'
import CustomerList from '../views/customers/CustomerList.vue'
import InventoryList from '../views/inventory/InventoryList.vue'
import InventoryImport from '../views/inventory/Import.vue'
import Invoice from '../views/inventory/invoice.vue'
import OrderList from '../views/orders/OrderList.vue'
import StaffList from '../views/staff/StaffList.vue'
import StaffCreate from '../views/staff/StaffCreate.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import PosLayout from '../layouts/PosLayout.vue'
import PosContent from '../views/POS/PosContent.vue'
import PosReport from '../views/POS/Report.vue'

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
                    title: 'Tổng quan',
                    middleware: admin
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
                path: 'products/edit/:id',
                name: 'ProductEdit',
                component: ProductEdit,
                meta: {
                    title: 'Cập nhật sản phẩm'
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
                path: 'products/categories/edit/:id',
                name: 'CategoriesEdit',
                component: CategoriesEdit,
                meta: {
                    title: 'Cập nhật danh mục'
                }
            },
            {
                path: 'products/brands',
                name: 'BrandList',
                component: BrandList,
                meta: {
                    title: 'Danh sách thương hiệu'
                }
            }, {
                path: 'products/brands/create',
                name: 'BrandCreate',
                component: BrandCreate,
                meta: {
                    title: 'Thêm thương hiệu'
                }
            },
            {
                path: 'products/brands/create',
                name: 'BrandCreate',
                component: BrandCreate,
                meta: {
                    title: 'Thêm thương hiệu'
                }
            }, {
                path: 'products/brands/edit/:id',
                name: 'BrandEdit',
                component: BrandEdit,
                meta: {
                    title: 'Cập nhật thương hiệu'
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
            }, {
                path: 'inventory/invoice',
                name: 'Invoice',
                component: Invoice,
                meta: {
                    title: 'Hóa đơn nhập/xuất kho'
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
            },
            {
                path: 'staff/create',
                name: 'StaffCreate',
                component: StaffCreate,
                meta: {
                    title: 'Thêm nhân viên',
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
    },
    {
        path: '/pos',
        component: PosLayout,
        meta: { middleware: auth },
        children: [
            {
                path: 'sell',
                name: 'Pos',
                component: PosContent,
                meta: {
                    title: 'POS'
                }
            },
            {
                path: 'report',
                name: 'PosReport',
                component: PosReport,
                meta: {
                    title: 'Báo cáo'
                }
            }
        ]
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