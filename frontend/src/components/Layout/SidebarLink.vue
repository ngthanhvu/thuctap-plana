<template>
    <li>
        <router-link :to="to" class="flex items-center p-2 rounded-lg hover:bg-[#EBF3FE] transition-colors duration-150"
            :class="[route.path === to ? 'bg-[#EBF3FE] text-[#1B67FE]' : 'text-[#636C7C]']">
            <component :is="iconComponent" class="h-5 w-5" :class="[route.path === to ? 'text-[#1B67FE]' : '']" />
            <span class="ml-3">
                <slot />
            </span>
        </router-link>
    </li>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ShoppingBag, Users, UserCog, ChartColumnBig, Warehouse, Settings } from 'lucide-vue-next'

const props = defineProps({
    to: String,
    icon: String
})

const iconMap = {
    'shopping-bag': ShoppingBag,
    'users': Users,
    'user-group': UserCog,
    'chart-column-big': ChartColumnBig,
    'warehouse': Warehouse,
    'setting': Settings
}

const iconComponent = computed(() => iconMap[props.icon] || null)
const route = useRoute()
</script>