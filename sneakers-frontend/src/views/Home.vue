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
                if (sneaker.attributes.name.toUpperCase() === this.searchBar.toUpperCase()) {
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
        const my_request = await fetch("http://localhost:3000/api/collection", {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("user_token")
          }
        });
        if (my_request.status === 200) {
          const response = await my_request.json();
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
        const my_request = await fetch("http://localhost:3000/api/wishlist", {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("user_token")
          }
        });
        if (my_request.status === 200) {
          const response = await my_request.json();
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
        const my_request = await fetch("http://localhost:3000/api/" + where, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("user_token")
          },
          body: JSON.stringify(request_body)
        });
        if (my_request.status === 200) {
          this.load_sneakers();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async delete_to(id, where) {
      try {
        const my_request = await fetch("http://localhost:3000/api/"+where+"/"+id, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer '+sessionStorage.getItem("user_token")
          }
        });
        if (my_request.status===200) {
          this.load_sneakers();
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.load_sneakers();
  }
};
</script>

<template>
  <div>
    <h1 class="">Le site des sneakers</h1>
    <p>Imaginez-vous un endroit où sont recensées toutes (ou presque) les chaussures de type Sneakers.</p>
    <p>Vous devriez trouver votre bonheur ici!</p>

    <div class="searchBar">
      <input type="search" v-model="searchBar" aria-label="Rechercher des sneaker">
      <button @click="load_sneakers(page)">Rechercher</button>
    </div>

    <div class="container" v-if="sneakerList && sneakerList.length > 0">
      <div class="card" v-for="sneaker in sneakerList" :key="sneaker.id">
        <h2>{{ sneaker.attributes.name }}</h2>
        <img :src="sneaker.attributes.image.small" alt="Une image de la paire de sneakers">
        <router-link :to="'/sneaker/'+sneaker.id">Voir plus</router-link>
        <div v-if="user_token">
          <div v-if="!check_is(sneaker.id)">
            <button @click="add_to(sneaker.id, 'wishlist')">Ajouter à ma liste de souhaits</button>
            <button @click="add_to(sneaker.id, 'collection')">Ajouter à ma collection</button>
          </div>
          <div v-else-if="check_is(sneaker.id)==='wishlist'">
            <button @click="delete_to(sneaker.id, 'wishlist')">Supprimer de ma liste de souhaits</button>
            <button @click="add_to(sneaker.id, 'collection')">Ajouter à ma collection</button>
          </div>
          <div v-else-if="check_is(sneaker.id)==='collection'">
            <button @click="delete_to(sneaker.id, 'collection')">Supprimer de ma collection</button>
          </div>
        </div>
      </div>
      <p v-if="sneakerList && sneakerList.length === 0">Aucun résultat</p>
      <hr>
      <h1>Pagination actuellement sur la page {{page}}</h1>
      <div class="page-navigation">
        <a v-if="page > 1" href="#" @click="load_sneakers(page - 1)">Précédent ←</a>
        <a v-for="pageNumber in Math.min(page_number, page + 3)" :key="pageNumber" href="#" @click="load_sneakers(pageNumber)">{{ pageNumber }}</a>
        <a v-if="page < page_number" href="#" @click="load_sneakers(page + 1)">Suivant →</a>
      </div>
    </div>

    <input type="number" v-model="page_size" aria-label="Sneakers par pages">
    <button @click="load_sneakers(page_size)">Raffaîchir</button>
  </div>
</template>

<style scoped>
/* Add your custom styles here */

h1 {
  /* Define styles for heading 1 */
  color: #333;
}

p {
  /* Define styles for paragraphs */
  color: #555;
}

.searchBar {
  /* Define styles for the search bar */
  margin: 20px 0;
  display: flex
; /* continuation of the previous styles */
  input {
    /* Define styles for the search input */
    flex-grow: 1;
    margin-right: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    /* Define styles for the search button */
    padding: 5px 10px;
    background-color: #007bff; /* Bootstrap's blue color for primary */
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    /* Define styles for button on hover */
    background-color: #0056b3; /* Darker shade of blue on hover */
  }
}

.container {
  /* Define styles for the container */
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.card {
  /* Define styles for the card */
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

h2 {
  /* Define styles for heading 2 in cards */
  color: #333;
}

img {
  /* Define styles for images in cards */
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}

router-link {
  /* Define styles for router links in cards /
  color: #007bff; / Blue color for links */
  text-decoration: none;
  margin-right: 10px;
}

button {
  /* Define styles for buttons in cards /
  padding: 5px 10px;
  margin-top: 10px;
  background-color: #28a745; / Bootstrap's green color for success */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  /* Define styles for button on hover /
  background-color: #218838; / Darker shade of green on hover */
}

.page-navigation {
  /* Define styles for page navigation */
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

a {
  /* Define styles for pagination links /
  padding: 5px 10px;
  background-color: #007bff; / Blue color for links */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
}

a:hover {
  /* Define styles for pagination links on hover /
  background-color: #0056b3; / Darker shade of blue on hover */
}

input[type="number"] {
  /* Define styles for the number input */
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

/* Add any additional styles as needed */
</style>