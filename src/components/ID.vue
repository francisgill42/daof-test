<template>
<v-container class="bd">
<v-form ref="form">
<v-container grid-list-xl>
<v-layout wrap>

<v-flex xs12 md4>
<v-btn raised width="100%" class="primary mt-2" @click="cnic_onPickFile">
       {{(!cnic_attachment.name) ?  'CNIC' : cnic_attachment.name}}
</v-btn>   
<input required type="file" @change="cnic_checkFile" style="display:none;" accept="image/*" ref="cnic_fileInput">
<div class="error--text" v-if="cnic_fileSize" style="color: #ff1744 !important;">file size should be less than 1MB</div>
</v-flex>

<v-flex xs12 md4>
<v-btn raised width="100%" class="primary mt-2" @click="soi_onPickFile">
       {{(!soi_attachment.name) ?  'Source of Income' : soi_attachment.name}}
</v-btn>   
<input required type="file" @change="soi_checkFile" style="display:none;" accept="image/*" ref="soi_fileInput">
<div class="error--text" v-if="soi_fileSize" style="color: #ff1744 !important;">file size should be less than 1MB</div>
</v-flex>

<v-flex xs12 md4>
<v-btn raised width="100%" class="primary mt-2" @click="zkt_onPickFile">
       {{(!zkt_attachment.name) ?  'Zakat Certificate' : zkt_attachment.name}}
</v-btn>   
<input required type="file" @change="zkt_checkFile" style="display:none;" accept="image/*" ref="zkt_fileInput">
<div class="error--text" v-if="zkt_fileSize" style="color: #ff1744 !important;">file size should be less than 1MB</div>
<!-- <div class="error--text" v-if="zkt_valid" style="color: #ff1744 !important;">Attachment is required</div> -->
</v-flex>

<br>
<br>
<v-flex xs12>
<v-btn class="primary" :loading="loading" @click="submit">Continue</v-btn>
&nbsp;
<v-btn class="info" @click="back" text>Back</v-btn>
</v-flex>




</v-layout>
</v-container>
</v-form>
</v-container>
</template>
<script>

import axios from 'axios'

export default {

 computed: {
    loading() {
      return this.$store.state.loading;
   }
   },

data () {
return {
cnic_fileSize:false,
cnic_attachment : { name:'', },

soi_fileSize:false,
soi_attachment : { name:'', },

zkt_fileSize:false,
zkt_attachment : { name:'', },

customer_id:'',

}
},
watch: {
menu (val) {
  val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
},
},
created(){},

methods: {

back() {  
  this.$store.dispatch('move',1) 
},
cnic_onPickFile() { 
  this.$refs.cnic_fileInput.click() 
},
cnic_checkFile(e) { 

this.cnic_attachment = e.target.files[0] || '';

this.cnic_fileSize = this.cnic_attachment.size > 1000000 ? true : false

// this.cnic_valid = (this.cnic_attachment) ? false : true

},



soi_onPickFile() { 
  this.$refs.soi_fileInput.click() 
},
soi_checkFile(e) { 

this.soi_attachment = e.target.files[0] || '';

this.soi_fileSize = this.soi_attachment.size > 1000000 ? true : false

// this.soi_valid = (this.soi_attachment) ? false : true

},


zkt_onPickFile() { 
  this.$refs.zkt_fileInput.click() 
},
zkt_checkFile(e) { 

this.zkt_attachment = e.target.files[0] || '';

this.zkt_fileSize = this.zkt_attachment.size > 1000000 ? true : false

// this.zkt_valid = (this.zkt_attachment) ? false : true

},


submit(){

  if( this.$refs.form.validate() ){

  var attachments = {
  cnic_attachment : this.cnic_attachment, 
  soi_attachment : this.soi_attachment,
  zkt_attachment : this.zkt_attachment
};
 this.$store.dispatch('save_form',attachments); 
  //this.$store.dispatch('move',3);
  }
}
},      
save (date) { this.$refs.menu.save(date) },

}

</script>