<template>
<v-container>
<v-form ref="form">

<v-container grid-list-xl>
    <v-layout wrap>

<v-flex xs12 md4>
<v-text-field class="red_class" v-model="name" :rules="GroupByRequired" label="Name (as per CNIC)" :value="Caps"></v-text-field>
</v-flex> 

<v-flex xs6 md4>
<v-text-field class="red_class" v-model="fathername" :rules="GroupByRequired" label="Father Name" :value="Caps"></v-text-field>
</v-flex>

<v-flex xs6 md4>
<v-text-field class="red_class" v-model="mothername" :rules="GroupByRequired" label="Mother Maiden Name" :value="Caps"></v-text-field>
</v-flex>

<v-flex xs6 md4 class="dob">
<v-text-field class="red_class" @keyup="add_dash" v-model="cnic" :rules="cnicRules" :counter="15" label="CNIC" placeholder="XXXXX-XXXXXXX-X">
</v-text-field>
</v-flex>

<v-flex xs6 md4 class="dob"> 
<v-menu v-model="menu2" :close-on-content-click="false" max-width="290">
   <template v-slot:activator="{ on }">
   <v-text-field
   style="font-size: 21px;"
   :value="formatted_date2"
   clearable
   :rules="GroupByRequired"
   placeholder="dd/mm/yyyy"
   label="CNIC Issue Date"
   readonly
   v-on="on"
   ></v-text-field>
   </template>
<v-date-picker
:max="today"
v-model="date2"
@change="menu2 = false"
></v-date-picker>
</v-menu>
</v-flex>

<v-flex xs12 md4 class="dob">
<v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
    <template v-slot:activator="{ on }">
    <v-text-field
    style="font-size: 21px;"
    :value="formatted_date1"
    :rules="(GroupByRequired)"
    clearable
    placeholder="dd/mm/yyyy"
    label="Date Of Birth"
    required
    readonly
    v-on="on"
    ></v-text-field>
    </template>
   <v-date-picker
   :max="today"
   v-model="date1"
   @change="menu1 = false"
   ></v-date-picker>
   </v-menu>
</v-flex>

 <v-flex xs6>
    <v-text-field v-model="cell" :rules="cellRules" type="number" label="Mobile Number"></v-text-field>
    </v-flex>

    <v-flex xs6>
    <v-text-field v-model="email" :rules="emailRules" label="E-mail" :value="Caps"></v-text-field>
    </v-flex>

    
    <v-flex xs6>

    <v-autocomplete
    @change="getCityByCountry('pob',pob_country)"  
    v-model="pob_country" 
    :items="countries" 
    :rules="GroupByRequired"
    required
    item-text="CNT_OFFICALNAME" item-value="CNT_COUNTRYCODE" single-line auto label="Country (Place of Birth)">
    </v-autocomplete>
    
    </v-flex>

    <v-flex xs6>
    <v-autocomplete
    v-model="pob_city" 
    :items="pob_cities_by_id" 
    :rules="GroupByRequired"
    required
    item-text="CTY_FULLNAME" 
    item-value="CTY_CITYCODE" 
    single-line auto label="City (Place of Birth)">
    </v-autocomplete>
    </v-flex>
   
    <v-flex xs12 md6>
    <v-autocomplete 
    v-model="occupation" 
    :items="occs" 
    item-text="GEN_NAME" item-value="GEN_ID" 
    :rules="GroupByRequired"
    single-line 
    auto 
    label="Occupation">
    </v-autocomplete>
    </v-flex>

    <v-flex xs12 md6>
    <v-autocomplete 
    v-model="education" 
    required 
    :items="education_list" 
    item-text="title" 
    item-value="title" 
    :rules="GroupByRequired"
    single-line 
    auto 
    label="Education">
    </v-autocomplete>
    </v-flex>

    <v-flex xs12>
    <div v-if="err" style="color: #ff1744 !important;">{{err}}</div>
    <v-btn class="primary" :loading="loading" @click="submit">Continue</v-btn>
    </v-flex>

    </v-layout>
</v-container>

</v-form>

<div class="error--text"></div>
</v-container>

</template>
<script>
import {EventBus} from '../main';
import axios from 'axios';
import moment from 'moment/src/moment'

