<script>
import { RouterLink, RouterView } from "vue-router";

export default {
  data() {
    return {
      tokenKey: "user_token",
      isAuthenticated: !!sessionStorage.getItem("user_token")
    };
  },
  methods: {
    logout() {
      // Clear the user_token from sessionStorage
      sessionStorage.removeItem(this.tokenKey);
      // Update the authentication store
      this.$store.commit('setAuthentication', false);
      // Navigate to the home route
      this.$router.push('/');
    }
  }
}
</script>

<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <div v-if="!$store.state.isAuthenticated">
      <router-link to="/auth">Connexion</router-link>
    </div>
    <div v-if="$store.state.isAuthenticated">
      <button @click="logout">Déconnexion</button>
    </div>
  </header>
  <router-view/>
  <hr>
  <footer>
    <p>Conçu par Théotime Berthod</p>
  </footer>
</template>
