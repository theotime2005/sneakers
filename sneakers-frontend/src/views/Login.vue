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
    <p class="bg-red-400" v-if="message.length>0">{{message}}</p>
    <button type="submit">Se connecter</button>
    <hr>
    <p>Pas de compte?</p>
    <button @click="$router.push('/auth/register')">Créer un compte</button>
  </form>
</template>

<style scoped>
/* Add your custom styles here */

h1 {
  /* Define styles for heading 1 */
  color: #333;
  text-align: center; /* Center align the heading */
}

form {
  /* Define styles for the form */
  margin-top: 20px;
  max-width: 400px; /* Limit the form width for better readability */
  margin-left: auto;
  margin-right: auto;
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

p {
  /* Define styles for paragraphs */
  color: #dc3545; /* Bootstrap's red color for danger */
  margin-top: 10px;
}

button {
  /* Define styles for buttons */
  width: 100%;
  padding: 10px;
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

hr {
  /* Define styles for horizontal rule */
  margin-top: 20px;
}

button.create-account-btn {
  /* Specific styles for the "Create Account" button */
  background-color: #28a745; /* Bootstrap's green color for success */
}

/* Add any additional styles as needed */
</style>
