<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/logo.svg" alt="Vue" width="30" height="24">
        PokeAPI
      </router-link>
      <div class="btn-group">
        <RouterLink to="/" class="btn btn-outline-success">Home</RouterLink>
        <RouterLink to="/about" class="btn btn-outline-success">About</RouterLink>
        <RouterLink to="/pokemon" class="btn btn-outline-success">Pokemons</RouterLink>
        <RouterLink to="/favorites" class="btn btn-outline-danger">Favorites</RouterLink>
      </div>
    </div>
  </nav>

  <div class="container mt-2">
    <RouterView />
  </div>
</template>

