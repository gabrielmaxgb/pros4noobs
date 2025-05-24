<script setup lang="ts">
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
        routeName: 'user-userId-portfolio-builder-editor',
        icon: 'nimbus:tools',
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
  const session = useSession();

  const handleSideBarItemClick = (item: TSidenavigationBar_Item) => {
    navigateTo({ name: item.routeName, params: { userId: route.params.userId } });
  };

  const handleLogoutClick = async () => {
    session.logout();
  };

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
        name="mdi:arrow-u-left-top-bold"
        size="15"
        class="transition-transform duration-300 text-internal-black"
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
        <UModal :overlay="true" class="w-[100%]" title="Modal Title" size="sm">
          <SideNavItem
            :label="'Noob Coins'"
            icon="carbon:software-resource-cluster"
            class="text-primary bg-gradient-to-br from-primary/10 via-black/10 to-secondary/10"
            :active="false"
            :collapsed="isSideNavCollapsed"
          >
            <template #custom-content>
              <div v-if="isSideNavCollapsed" class="flex items-center justify-center">
                <UIcon name="material-symbols:money-bag-rounded" size="20" class="text-primary" />
              </div>
              <div v-if="!isSideNavCollapsed" class="flex items-center justify-start gap-4">
                <div class="flex items-center gap-2">
                  <div class="relative flex items-center justify-center">
                    <div
                      class="absolute size-28 rounded-full bg-warning/50 opacity-30 blur-2xl animate-pulse scale-15"
                    />
                    <UIcon name="solar:fire-bold" size="20" class="text-warning" />
                  </div>
                  <p class="text-warning">23 <span class="text-xs">Flares</span></p>
                </div>
                <div class="flex items-center gap-2">
                  <div class="relative flex items-center justify-center">
                    <div
                      class="absolute size-28 rounded-full bg-red-400/50 opacity-30 blur-2xl animate-pulse scale-15"
                    />
                    <UIcon name="cuida:sparks-outline" size="20" class="text-red-400" />
                  </div>
                  <span class="text-red-400">8 <span class="text-xs">Sparks</span></span>
                </div>
              </div>
            </template>
          </SideNavItem>

          <template #body>Modal Content</template>
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
