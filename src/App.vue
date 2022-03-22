<template>
  <div id="app">
    <Header/>
    <Artwork_content :image_url="object.webImage.url" :object_number="object.objectNumber" v-for="object in (art_objects)" :key="object.id"/>
    <button id="show_more" v-on:click="increment_page_number()">more</button>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Artwork_content from '@/components/Artwork_content.vue'
import {get_objects_from_API} from '@/services/api/request.js'


export default {
  name: 'App',
  components: {
    Header,
    Artwork_content,
    Footer
  },

  data(){
    return{
      objects: [],
      art_objects: [],
      indice: 0,
      page_number: 1
    }
  },

  methods:{
    async get_first_page_on_loading(){
      window.onload= await get_objects_from_API(this.page_number);
      this.objects= window.onload;
      this.art_objects = this.objects.artObjects;
      console.log(this.objects);
    },

    async get_next_page_product(){
      this.objects=await get_objects_from_API(this.page_number); 
      this.objects.artObjects.forEach(element => {
        this.art_objects.push(element)
      });
    },

    increment_page_number(){
      this.page_number++;
      this.get_next_page_product();
    }
  },

  //Au chargement de la page je charge mes images
  beforeMount(){
    this.get_first_page_on_loading();
  }
}


</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: rgb(17, 17, 17);
}



html{
  overflow-x: hidden;
}

#show_more{
  position : relative;
  z-index: 2;
}

</style>
