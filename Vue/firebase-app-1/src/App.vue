<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useUserStore } from './store/user';

const router = useRouter()
const useUser = useUserStore()

const handleLogout = async () => {
  if(useUser.status === 'not-authenticated'){
    return;
  }
  await useUser.logout()
  router.push('/login')
}

</script>

<template>
  <div v-if="useUser.isLoading" class="d-flex flex-column align-items-center mt-4">
    <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    <span class="mt-2 fw-bold">Checking...</span>
  </div>
  <template v-else>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div class="container-fluid">
        <div class="navbar-nav">
          <RouterLink
            to="/"
            class="nav-link"
            v-if="useUser.isAuthenticated"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/login"
            class="nav-link"
            v-if="!useUser.isAuthenticated"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/register"
            class="nav-link"
            v-if="!useUser.isAuthenticated"
          >
            Register
          </RouterLink>
          <button
            @click="handleLogout"
            class="btn btn-outline-danger"
            :disabled="!useUser.isAuthenticated"
            v-if="useUser.isAuthenticated"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
    <div class="container">

      <div v-if=" useUser.userData?.errorMessage" class="alert alert-danger mb-3 mt-3" role="alert">
        {{ useUser.userData?.errorMessage }}
      </div>

      <RouterView />
    </div>
  </template>
</template>
