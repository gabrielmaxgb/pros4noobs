<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
    layout: 'auth',
  });

  const router = useRouter();
</script>

<template>
  <div>
    router: {{ router }}
    <span>dashboard</span>
  </div>
</template>
