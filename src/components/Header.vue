<template>
    <header>
        <nav>
            <h1 id="titre">Nom_du_site</h1>

            <div id="search_bar">
                <label for="artwork_sort"> Sort by : </label>
                <select :value="artwork_sort_type" @input="on_artwork_sort_type_changed" id="artwork_sort">
                    <option value="AZName">A-Z</option>
                    <option value="ZAName">Z-A</option>
                </select>
            </div>
        </nav>

    </header>
</template>

<script>
export default {
  name: 'Header',

  props:{
    artwork_sort_type : String, 
  },

  watch: {
    artwork_sort_type: function(new_artwork_sort_type) {
			localStorage.setItem("artwork_sort_type", new_artwork_sort_type)
		}
  },

  methods: {
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


</style>