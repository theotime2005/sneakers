<script>
export default {
  name: "ResetPassword",
  data() {
    return {
      password: "",
      isActive: false,
      isClose: false
    }
  },
  methods: {
    async check_token() {
      try {
        const my_request = await fetch("http://localhost:3000/auth/reset", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.$route.query.token}`
          }
        });
        const response = await my_request.json();
        if (response.isValid) {
          this.isActive=true;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async change_password() {
      try {
        const my_request = await fetch("http://localhost:3000/auth/change-password", {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$route.query.token}`
          },
          body: JSON.stringify({
            password: this.password
          })
        });
        if (await my_request.status===200) {
          this.isClose=true;
        }
      } catch (error) {
        console.error(error);
        this.isActive=false;
      }
    }
  },
  mounted() {
    document.title="Réinitialisation du mot de passe | Le site des Sneakers";
    this.check_token();
  }
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold">Réinitialiser votre mot de passe</h1>
    <div v-if="isActive && !isClose" class="mt-4">
      <form @submit.prevent="change_password">
        <label for="password" class="block">Nouveau mot de passe</label>
        <input type="password" id="password" v-model="password" required class="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full">
        <button type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Modifier</button>
      </form>
    </div>
    <p v-else-if="!isActive" class="mt-4">Le jeton est expiré, veuillez reformuler votre demande.</p>
    <p v-else-if="isClose" class="mt-4">Votre mot de passe a été modifié. Vous pouvez vous connecter.</p>
    <RouterLink to="/auth/login" class="mt-4 block text-blue-500">Accéder à la page de connexion</RouterLink>
  </div>
</template>