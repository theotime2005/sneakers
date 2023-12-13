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
/* Add your custom styles here */

header {
  /* Define styles for the header */
  background-color: #343a40; /* Bootstrap's dark background color */
  color: #fff; /* White text color */
  padding: 10px;
}

nav {
  /* Define styles for the navigation bar */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

router-link {
  /* Define styles for router links in the navigation bar */
  color: #fff; /* White text color */
  text-decoration: none;
  padding: 5px 10px;
}

menu {
  /* Define styles for the menu in the navigation bar */
  display: flex;
}

/* Hide the menu if the user is not logged in */
menu[v-if="user_token"] {
  display: flex;
}

p {
  /* Define styles for paragraphs */
  margin: 0;
  padding-right: 10px;
}

button {
  /* Define styles for buttons in the navigation bar */
  padding: 5px 10px;
  background-color: #dc3545; /* Bootstrap's red color for danger */
  color: #fff; /* White text color */
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  /* Define styles for button on hover */
  background-color: #c82333; /* Darker shade of red on hover */
}

hr {
  /* Define styles for horizontal rule */
  margin-top: 20px;
}

footer {
  /* Define styles for the footer */
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  background-color: #343a40; /* Bootstrap's dark background color */
  color: #fff; /* White text color */
}

/* Add any additional styles as needed */
</style>
