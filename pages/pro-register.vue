<script setup lang="ts">
definePageMeta({
  middleware: "block-route",
});

const form = reactive({
  name: "",
  email: "",
  areas: "",
  technologies: "",
  availability: "",
});

const loading = ref(false);
const success = ref(false);
const error = ref("");

async function handleSubmit() {
  error.value = "";
  loading.value = true;

  try {
    await $fetch("/api/pros", {
      method: "POST",
      body: {
        name: form.name,
        email: form.email,
        areas: form.areas.split(",").map((a) => a.trim()),
        technologies: form.technologies.split(",").map((t) => t.trim()),
        availability: [form.availability],
      },
    });

    success.value = true;
  } catch (err: any) {
    error.value = err?.data?.message || "Erro inesperado ao cadastrar.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="max-w-md mx-auto py-10 px-4">
    <h1 class="text-2xl font-bold mb-6">🙌 Obrigado por querer ajudar!</h1>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <input
        v-model="form.name"
        type="text"
        placeholder="Seu nome"
        class="input"
        required
      />
      <input
        v-model="form.email"
        type="email"
        placeholder="Seu email"
        class="input"
        required
      />
      <input
        v-model="form.areas"
        type="text"
        placeholder="Áreas em que pode ajudar (ex: frontend, backend)"
        class="input"
      />
      <input
        v-model="form.technologies"
        type="text"
        placeholder="Tecnologias que domina (ex: Vue, Node, React)"
        class="input"
      />

      <select v-model="form.availability" class="input" required>
        <option disabled value="">Quando pode atender?</option>
        <option value="Morning">Manhã</option>
        <option value="Afternoon">Tarde</option>
        <option value="Evening">Noite</option>
        <option value="Weekend">Fins de semana</option>
      </select>

      <button
        :disabled="loading"
        class="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
      >
        {{ loading ? "Enviando..." : "Cadastrar como pro" }}
      </button>

      <p v-if="success" class="mt-4 text-green-600 font-semibold">
        ✅ Cadastro concluído! Agora é só aguardar o próximo noob ser pareado
        com você!
      </p>

      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped></style>
