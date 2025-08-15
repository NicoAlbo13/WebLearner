<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDataStore } from '@/store/data';

    const url = ref('')
    const route = useRoute()
    const router = useRouter()
    const useData = useDataStore()

    const handleSubmit = async() => {
        await useData.updateUrl(route.params.id, url.value)
        router.push('/')
    }

    onMounted(async() => {
        url.value = await useData.getDocument(route.params.id)

        if (url.value?.url){
            url.value = url.value.url
        }
    })

</script>

<template>
    <div v-if="useData.isLoading" class="d-flex flex-column align-items-center mt-4">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <span class="mt-2 fw-bold">Loading docs...</span>
    </div>
    <div v-else>
        <div v-if="url?.error" class="alert alert-danger mb-3 mt-3" role="alert">
            {{ url?.error }}
        </div>
        <form @submit.prevent="handleSubmit" class="w-50 mx-auto mt-4" v-else>
            <h1 class="mb-4">Edit Doc</h1>
            <div class="mb-3">
            <input
                type="text"
                class="form-control"
                v-model.trim="url"
            >
            </div>
            <button type="submit" class="btn btn-warning w-100">
            Edit
            </button>
        </form>
    </div>
</template>
