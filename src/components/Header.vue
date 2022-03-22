<template>
    <header>
        <nav>
            <h1 id="titre">Nom_du_site</h1>

            <div id="search_bar">
                <select name="type" id="type_select">
                    <option value="artist">artist</option>
                    <option value="artwork">artwork</option>
                </select>
                <input type="text" id="search_input" name="search_input">
                <button id="search_button" type="button">Search</button>
            </div>
        </nav>

    </header>
</template>

<script>
export default {
  name: 'Header'
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