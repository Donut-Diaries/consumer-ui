<script setup lang="ts">
import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";

definePageMeta({
  middleware: "no-auth",
});

const cookieName = useRuntimeConfig().public.supabase.cookieName;
const redirectPath = useCookie(`${cookieName}-redirect-path`).value;

const alertState = reactive({
  show: false,
  message: "",
  success: false,
});

const onVerify = async (token: string, eKey: string) => {
  const { signInAnonymously } = useAuth();

  try {
    await signInAnonymously(token);

    alertState.show = false;
    alertState.message = "";
    alertState.success = true;

    // Clear cookie
    useCookie(`${cookieName}-redirect-path`).value = null;

    // Redirect to path
    navigateTo(redirectPath || "/");
  } catch (error: any) {
    alertState.show = true;
    alertState.success = false;
    alertState.message = error.error_description || error.message;
  }
};

const onChallengeExpired = () => {
  alertState.success = false;
  alertState.message = "Challenge expired. Reload page";
};
</script>

<template>
  <div
    class="p-2 h-4/5 flex flex-col items-center justify-center w-3/4 md:w-1/2 max-w-md mx-auto relative"
  >
    <div class="absolute w-full top-20">
      <UAlert
        :close-button="{
          icon: 'i-heroicons-x-mark-20-solid',
          color: 'gray',
          variant: 'link',
          padded: false,
        }"
        :color="alertState.success ? 'emerald' : 'rose'"
        variant="subtle"
        icon="i-heroicons-bell"
        :class="alertState.show ? 'visible' : 'invisible'"
        :title="alertState.message"
        @close="alertState.show = !alertState.show"
      />
    </div>

    <div class="mb-6">Confirm below to continue</div>

    <vue-hcaptcha
      sitekey="5fd72f0d-ce52-4113-9dc9-77462cb07856"
      @verify="onVerify"
      @challenge-expired="onChallengeExpired"
    ></vue-hcaptcha>
  </div>
</template>
