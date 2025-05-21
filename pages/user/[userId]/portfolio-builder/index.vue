<script setup lang="ts">
  definePageMeta({
    middleware: () => {
      // Redireciona para a página editor ao acessar portfolio-builder
      return navigateTo({ name: 'user-userId-portfolio-builder-editor' });
    },
  });
</script>

<!-- <template>
  <div>
  </div>
</template> -->
