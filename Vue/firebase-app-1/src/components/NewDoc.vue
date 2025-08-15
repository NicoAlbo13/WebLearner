<script setup>
import { useDataStore } from '@/store/data';
import { ref } from 'vue';

    const url = ref('')
    const useData = useDataStore()

    const handleSubmit = () => {
        if (url.value.length <= 0) {
            return;
        }

        useData.addUrl(url.value)
        url.value = ''
    }

</script>

<template>
    <form @submit.prevent="handleSubmit" class="w-50 mx-auto">
        <h4>Add URL</h4>
    <div class="mb-3">
        <input
        type="text"
        class="form-control"
        placeholder="Enter a URL"
        v-model.trim="url"
        >
    </div>
    <button type="submit" class="btn btn-success w-100">
        Add
    </button>
    </form>
</template>
