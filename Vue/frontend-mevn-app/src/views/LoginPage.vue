<script setup>
import { onMounted, ref } from "vue"
import { useUserStore } from "@/stores/user"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const error = ref("")

const router = useRouter()

const userStore = useUserStore()

const handleLogin = async() => {
  try {
    await userStore.login({email: email.value, password: password.value})
    router.push('/')
    email.value = ''
    password.value = ''
    error.value = ''
  } catch (e) {
    if(!e.ok){
      error.value = e.errorMessage;
    }else{
      error.value = 'Server Error'
    }
  }
}

onMounted(()=>{
  if(userStore.token){
    router.push('/')
  }
});

</script>

<template>
  <div class="d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="card shadow p-4" style="width: 100%; max-width: 400px;">
      <h3 class="text-center mb-4">Login</h3>

      <div v-if="error" class="alert alert-danger text-center" role="alert">
        {{ error }}
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter email"
            required
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>

      <div class="text-center mt-3">
        <RouterLink to="/register">Don't have an account? Register</RouterLink>
      </div>
    </div>
  </div>
</template>

