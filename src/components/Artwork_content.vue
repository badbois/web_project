<template>
    <div class="content" >
        <div class="description">
            <h1>{{this.title}}</h1>
            <h2>{{this.principal_maker}}, {{this.presenting_date}}</h2>
            <p> {{this.description}}</p>
        </div>
        <div class="image">
            <img class="artwork" :src="image_url" alt="test" />
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
        title: "",
        principal_maker: "",
        presenting_date: "",
        description: "",
        }
    },

    props: {
        image_url : {type : String, required: true},
        object_number: {type : String, required: true}
    },

    methods :{

        async get_description(){
            this.detail=await get_description_from_api(this.object_number);
            this.title=this.detail.artObject.title;
            this.principal_maker=this.detail.artObject.principalMaker;
            this.presenting_date=this.detail.artObject.dating.presentingDate;
            this.description = this.detail.artObject.description;
        },
    },

    created(){
    this.get_description();
  }
}


</script>


<style scoped>


.content{
display: flex;
justify-content: space-between;
padding-inline: 110px;
background-color: rgb(17, 17, 17);
color : #f1f0f0;
font-size: 12px;
padding-top: 160px;
padding-bottom: 40px;
}

.description{
    width: 400px;
    color : #f1f0f0;
    text-align: left;
}

.image{
    height: 400px;
    width: 600px;
}

.artwork{
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


@media only screen and (max-width: 1200px) {
  /* For Tablettes: */
   .content{
        flex-direction: column-reverse;
        align-items: center;
        padding-top: 120px;  
    }

    .description{
    width: 400px;
    }

    .image{
        height: fit-content;
        width: fit-content;
    }

    .artwork{
        max-height: 400px;
        max-width: 600px;
        object-position: center;
    }
}

@media only screen and (max-width: 700px) {
  /* For mobile phones: */
   .content{
        flex-direction: column-reverse;
        align-items: center;
        padding-top: 120px;  
    }

    .description{
    width: 300px;
    }

    .image{
        height: fit-content;
        width: fit-content;
    }

    .artwork{
        max-height: 200px;
        max-width: 300px;
        object-position: center;
    }

    h1{
        font-size: 18px;
    }

    h2{
        font-size: 16px;
    }

    p{
        font-size: 14px;
    }
}



</style>