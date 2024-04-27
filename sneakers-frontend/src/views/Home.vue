<script>
import {RouterLink} from "vue-router";

export default {
  data() {
    return {
      user_token: sessionStorage.getItem("user_token"),
      page: 1,
      page_size: 25,
      page_number: 0,
      sneakerList: [],
      searchBar: "",
      inCollection: [],
      inWishList: []
    };
  },
  methods: {
    async load_sneakers(page = 1) {
      this.sneakerList = [];
      if (typeof page === "number") {
        this.page = page;
      } else {
        console.log("page", page);
      }
      const url_to_fetch = `http://54.37.12.181:1337/api/sneakers?pagination[page]=${page}&pagination[pageSize]=${this.page_size}`;
      try {
        const request = await fetch(url_to_fetch);
        if (request.status === 200) {
          const response = await request.json();
          const sneakers = response.data; // Access the 'data' property of the response
          if (sneakers) {
            if (this.searchBar.length > 0) {
              sneakers.forEach(sneaker => {
                if (sneaker.attributes.name.toUpperCase().includes(this.searchBar.toUpperCase())) {
                  this.sneakerList.push(sneaker);
                }
              });
            } else {
              this.sneakerList = sneakers;
            }
            this.page_number = response.meta.pagination.pageCount;
            if (sessionStorage.getItem("user_token")) {
              this.get_collection();
              this.get_wishList();
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    async get_collection() {
      try {
        const request = await fetch("http://localhost:3000/api/collection", {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("user_token")
          }
        });
        if (request.status === 200) {
          const response = await request.json();
          if (response.total>0) {
            this.inCollection = response.data;
          }
        }
      } catch (error) {
        console.error(error);
      }
    }, // end
    async get_wishList() {
      try {
        const request = await fetch("http://localhost:3000/api/wishlist", {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("user_token")
          }
        });
        if (request.status === 200) {
          const response = await request.json();
          if (response.total>0) {
            this.inWishList = response.data;
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    check_is(id) {
      for (let element of this.inCollection) {
        if (element.sneaker_id === id) {
          return "collection";
        }
      }
      for (let element of this.inWishList) {
        if (element.sneaker_id === id) {
          return "wishlist";
        }
      }
      return false;
    },
    async add_to(id, where) {
      const request_body = {
        "sneaker_id": id
      };
      try {
        const request = await fetch("http://localhost:3000/api/" + where, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("user_token")
          },
          body: JSON.stringify(request_body)
        });
        if (request.status === 200) {
          this.load_sneakers();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async delete_to(id, where) {
      try {
        const request = await fetch("http://localhost:3000/api/"+where+"/"+id, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer '+sessionStorage.getItem("user_token")
          }
        });
        if (request.status===200) {
          this.load_sneakers();
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    document.title="Accueil | Le site des sneakers";
    this.load_sneakers();
  }
};
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Le site des sneakers</h1>
    <p class="mb-2">Imaginez-vous un endroit où sont recensées toutes (ou presque) les chaussures de type Sneakers.</p>
    <p class="mb-4">Vous devriez trouver votre bonheur ici!</p>

    <div class="searchBar mb-4">
      <input type="search" v-model="searchBar" aria-label="Rechercher des sneakers" class="border border-gray-300 px-4 py-2 rounded-md mr-2">
      <button @click="load_sneakers(page)" class="bg-blue-500 text-white px-4 py-2 rounded-md">Rechercher</button>
    </div>

    <div v-if="sneakerList && sneakerList.length > 0">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="sneaker in sneakerList" :key="sneaker.id" class="bg-white p-4 shadow-md rounded-md">
          <h2 class="text-xl font-semibold mb-2">{{ sneaker.attributes.name }}</h2>
          <img :src="sneaker.attributes.image.small" alt="Une image de la paire de sneakers" class="w-full h-auto mb-2">
          <router-link :to="'/sneaker/'+sneaker.id" class="text-blue-500">Voir plus</router-link>
          <div v-if="user_token" class="mt-2">
            <div v-if="!check_is(sneaker.id)">
              <button @click="add_to(sneaker.id, 'wishlist')" class="bg-green-500 text-white px-4 py-2 rounded-md mr-2">Ajouter à ma liste de souhaits</button>
              <button @click="add_to(sneaker.id, 'collection')" class="bg-blue-500 text-white px-4 py-2 rounded-md">Ajouter à ma collection</button>
            </div>
            <div v-else-if="check_is(sneaker.id)==='wishlist'" class="mt-2">
              <button @click="delete_to(sneaker.id, 'wishlist')" class="bg-red-500 text-white px-4 py-2 rounded-md mr-2">Supprimer de ma liste de souhaits</button>
              <button @click="add_to(sneaker.id, 'collection')" class="bg-blue-500 text-white px-4 py-2 rounded-md">Ajouter à ma collection</button>
            </div>
            <div v-else-if="check_is(sneaker.id)==='collection'" class="mt-2">
              <button @click="delete_to(sneaker.id, 'collection')" class="bg-red-500 text-white px-4 py-2 rounded-md">Supprimer de ma collection</button>
            </div>
          </div>
        </div>
      </div>
      <p class="mt-4">Pagination actuellement sur la page {{page}}</p>
      <div class="flex justify-between mt-4">
        <a v-if="page > 1" href="#" @click="load_sneakers(page - 1)" class="text-blue-500">&larr; Précédent</a>
        <div>
          <div v-for="pageNumber in Math.min(page_number, page + 3)">
            <a :key="pageNumber" href="#" @click="load_sneakers(pageNumber)" class="text-blue-500 mx-1">{{ pageNumber }}</a>
          </div>
        </div>
        <a v-if="page < page_number" href="#" @click="load_sneakers(page + 1)" class="text-blue-500">Suivant &rarr;</a>
      </div>
    </div>

    <div class="mt-4">
      <input type="number" v-model="page_size" aria-label="Sneakers par page" class="border border-gray-300 px-4 py-2 rounded-md mr-2">
      <button @click="load_sneakers(page_size)" class="bg-blue-500 text-white px-4 py-2 rounded-md">Rafraîchir</button>
    </div>
  </div>
</template>