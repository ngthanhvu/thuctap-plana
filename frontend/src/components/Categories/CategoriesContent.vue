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
        }, 3000);
    } catch (error) {
        console.error(err)
        message.value = 'Xóa thất bại, vui lòng thử lại.'
    }
}

</script>
