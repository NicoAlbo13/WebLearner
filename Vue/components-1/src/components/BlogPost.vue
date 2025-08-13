<script setup>
// defineProps(['title', 'id', 'body', 'className'])

defineProps({
    title: String,
    id: Number,
    body: {
        type: String,
        default: "No description..."
    }
})

const emit = defineEmits(['changeFavorite'])

</script>

<template>
    <div class="card m-3">
        <div class="card-body">
            <h5 class="card-title">{{ id }} - {{ title }}</h5>
            <p>{{ body }}</p>
            <button @click="emit('changeFavorite', title)" class="btn btn-outline-danger">
                Favorite
            </button>
        </div>
    </div>
</template>
