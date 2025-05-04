<script setup lang="ts">
import type { StepperItem } from "@nuxt/ui";
import p4nLogo from "~/public/p4n-logo.svg";

const stepperItems = [
  {
    title: "Cadastre-se",
    content: "Preencha um formulário simples como noob ou pro.",
    icon: "i-lucide-user-plus",
  },
  {
    title: "Fazemos o match",
    content: "Conectamos iniciantes com mentores de forma justa e intencional.",
    icon: "i-lucide-handshake",
  },
  {
    title: "Mentoria de verdade",
    content: "Troque experiências, tire dúvidas e avance com apoio real.",
    icon: "i-lucide-terminal",
  },
];

const heroActionButtons = [
  {
    label: "Sou noob e quero começar",
    to: "/register",
    variant: "outline",
    color: "primary",
    disabled: true,
  },
  {
    label: "Sou dev experiente e quero ajudar",
    to: "/pro-register",
    variant: "soft",
    color: "warning",
    disabled: true,
  },
  {
    label: "Acompanhar meu cadastro",
    to: "/track",
    variant: "soft",
    color: "secondary",
    disabled: true,
  },
];

const stepperActive = ref(0);

onMounted(() => {
  setInterval(() => {
    stepperActive.value = (stepperActive.value + 1) % stepperItems.length;
  }, 2500);
});
</script>

<template>
  <div class="w-full flex flex-col items-center gap-24">
    <!-- Hero Section -->
    <section class="pt-10 w-10/12 text-center space-y-8 text-gray-300">
      <h1 class="text-5xl font-semibold font-header leading-tight text-primary">
        Comece sua jornada no mundo da tecnologia com apoio de verdade.
      </h1>

      <p class="text-lg leading-relaxed">
        Mentoria gratuita e consciente para quem está começando — sem promessas
        mágicas, sem pagar caro.
      </p>

      <div class="flex flex-col md:flex-row gap-4 justify-center">
        <NuxtLink
          v-for="(btn, index) in heroActionButtons"
          :to="btn?.disabled ? '#' : btn.to"
          :class="[btn.disabled ? 'cursor-not-allowed opacity-50' : '']"
        >
          <UButton
            :color="(btn.color as any)"
            :variant="(btn.variant as any)"
            :disabled="btn.disabled"
          >
            {{ btn.label }}
          </UButton>
        </NuxtLink>
      </div>
    </section>

    <!-- Como Funciona -->
    <section class="w-10/12 text-center text-gray-300 space-y-8">
      <h2 class="text-3xl font-semibold">Como funciona</h2>
      <UStepper v-model="stepperActive" :items="stepperItems" class="w-full">
        <template #content="{ item }">
          <Placeholder class="min-w-full">
            <div class="w-full flex items-center justify-center py-10">
              <span class="text-2xl font-semibold text-neutral">{{
                item?.content
              }}</span>
            </div>
          </Placeholder>
        </template>
      </UStepper>
    </section>

    <!-- Por que fazemos isso -->
    <section
      class="w-full flex items-center justify-center bg-gradient-to-tl from-primary/40 via-black to-secondary/20 text-center space-y-6 text-neutral py-12"
    >
      <div class="w-11/12 flex flex-col gap-4">
        <h2 class="text-3xl font-semibold">Por que fazemos isso</h2>
        <span>Pra tornar o acesso à tecnologia mais justo e possível.</span>
        <span
          >Pra combater a cultura de cursos abusivos e promessas falsas.</span
        >
        <span>Porque mentoria é generosidade — e não produto.</span>
        <span>Pra unir devs com propósito, não com status.</span>
        <NuxtLink to="/about">
          <UButton
            class="cursor-pointer text-base"
            variant="subtle"
            color="primary"
          >
            Saiba mais
          </UButton>
        </NuxtLink>
      </div>
    </section>

    <!-- Quem Somos -->
    <section class="py-12 w-10/12 text-neutral">
      <h2 class="text-3xl font-semibold text-center text-primary mb-6">
        Quem está por trás
      </h2>
      <div class="grid grid-cols-12">
        <div class="col-span-12 lg:col-span-4 flex justify-center">
          <img
            src="https://github.com/gabrielmaxgb.png"
            class="rounded-full w-[300px] mb-6 md:mb-0"
          />
        </div>
        <div class="col-span-12 lg:col-span-8 text-center flex items-center">
          <p class="h-fit text-justify">
            Gabriel Max - Sou desenvolvedor de software com mais de seis anos de
            experiência em criação de aplicações escaláveis e acessíveis. Ao
            longo da minha trajetória, descobri que o maior diferencial de um
            bom profissional não é apenas a técnica, mas também a vontade
            genuína de construir algo que faça diferença na vida das pessoas.
            Foi com essa motivação que nasceu a pros4noobs — uma iniciativa para
            democratizar a entrada no mundo da tecnologia de forma ética,
            transparente e gratuita. Acredito que orientação verdadeira deve ser
            acessível a todos, e que ninguém deveria ser impedido de começar por
            falta de recursos ou por promessas vazias. Aqui, cada mentor e cada
            noob fazem parte de algo maior: a construção de um futuro mais
            justo, onde conhecimento e oportunidade andam lado a lado. Seja
            muito bem-vindo à pros4noobs!
          </p>
        </div>
      </div>
    </section>

    <!-- Rodapé / Manifesto -->
    <footer
      class="w-10/12 py-12 text-center text-neutral border-t border-neutral mt-16"
    >
      <p class="italic text-xl">
        Se você quer ensinar, cobre. Se quer ajudar, doe.
      </p>
      <p class="text-lg text-neutral">
        pros4noobs — um projeto de código e consciência.
      </p>

      <p class="font-script text-sm text-neutral mt-6">Powered by Wizhat</p>
    </footer>
  </div>
</template>
