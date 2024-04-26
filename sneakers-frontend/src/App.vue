<script>
import { RouterLink, RouterView, useRouter } from "vue-router";
import router from "./router/index.js";

export default {
  setup() {
    const route = useRouter();
  },
  data() {
    return {
      path: this.$route.path,
      user_token: "",
      user_name: ""
    };
  },
  methods: {
    logout() {
      sessionStorage.clear();
      // Navigate to the home route
      this.$router.push('/');
    }
  },
  created() {
    router.afterEach(() => {
      this.path=this.$route.path;
      this.user_token=sessionStorage.getItem("user_token");
      this.user_name=sessionStorage.getItem("user_name");
    })
  }
}
</script>

<template>
  <header class="bg-gray-200 py-4">
    <nav class="container mx-auto flex items-center justify-between">
      <router-link to="/" class="text-blue-500 hover:underline">Accueil</router-link>
      <menu v-if="user_token" class="ml-4">
        <router-link to="/wishlist" class="text-blue-500 hover:underline">Ma liste de souhaits</router-link>
        <router-link to="/collection" class="ml-4 text-blue-500 hover:underline">Ma collection</router-link>
      </menu>
      <div v-if="user_token === null">
        <router-link to="/auth/login" class="text-blue-500 hover:underline">Connexion</router-link>
      </div>
      <div v-if="user_token" class="ml-auto flex items-center">
        <p class="mr-4">Bonjour {{ user_name }}</p>
        <button v-if="path !== '/profil'" @click="$router.push('/profil')" class="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Modifier mon profil</button>
        <button @click="logout" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Déconnexion</button>
      </div>
    </nav>
  </header>
  <RouterView/>
  <hr class="my-4">
  <footer class="bg-gray-200 py-4">
    <div class="container mx-auto text-center">
      <p>Conçu par Théotime Berthod</p>
    </div>
  </footer>
</template>