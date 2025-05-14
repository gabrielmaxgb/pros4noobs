<script setup lang="ts">
  import RegistrationForm from '~/components/forms/registrationForm/RegistrationForm.vue';

  definePageMeta({
    // middleware: "block-route",
  });
</script>

<template>
  <div class="w-full flex flex-col items-center justify-start gap-6">
    <section class="w-11/12 lg:w-10/12 flex flex-col gap-4">
      <p class="text-center text-primary text-2xl md:text-4xl font-header">
        Estamos empolgados em tê-lo aqui!
      </p>
      <p class="text-center text-primary text-2xl md:text-4xl font-header">
        Para começar sua jornada na tecnologia, o primeiro passo é se cadastrar na nossa plataforma.
      </p>
    </section>
    <section class="w-11/12 lg:w-10/12 flex justify-center gap-6">
      <Paper class="w-full flex flex-col gap-8 max-w-[650px]">
        <RegistrationForm />
        <p class="text-center">
          Após o cadastro, você poderá acessar nossa plataforma e começar a explorar as
          oportunidades de mentoria disponíveis.
        </p>

        <p class="text-center">
          Lembre-se: a mentoria é um gesto de generosidade. Ao se cadastrar, você não apenas busca
          orientação, mas também se junta a uma comunidade que valoriza a troca de conhecimento.
        </p>
      </Paper>
    </section>
  </div>
</template>

<style scoped></style>
