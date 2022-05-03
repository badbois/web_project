<template>
  <div id="app">
    <Header :search.sync="search" :artwork_sort_type.sync="artwork_sort_type"/>
    <div v-if="!loaded" id="loader_box">
      <div id="loader"></div>
    </div>
    <div v-else-if="data_empty" id="no_artwork">
      <h2 id="text_no_artwork"> Geen kunstwerk gevonden </h2>
    </div>
    <Artwork_content v-else
      v-for="object in artwork_organized_data" 
      :image_url="object.webImage.url" 
      :object_number="object.objectNumber"  
      :key="object.id"/>
    <div v-if="loaded && !search" id="div_show_more">
      <button  id="show_more" v-on:click="increment_page_number()">more</button>
    </div>
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
      page_number: 1,
      search: "",
      loaded: false,
      artwork_sort_type: localStorage.getItem("artwork_sort_type") || "AZName",
    }
  },

  computed: {

		artwork_organized_data: function() {
			const reversed = ["ZAName"].includes(this.artwork_sort_type)
      const filter_func = (a) => a.title.toLowerCase().includes(this.search.toLowerCase())
			const comparator = (a, b) => a.title.localeCompare(b.title) 
			let data = this.art_objects.filter(filter_func)
			data = data.sort(comparator)
			if (reversed) data = data.reverse()
      return data
		},

    data_empty: function() {
      let data=this.artwork_organized_data
      return (data.length==0) ? true : false
    }
	},

  methods:{
    async get_first_page_on_loading(){
      window.onload= await get_objects_from_API(this.page_number);
      this.objects= window.onload;
      this.art_objects = this.objects.artObjects;
      this.loaded=true;
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
    },



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
  height: 100vh;
}

html{
  overflow-x: hidden;
}

#div_show_more{
  display: flex;
  justify-content: center;
  background-color: rgb(17, 17, 17);
  position : relative;
  padding-bottom: 20px;
}

#show_more{
  z-index: 2;
}

#loader_box, #no_artwork{
  /* padding-top: 160px;
  padding-bottom: 40px; */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#loader {
  color: #f1f0f0;
  font-size: 20px;
  margin: 100px auto;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load4 1.5s infinite linear;
  animation: load4 1.5s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}

#text_no_artwork{
  color: #f1f0f0
}


@-webkit-keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}
@keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}


</style>
