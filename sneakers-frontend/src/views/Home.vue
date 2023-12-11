<script>
import {RouterLink} from "vue-router";
export default {
  data() {
    return {
      page: 1,
      page_size: 25,
      page_number: 0,
      sneakerList: [],
      searchBar: "",
    };
  },
  methods: {
    async load_sneakers(page = 1) {
      this.sneakerList=[];
      if (typeof page==="number") {
        this.page = page;
      }
      else {
        console.log("page", page);
      }
      const url_to_fetch = `http://54.37.12.181:1337/api/sneakers?pagination[page]=${page}&pagination[pageSize]=${this.page_size}`;
      try {
        const request = await fetch(url_to_fetch);
        if (request.status === 200) {
          const response = await request.json();
          const sneakers = response.data; // Access the 'data' property of the response
          if (sneakers) {
            if (this.searchBar.length>0) {
              sneakers.forEach(sneaker => { // Use 'forEach' instead of 'map'
                if (sneaker.attributes.name === this.searchBar) { // Fix the comparison operator
                  this.sneakerList.push(sneaker);
                }
              });
            } else {
              this.sneakerList = sneakers;
            }
            this.page_number = response.meta.pagination.pageCount;
          }
        }
      } catch (error) {
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
        <img :src="sneaker.attributes.image.ssmall" alt="Une image des sneakers">
        <router-link :to="'/sneaker/'+sneaker.id">Voir plus</router-link>
      </div>
      <p v-if="sneakerList && sneakerList.length===0">Aucun résultat</p>
      <hr>
      <h1>Pagination actuellement sur la page {{page}}</h1>
      <div class="page-navigation">
        <a v-if="page>1" href="#" @click="load_sneakers(page-1)">Précédent ←</a>
        <a v-for="pageNumber in Math.min(page_number, page+3)" :key="pageNumber" href="#" @click="load_sneakers(pageNumber)">{{ pageNumber }}</a>
        <a v-if="page<page_number" href="#" @click="load_sneakers(page+1)">Suivant →</a>
      </div>
    </div>

    <input type="number" v-model="page_size" aria-label="Sneakers par pages">
    <button @click="load_sneakers(page_size)">Raffaîchir</button>
  </div>
</template>

<style scoped>

</style>
