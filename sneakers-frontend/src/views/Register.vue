<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      userName: "",
      "password": ""
    }
  },
  methods: {
    async confirm_register() {
      const request_body = {
        email: this.email,
        username: this.userName,
        password: this.password
      }
      try {
        const my_request = await fetch("http://localhost:3000/auth/register", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request_body)
        });
        if (my_request.status===200) {
          this.$router.push('/auth/login');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<template>
  <h1>Créer un compte</h1>
  <p>Ça y ait, vous sautez le pas? alors remplissez les champs suivants.</p>
  <form @submit.prevent="confirm_register">
    <label for="email">Votre e-mail</label>
    <input type="email" placeholder="Louis.braille@institut.com" id="email" v-model="email">
    <label for="userName">Nom d'utilisateur</label>
    <input type="text" placeholder="Louis Braille" required id="userName" v-model="userName">
    <label for="password">Mot de passe</label>
    <input type="password" required id="password" v-model="password">
    <p>Vous serez redirigé sur la page de connexion</p>
    <button type="submit">Créer mon compte</button>
  </form>
</template>

<style scoped>

</style>