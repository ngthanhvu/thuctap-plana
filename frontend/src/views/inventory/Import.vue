<template>
    <div class="p-6">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Import Products</h1>
            <button @click="downloadTemplate" class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                Download Template
            </button>
        </div>

        <!-- Import Form -->
        <div class="bg-white rounded-lg shadow p-6">
            <form @submit.prevent="submitImport" class="space-y-6">
                <!-- File Upload Section -->
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div class="text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                            viewBox="0 0 48 48">
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div class="mt-4">
                            <label for="file-upload"
                                class="cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" class="sr-only"
                                    accept=".csv,.xlsx" @change="handleFileUpload">
                            </label>
                            <p class="text-xs text-gray-500 mt-1">
                                CSV or Excel file up to 10MB
                            </p>
                        </div>
                        <p v-if="selectedFile" class="mt-2 text-sm text-gray-600">
                            Selected file: {{ selectedFile.name }}
                        </p>
                    </div>
                </div>

                <!-- Import Options -->
                <div class="space-y-4">
                    <h3 class="text-lg font-medium text-gray-900">Import Options</h3>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Update Existing Products</label>
                            <div class="mt-1">
                                <label class="inline-flex items-center">
                                    <input type="checkbox" v-model="importOptions.updateExisting"
                                        class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                    <span class="ml-2 text-sm text-gray-600">Update products with matching SKU</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Skip Invalid Rows</label>
                            <div class="mt-1">
                                <label class="inline-flex items-center">
                                    <input type="checkbox" v-model="importOptions.skipInvalid"
                                        class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                    <span class="ml-2 text-sm text-gray-600">Continue import if some rows are
                                        invalid</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Default Category</label>
                        <select v-model="importOptions.defaultCategory"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            <option value="">Select a category</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="food">Food</option>
                        </select>
                    </div>
                </div>

                <!-- Preview Section -->
                <div v-if="previewData.length > 0" class="space-y-4">
                    <h3 class="text-lg font-medium text-gray-900">Preview</h3>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th v-for="header in previewHeaders" :key="header"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {{ header }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="(row, index) in previewData" :key="index" class="hover:bg-gray-50">
                                    <td v-for="header in previewHeaders" :key="header"
                                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ row[header] }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-end space-x-3">
                    <button type="button" @click="cancelImport"
                        class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                        Cancel
                    </button>
                    <button type="submit" :disabled="!selectedFile"
                        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                        Start Import
                    </button>
                </div>
            </form>
        </div>

        <!-- Import Progress Modal -->
        <div v-if="showProgressModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div class="mt-3">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">
                        Importing Products
                    </h3>
                    <div class="space-y-4">
                        <div class="w-full bg-gray-200 rounded-full h-2.5">
                            <div class="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                                :style="{ width: `${importProgress}%` }"></div>
                        </div>
                        <p class="text-sm text-gray-600">
                            {{ importProgress }}% complete
                        </p>
                        <p class="text-sm text-gray-600">
                            {{ processedItems }} of {{ totalItems }} items processed
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// State
const selectedFile = ref<File | null>(null)
const showProgressModal = ref(false)
const importProgress = ref(0)
const processedItems = ref(0)
const totalItems = ref(0)

const importOptions = ref({
    updateExisting: false,
    skipInvalid: true,
    defaultCategory: ''
})

const previewData = ref<any[]>([])
const previewHeaders = ref<string[]>([])

// Methods
const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
        selectedFile.value = target.files[0]
        // Here you would typically read the file and generate preview data
        generatePreviewData()
    }
}

const generatePreviewData = () => {
    // Mock preview data - Replace with actual file reading logic
    previewHeaders.value = ['SKU', 'Name', 'Description', 'Price', 'Stock']
    previewData.value = [
        {
            SKU: 'SKU001',
            Name: 'Product 1',
            Description: 'Description 1',
            Price: '99.99',
            Stock: '10'
        },
        {
            SKU: 'SKU002',
            Name: 'Product 2',
            Description: 'Description 2',
            Price: '149.99',
            Stock: '5'
        }
    ]
}

const downloadTemplate = () => {
    // Implement template download logic here
    console.log('Download template')
}

const submitImport = async () => {
    if (!selectedFile.value) return

    showProgressModal.value = true
    importProgress.value = 0
    processedItems.value = 0
    totalItems.value = previewData.value.length

    // Simulate import progress
    for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 500))
        importProgress.value = i
        processedItems.value = Math.floor((i / 100) * totalItems.value)
    }

    // Close progress modal after completion
    setTimeout(() => {
        showProgressModal.value = false
        // Reset form
        selectedFile.value = null
        previewData.value = []
        previewHeaders.value = []
    }, 1000)
}

const cancelImport = () => {
    selectedFile.value = null
    previewData.value = []
    previewHeaders.value = []
}
</script>

<style scoped>
/* Add any custom styles here */
</style>