<template>
    <svg :id="`barcode-${id}`" class="barcode"></svg>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import JsBarcode from 'jsbarcode'

const props = defineProps({
    value: String,
    id: [String, Number]
})

const renderBarcode = () => {
    if (props.value) {
        JsBarcode(`#barcode-${props.id}`, props.value, {
            format: 'CODE128',
            width: 2,
            height: 50,
            displayValue: true,
            fontSize: 12,
            margin: 5
        })
    }
}

onMounted(renderBarcode)
watch(() => props.value, renderBarcode)
</script>