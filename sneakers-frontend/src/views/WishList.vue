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
/* Styles généraux */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa; /* Couleur de fond par défaut */
}

/* Styles du lien de messagerie */
a {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  display: inline-block;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
}

a:hover {
  background-color: #0056b3;
}

/* Styles de la liste de souhaits */
h1 {
  color: #333;
}

.container {
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

router-link {
  color: #007bff;
  text-decoration: none;
  margin-right: 10px;
}

img {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}

/* Styles des boutons */
button {
  padding: 8px;
  margin-top: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  filter: brightness(90%); /* Légère réduction de la luminosité au survol */
}

/* Ajoutez d'autres styles au besoin */
</style>
