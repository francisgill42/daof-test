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
    <v-img src="@/assets/banner-1.jpg" aspect-ratio="3.8"></v-img>
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
