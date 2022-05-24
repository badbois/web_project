<template>
    <header>
        <nav>
            <h1 id="titre">Rijksmuseum</h1>

            <div id="search_bar">
              <div id="search">
                <button v-show="search" @click="cleanSearch">wissen</button>
                <input type="text" :value="search" @input="on_search_changed" placeholder="Zoek op naam">
              </div>
              <div id="sort">
                <label for="artwork_sort"> Sorteer op : </label>
                <select v-model="artwork_sort_type" @input="on_artwork_sort_type_changed" id="artwork_sort">
                    <option value="AZName">A-Z</option>
                    <option value="ZAName">Z-A</option>
                </select>
              </div>
            </div>
        </nav>

    </header>
</template>

<script>
export default {
  name: 'Header',

  props:{
    search : {type : String, required: true},
    artwork_sort_type : {type : String, required: true}, 
  },

  watch: {
    // Watch for changes in the search value and update the localstorage value
    artwork_sort_type: function(new_artwork_sort_type) {
			localStorage.setItem("artwork_sort_type", new_artwork_sort_type)
		}
  },

  methods: {
    cleanSearch: function(){
      this.$emit('update:search', "")
    },

    // When the search value changes, emit the new value
    on_search_changed: function(event){
      this.$emit('update:search', event.target.value)
    },

    // When the artwork_sort_type value changes, emit the new value
    on_artwork_sort_type_changed(event){
      this.$emit('update:artwork_sort_type', event.target.value) 
    }
  }
}
</script>


<style>

/* For computer*/
header{
background-color: rgb(46, 46, 46);
color : #f1f0f0;
position: fixed;
width: 100%;
}

nav{
padding-inline: 20px;
display: flex;
justify-content: space-between;
align-items: center;
}

#search_bar{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

input{
  margin-right: 10px;
}

button{
  margin-right: 10px;
}

select{
  background-color: #2E2E2E;
  border: none;
  color: #f1f0f0;
  text-align: right;
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */

  nav{
    height: 100%;
  }

  header{
     height: 40px;
  }  

  #search_bar{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  }

  #search{
    display: flex;
    flex-direction: row-reverse;
  }

  button{
    font-size: 12px;
    height: auto;
  }

  h1{
    display: none;
  }

  input{
    width: 90px;
    font-size: 12px;
  }

  label{
    font-size: 12px;
  }

  select{
    font-size: 12px;
    width: 50px;
    background-color: none;
  }
}


</style>