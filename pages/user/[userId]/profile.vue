<script setup lang="ts">
  definePageMeta({
    layout: 'auth',
  });

  const userId = useRoute().params.userId;
</script>

<template>
  <PageContainer>
    <PageHeader
      :title="userId.toString()"
      subtitle="Aqui você pode ver as mentorias que você está participando, e todo seu histórico de mentorias."
    />
  </PageContainer>
</template>
