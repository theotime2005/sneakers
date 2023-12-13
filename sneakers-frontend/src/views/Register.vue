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
/* Add your custom styles here */

h1 {
  /* Define styles for heading 1 */
  color: #333;
}

p {
  /* Define styles for paragraphs */
  color: #555;
  margin-top: 10px;
}

form {
  /* Define styles for the form */
  margin-top: 20px;
}

label {
  /* Define styles for labels */
  display: block;
  margin-top: 10px;
  color: #555;
}

input {
  /* Define styles for text inputs */
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

p {
  /* Define styles for paragraphs */
  color: #007bff; /* Bootstrap's blue color for primary */
  margin-top: 10px;
}

button {
  /* Define styles for buttons */
  padding: 10px;
  background-color: #28a745; /* Bootstrap's green color for success */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  /* Define styles for button on hover */
  background-color: #218838; /* Darker shade of green on hover */
}

/* Add any additional styles as needed */
</style>
