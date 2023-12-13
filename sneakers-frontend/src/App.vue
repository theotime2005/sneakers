<script>
import { RouterLink, RouterView } from "vue-router";
import router from "./router/index.js";

export default {
  data() {
    return {
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
      this.user_token=sessionStorage.getItem("user_token");
      this.user_name=sessionStorage.getItem("user_name");
    })
  }
}
</script>

<template>
  <header>
    <nav>
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
      <button @click="logout">Déconnexion</button>
    </div>
  </header>
  <router-view/>
  <hr>
  <footer>
    <p>Conçu par Théotime Berthod</p>
  </footer>
</template>
