<template>
    <div class="w-full bg-white rounded-xl shadow-lg p-4 h-full overflow-y-auto">
        <div class="mb-4">
            <input type="text" v-model="searchQuery" placeholder="Tìm kiếm sản phẩm..."
                class="w-full px-4 py-2 border focus:ring-gray-400 focus:border-gray-500 border-gray-300 rounded-lg outline-none">
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div v-for="product in filteredProducts" :key="product.id" @click="addToCart(product)"
                class="bg-gray-50 rounded-xl p-3 cursor-pointer hover:shadow-md transition">
                <div
                    class="h-24 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg mb-2 flex items-center justify-center">
                    <img :src="`http://localhost:3000/${product.image}`" alt="Ảnh sản phẩm"
                        class="h-full object-contain rounded-md" />
                </div>

                <h3 class="font-semibold text-center">{{ product.name }}</h3>
                <p class="text-sm text-center text-gray-600">{{ formatPrice(product.price) }}</p>
            </div>
            <div v-if="filteredProducts.length === 0" class="col-span-4 text-center p-4">
                <p class="text-lg text-gray-500">Không tìm thấy sản phẩm</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { usePosStore } from '../../composables/usePos'

const { searchQuery, filteredProducts, addToCart } = usePosStore()

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price)
};
</script>