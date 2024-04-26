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
        const request = await fetch("http://localhost:3000/auth/register", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request_body)
        });
        if (request.status===200) {
          this.$router.push('/auth/login');
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    document.title="Créer un compte | Le site des sneakers";
  }
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold">Créer un compte</h1>
    <p class="mt-4">Ça y est, vous sautez le pas? Alors remplissez les champs suivants.</p>
    <form @submit.prevent="confirm_register" class="mt-8">
      <label for="email" class="block mt-4">Votre e-mail</label>
      <input type="email" placeholder="Louis.braille@institut.com" id="email" v-model="email" class="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full">
      <label for="userName" class="block mt-4">Nom d'utilisateur</label>
      <input type="text" placeholder="Louis Braille" required id="userName" v-model="userName" class="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full">
      <label for="password" class="block mt-4">Mot de passe</label>
      <input type="password" required id="password" v-model="password" class="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full">
      <p class="mt-4">Vous serez redirigé sur la page de connexion</p>
      <button type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Créer mon compte</button>
    </form>
  </div>
</template>