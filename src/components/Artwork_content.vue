<template>
    <div id="content" >
        <div id="description">
            <h1>{{this.detail.artObject.title}}</h1>
            <h2>{{this.detail.artObject.principalMaker}}, {{this.detail.artObject.dating.presentingDate}}</h2>
            <p> {{this.description}}</p>
        </div>
        <div id="image">
            <img id="artwork" :src="image_url" alt="test" />
        </div>
    </div>
</template>

<script>
import {get_description_from_api} from '@/services/api/request.js'

export default {
    name: 'Artwork_content',

    data(){
        return{
        detail: [],
        description: ""
        }
    },

    props: {
        image_url : {type : String, required: true},
        object_number: {type : String, required: true}
    },

    methods :{

        /*API issue, to get english desscription we have to look if it exist
        If not, the dutch description is, in fact, in english*/
        async get_description(){
            this.detail=await get_description_from_api(this.object_number);
                this.description = this.detail.artObject.description;
        },
    },

    created(){
    this.get_description();
  }
}


</script>


<style scoped>


#content{
display: flex;
justify-content: space-between;
padding-inline: 110px;
background-color: rgb(17, 17, 17);
color : #f1f0f0;
font-size: 12px;
padding-top: 160px;
padding-bottom: 40px;
}

#description{
    width: 400px;
    color : #f1f0f0;
    text-align: left;
}

#image{
    height: 400px;
    width: 600px;
}

#artwork{
    max-height: 400px;
    max-width: 600px;
    object-position: center;
}

h1{
    font-size: 24px;
}

h2{
    font-size: 21px;
}

p{
    font-size: 18px;
}


</style>