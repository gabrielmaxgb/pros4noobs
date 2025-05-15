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
    <section class="flex flex-col gap-2">
      <UButton
        v-for="(item, index) in sideNavigationBar.top"
        :key="index"
        class="flex items-center gap-2 text-neutral-100 hover:text-primary transition-colors duration-200 cursor-pointer text-lg"
        :class="{ 'text-primary': router.currentRoute.value.name === item.routeName }"
        variant="link"
        :icon="item.icon"
        size="xl"
        color="neutral"
        @click="() => handleSideBarItemClick(item)"
      >
        <!-- item.to: {{ item.to }} -->
        <span>{{ item.label }}</span>
      </UButton>
    </section>
    <section>
      <UButton
        class="flex items-center gap-2 text-neutral-100 hover:text-warning transition-colors duration-200 cursor-pointer text-lg"
        variant="link"
        size="lg"
        @click.prevent="() => handleLogoutClick()"
      >
        <UIcon name="material-symbols:logout" size="20" />
        <span>Sair</span>
      </UButton>
    </section>
  </div>
</template>
