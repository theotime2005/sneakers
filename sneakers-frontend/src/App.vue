<script>
import {RouterLink, RouterView} from "vue-router";

export default {
  data() {
    return {
      user_token: sessionStorage.getItem("user_token")
    };
  }
}
</script>

<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <div v-if="user_token===null">
      <router-link to="/auth">Connexion</router-link>
    </div>
  </header>
  <router-view/>
  <hr>
  <footer>
    <p>Conçu par Théotime Berthod</p>
  </footer>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
