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
  <h1>Vous avez oubliez votre mot de passe?</h1>
  <div v-if="!isClose">
    <p>Entrez votre email pour réinitialiser votre mot de passe</p>
    <form @submit.prevent="ask_reset">
      <label for="email">Votre email</label>
      <input type="email" id="email" v-model="email" required>
      <button type="submit">Envoyer</button>
    </form>
  </div>
  <p v-else>Un email de confirmation vous a été envoyé.</p>
</template>

<style scoped>

</style>