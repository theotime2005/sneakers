<script>
import {RouterLink} from "vue-router";

export default {
  data() {
    return {
      sneakerWishList: []
    };
  },
  methods: {
    async get_sneakers() {
      try {
        const my_request = await fetch("http://localhost:3000/api/wishlist", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("user_token")}`
          }
        });
        if (my_request.status===403) {
          this.sneakerWishList=[];
          return;
        } else if (my_request.status===200) {
          const response = await my_request.json();
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
          this.sneakerWishList.push(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async delete_sneaker(id) {
      const my_request = await fetch("http://localhost:3000/api/wishlist/"+id, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer '+sessionStorage.getItem("user_token")
        }
      });
      if (my_request.status===200) {
        this.get_sneakers();
      }
    },
    async past_to_collection(id) {
      const request_body = {
        sneaker_id: id
      }
      try {
        const my_request = await fetch("http://localhost:3000/api/collection", {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer '+sessionStorage.getItem("user_token")
          },
          body: JSON.stringify(request_body)
        });
        if (my_request.status===200) {
          this.get_sneakers();
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.get_sneakers()
  }
}
</script>

<template>
  <h1>Ma liste de souhaits de sneakers</h1>
  <p>Ici vous pouvez ressenser les sneakers que vous souhaiteriez avoir.</p>
  <div class="container">
    <ul v-if="sneakerWishList && sneakerWishList.length>0" v-for="sneaker in sneakerWishList" :key="sneaker.id">
      <li><router-link :to="'/sneaker/'+sneaker.id">{{sneaker.attributes.name}}</router-link>
        <button @click="delete_sneaker(sneaker.id)">Retirer de ma liste de souhait</button>
        <button @click="past_to_collection(sneaker.id)">Basculer le sneaker dans ma collection</button>
      </li>
    </ul>
    <p v-else>Aucun sneaker dans la liste de souhait!!!</p>
  </div>
</template>

<style scoped>

</style>