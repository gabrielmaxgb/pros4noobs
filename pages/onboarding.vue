<script setup lang="ts">
	// import { z } from "zod";
	// import { ref, reactive } from "vue";
	// import type { RadioGroupItem, StepperItem } from "@nuxt/ui";
	import RegistrationForm from "~/components/forms/registrationForm/RegistrationForm.vue";

	definePageMeta({
		// middleware: "block-route",
	});
</script>

<template>
	<div class="w-full flex flex-col items-center justify-start gap-6">
		<section class="w-11/12 md:w-8/12 grid grid-cols-12 gap-6">
			<Paper class="w-full col-span-12 md:col-span-6">
				<RegistrationForm />
			</Paper>
			<div class="w-full col-span-11 md:col-span-6">
				<span>asdas</span>
			</div>
		</section>
	</div>
</template>

<style scoped></style>
