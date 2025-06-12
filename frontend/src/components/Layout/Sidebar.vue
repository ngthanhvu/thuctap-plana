<template>
    <div class="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white hidden md:block">
        <div class="p-4 border-b border-gray-700">
            <h1 class="text-xl font-semibold">Admin Panel</h1>
        </div>
        <nav class="p-4 flex flex-col h-full">
            <span class="text-xs text-gray-400 uppercase tracking-wider">Quản lý</span>
            <ul class="space-y-2 flex-1 list-none">
                <SidebarLink to="/" icon="chart-column-big">Tổng quan</SidebarLink>
                <SidebarProductMenu />
                <SidebarInventoryMenu />
                <SidebarLink to="/orders" icon="shopping-bag">Đơn hàng</SidebarLink>
                <SidebarLink to="/customers" icon="users">Khách hàng</SidebarLink>
                <SidebarLink to="/staff" icon="user-group">Nhân viên</SidebarLink>
            </ul>
            <ul class="list-none mb-13">
                <div class="border-t border-gray-700 pt-4 pb-4">
                    <span class="text-xs text-gray-400 uppercase tracking-wider">Bán hàng</span>
                    <SidebarLink to="/pos/sell" icon="warehouse">POS</SidebarLink>
                </div>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import SidebarLink from './SidebarLink.vue'
import SidebarProductMenu from './SidebarProductMenu.vue'
import SidebarInventoryMenu from './SidebarInventoryMenu.vue'
</script>