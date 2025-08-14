<script setup>
import { useRoute, useRouter } from "vue-router";
import { useGetData } from "@/composables/getData";
import { useFavoritesState } from "@/store/favorites";

const route = useRoute();
const router = useRouter();

const url = `https://pokeapi.co/api/v2/pokemon/${route.params.name}`

const useFavorites = useFavoritesState()

const back = () => {
    router.push("/pokemon");
};

const { data, error, loading, getData } = useGetData();

const handleAdd = (data) => {
    const pokeObj = {id: data.id,name: route.params.name, img: data.sprites?.front_default}
    useFavorites.addFavorite(pokeObj);
}

const handleDelete = (id) => {
    useFavorites.deleteFavorite(id)
}

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
            <template v-if="data">
                <img :src="data.sprites?.front_default" alt="front" width="130"/>
                <img :src="data.sprites?.back_default" alt="back_pic" width="130"/>

                <h1>Poke name: {{ route.params.name }}</h1>

                <button v-if="!useFavorites.isFavorite(route.params.name)" @click="handleAdd(data)" class="btn btn-outline-success m-2" :disabled="useFavorites.isFavorite(route.params.name)">Add ♡</button>
                <button v-else @click="handleDelete(data.id)" class="btn btn-outline-danger m-2">Remove ×</button>
                <button @click="back" class="btn btn-outline-primary">Back</button>

                <div class="d-flex justify-content-center gap-5 mt-4 mb-4">
                    <div class="text-start ms-5">
                        <h4>Abilities</h4>
                        <ul class="list-unstyled mb-0">
                        <li v-for="ability in data.abilities" :key="ability.ability.name">
                            {{ ability.ability.name }}
                        </li>
                        </ul>
                    </div>

                    <div class="text-start">
                        <h4>Stats</h4>
                        <ul class="list-unstyled mb-0">
                        <li v-for="stats in data.stats" :key="stats.stat.name">
                            {{ stats.stat.name }}: <b>{{ stats.base_stat }}</b>
                        </li>
                        </ul>
                    </div>
                </div>
            </template>
            <h1 v-if="error">Cannot find that Pokémon</h1>
            <button v-if="error" @click="back" class="btn btn-outline-primary">Back</button>
        </div>
    </div>
</template>
