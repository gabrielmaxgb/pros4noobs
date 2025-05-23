<script setup lang="ts">
  definePageMeta({
    layout: 'auth',
  });
</script>

<template>
  <PageContainer>
    <PageHeader
      title="Construa seu portfólio"
      subtitle="Construa seu portfólio de forma simples e rápida."
    />

    <Paper class="w-full flex flex-col gap-2">
      <PortfolioBuilder />
    </Paper>
  </PageContainer>
</template>
