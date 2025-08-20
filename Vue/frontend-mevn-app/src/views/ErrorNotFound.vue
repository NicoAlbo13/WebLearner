<script setup>

</script>


<template>
  <div class="container d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
    <div class="mb-4">
      <span class="badge bg-secondary text-uppercase">Error</span>
    </div>

    <h1 class="display-1 fw-bold mb-0">404</h1>
    <p class="lead text-muted mt-3">The page you’re looking for doesn’t exist or has moved.</p>

    <div class="d-flex gap-2 mt-4">
      <RouterLink class="btn btn-primary" to="/">Go Home</RouterLink>
      <button class="btn btn-outline-secondary" @click="$router.back()">Go Back</button>
    </div>

    <p class="small text-muted mt-4">If this keeps happening, contact support.</p>
  </div>
</template>
