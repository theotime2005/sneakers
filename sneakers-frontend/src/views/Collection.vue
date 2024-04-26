<script>
import {RouterLink} from "vue-router";

export default {
  data() {
    return {
      sneakersCollection: []
    };
  },
  methods: {
    async get_sneakers() {
      this.sneakersCollection=[];
      try {
        const request = await fetch("http://localhost:3000/api/collection", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("user_token")}`
          }
        });
        if (request.status===200) {
          const response = await request.json();
          if (response.total===200) {
            return;
          }
          for (let element of response.data) {
            this.fetch_sneaker(element.sneaker_id);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetch_sneaker(id) {
      const basic_url = "http://54.37.12.181:1337/api/sneakers/";
      try {
        const request = await fetch(basic_url+id);
        if (request.status===200) {
          const response = await request.json();
          this.sneakersCollection.push(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async delete_sneaker(id) {
      const request = await fetch("http://localhost:3000/api/collection/"+id, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer '+sessionStorage.getItem("user_token")
        }
      });
      if (request.status===200) {
        this.get_sneakers();
      }
    }
  },
  mounted() {
    document.title="Ma collection |  Le site des sneakers";
    this.get_sneakers()
  }
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold">Ma collection de sneakers</h1>
    <p class="mt-4">Ici vous pouvez recenser les sneakers que vous possédez déjà.</p>
    <div class="container mt-8">
      <ul v-if="sneakersCollection && sneakersCollection.length > 0">
        <li v-for="sneaker in sneakersCollection" :key="sneaker.id" class="flex items-center justify-between border-b border-gray-300 py-2">
          <router-link :to="'/sneaker/'+sneaker.id" class="text-blue-500">{{ sneaker.attributes.name }}</router-link>
          <button @click="delete_sneaker(sneaker.id)" class="px-4 py-2 bg-red-500 text-white rounded-md">Retirer de ma collection</button>
        </li>
      </ul>
      <p v-else class="no-sneakers-message mt-4">Aucun sneaker dans la collection !!!</p>
    </div>
  </div>
</template>