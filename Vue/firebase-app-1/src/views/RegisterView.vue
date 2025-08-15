<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';

const router = useRouter()
const useUser = useUserStore()

const displayName = ref('Albo')
const email = ref('albo@test.com')
const password = ref('123456')

const handleSubmit = async() => {
    if(!email.value || password.value.length < 6 || !displayName.value){
        return alert('Must fill inputs')
    }

    await useUser.register(email.value, password.value, displayName.value)

    if (useUser.status === 'authenticated'){
        router.push('/')
    }

}
</script>

<template>
    <h1 class="mb-4">Register</h1>
<form @submit.prevent="handleSubmit" class="w-50 mx-auto">
  <div class="mb-3">
    <input
      type="text"
      class="form-control"
      placeholder="Name"
      v-model.trim="displayName"
    >
  </div>
  <div class="mb-3">
    <input
      type="email"
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
  <button type="submit" class="btn btn-primary w-100">
    Register
  </button>
</form>
</template>

