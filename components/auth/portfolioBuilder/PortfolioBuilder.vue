<script setup lang="ts">
  const isAddingBlock = ref(false);
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="w-full flex items-center justify-end">
      <UButton
        :variant="!isAddingBlock ? 'solid' : 'ghost'"
        class="cursor-pointer"
        size="lg"
        @click="isAddingBlock = !isAddingBlock"
      >
        <span v-if="!isAddingBlock"> Adicionar bloco </span>
        <span v-else>Cancelar</span>
      </UButton>
    </div>

    <BlockConstructor v-if="isAddingBlock" />

    <EmptyState
      title="Nenhum bloco adicionado"
      subtitle="Adicione um bloco para começar a construir seu portfólio."
    />
  </div>
</template>
