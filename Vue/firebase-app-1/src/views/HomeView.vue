<script setup>
import NewDoc from '@/components/NewDoc.vue';
import { useDataStore } from '@/store/data';
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';

const router = useRouter()
const useUser = useUserStore()
const useData = useDataStore()

useData.getUrls()

</script>

<template>
    <h1>Home</h1>
    <pre>{{ useUser.userData?.displayName }}</pre>
    <pre>{{ useUser.userData?.email }}</pre>

    <NewDoc/>

    <div v-if="useData.isLoading" class="d-flex flex-column align-items-center mt-4">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <span class="mt-2 fw-bold">Loading docs...</span>
    </div>
    <ul v-else class="list-unstyled">
        <li v-for="doc in useData.documents" :key="doc.id" class="mt-5 position-relative border-bottom border-danger">
            <pre>{{ doc }}</pre>
            <button
                @click="useData.deleteUrl(doc.id)"
                class="btn btn-outline-danger btn-sm position-absolute top-0 end-0">
                ×
            </button>
            <button
                @click="router.push(`/edit/${doc.id}`)"
                class="btn btn-outline-warning btn-sm position-absolute bottom-0 end-0 mb-1">
                &#9998;
            </button>
        </li>
    </ul>
</template>

