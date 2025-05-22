<script setup lang="ts">
  import { UIcon } from '#components';
  import SideNavItem from './SideNavItem.vue';

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
        label: 'Perfil',
        routeName: 'user-userId-profile',
        icon: 'lucide:user',
      },
      {
        label: 'Painel',
        routeName: 'user-userId-dashboard',
        icon: 'lucide:layout-dashboard',
      },
      {
        label: 'Mentorias',
        routeName: 'user-userId-mentorships',
        icon: 'hugeicons:study-lamp',
      },
      {
        label: 'Construtor de Currículo',
        routeName: 'user-userId-portfolio-builder',
        icon: 'lucide:picture-in-picture',
      },
      {
        label: 'Configurações',
        routeName: 'user-userId-settings',
        icon: 'lucide:settings',
      },
    ],
    bottom: [],
  };

  const route = useRoute();
  const isSideNavCollapsed = ref(false);

  const handleSideBarItemClick = (item: TSidenavigationBar_Item) => {
    navigateTo({ name: item.routeName, params: { userId: route.params.userId } });
  };

  const handleLogoutClick = async () => {};

  const isRouteActive = (routeName: string): boolean => {
    return route.name?.toString().includes(routeName) || false;
  };
</script>

<template>
  <div
    class="relative bg-internal-black transition-all duration-200 py-6"
    :class="isSideNavCollapsed ? 'w-[90px]' : 'w-[300px]'"
  >
    <div
      class="absolute flex items-center justify-center top-2 right-[-12px] bg-primary p-1 rounded-full cursor-pointer"
      @click="isSideNavCollapsed = !isSideNavCollapsed"
    >
      <UIcon
        name="lucide:chevron-left"
        size="20"
        class="text-internal-black transition-transform duration-300"
        :class="{ 'rotate-180': isSideNavCollapsed }"
      />
    </div>

    <div class="h-full flex flex-col justify-between">
      <section class="w-full flex flex-col gap-0">
        <SideNavItem
          v-for="(item, index) in sideNavigationBar.top"
          :key="index"
          :label="item.label"
          :icon="item.icon"
          :active="isRouteActive(item.routeName)"
          :collapsed="isSideNavCollapsed"
          @click="() => handleSideBarItemClick(item)"
        />
      </section>

      <section class="w-full flex flex-col gap-0">
        <UModal :overlay="true" class="w-[100%]" title="Modal" size="sm">
          <SideNavItem
            :label="'Noob Coins'"
            icon="carbon:software-resource-cluster"
            class="text-primary bg-gradient-to-br from-primary/10 via-black/10 to-secondary/10"
            :active="false"
            :collapsed="isSideNavCollapsed"
          />

          <template #body>Content</template>
        </UModal>

        <SideNavItem
          :label="'Sair'"
          icon="lucide:log-out"
          :active="false"
          :collapsed="isSideNavCollapsed"
          @click="handleLogoutClick"
        />
      </section>
    </div>
  </div>
</template>
