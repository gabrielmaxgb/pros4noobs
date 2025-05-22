<script setup lang="ts">
  onMounted(() => {
    const session = useSession();
    session.fetchSession();
  });

  // const session = useSession();
</script>

<template>
  <div>
    <UApp :toaster="{ position: 'top-center' }">
      <!-- session: {{ session }}<br /> -->
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
