<script setup>
import { RouterView, useRouter } from 'vue-router';
import { useUserStore } from './stores/user';
import { onMounted } from 'vue';

const userStore = useUserStore()
const router = useRouter()

const handleLogout = async() => {
  await userStore.logout()
  router.push('/login')
}

onMounted(async()=>{
  await userStore.getRefreshToken()
})

</script>

<template>
  <div>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">MEVN App</RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/" v-if="userStore.token">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/protected" v-if="userStore.token">Protected</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/login" v-if="!userStore.token">Login</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              class="btn btn-outline-warning ms-lg-2"
              to="/register"
              v-if="!userStore.token"
            >
              Register
            </RouterLink>
          </li>
          <li class="nav-item">
            <button
              class="btn btn-outline-danger ms-lg-2"
              @click="handleLogout"
              v-if="userStore.token"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>


    <main class="container py-4">
      <RouterView />
    </main>
  </div>
</template>
