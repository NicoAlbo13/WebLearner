<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';

const useUser = useUserStore()
const router = useRouter()

const email = ref('albo@test.com')
const password = ref('123456')

const handleSubmit = async () => {
    if(!email.value || password.value.length < 6){
        return alert('Must fill inputs')
    }

    await useUser.login(email.value, password.value)

    if (useUser.status === 'authenticated'){
        router.push('/')
    }
}

</script>

<template>
  <h1 class="mb-4">Login</h1>
  <form @submit.prevent="handleSubmit" class="w-50 mx-auto">
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Enter email"
        v-model.trim="email"
      >
    </div>
    <div class="mb-3">
      <input
        type="password"
        class="form-control"
        placeholder="Enter password"
        v-model.trim="password"
      >
    </div>
    <button type="submit" class="btn btn-success w-100">
      Login
    </button>
  </form>

</template>

