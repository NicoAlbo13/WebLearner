<script setup>
import { onMounted, ref } from "vue"
import { useUserStore } from "@/stores/user"
import { useRouter } from "vue-router"

const email = ref("")
const name = ref("")
const password = ref("")
const password2 = ref("")
const error = ref("")

const router = useRouter()

const userStore = useUserStore()

const handleRegister = async() => {
  try {
    await userStore.register({name: name.value, email: email.value, password: password.value, password2: password2.value})
    router.push('/')
    email.value = ''
    name.value = ''
    password.value = ''
    password2.value = ''
    error.value = ''
  } catch (e) {
    if(!e.ok){
      if(e.errorMessage){
        error.value = e.errorMessage;
      }else if (e.errors){
        error.value = e.errors[0].msg
      }
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
      <h3 class="text-center mb-4">Register</h3>

      <div v-if="error" class="alert alert-danger text-center" role="alert">
        {{ error }}
      </div>

      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            v-model="name"
            type="name"
            class="form-control"
            id="name"
            placeholder="Enter name"
            required
          />
        </div>

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

        <div class="mb-3">
          <label for="password2" class="form-label">Confirm Password</label>
          <input
            v-model="password2"
            type="password"
            class="form-control"
            id="password2"
            placeholder="Repeat your password"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary w-100">Register</button>
      </form>

      <div class="text-center mt-3">
        <RouterLink to="/login">You have an account? Login</RouterLink>
      </div>
    </div>
  </div>
</template>

