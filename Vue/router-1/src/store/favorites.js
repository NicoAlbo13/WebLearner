import { defineStore } from "pinia";
import { ref } from "vue";


export const useFavoritesState = defineStore('favorites', ()=>{
    const favorites = ref([])

    if(localStorage.getItem('favorites')){
        favorites.value = JSON.parse(localStorage.getItem("favorites"));
    }

    const addFavorite = (payload) => {
        favorites.value.push(payload)
        localStorage.setItem('favorites', JSON.stringify(favorites.value))
    }

    const deleteFavorite = (payload) => {
        favorites.value = favorites.value.filter(item => item.id !== payload)
        localStorage.setItem('favorites', JSON.stringify(favorites.value))
    }

    const isFavorite = (payload)=>( favorites.value.find((pokemon)=>pokemon.name === payload))

    return {
        favorites,
        addFavorite,
        deleteFavorite,
        isFavorite,
    }
})
