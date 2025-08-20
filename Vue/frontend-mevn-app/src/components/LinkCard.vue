<script setup>
import { useLinkStore } from '@/stores/link';
import { ref } from 'vue';

const props = defineProps({
  title: { type: String, required: true },
  url: { type: String, required: true },
  id: { type: String, required: true },
  nano: { type: String, required: true },
})

const confirming = ref(false)
const editing = ref(false)
const editUrl = ref(props.url)
const linkStore = useLinkStore()

const loading = ref(false)
const error = ref('')
const success = ref('')

const deleteLink = async (id) => {
  try {
    await linkStore.deleteLink(id)
  } catch (error) {
    console.log(error);
  }
}

const copyLink = async (nano) => {
  try {
    const path = `${import.meta.env.VITE_HOST_URI}/${nano}`
    await navigator.clipboard.writeText(path)
    success.value = 'Link copied!';
    setTimeout(()=>{
        success.value = ''
      }, 3500)
  } catch (error) {
    error.value = 'Could not copy link'
    setTimeout(()=>{
      error.value = ''
    }, 4500)
  }
}

const updateLink = async (id, newLink) => {
  if(newLink.trim().length <= 0) return;

  if(newLink.trim() === props.url){
    editing.value = false
    return;
  }

  try {
    loading.value = true
    const res = await linkStore.editLink(id, newLink)
    if(res.ok){
      success.value = 'Link updated successfully!';
      editing.value = false;
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
  } finally {
    loading.value = false
  }
}

const openEdit = () => {
  editUrl.value = props.url;
  editing.value = true
}

</script>

<template>
  <div class="card shadow-sm mb-3">

    <div v-if="error" class="alert alert-danger m-3" role="alert">
      {{ error }}
    </div>
    <div v-if="success" class="alert alert-success m-3" role="alert">
      {{ success }}
    </div>

    <div class="d-flex justify-content-center mt-3" v-if="loading" style="height: 90px;">
      <div class="spinner-border text-primary mt-2" role="status" style="width: 1.5rem; height: 1.5rem;">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="card-body d-flex justify-content-between align-items-center" v-else>
      <div  style="width: 100%;">
        <h6 class="card-title mb-1">{{ title }}</h6>
        <a :href="url" class="card-link text-muted small" target="_blank" v-if="!editing">
          {{ url }}
        </a>
        <form @submit.prevent="" v-else style="width: 98%;">
          <div class="input-group" >
            <input
              v-model="editUrl"
              type="text"
              class="form-control"
              placeholder="Edit link"
            />
          </div>
        </form>
      </div>

      <div class="d-flex gap-2">
        <!-- Edit -->
        <button
        v-if="!confirming && !editing"
          class="btn btn-sm btn-outline-primary"
          @click="openEdit"
          title="Edit"
        >
          <i class="bi bi-pencil"></i>
        </button>

        <button
        v-if="!confirming && editing"
          class="btn btn-sm btn-outline-success mt-4"
          @click="updateLink(id, editUrl)"
          title="Save Edit"
        >
          <i class="bi bi-save"></i>
        </button>

        <button
        v-if="!confirming && editing"
          class="btn btn-sm btn-outline-danger mt-4"
          @click="editing = false"
          title="Cancel"
        >
          <i class="bi bi-x-circle"></i>
        </button>

        <!-- Copy -->
        <button
        v-if="!confirming && !editing"
          class="btn btn-sm btn-outline-secondary"
          @click="copyLink(nano)"
          title="Copy"
        >
          <i class="bi bi-clipboard"></i>
        </button>

        <!-- Delete -->
        <div v-if="!editing">
          <div v-if="!confirming" class="d-flex">
            <button class="btn btn-sm btn-outline-danger" @click="confirming = true">
              <i class="bi bi-trash"></i>
            </button>
          </div>
          <div v-else class="d-flex card shadow-sm align-items-center p-2" style="width: 130px;">
            <div class="d-flex align-text-center">
              <p><em>Delete forever?</em></p>
            </div>
            <div class="d-flex">
              <button class="btn btn-sm btn-danger me-1" @click="deleteLink(id)">Yes</button>
              <button class="btn btn-sm btn-secondary" @click="confirming = false">No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>