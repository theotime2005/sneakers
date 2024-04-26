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
  <div>
    <h1 class="text-3xl font-bold">Mon profil</h1>
    <router-link to="/" class="text-blue-500 mt-4 block">Retour à l'accueil</router-link>
    <form @submit.prevent="updateProfil" class="mt-8">
      <label for="username" class="block">Nom d'utilisateur</label>
      <input type="text" required id="username" v-model="username" class="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full">
      <label for="email" class="block mt-4">Email</label>
      <input type="email" required id="email" v-model="email" class="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full">
      <button v-if="email!=basic_infos.email || username!=basic_infos.username" type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Enregistrer les modifications</button>
    </form>
    <button @click="$refs.myDialog.showModal()" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Modifier le mot de passe</button>
    <button @click="delete_profil" class="mt-4 px-4 py-2 bg-red-500 text-white rounded-md">Supprimer mon compte</button>
    <dialog ref="myDialog" class="mt-8">
      <form @submit.prevent="change_password" class="mt-4">
        <label for="previous" class="block">Ancien mot de passe</label>
        <input type="password" required v-model="previousPassword" id="previous" class="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full">
        <label for="new" class="block mt-4">Nouveau mot de passe</label>
        <input type="password" required v-model="newPassword" id="new" class="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full">
        <div class="mt-4 flex justify-end">
          <button @click="close_dialog" class="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Annuler</button>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Modifier</button>
        </div>
      </form>
    </dialog>
  </div>
</template>