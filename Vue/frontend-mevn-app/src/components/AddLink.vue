<script setup>
import { ref } from 'vue';
import { useLinkStore } from '@/stores/link';

const error = ref('')
const success = ref('')
const link = ref('')

const disabled = ref(false)

const linkStore = useLinkStore()

const submitLink = async() => {

  if(link.value.trim().length <= 0) return;

  try {
    disabled.value = true;
    const res = await linkStore.createLink(link.value)
    link.value = ''
    error.value = ''
    if(res.ok){
      success.value = 'Link added successfully!';
      setTimeout(()=>{
        success.value = ''
      }, 3500)
    }
  } catch (e) {
    console.log(e);
    if(!e.ok){
      if(e.errors){
        error.value = e.errors[0].msg
      }else{
        error.value = e.error === 'fetch failed'? 'Is that a link?' : e.error
      }
      setTimeout(()=>{
        error.value = ''
      }, 4500)
    }
  }finally{
    disabled.value = false
  }
}

</script>

<template>
  <div class="card shadow p-3 mt-4 mb-4" style="max-width: 100%;">
    <h5 class="mb-3">Add a Link</h5>

    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <div v-if="success" class="alert alert-success" role="alert">
      {{ success }}
    </div>

    <form @submit.prevent="submitLink">
      <div class="input-group">
        <input
          v-model="link"
          type="text"
          class="form-control"
          placeholder="Enter a link"
        />
        <button class="btn btn-success" type="submit" :disabled="disabled">Add</button>
      </div>
    </form>
  </div>
</template>
