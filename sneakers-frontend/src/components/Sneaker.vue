<script>
import { useRouter } from "vue-router";
import {RouterLink} from "vue-router";

export default {
  setup() {
    const router = useRouter();
  },
  data() {
    return {
      informations: {}
    };
  },
  methods: {
    async get_sneaker_info() {
      const url_to_fetch = `http://54.37.12.181:1337/api/sneakers/${this.$route.params.id}`;
      try {
        const request = await fetch(url_to_fetch);
        if (request.status === 200) {
          const response = await request.json();
          this.informations = response.data;
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.get_sneaker_info()
  }
};
</script>

<template>
  <RouterLink to="/">Retour à la liste</RouterLink>
  <div class="container" v-if="Object.keys(informations).length>=1">
    <h1>{{ informations.attributes.name }} par {{informations.attributes.brand}}</h1>
    <img :src="informations.attributes.image.small" alt="L'image originale des sneakers">
    <h2>Information générales</h2>
    <ul>
      <li>Fabriquant: {{informations.attributes.brand}}</li>
      <li>Genre: {{informations.attributes.gender}}</li>
      <li>Prix estimé: {{informations.attributes.estimatedMarketValue}}</li>
    </ul>
    <h2>Liens</h2>
    <ul>
      <li v-for="(value, key) in informations.attributes.links"><a :href="value" target="_blank">{{key}}</a> </li>
    </ul>
  </div>
</template>

<style scoped>
/* Styles généraux */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa; /* Couleur de fond par défaut */
  color: #333; /* Couleur de texte par défaut */
}

/* Styles du lien de retour */
RouterLink {
  display: inline-block;
  margin-bottom: 20px;
  color: #007bff; /* Couleur du lien de retour */
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease; /* Animation de transition de couleur */
}

RouterLink:hover {
  color: #0056b3; /* Couleur au survol */

  /* Vous pouvez également ajouter une transition ici pour une animation plus fluide */
}

/* Styles du conteneur */
.container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Ombre légère */
}

/* Styles des titres */
h1 {
  color: #333;
  font-size: 24px; /* Taille de police légèrement plus grande */
}

h2 {
  color: #555;
  margin-top: 10px;
  font-size: 20px; /* Taille de police légèrement plus grande */
}

/* Styles des liens */
ul li a {
  color: #007bff; /* Couleur des liens */
  text-decoration: none;
}

ul li a:hover {
  text-decoration: underline;
}

/* Ajoutez d'autres styles au besoin */
</style>
