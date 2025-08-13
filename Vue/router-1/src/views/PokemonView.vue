<script setup>
import { RouterLink } from 'vue-router';
import { useGetData } from '@/composables/getData';

const { getData, data, error, isLoading } = useGetData()

getData('https://pokeapi.co/api/v2/pokemon')
</script>

<template>

    <h1>Pokemons List</h1>
    <p v-if="isLoading">Loading pokemons...</p>
    <div class="alert alert-danger" v-if="error">{{ error }}</div>
    <div v-if="data">
        <ul class="list-group list-group-flush">
            <li v-for="pokemon in data.results" :key="pokemon" class="list-group-item">
                <router-link :to="`/pokemon/${pokemon.name}`" class="list-group-item list-group-item-action">
                    {{ pokemon.name }}
                </router-link>
            </li>
        </ul>
        <button class="btn btn-primary m-2 ms-3" @click="getData(data.previous)" :disabled="!data.previous">Prev</button>
        <button class="btn btn-primary m-2" @click="getData(data.next)" :disabled="!data.next">Next</button>
    </div>
</template>
