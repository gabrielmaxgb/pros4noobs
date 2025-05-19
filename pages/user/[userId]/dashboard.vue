<script setup lang="ts">
  import PageContainer from '~/components/auth/PageContainer.vue';
  import PageHeader from '~/components/auth/PageHeader.vue';

  definePageMeta({
    middleware: 'auth',
    layout: 'auth',
    props: {
      pageTitle: 'Dashboard',
      pageDescription:
        'Resumo do seu perfil, suas mentorias e mais detalhes sobre sua jornada com a Pros4Noobs',
    },
  });
</script>

<template>
  <PageContainer>
    <PageHeader
      title="Dashboard"
      subtitle="Resumo do seu perfil, suas mentorias e mais detalhes sobre sua jornada com a Pros4Noobs"
    />
  </PageContainer>
</template>