export default {

computed:{


err(){
return this.$store.state.err;
},
loading() {
return this.$store.state.loading;
}, 
Caps () {

return {

"name" : this.name = this.name.toUpperCase(),
"fathername" : this.fathername = this.fathername.toUpperCase(),
"mothername" : this.mothername = this.mothername.toUpperCase(),
"email" : this.email = this.email.toUpperCase(),

}
}
,  
today(){
return moment(new Date()).format('YYYY-MM-DD');
},
formatted_date1 () {
return this.date1 ? moment(this.date1).format('DD/MM/YYYY') : ''
},
formatted_date2 () {
return this.date2 ? moment(this.date2).format('DD/MM/YYYY') : ''
},
},
data () {
return {

cities_arr : [
   {CTY_FULLNAME : 'Karachi', CTY_CITYCODE : '1'},
   {CTY_FULLNAME : 'Islamabad', CTY_CITYCODE : '1'},
   {CTY_FULLNAME : 'Lahore', CTY_CITYCODE : '1'},
   {CTY_FULLNAME : 'Rawalpindi', CTY_CITYCODE : '1'},
   {CTY_FULLNAME : 'Multan', CTY_CITYCODE : '1'},
   {CTY_FULLNAME : 'Peshawar', CTY_CITYCODE : '1'},
   {CTY_FULLNAME : 'Quetta', CTY_CITYCODE : '1'},
],

date1: '1988/09/27',

date2: '2018/11/12',

menu1: false,

menu2: false,

name: 'testing',

fathername: 'testing',

mothername: 'testing',

cnic:'42101-4079068-5',

issue_date:'',

dob:'',

pob:'',

cell:'03108559858',

email: 'francisgill1000@gmail.com',

occupation:'',

occs:[],

education : '',

pob_city:'',

pob_country:'',

pob_cities_by_id:[],

countries : [],

education_list:[

{id:1,title:'Undergraduate'},

{id:2,title:'Graduate'},

{id:3,title:'Postgraduate'},

{id:4,title:'Professional'}

],
channel: this.$route.params.user_id ? 'App' : 'Web',

user_id:this.$route.params.user_id || 0,

e1: 0,

value:'',

GroupByRequired : [
v => !!v || 'This field is required',
],

cnicRules: [
v => !!v || 'This field is required',
v => (v.length >= 15 && v.length <= 15) || 'CNIC must be equal to 15 characters',
],

emailRules: [ 
v => !!v || 'This field is required',
v => /.+@.+/.test(v) || 'E-mail must be valid',
],

cellRules: [
v => !!v || 'This field is required',  
v => (v.length <= 15) || 'Cell must be less than or equal to 15 characters',
],


}

},
   created(){
      this.getOccupation();
      this.getAverageAnnualIncome();
      this.getSourceOfIncome();
      this.getMaritalStatus();

      this.countries = [
         {CNT_OFFICALNAME:'Pakistan',CNT_COUNTRYCODE:`1|Pakistan`},
         {CNT_OFFICALNAME:'Other',CNT_COUNTRYCODE:`2|Other`},
      ];

   },
methods: {

getMaritalStatus (){
         this.marital_list = [
            {
            GEN_NAME : 'Single',
            GEN_ID : `1|Single`
            },
            {
            GEN_NAME : 'Married',
            GEN_ID : `2|Married`
            }
         ];
},

getSourceOfIncome(){
   this.sois = [
            {
            GEN_NAME : 'Salaries',
            GEN_ID : `1|Salaries`
            },
            {
            GEN_NAME : 'Business',
            GEN_ID : `2|Business`
            }
         ];
},
getAverageAnnualIncome(){

    this.average_annual_income_list = [
            {
            GEN_NAME : '100000',
            GEN_ID : `1|100000`
            },
            {
            GEN_NAME : '200000',
            GEN_ID : `2|200000`
            }
         ];

},

getOccupation(){
   this.occs = [
            {
            GEN_NAME : 'occupation 1',
            GEN_ID : `1|occupation 1`
            },
            {
            GEN_NAME : 'occupation 2',
            GEN_ID : `2|occupation 2`
            }
   ];
},
getCityByCountry(prefix,country){
  
var id = country.split('|')[0];

var fltr = this.cities_arr.filter(v => v.CTY_CITYCODE == id);

var arr = [];
     fltr.map((v => {
         arr.push({
            CTY_FULLNAME : v.CTY_FULLNAME,
            CTY_CITYCODE: `${v.CTY_CITYCODE}|${v.CTY_FULLNAME}`
         });
      }));



prefix == 'pob' ? this.pob_cities_by_id = arr : this.resi_cities_by_id = arr;

},

submit(){

let payload = {

name : this.name,

fathername : this.fathername,

mothername : this.mothername,

dob : this.date1,

cnic : this.cnic,

cnic_issue_date : this.date2,

pob_country :this.pob_country,

pob_city :this.pob_city,

email : this.email,

cell : this.cell,

occupation_id :this.occupation.split('|')[0],

occupation :this.occupation.split('|')[1],

education : this.education,

channel : this.channel,

user_id : this.user_id,

};

if( this.$refs.form.validate() ){

   window.scrollTo(0,0);
   this.$store.dispatch('move',2);
   let class_to_be_remove = document.getElementsByClassName('error--text')[0];
   class_to_be_remove.parentNode.removeChild(class_to_be_remove);

   this.$store.dispatch('hold_ci',payload);

}

else{
   setTimeout(() => { 
   window.scrollTo(0,document.getElementsByClassName('error--text')[0].offsetTop);
   },100);
}

},  

add_dash:function(event){
var value = this.cnic;
var arr = value.split('');
var arr1 = [];
for(var a in arr){
var reg = /['a-z']/g;
if(reg.test(arr[a])){
this.cnic = value.slice(0, -1);
}
else{
var dash1 = (value.length == 5) ? '-' : ''; 
var dash2 = (value.length == 13  ) ? '-' : '';
var filtered_cnic = value.slice(0,5) + dash1 + value.slice(5,14) + dash2 +value.slice(14,15);
this.cnic = filtered_cnic;
}

}

},

save (date) {
this.$refs.menu.save(date)
},

},
}
</script>

<style>
/* html {
scroll-behavior: smooth;
} */

.z_radio label{
margin-left:15px;
}

.dob label {
font-size: 20px;
}

.dob input {
font-size: 16px;
}

.cell label {
margin-left: 20px !important;
}

.email4zakat label,.courier label{
color:#000 !important;
}
 .upl_cer {
 margin-left:-60px!important;
 margin-top:-10px;

  }


@media only screen and (min-width: 1366px) {
   .upl_cer {
   margin-left: -45px!important;
   margin-top: -10px;
   }
}


@media only screen and (max-width: 1024px) {
   .upl_cer {
   margin-left: -23px!important;
   margin-top: -10px;
   }
}

@media only screen and (max-width: 800px) {
   .upl_cer {
   margin-left:-10px!important;
   margin-top:-10px;
   }

}

</style>