<script>
import {RouterLink} from "vue-router";

export default {
  data() {
    return {
      sneakerWishList: [],
      mailContent: "Voici ma liste de souhaits: %0D%0A"
    };
  },
  methods: {
    async get_sneakers() {
      this.sneakerWishList=[];
      try {
        const request = await fetch("http://localhost:3000/api/wishlist", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("user_token")}`
          }
        });
        if (request.status===200) {
          const response = await request.json();
          if (response.total===0) {

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
          this.sneakerWishList.push(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async delete_sneaker(id) {
      const request = await fetch("http://localhost:3000/api/wishlist/"+id, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer '+sessionStorage.getItem("user_token")
        }
      });
      if (request.status===200) {
        this.get_sneakers();
      }
    },
    async past_to_collection(id) {
      const request_body = {
        sneaker_id: id
      }
      try {
        const request = await fetch("http://localhost:3000/api/collection", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("user_token")
          },
          body: JSON.stringify(request_body)
        });
        if (request.status===200) {
          this.get_sneakers();
        }
      } catch (error) {
        console.error(error);
      }
    },
    make_email_content() {
      // Function to constructe a simple document
      this.mailContent="Voici ma liste de souhaits: %0D%0A";
      for (let sneaker of this.sneakerWishList) {
        this.mailContent+=`${sneaker.attributes.name}: Environ ${sneaker.attributes.estimatedMarketValue}€`+"%0D%0A";
      }
    }
  },
  mounted() {
    document.title="Ma liste de souhait | Le site des sneakers";
    this.get_sneakers()
    if (this.sneakerWishList.length>0) {
    }
  }
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold">Ma liste de souhaits de sneakers</h1>
    <a :href="'mailto:?subject=Ma liste de souhaits&body=' + mailContent" @click="make_email_content" class="mt-4 block text-blue-500">Partager par mail</a>
    <p class="mt-4">Ici vous pouvez recenser les sneakers que vous souhaiteriez avoir.</p>
    <div class="container mt-8">
      <ul v-if="sneakerWishList && sneakerWishList.length > 0">
        <li v-for="sneaker in sneakerWishList" :key="sneaker.id" class="flex items-center justify-between border-b border-gray-300 py-2">
          <router-link :to="'/sneaker/'+sneaker.id" class="text-blue-500">{{ sneaker.attributes.name }}</router-link>
          <img :src="sneaker.attributes.image.small" alt="Image de la sneaker" class="w-24 h-24 object-cover rounded-md">
          <div>
            <button @click="delete_sneaker(sneaker.id)" class="px-4 py-2 bg-red-500 text-white rounded-md">Retirer de ma liste de souhaits</button>
            <button @click="past_to_collection(sneaker.id)" class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">Basculer le sneaker dans ma collection</button>
          </div>
        </li>
      </ul>
      <p v-else class="mt-4">Aucun sneaker dans la liste de souhaits !!!</p>
    </div>
  </div>
</template>