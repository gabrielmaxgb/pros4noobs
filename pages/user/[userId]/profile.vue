<script setup lang="ts">
  // import PageContainer from '~/components/auth/PageContainer.vue';
  // import PageHeader from '~/components/auth/PageHeader.vue';

  definePageMeta({
    middleware: 'auth',
    layout: 'auth',
    props: {
      pageTitle: 'Perfil',
      pageDescription:
        'Aqui você pode ver as mentorias que você está participando, e todo seu histórico de mentorias.',
      tabItems: [
        {
          label: 'Mentorias realizadas',
          icon: 'material-symbols:edit',
        },
        {
          label: 'Dashboard',
          icon: 'material-symbols:preview',
        },
      ],
    },
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
