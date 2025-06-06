<template>
    <li>
        <router-link :to="to" class="flex items-center p-2 rounded-lg hover:bg-gray-700"
            :class="[route.path === to ? 'bg-gray-700' : '']">
            <component :is="iconComponent" class="h-5 w-5" />
            <span class="ml-3">
                <slot />
            </span>
        </router-link>
    </li>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ShoppingBag, Users, UserCog, ChartColumnBig } from 'lucide-vue-next'

const props = defineProps({
    to: String,
    icon: String
})

const iconMap = {
    'shopping-bag': ShoppingBag,
    'users': Users,
    'user-group': UserCog,
    'chart-column-big': ChartColumnBig
}

const iconComponent = computed(() => iconMap[props.icon] || null)
const route = useRoute()
</script>