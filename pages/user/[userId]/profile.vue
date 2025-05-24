<script setup lang="ts">
  import { z } from 'zod';
  import UserProfileSection from '~/components/auth/userProfile/userProfileSection.vue';

  definePageMeta({
    layout: 'auth',
    ssr: false,
  });

  type TEditUserInformationForm = z.infer<typeof _editUserInformationSchema>;

  const _editUserInformationSchema = z.object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('Email inválido').trim(),
    phoneNumber: z.string().optional(),
    technologies: z.array(z.string()).default([]),
    linkedinProfile: z.string().optional(),
    githubProfile: z.string().optional(),
  });

  const session = useSession();
  const isEditingUserInformation = ref(false);
  const editUserInformationForm = ref<TEditUserInformationForm>({
    name: session.user.value?.name || '',
    email: session.user.value?.email || '',
    technologies: session.user.value?.technologies || [],
    phoneNumber: '',
    linkedinProfile: '',
    githubProfile: '',
  });
</script>

<template>
  <PageContainer>
    <PageHeader
      :title="session.user.value?.name"
      subtitle="Aqui você pode ver as mentorias que você está participando, e oregistro geral da sua jornada com a Pros4Noobs"
    />

    <!-- session: {{ session.user.value }} -->

    <Paper class="w-full flex flex-col gap-6">
      <!-- <div class="w-full flex items-center justify-end col-span-12">
        
      </div> -->

      <section class="flex items-start justify-center lg:justify-start w-full">
        <div class="relative bg-neutral-50/10 rounded-full p-8 flex items-center justify-center">
          <UIcon
            name="lucide:user"
            size="40"
            class="text-neutral-400"
            @click="isEditingUserInformation = !isEditingUserInformation"
          />
          <UIcon
            name="lucide:edit"
            size="20"
            class="absolute bottom-0 right-0 text-neutral-400 cursor-pointer"
            @click="() => {}"
          />
        </div>
        <div class="w-full flex justify-end">
          <UButton
            variant="soft"
            size="xl"
            class="w-fit cursor-pointer"
            @click="isEditingUserInformation = !isEditingUserInformation"
          >
            <span>{{ isEditingUserInformation ? 'Salvar' : 'Editar Perfil' }}</span>
          </UButton>
        </div>
      </section>

      <USeparator class="w-full col-span-12" />

      <UserProfileSection section-name="Informações pessoais">
        <template #form>
          <div class="flex flex-col gap-6 col-span-8">
            <UFormField label="Nome">
              <UInput
                v-model="editUserInformationForm.name"
                type="text"
                placeholder="Nome Completo"
                label="Nome"
                variant="soft"
                class="w-full"
                size="xl"
                :disabled="!isEditingUserInformation"
              />
            </UFormField>
            <UFormField label="Email">
              <UInput
                v-model="editUserInformationForm.email"
                type="email"
                placeholder="Email"
                label="Email"
                variant="soft"
                class="w-full"
                size="xl"
                :disabled="!isEditingUserInformation"
              />
            </UFormField>
            <UFormField label="Telefone">
              <UInput
                v-model="editUserInformationForm.phoneNumber"
                type="text"
                placeholder="Telefone"
                label="Telefone"
                variant="soft"
                class="w-full"
                size="xl"
                :disabled="!isEditingUserInformation"
              />
            </UFormField>
          </div>
        </template>
      </UserProfileSection>

      <USeparator class="w-full col-span-12" />

      <UserProfileSection section-name="Interesses">
        <template #form>
          <UFormField label="Tecnologias">
            <USelectMenu
              v-model="editUserInformationForm.technologies"
              multiple
              placeholder="Tecnologias de interesse"
              :items="editUserInformationForm.technologies"
              class="w-full h-10 cursor-pointer"
              variant="soft"
              color="neutral"
              size="xl"
              :disabled="!isEditingUserInformation"
            />
          </UFormField>
        </template>
      </UserProfileSection>

      <USeparator class="w-full col-span-12" />

      <UserProfileSection section-name="Redes Sociais">
        <template #form>
          <div class="flex flex-col gap-6 col-span-8">
            <UFormField label="Linkedin">
              <UInput
                v-model="editUserInformationForm.linkedinProfile"
                type="text"
                placeholder="linkedin.com/in/username"
                label="Linkedin"
                variant="soft"
                class="w-full"
                size="xl"
                :disabled="!isEditingUserInformation"
              />
            </UFormField>
            <UFormField label="Github">
              <UInput
                v-model="editUserInformationForm.githubProfile"
                type="text"
                placeholder="github.com/username"
                label="Github"
                variant="soft"
                class="w-full"
                size="xl"
                :disabled="!isEditingUserInformation"
              />
            </UFormField>
          </div>
        </template>
      </UserProfileSection>
    </Paper>
  </PageContainer>
</template>
