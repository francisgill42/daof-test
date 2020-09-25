<template>
 <v-container fluid>
   <v-layout wrap>
<v-flex xs12>
      <blockquote class="headline text-center blockquote">
          <!-- <strong>CONGRATULATIONS!</strong> -->
          <!-- <aiw /> -->

            <div class="mt-2">
                <blockquote> 
                  {{thanks_msg}}
                    <br>
                    <br>
                   <span class="red--text"> (this is a dummy message and banner)</span>
                </blockquote>

                
                </div>
      </blockquote>
 <v-layout align-center justify-center>
     <v-img max-height="250" src="@/assets/add_image.jpeg" aspect-ratio="1.7" contain></v-img>
  </v-layout>      
</v-flex>

   </v-layout>
  </v-container>

</template>
<script>
//import aiw from '../components/AIW';
export default {
//components: { aiw },
 computed: {
    thanks_msg() {
      return this.$store.state.thanks_msg;
   }
   },  
data () {
return { 

qq: '',
}
},
mounted(){

},
methods:{
  check:function(){
    this.$emit('get_q',this.qq);
    console.log(this.qq);
  }
}
}
</script>
