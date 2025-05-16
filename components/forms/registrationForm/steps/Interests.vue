<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query';
  import { queries } from '~/queries';

  const onBoardingStore = useOnBoardingStore();
  const technologiesItems = ref([
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C#',
    'PHP',
    'Ruby',
    'Go',
    'JavaScript2',
    'TypeScript2',
    'Python2',
    'Java2',
    'C#2',
    'PHP2',
    'Ruby2',
    'Go2',
  ]);

  const { data: technologiesList } = useQuery({
    ...queries.user.getUserRegistrationTechnologies(),
    staleTime: Infinity,
    enabled: true,
  });

  watch(
    () => onBoardingStore.registrationForm.superBeginner,
    (newValue) => {
      if (newValue) {
        // onBoardingStore.registrationForm.areasOfInterest = [];
        onBoardingStore.registrationForm.technologies = [];
      }
    }
  );
</script>

<template>
  <div v-if="onBoardingStore.registrationForm.startRole === 'noob'">
    <UCheckbox
      v-model="onBoardingStore.registrationForm.superBeginner"
      label="Super Noob"
      :description="`${'Marque esta opção se você tem interesse em aprender mais sobre a carreira na área da tecnologia, porém não tem certeza sobre a área de atuação. Ao marcar esta opção, você não precisa preencher as áreas de interesse e tecnologias.'}`"
      variant="card"
      class="cursor-pointer"
    />
  </div>

  technologiesList: {{ technologiesList }} <br />

  <div>
    <USelectMenu
      v-model="onBoardingStore.registrationForm.technologies"
      multiple
      placeholder="Tecnologias de interesse"
      :items="technologiesItems"
      class="w-full h-10 cursor-pointer"
      variant="soft"
      color="neutral"
      size="xl"
      :disabled="
        onBoardingStore.registrationForm.startRole === 'noob' &&
        onBoardingStore.registrationForm.superBeginner
      "
    />
    <p v-if="onBoardingStore.registrationFormErrors.technologies" class="text-red-500 text-sm mt-1">
      {{ onBoardingStore.registrationFormErrors.technologies }}
    </p>
  </div>
</template>
