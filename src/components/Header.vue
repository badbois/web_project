<template>
    <header>
        <nav>
            <h1 id="titre">Rijksmuseum</h1>

            <div id="search_bar">
              <div id="search">
                <button v-if="search" @click="cleanSearch">clear</button>
                <input type="text" :value="search" @input="on_search_changed" placeholder="Search by name">
              </div>
              <div id="sort">
                <label for="artwork_sort"> Sort by : </label>
                <select :value="artwork_sort_type" @input="on_artwork_sort_type_changed" id="artwork_sort">
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
    search : String,
    artwork_sort_type : String, 
  },

  watch: {
    search: function(new_search) {
			localStorage.setItem("search", new_search)
		},

    artwork_sort_type: function(new_artwork_sort_type) {
			localStorage.setItem("artwork_sort_type", new_artwork_sort_type)
		}
  },

  methods: {
    cleanSearch: function(){
      this.$emit('update:search', "")
    },

    on_search_changed: function(event){
      this.$emit('update:search', event.target.value)
    },

    on_artwork_sort_type_changed(event){
      this.$emit('update:artwork_sort_type', event.target.value) 
    }
  }
}
</script>


<style>


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


</style>