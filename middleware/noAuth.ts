/**
 * Ensure that the user is not authenticated when accessing route.
 * If user is authenticated redirects to '/'.
 */
export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser();

  if (user.value) {
    return navigateTo("/");
  }
});
