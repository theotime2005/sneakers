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
  <div>
    <RouterLink to="/" class="text-blue-500 hover:underline">Retour à la liste</RouterLink>
    <div class="container" v-if="Object.keys(informations).length >= 1">
      <h1 class="text-2xl font-bold">{{ informations.attributes.name }} par {{ informations.attributes.brand }}</h1>
      <img :src="informations.attributes.image.small" alt="L'image originale des sneakers" class="my-4">
      <h2 class="text-lg font-bold">Informations générales</h2>
      <ul class="list-disc pl-4 mt-2">
        <li>Fabricant: {{ informations.attributes.brand }}</li>
        <li>Genre: {{ informations.attributes.gender }}</li>
        <li>Prix estimé: {{ informations.attributes.estimatedMarketValue }}€</li>
      </ul>
      <h2 class="text-lg font-bold mt-4">Liens</h2>
      <ul class="list-disc pl-4 mt-2">
        <li v-for="(value, key) in informations.attributes.links" :key="key"><a :href="value" target="_blank" class="text-blue-500 hover:underline">{{ key }}</a></li>
      </ul>
    </div>
  </div>
</template>