<script setup lang="ts">
  import PageContainer from '~/components/auth/PageContainer.vue';
  import PageHeader from '~/components/auth/PageHeader.vue';

  definePageMeta({
    middleware: 'auth',
    layout: 'auth',
  });
</script>

<template>
  <PageContainer>
    <PageHeader
      title="Mentorias"
      description="Aqui você pode ver as mentorias que você está participando, e todo seu histórico de mentorias."
    />
  </PageContainer>
</template>
