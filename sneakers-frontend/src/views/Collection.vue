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
    <p v-else class="no-sneakers-message">Aucun sneaker dans la collection!!!</p>
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

.container {
  /* Define styles for the container */
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

ul {
  /* Define styles for unordered lists */
  list-style: none;
  padding: 0;
}

li {
  /* Define styles for list items */
  margin-bottom: 10px;
}

router-link {
  /* Define styles for router links */
  color: #007bff; /* Blue color for links */
  text-decoration: none;
  margin-right: 10px;
}

button {
  /* Define styles for buttons */
  padding: 5px 10px;
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

/* Style for the message when there are no sneakers in the collection */
.no-sneakers-message {
  color: #999;
  font-style: italic;
  margin-top: 10px;
}
</style>
