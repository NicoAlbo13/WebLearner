<script setup>
import { useRoute, useRouter } from "vue-router";
import { useGetData } from "@/composables/getData";

const route = useRoute();
const router = useRouter();

const url = `https://pokeapi.co/api/v2/pokemon/${route.params.name}`

const back = () => {
    router.push("/pokemon");
};

const { data, error, loading, getData } = useGetData();

getData(url);
</script>

<template>
<div class="container d-flex flex-column align-items-center justify-content-center text-center" style="min-height: 60vh;">
        <div v-if="loading" class="d-flex flex-column align-items-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <span class="mt-2 fw-bold">Loading Pokémon...</span>
        </div>
        <div v-else>
            <div v-if="data">
                <img :src="data.sprites?.front_default" alt="front" width="130"/>
                <img :src="data.sprites?.back_default" alt="back_pic" width="130"/>
                <h1>Poke name: {{ route.params.name }}</h1>
            </div>
            <h1 v-if="error">Cannot find that pokemon</h1>
            <button @click="back" class="btn btn-outline-primary">Back</button>
        </div>
    </div>
</template>
