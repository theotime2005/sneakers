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
  <h1>Réinitialiser votre mot de passe</h1>
  <div v-if="isActive && !isClose">
    <form @submit.prevent="change_password">
      <label for="password">Nouveau mot de passe</label>
      <input type="password" id="password" v-model="password" required>
      <button type="submit">Modifier</button>
    </form>
  </div>
  <p v-else-if="!isActive">Le jeton est expiré, veuillez reformuler votre demande.</p>
  <p v-else-if="isClose">Votre mot de passe a été modifié. Vous pouvez vous connecter.</p>
  <RouterLink to="/auth/login">Accéder à la page de connexion</RouterLink>
</template>

<style scoped>

</style>