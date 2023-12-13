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
        const my_request = await fetch("http://localhost:3000/api/collection", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("user_token")}`
          }
        });
        if (my_request.status===200) {
          const response = await my_request.json();
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
        const my_request = await fetch(basic_url+id);
        if (my_request.status===200) {
          const response = await my_request.json();
          this.sneakersCollection.push(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async delete_sneaker(id) {
      const my_request = await fetch("http://localhost:3000/api/collection/"+id, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer '+sessionStorage.getItem("user_token")
        }
      });
      if (my_request.status===200) {
        this.get_sneakers();
      }
    }
  },
  mounted() {
    this.get_sneakers()
  }
}
</script>

<template>
  <h1>Ma collection de sneakers</h1>
  <p>Ici vous pouvez ressenser les sneakers que vous possédez déjà.</p>
  <div class="container">
    <ul v-if="sneakersCollection && sneakersCollection.length>0" v-for="sneaker in sneakersCollection" :key="sneaker.id">
      <li><router-link :to="'/sneaker/'+sneaker.id">{{sneaker.attributes.name}}</router-link>
        <button @click="delete_sneaker(sneaker.id)">Retirer de ma collection</button>
      </li>
    </ul>
    <p v-else>Aucun sneaker dans la collection!!!</p>
  </div>
</template>

<style scoped>

</style>