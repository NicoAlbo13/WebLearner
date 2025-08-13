<script setup>

    defineProps({
        start: Number,
        end: Number,
        length: Number,
    })

</script>

<template>
    <div class="btn-group" role="group">
        <button type="button" class="btn btn-outline-primary" @click="$emit('prev')" :disabled="start===0">Prev</button>
        <button type="button" class="btn btn-outline-primary" @click="$emit('next')" :disabled="end>=length">Next</button>
    </div>
</template>
