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
        const my_request = await fetch("http://localhost:3000/api/wishlist", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("user_token")}`
          }
        });
        if (my_request.status===200) {
          const response = await my_request.json();
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
            'Content-Type': 'application/json',
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
    this.get_sneakers()
    if (this.sneakerWishList.length>0) {
    }
  }
}
</script>

<template>
  <h1>Ma liste de souhaits de sneakers</h1>
  <a :href="'mailto:?subject=Ma liste de souhaits&body='+mailContent" @click="make_email_content">Partager par mail</a>
  <p>Ici vous pouvez ressenser les sneakers que vous souhaiteriez avoir.</p>
  <div class="container">
    <ul v-if="sneakerWishList && sneakerWishList.length>0" v-for="sneaker in sneakerWishList" :key="sneaker.id">
      <li><router-link :to="'/sneaker/'+sneaker.id">{{sneaker.attributes.name}}</router-link>
        <img :src="sneaker.attributes.image.small">

        <button @click="delete_sneaker(sneaker.id)">Retirer de ma liste de souhait</button>
        <button @click="past_to_collection(sneaker.id)">Basculer le sneaker dans ma collection</button>
      </li>
    </ul>
    <p v-else>Aucun sneaker dans la liste de souhait!!!</p>
  </div>
</template>

<style scoped>
/* Add your custom styles here */

h1 {
  /* Define styles for heading 1 */
  color: #333;
}

a {
  /* Define styles for mailto link */
  padding: 10px;
  background-color: #007bff; /* Bootstrap's blue color for primary */
  color: #fff;
  text-decoration: none;
  display: inline-block;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
}

a:hover {
  /* Define styles for mailto link on hover */
  background-color: #0056b3; /* Darker shade of blue on hover */
}

p {
  /* Define styles for paragraphs */
  color: #555;
  margin-top: 10px;
}

.container {
  /* Define styles for the container */
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
}

ul {
  /* Define styles for unordered lists */
  list-style: none;
  padding: 0;
}

li {
  /* Define styles for list items */
  margin-bottom: 20px;
}

router-link {
  /* Define styles for router links in list items */
  color: #007bff; /* Blue color for links */
  text-decoration: none;
  margin-right: 10px;
}

img {
  /* Define styles for images in list items */
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}

button {
  /* Define styles for buttons in list items */
  padding: 8px;
  margin-top: 10px;
  margin-right: 10px;
  background-color: #dc3545; /* Bootstrap's red color for danger */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  /* Define styles for button on hover */
  background-color: #c82333; /* Darker shade of red on hover */
}

/* Add any additional styles as needed */
</style>
