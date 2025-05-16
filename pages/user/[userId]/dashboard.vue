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
      title="Dashboard"
      description="Aqui você pode ver o resumo do seu perfil, suas mentorias e mais detalhes sobre sua jornada com a Pros4Noobs"
    />
  </PageContainer>
</template>
