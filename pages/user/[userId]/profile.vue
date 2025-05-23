<script setup lang="ts">
  definePageMeta({
    layout: 'auth',
  });

  // const session = useSession();
  const session = useSession();
</script>

<template>
  <PageContainer>
    <PageHeader
      :title="session.user.value?.name"
      subtitle="Aqui você pode ver as mentorias que você está participando, e oregistro geral da sua jornada com a Pros4Noobs"
    />
  </PageContainer>
</template>
