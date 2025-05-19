<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query';
  import { queries } from '~/queries';

  const onboardingStore = useOnboardingStore();
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

  const { data: technologiesList, isLoading: isTechnologiesListLoading } = useQuery({
    ...queries.user.getUserRegistrationTechnologies(),
    staleTime: Infinity,
    enabled: true,
  });

  watch(
    () => onboardingStore.registrationForm.startedAsSuperBeginner,
    (newValue) => {
      if (newValue) {
        // onboardingStore.registrationForm.areasOfInterest = [];
        onboardingStore.registrationForm.technologies = [];
      }
    }
  );
</script>

<template>
  <div v-if="onboardingStore.registrationForm.startRole === 'noob'">
    <UCheckbox
      v-model="onboardingStore.registrationForm.startedAsSuperBeginner"
      label="Super Noob"
      :description="`${'Marque esta opção se você tem interesse em aprender mais sobre a carreira na área da tecnologia, porém não tem certeza sobre a área de atuação. Ao marcar esta opção, você não precisa preencher as áreas de interesse e tecnologias.'}`"
      variant="card"
      class="cursor-pointer"
    />
  </div>

  technologiesList: {{ technologiesList }} <br />

  <div>
    <USelectMenu
      v-model="onboardingStore.registrationForm.technologies"
      multiple
      placeholder="Tecnologias de interesse"
      :items="technologiesList"
      class="w-full h-10 cursor-pointer"
      variant="soft"
      color="neutral"
      size="xl"
      :loading="isTechnologiesListLoading"
      :disabled="
        onboardingStore.registrationForm.startRole === 'noob' &&
        onboardingStore.registrationForm.startedAsSuperBeginner
      "
    />
    <p v-if="onboardingStore.registrationFormErrors.technologies" class="text-red-500 text-sm mt-1">
      {{ onboardingStore.registrationFormErrors.technologies }}
    </p>
  </div>
</template>
