<template>
    <div class="fixed inset-y-0 left-0 w-64 bg-white text-[#636C7C] hidden md:block border-r border-[#eee]">
        <div class="p-4 border-[#ECF3FF]">
            <h1 class="text-xl font-semibold text-gray-900">Trang Quản Trị</h1>
        </div>
        <nav class="p-6 flex flex-col h-full">
            <span class="text-xs text-gray-400 uppercase tracking-wider mb-2">Quản lý</span>
            <ul class="space-y-2 flex-1 list-none">
                <SidebarLink to="/" icon="chart-column-big">Tổng quan</SidebarLink>
                <SidebarProductMenu />
                <SidebarInventoryMenu />
                <SidebarLink to="/orders" icon="shopping-bag">Đơn hàng</SidebarLink>
                <SidebarLink to="/customers" icon="users">Khách hàng</SidebarLink>
                <SidebarLink to="/staff" icon="user-group">Nhân viên</SidebarLink>
                <SidebarLink to="/settings" icon="setting">Cài đặt</SidebarLink>
            </ul>
            <ul class="list-none mb-13">
                <div class="pt-4 pb-4">
                    <span class="text-xs text-gray-400 uppercase tracking-wider mb-2">Bán hàng</span>
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