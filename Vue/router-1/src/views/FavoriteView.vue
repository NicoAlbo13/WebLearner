<script setup>
import { useFavoritesState } from '@/store/favorites';
import { storeToRefs } from 'pinia';

const useFavorites = useFavoritesState()

const { favorites } = storeToRefs(useFavorites)

const handleDelete = (id) => {
    useFavorites.deleteFavorite(id)
}

</script>

<template>
    <div class="container d-flex flex-column align-items-center justify-content-center text-center" style="min-height: 90vh;">
        <h1>Favorite Pokemons</h1>
        <p v-if="favorites.length <=0">You have no Favorites</p>
        <ul class="list-group list-group-flush" v-else>
            <li v-for="pokemon in favorites" class="list-group-item position-relative">
                <button
                    @click="handleDelete(pokemon.id)"
                    class="btn btn-outline-danger btn-sm position-absolute top-0 end-0 m-2">
                    ×
                </button>
                <RouterLink
                    :to="`/pokemon/${pokemon.name}`"
                    class="d-flex flex-column align-items-center text-decoration-none text-dark"
                >
                    <img :src="pokemon.img" alt="poke image" :key="pokemon.id">
                    <h4>{{ pokemon.name }}</h4>
                </RouterLink>
            </li>
        </ul>
    </div>
</template>
