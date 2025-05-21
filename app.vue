<script setup lang="ts">
  onMounted(() => {
    const { fetchSession } = useSession();
    fetchSession();
  });
</script>

<template>
  <div>
    <UApp :toaster="{ position: 'top-center' }">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
