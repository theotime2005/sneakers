<script>
export default {
  name: "ResetPassword",
  data() {
    return {
      email: "",
      isClose: false
    }
  },
  methods: {
    async ask_reset() {
      try {
        const my_request = await fetch("http://localhost:3000/auth/reset", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email
          })
        });
        console.log(my_request.status);
        if (my_request.status===200) {
          this.isClose=true
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    document.title="Mot de passe oublié | Le site des sneakers";
  }
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold">Vous avez oublié votre mot de passe?</h1>
    <div v-if="!isClose" class="mt-4">
      <p>Entrez votre email pour réinitialiser votre mot de passe</p>
      <form @submit.prevent="ask_reset" class="mt-4">
        <label for="email" class="block">Votre email</label>
        <input type="email" id="email" v-model="email" required class="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full">
        <button type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Envoyer</button>
      </form>
    </div>
    <p v-else class="mt-4">Un email de confirmation vous a été envoyé.</p>
  </div>
</template>