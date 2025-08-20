<script setup>
import AddLink from '@/components/AddLink.vue';
import LinkCard from '@/components/LinkCard.vue';
import { useLinkStore } from '@/stores/link';

    const linkStore = useLinkStore()

</script>

<template>
    <div class="container">
        <h1>User</h1>
        <AddLink/>
        <!-- <pre>
            {{ linkStore.links }}
        </pre> -->
        <LinkCard
            v-for="link in linkStore.links"
            :key="link._id"
            :title="link.nano"
            :url="link.full"
            :id="link._id"
            :nano="link.nano"
        />
    </div>
</template>
