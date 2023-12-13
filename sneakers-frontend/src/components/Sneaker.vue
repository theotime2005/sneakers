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
/* Add your custom styles here */

.container {
  /* Define styles for the container */
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

h1 {
  /* Define styles for heading 1 */
  color: #333;
}

h2 {
  /* Define styles for heading 2 */
  color: #555;
  margin-top: 10px;
}

ul {
  /* Define styles for unordered lists */
  list-style: none;
  padding: 0;
}

li {
  /* Define styles for list items */
  margin-bottom: 8px;
}

a {
  /* Define styles for links */
  color: #007bff; /* Blue color for links */
  text-decoration: none;
}

a:hover {
  /* Define styles for links on hover */
  text-decoration: underline;
}

img {
  /* Define styles for images */
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}

/* Add any additional styles as needed */
</style>
