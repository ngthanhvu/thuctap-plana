<template>
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Customer
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Type
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Contact
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Total Orders
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Status
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="customer in customers" :key="customer.id" 
                        class="hover:bg-gray-50 transition-colors duration-150">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="h-12 w-12 flex-shrink-0">
                                    <img class="h-12 w-12 rounded-full border-2 border-gray-200" :src="customer.avatar" alt="">
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-semibold text-gray-900">{{ customer.name }}</div>
                                    <div class="text-sm text-gray-500">{{ customer.email }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="[
                                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                customer.type === 'vip' ? 'bg-purple-100 text-purple-800' :
                                    customer.type === 'wholesale' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
                            ]">
                                <span :class="[
                                    'w-1.5 h-1.5 mr-1.5 rounded-full',
                                    customer.type === 'vip' ? 'bg-purple-400' :
                                        customer.type === 'wholesale' ? 'bg-blue-400' :
                                            'bg-gray-400'
                                ]"></span>
                                {{ customer.type }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <div class="font-medium">{{ customer.phone }}</div>
                            <div class="text-gray-500 truncate max-w-xs">{{ customer.address }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-semibold text-gray-900">{{ customer.totalOrders }}</div>
                            <div class="text-xs text-gray-500">orders</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="[
                                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            ]">
                                <span :class="[
                                    'w-1.5 h-1.5 mr-1.5 rounded-full',
                                    customer.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                                ]"></span>
                                {{ customer.status }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div class="flex items-center space-x-3">
                                <button @click="$emit('edit-customer', customer)"
                                    class="inline-flex items-center p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                                    title="Edit Customer">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                </button>
                                <button @click="$emit('view-orders', customer.id)"
                                    class="inline-flex items-center p-1.5 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-lg transition-colors duration-150"
                                    title="View Orders">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                </button>
                                <button @click="$emit('delete-customer', customer.id)"
                                    class="inline-flex items-center p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors duration-150"
                                    title="Delete Customer">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
defineProps({
    customers: {
        type: Array,
        required: true
    }
})

defineEmits(['edit-customer', 'view-orders', 'delete-customer'])
</script>

<style scoped>
/* Custom Scrollbar */
.scrollbar-thin::-webkit-scrollbar {
    height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}
</style>