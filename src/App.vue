<template>
  <div id="app">
    <Header :search.sync="search" :artwork_sort_type.sync="artwork_sort_type"/>
    <Artwork_content 
      v-for="object in artwork_organized_data" 
      :image_url="object.webImage.url" 
      :object_number="object.objectNumber"  
      :key="object.id"/>
    <button id="show_more" v-if="this.is_more" v-on:click="increment_page_number()">more</button>
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
      search: localStorage.getItem("search") || "",
      artwork_sort_type: localStorage.getItem("artwork_sort_type") || "AZName",
      is_found: true,
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
      this.change_is_found(data.length)
			return data
		}
	},

  methods:{
    async get_first_page_on_loading(){
      window.onload= await get_objects_from_API(this.page_number);
      this.objects= window.onload;
      this.art_objects = this.objects.artObjects;
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

    change_is_found(data_length){
      if(data_length==0){
        this.is_found=false;
      }else{
        this.is_found=true;
      }
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
