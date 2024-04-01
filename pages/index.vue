<script setup lang="ts">
const user = useSupabaseUser();
const { signOut } = useAuth();
</script>

<template>
  <div class="p-10 text-center">
    <div v-if="user">
      <p>Welcome {{ user.id }}</p>
      <UButton class="mt-10" label="log out" color="red" @click="signOut" />
    </div>
    <div v-else>
      <p>Not logged in</p>
      <UButton class="mt-10" label="login" to="/login" />
    </div>
  </div>
</template>
