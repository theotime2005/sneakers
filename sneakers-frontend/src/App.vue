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
  <header>
    <nav class="flex items-start justify-items-start">
      <router-link to="/">Accueil</router-link>
      <menu v-if="user_token">
        <router-link to="/wishlist">Ma liste de souhaits</router-link>
        <router-link to="/collection">Ma collection</router-link>
      </menu>
    </nav>
    <div v-if="user_token===null">
      <router-link to="/auth/login">Connexion</router-link>
    </div>
    <div v-if="user_token">
      <p>Bonjour {{user_name}}</p>
      <button v-if="path!='/profil'" @click="$router.push('/profil')">Modifier mon profil</button>
      <button @click="logout">Déconnexion</button>
    </div>
  </header>
  <router-view/>
  <hr>
  <footer>
    <p>Conçu par Théotime Berthod</p>
  </footer>
</template>

<style scoped>
</style>
