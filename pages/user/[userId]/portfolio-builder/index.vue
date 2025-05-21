<script setup lang="ts">
  definePageMeta({
    layout: 'auth',
    middleware: () => {
      return navigateTo({ name: 'user-userId-portfolio-builder-editor' });
    },
  });
</script>
