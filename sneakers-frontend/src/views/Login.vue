<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      message: ""
    };
  },
  methods: {
    async test_login() {
      try {
        const requestBody = {
          "email": this.email,
          "password": this.password
        } ;
        const request = await fetch("http://localhost:3000/auth/login", {
          method: 'POST',
          headers: {
           'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
        if (request.status===200) {
          const response = await request.json();
          if (response.token) {
            sessionStorage.setItem("user_token", response.token)
            sessionStorage.setItem("user_name", response.userName);
            this.$router.push('/');
          }
          else {
            this.message="Email ou mot de passe incorrecte"
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<template>
  <h1>Connexion</h1>
  <form @submit.prevent="test_login">
    <label for="email">Email*</label>
    <input type="email" required id="email" v-model="email">
    <label for="password">Mot de passe*</label>
    <input type="password" required v-model="password">
    <p class="bg-red-400">{{message}}</p>
    <button type="submit">Se connecter</button>
    <hr>
    <p>Pas de compte?</p>
    <button @click="$router.push('/auth/register')">Créer un compte</button>
  </form>
</template>

<style scoped>

</style>