<template>
    <CategoriesTable :categories="categories" @delete-category="deleteCategory" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CategoriesTable from './CategoriesTable.vue';

const categories = ref('')

onMounted(async () => {
    try {
        const res = await fetch('http://localhost:3000/api/categories');
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        categories.value = data
    } catch (error) {
        console.error(error);
    }
});

// hàm xoá danh mục 

const deleteCategory = async (categoryId) => {
      if (!confirm('Bạn có chắc muốn xóa danh mục này không?')) return
    try {
        const category = await fetch(`http://localhost:3000/api/categories/${categoryId}`, {
            method: 'DELETE',
        });
        if (!category.ok) {
            throw new Error('Xoá danh mục thất bại');
        }
        // Xóa thành công thì cập nhật lại danh sách
        categories.value = categories.value.filter(category => category.id !== categoryId);
        message.value = 'Xoá danh mục thành công';
        setTimeout(() => {
            message.value = '';
        },3000);
    } catch (error) {
        console.error(err)
        message.value = 'Xóa thất bại, vui lòng thử lại.'
    }
}



// Sample data
// const products = ref([
//     {
//         id: 1,
//         name: 'iPhone 13 Pro',
//         description: 'Apple iPhone 13 Pro 256GB',
//         category: 'Điện tử',
//         price: 27990000,
//         status: 'active',
//         image: 'https://images.unsplash.com/photo-1632661674596-79bd3e16c2bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80'
//     },
//     {
//         id: 2,
//         name: 'MacBook Pro M1',
//         description: 'Apple MacBook Pro 13" M1',
//         category: 'Điện tử',
//         price: 32990000,
//         status: 'active',
//         image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80'
//     },
//     {
//         id: 3,
//         name: 'AirPods Pro',
//         description: 'Apple AirPods Pro',
//         category: 'Điện tử',
//         price: 5990000,
//         status: 'inactive',
//         image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80'
//     }
// ])
</script>
