<template>
    <div class="flex gap-6 h-full">
        <div class="flex-1 flex flex-col gap-4">
            <PosCategories />
            <PosProducts />
        </div>
        <div class="w-96">
            <PosBill />
        </div>
    </div>
</template>

<script setup>
import PosCategories from '../../components/Pos/PosCategories.vue'
import PosProducts from '../../components/Pos/PosProducts.vue'
import PosBill from '../../components/Pos/PosBill.vue'
</script>