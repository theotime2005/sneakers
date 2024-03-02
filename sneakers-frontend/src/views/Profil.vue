<script>
export default {
  name: "Profil",
  data() {
    return {
      username: "",
      email: "",
      basic_infos: {},
      previousPassword: "",
      newPassword: ""
    }
  },
  methods: {
    async load_profil() {
      try {
        const request = await fetch("http://localhost:3000/api/profil", {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer '+sessionStorage.getItem("user_token")
          }
        });
        if (request.status===200) {
          const response = await request.json();
          if (response) {
            this.basic_infos=response.data[0];
            this.username=this.basic_infos.username;
            this.email=this.basic_infos.email;
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    async updateProfil() {
      const request_option = {
        "username": this.username,
        "email": this.email
      }
      try {
        const request = await fetch("http://localhost:3000/api/profil", {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("user_token")
          },
          body: JSON.stringify(request_option)
        });
        if (request.status===200) {
          sessionStorage.setItem("user_name", this.username);
          this.$router.push('/');
        }
      } catch (error) {
        console.error(error);
      }
    },
    delete_profil() {
      const confirmation = window.confirm("Confirmez-vous la suppression de votre compte?");
      if (confirmation) {
        this.confirm_deletion()
      }
    },
    async confirm_deletion() {
      try {
        const request = await fetch("http://localhost:3000/api/profil", {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer '+sessionStorage.getItem("user_token")
          }
        });
        if (request.status===200) {
          sessionStorage.clear();
          this.$router.push('/');
        }
      } catch (error) {
        console.error(error);
      }
    },
    close_dialog() {
      this.$refs.myDialog.close();
      this.previousPassword="";
      this.newPassword="";
    },
    async change_password() {
      const request_body = {
        "previousPassword": this.previousPassword,
        "newPassword": this.newPassword
      }
      try {
        const request = await fetch("http://localhost:3000/api/profil/password", {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("user_token")
          },
          body: JSON.stringify(request_body)
        });
        if (request.status===200) {
          this.close_dialog();
        }
      } catch (error) {
        console.error("Une erreur s'est produite ", error);
      }
    }
  },
  mounted() {
    document.title="Mon profil | Le site des sneakers";
    this.load_profil();
  }
}
</script>

<template>
  <h1>Mon profile</h1>
  <router-link to="/">Retour à l'accueil</router-link>
  <form @submit.prevent="updateProfil">
    <label for="username">Nom d'utilisateur</label>
    <input type="text" required id="username" v-model="username">
    <label for="email">Email</label>
    <input type="email" required id="email" v-model="email">
    <button v-if="email!=basic_infos.email || username!=basic_infos.username" type="submit">Enregistrer les modifications</button>
  </form>
  <button @click="$refs.myDialog.showModal()">Modifier le mot de passe</button>
  <button @click="delete_profil">Supprimer mon compte</button>
  <dialog ref="myDialog">
    <form @submit.prevent="change_password">
      <label for="previous">Ancien mot de passe</label>
      <input type="password" required v-model="previousPassword" id="previous">
      <label for="new">Nouveau mot de passe</label>
      <input type="password" required v-model="newPassword" id="new">
      <button @click="close_dialog">Annuler</button>
      <button type="submit">Modifier</button>
    </form>
  </dialog>
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

dialog {
  /* Define styles for the dialog */
  max-width: 400px; /* Limit the dialog width */
  margin-left: auto;
  margin-right: auto;
}

dialog form {
  /* Define styles for the form inside the dialog */
  margin-top: 10px;
}

dialog label {
  /* Define styles for labels inside the dialog */
  margin-top: 10px;
}

dialog input {
  /* Define styles for text inputs inside the dialog */
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

dialog button {
  /* Define styles for buttons inside the dialog */
  width: 48%; /* Adjust the width as needed */
  margin-top: 10px;
}

/* Add any additional styles as needed */
</style>
