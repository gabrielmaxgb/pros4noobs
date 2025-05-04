<script setup lang="ts">
definePageMeta({
  middleware: "block-route",
});

const form = reactive({
  name: "",
  email: "",
  areaOfInterest: "",
  technologies: "",
  availability: "",
});

const trackingCode = ref("");
const error = ref("");
const loading = ref(false);

async function handleSubmit() {
  error.value = "";
  loading.value = true;

  try {
    const { trackingCode: code } = await $fetch("/api/noobs", {
      method: "POST",
      body: {
        name: form.name,
        email: form.email,
        areaOfInterest: [form.areaOfInterest],
        technologies: form.technologies.split(",").map((t) => t.trim()),
        availability: [form.availability],
      },
    });

    trackingCode.value = code;
  } catch (err: any) {
    error.value = err?.data?.message || "Erro desconhecido.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="max-w-md mx-auto py-10 px-4">
    <h1 class="text-2xl font-bold mb-6">
      🚀 Comece sua jornada na programação
    </h1>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <input
        v-model="form.name"
        type="text"
        placeholder="Seu nome"
        required
        class="input"
      />
      <input
        v-model="form.email"
        type="email"
        placeholder="Seu email"
        required
        class="input"
      />

      <input
        v-model="form.areaOfInterest"
        type="text"
        placeholder="Área de interesse (ex: frontend)"
        class="input"
      />

      <input
        v-model="form.technologies"
        type="text"
        placeholder="Tecnologias (ex: HTML, JS)"
        class="input"
      />

      <select v-model="form.availability" required class="input">
        <option disabled value="">Disponibilidade</option>
        <option value="Morning">Manhã</option>
        <option value="Afternoon">Tarde</option>
        <option value="Evening">Noite</option>
        <option value="Weekend">Fins de semana</option>
      </select>

      <button
        type="submit"
        :disabled="loading"
        class="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
      >
        {{ loading ? "Enviando..." : "Enviar inscrição" }}
      </button>

      <p v-if="trackingCode" class="mt-4 text-green-600 font-semibold">
        ✅ Cadastro feito! Seu código é: <code>{{ trackingCode }}</code>
        <br />
        Guarde esse código para acompanhar seu status na
        <NuxtLink to="/track" class="underline text-blue-500"
          >página de acompanhamento</NuxtLink
        >.
      </p>

      <p v-if="error" class="text-red-500 mt-4">
        Erro ao cadastrar: {{ error }}
      </p>
    </form>
  </div>
</template>

<style scoped>
/* .input {
  @apply w-full px-3 py-2 border border-gray-300 rounded;
} */
</style>
