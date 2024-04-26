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
      this.message="";
      if (!this.email || !this.password) {
        this.message="Remplissez tous les champs!";
        return;
      }
      try {
        const requestBody = {
          "email": this.email,
          "password": this.password
        }
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
          else if (request.status===403) {
            this.message="Email ou mot de passe incorrecte"
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    document.title="Connexion | Le site des sneakers";
  }
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold">Connexion</h1>
    <form @submit.prevent="test_login" class="mt-8">
      <label for="email" class="block">Email*</label>
      <input type="email" required id="email" v-model="email" class="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full">
      <label for="password" class="block mt-4">Mot de passe*</label>
      <input type="password" required v-model="password" class="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full">
      <p class="mt-2 bg-red-400 px-4 py-2 rounded" v-if="message.length>0">{{message}}</p>
      <button type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Se connecter</button>
      <button type="button" @click="$router.push('/auth/forget')" class="mt-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Mot de passe oublié!!!</button>
      <hr class="my-8">
      <p>Pas de compte?</p>
      <button type="button" @click="$router.push('/auth/register')" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Créer un compte</button>
    </form>
  </div>

</template>