<template>
    <div id="content" >
        <div id="description">
            <h1>{{title}}</h1>
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
        title: {type : String, required: true},
        object_number: {type : String, required: true}
    },

    methods :{

        async get_description(){
            this.detail=await get_description_from_api(this.object_number);
            // description en dutch
            //this.description = this.detail.artObject.label.description
            if(this.detail.artObject.plaqueDescriptionEnglish == null){
                this.description = this.detail.artObject.plaqueDescriptionDutch;
            }else{
                this.description = this.detail.artObject.plaqueDescriptionEnglish;
            }
            
           // console.log(this.detail) 
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
padding-top: 200px;
}

#description{
    height: 400px;
    width: 400px;
    /* background-color: hotpink; */
    color : #f1f0f0;
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

p{
    font-size: 18px;
}


</style>