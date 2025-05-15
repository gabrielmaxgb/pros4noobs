<script setup lang="ts">
  type TSidenavigationBar_Item = {
    label: string;
    routeName: string;
    icon: string;
  };

  type TSidenavigationBar = {
    top: TSidenavigationBar_Item[];
    bottom: TSidenavigationBar_Item[];
  };

  const sideNavigationBar: TSidenavigationBar = {
    top: [
      {
        label: 'Painel',
        routeName: 'user-userId-dashboard',
        icon: 'material-symbols:dashboard',
      },
      {
        label: 'Mentorias',
        routeName: 'user-userId-mentorships',
        icon: 'hugeicons:study-lamp',
      },
      {
        label: 'Perfil',
        routeName: 'user-userId-profile',
        icon: 'material-symbols:account-circle',
      },
    ],
    bottom: [],
  };

  const router = useRouter();
  const { logout } = useLogout();

  const handleSideBarItemClick = (item: TSidenavigationBar_Item) => {
    console.log('item', item);
    navigateTo({ name: item.routeName, params: { userId: 123 } });
  };

  const handleLogoutClick = async () => {
    await logout();
  };
</script>

<template>
  <div class="bg-internal-black/70 w-[310px] h-full flex flex-col items-start justify-between p-6">
    <section class="w-full flex flex-col gap-2">
      <UButton
        v-for="(item, index) in sideNavigationBar.top"
        :key="index"
        class="cursor-pointer"
        :class="{
          '': router.currentRoute.value.name === item.routeName,
        }"
        :variant="router.currentRoute.value.name === item.routeName ? 'soft' : 'ghost'"
        :icon="item.icon"
        size="xl"
        @click="() => handleSideBarItemClick(item)"
      >
        <span>{{ item.label }}</span>
      </UButton>
    </section>
    <section class="w-full flex flex-col gap-2">
      <UModal>
        <UButton class="w-full flex items-center gap-6 cursor-pointer" variant="ghost" size="xl">
          <div class="flex items-center gap-2" variant="ghost" size="xl">
            <UIcon name="emojione-v1:diamond-with-a-dot" size="20" />
            <span>34</span>
          </div>
          <div class="flex items-center gap-2" variant="ghost" size="xl">
            <UIcon name="fluent-color:coin-multiple-48" size="20" />
            <span>11</span>
          </div>
        </UButton>

        <template #content>
          <Placeholder class="h-48 m-4" />
        </template>
      </UModal>

      <UButton
        class="cursor-pointer"
        variant="link"
        size="xl"
        @click.prevent="() => handleLogoutClick()"
      >
        <UIcon name="material-symbols:logout" size="20" />
        <span>Sair</span>
      </UButton>
    </section>
  </div>
</template>
