<script setup lang="ts">
  // import PageContainer from '~/components/auth/PageContainer.vue';
  // import PageHeader from '~/components/auth/PageHeader.vue';

  definePageMeta({
    middleware: 'auth',
    layout: 'auth',
    props: {
      pageTitle: 'Mentorias',
      pageDescription:
        'Veja as mentorias que você está participando, e todo seu histórico de mentorias.',
      tabItems: [
        {
          label: 'Mentoria ativa',
          icon: 'material-symbols:edit',
        },
        {
          label: 'Mentorias realizadas',
          icon: 'material-symbols:preview',
        },
      ],
    },
  });
</script>

<template>
  <PageContainer>
    <PageHeader
      title="Mentorias"
      subtitle="Veja as mentorias que você está participando, e todo seu histórico de mentorias."
    />
  </PageContainer>
</template>
