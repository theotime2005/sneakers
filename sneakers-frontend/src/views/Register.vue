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
  text-align: center; /* Center align the heading */
}

p {
  /* Define styles for paragraphs */
  color: #555;
  margin-top: 10px;
  text-align: center; /* Center align the paragraph */
}

form {
  /* Define styles for the form */
  max-width: 400px; /* Limit the form width for better readability */
  margin-left: auto;
  margin-right: auto;
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
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

p.success {
  /* Define styles for success paragraphs */
  color: #28a745; /* Bootstrap's green color for success */
  margin-top: 10px;
  text-align: center; /* Center align the success message */
}

button {
  /* Define styles for buttons */
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff; /* Bootstrap's blue color for primary */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s; /* Add a smooth transition effect */
}

button:hover {
  /* Define styles for button on hover */
  background-color: #0056b3; /* Darker shade of blue on hover */
}

/* Add any additional styles as needed */
</style>
