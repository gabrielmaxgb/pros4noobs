<template>
  <div class="max-w-md mx-auto py-10 px-4">
    <h1 class="text-2xl font-bold mb-4">👀 Acompanhe seu status na fila</h1>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <input
        v-model="code"
        type="text"
        placeholder="Digite seu código (ex: P4N-ABCD1234)"
        class="input"
        required
      />
      <button
        :disabled="loading"
        class="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
      >
        {{ loading ? "Consultando..." : "Consultar" }}
      </button>
    </form>

    <div v-if="statusResult" class="mt-6 p-4 border rounded bg-gray-50">
      <p class="text-lg font-semibold">
        📌 Status: <span class="text-blue-700">{{ statusResult.status }}</span>
      </p>
      <p v-if="statusResult.createdAt" class="text-sm text-gray-500 mt-1">
        Cadastro realizado em: {{ formatDate(statusResult.createdAt) }}
      </p>
    </div>

    <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
const code = ref("");
const statusResult = ref<{ status: string; createdAt: string } | null>(null);
const loading = ref(false);
const error = ref("");

async function handleSubmit() {
  error.value = "";
  statusResult.value = null;
  loading.value = true;

  try {
    const result = await $fetch(`/api/noobs/${code.value}`);
    statusResult.value = result as any;
  } catch (err: any) {
    error.value =
      err?.data?.message || "Código inválido ou erro na requisição.";
  } finally {
    loading.value = false;
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
</script>

<style scoped></style>
