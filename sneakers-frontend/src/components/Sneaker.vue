<script>
import { useRouter } from "vue-router";

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
          this.informations = response.data.attributes;
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
  <h1>{{ informations.name }}</h1>
  <img :src="informations.image.small" alt="L'image originale des sneakers">
  <ul>
    <li>Gender: {{ informations.gender }}</li>
    <li>Colorway: {{ informations.colorway }}</li>
  </ul>
</template>

<style scoped>

</style>
