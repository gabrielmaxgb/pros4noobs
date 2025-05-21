<script setup lang="ts">
  definePageMeta({
    layout: 'auth',
  });

  // const route = useRoute();
</script>

<template>
  <PageContainer>
    <PageHeader
      title="Construa seu portfólio"
      subtitle="Construa seu portfólio de forma simples e rápida."
    />

    <Paper class="w-full flex flex-col gap-4">
      <div class="w-full flex items-center justify-end">
        <UButton variant="solid" size="lg">
          <span> Adicionar bloco </span>
        </UButton>
      </div>

      <EmptyState
        title="Nenhum bloco encontrado"
        subtitle="Adicione um bloco para começar a construir seu portfólio."
      />
    </Paper>
  </PageContainer>
</template>
