<template>
<v-container>
<v-form ref="form">

<v-container grid-list-xl>
    <v-layout wrap>
    
<v-flex xs12 md12>
<p v-if="Object.keys(userScore).length == 0 && userScore != ''">User does not have any score</p>
<b v-else>{{userScore ? 'User Score: ' + userScore.userScore  : '' }}</b>

</v-flex>

<v-flex xs12 md4>
<v-text-field class="red_class" v-model="name" :rules="GroupByRequired" label="Name (as per CNIC)" :value="Caps"></v-text-field>
</v-flex> 

<v-flex xs6 md4>
<v-text-field class="red_class" v-model="fathername" :rules="GroupByRequired" label="Father Name" :value="Caps"></v-text-field>
</v-flex>

<v-flex xs6 md4>
<v-text-field class="red_class" v-model="mothername" :rules="GroupByRequired" label="Mother Maiden Name" :value="Caps"></v-text-field>
</v-flex>

<v-flex xs6 md6 class="dob">
<v-text-field class="red_class" @change="getRating(cnic)" @keyup="add_dash" v-model="cnic" :rules="cnicRules" :counter="15" label="CNIC" placeholder="XXXXX-XXXXXXX-X">
</v-text-field>
</v-flex>

<v-flex xs6 md6 class="dob"> 
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

<v-flex xs12 class="dob">
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

    <v-flex xs12>
    <v-btn
    class="primary" 
    @click="onPick_cnic_attachment">
    {{(!cnic_attachment.name) ?  'UPLOAD CNIC ATTACHMENT' : cnic_attachment.name}}
    </v-btn>   
    <br>
    <span style="font-size:10pt;">( upload CNIC front page only )</span>


    <input required type="file" @change="check_cnic_attachment" style="display:none;" accept="image/*" 
    ref="cnic_attachmentInput">

    <div class="error--text" v-if="cnic_fileSize" style="color: #ff1744 !important;">file size should be less than 1MB</div>
    <div class="error--text" v-if="valid4cnic_attachment" style="color: #ff1744 !important;">Attachment is required</div>
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
    @change="get_city('pob')"  
    v-model="pob_city" 
    :items="pob_cities_by_id" 
    :rules="GroupByRequired"
    required
    item-text="CTY_FULLNAME" item-value="CTY_CITYCODE" single-line auto label="City (Place of Birth)"></v-autocomplete>
    </v-flex>
   

    <v-flex xs6>
    <v-text-field v-model="cell" :rules="cellRules" type="number" label="Mobile Number"></v-text-field>
    </v-flex>

    <v-flex xs6>
    <v-text-field v-model="email" :rules="emailRules" label="E-mail" :value="Caps"></v-text-field>
    </v-flex>

    <v-flex xs12 md12>
    <v-autocomplete v-model="occupation" :items="occs" item-text="title" item-value="title" 
    :rules="GroupByRequired"
    single-line 
    auto 
    label="Occupation">
    </v-autocomplete>
    </v-flex>

    <v-flex v-if="occupation == 'Other'" md12>
    <v-text-field v-model="other_occ" :rules="GroupByRequired" label="Please type your Occupation here" :value="Caps" required></v-text-field>
    </v-flex>

    <v-flex md12
    v-if="occupation == 'Govt. Employee' || occupation == 'Businessman' || occupation == 'Private Service' || occupation == 'Professional' ||
    occupation == 'Other'">
    <v-text-field v-model="occ_name" :rules="GroupByRequired" label="Please Type Business / JOB Category" :value="Caps" required></v-text-field>
    </v-flex>

    <v-flex md12 v-if="occupation == 'Govt. Employee' || occupation == 'Businessman' || occupation == 'Private Service' || occupation == 'Professional' ||
    occupation == 'Other'">
    <v-text-field v-model="designation" :rules="GroupByRequired" label="Designation" :value="Caps" required></v-text-field>
    </v-flex>

    <v-flex md12 v-if=" occupation == 'Govt. Employee' ||  occupation == 'Private Service' ||  occupation == 'Professional' || occupation == 'Other'" xs4>
    <v-text-field v-model="department" :rules="GroupByRequired" label="Department" :value="Caps" required></v-text-field>
    </v-flex>

    <v-flex md12 v-if="occupation == 'Govt. Employee' || occupation == 'Businessman' || occupation == 'Private Service' || occupation == 'Professional' || 
    occupation == 'Retired' || occupation == 'Other'">
    <v-text-field type="number" min="0" v-model="working_experience" :rules="GroupByRequired" label="Total Working Experience" :value="Caps" required>
    </v-text-field>
    </v-flex>

    <v-flex md12 v-if="occupation == 'Govt. Employee' || occupation == 'Businessman' || occupation == 'Private Service' || occupation == 'Professional' ||
    occupation == 'Other'">
    <v-text-field v-model="org_emp_bes_name" :rules="GroupByRequired" label="Organization/Employer/Business Name" :value="Caps" required></v-text-field>
    </v-flex>

    <v-flex md12 v-if="occupation == 'Businessman' || occupation == 'Other'">

    <v-text-field
    type="number"
    min="0"
    v-model="age_of_business"
    :rules="GroupByRequired"
    label="Age of Business in Years - For Business"
    :value="Caps"
    required
    ></v-text-field>
    </v-flex>

    <v-flex xs12>
    <v-autocomplete v-model="education" required :items="education_list" item-text="title" item-value="title" 
    :rules="GroupByRequired"
    single-line 
    auto 
    label="Education">
    </v-autocomplete>
    </v-flex>


    <v-flex xs12>
    <v-text-field
    v-if="education == 'Other'"
    v-model="other_education"
    :rules="GroupByRequired"
    label="Specify"
    :value="Caps"
    required
    ></v-text-field>
    </v-flex>

    <v-flex xs12>
    <v-radio-group v-model="marital_status"  row :rules="GroupByRequired">
    <label>Marital Status</label>
    <v-radio label="Single" value="Single" class="mx-3"></v-radio>
    <v-radio label="Married" value="Married" class="mx-3"></v-radio>

    </v-radio-group>
    </v-flex>

    <v-flex xs12>
    <v-text-field
    type="number"
    min="0"
    v-model="no_of_dependants"
    :rules="GroupByRequired"
    label="No. of Dependants"
    :value="Caps"
    required
    ></v-text-field>
    </v-flex>

    <v-flex xs12 md12>
    <v-radio-group v-model="public_figure"  row :rules="GroupByRequired">
    <label>Public Figure</label>
    <br>
    <v-radio label="No" value="no" class="mx-3 r_label"></v-radio>
    
    <v-radio class="mx-3 r_label" label="Yes" value="yes"></v-radio>
    </v-radio-group>
    <v-label>(includes Senior Goverment Officials, Senior Office Bearers of Public Sector Entities, Politicians)</v-label>
    </v-flex>

    <v-flex xs12>
    <v-radio-group v-model="refused_account_by_institute"  row :rules="GroupByRequired">
    <label>Has any Financial Institution ever refused to open your account?</label>
    <v-radio label="No" value="no" class="mx-3"></v-radio>
    <v-radio label="Yes" value="yes" class="mx-3"></v-radio>
    </v-radio-group>
    </v-flex>
    <v-flex xs12>
    <v-text-field
    v-if="refused_account_by_institute == 'yes'"
    :rules="GroupByRequired"
    label="Specify here"
    v-model="other_refused_account_by_institute"
    :value="Caps"
    required
    ></v-text-field>
    </v-flex>


    <v-flex xs12>
    <v-radio-group v-model="high_value_item"  row :rules="GroupByRequired">
    <label>Do you deal in high value items such as precious metal and real estate?</label>
    <v-radio label="No" value="no" class="mx-3"></v-radio>
    <v-radio label="Yes" value="yes" class="mx-3"></v-radio>

    </v-radio-group>
    </v-flex>
    <v-flex xs12>
    <v-text-field
    v-if="high_value_item == 'yes'"
    :rules="GroupByRequired"
    label="Specify here"
    :value="Caps"
    v-model="other_high_value_item"
    required
    ></v-text-field>
    </v-flex>

    <v-flex xs12 md6>
    <v-btn raised width="100%" class="primary mt-2" @click="onPick_soi_attachment">{{(!soi_attachment.name) ?  'Upload Source of Income / Funds Attachment' : soi_attachment.name}}</v-btn>   
    <input required type="file" @change="check_soi_attachment" style="display:none;" accept="image/*" ref="soi_attachmentInput">
    <div class="error--text" v-if="soi_fileSize" style="color: #ff1744 !important;">file size should be less than 1MB</div>
    <div class="error--text" v-if="valid4soi_attachment == true" style="color: #ff1744 !important;">Attachment is required</div>
    </v-flex>

    <v-flex xs6 md6>
    <v-autocomplete v-model="average_annual_income" required :items="average_annual_income_list" item-text="title" item-value="title" 
    :rules="GroupByRequired"
    single-line 
    auto 
    label="Average Annual Income">
    </v-autocomplete>
    </v-flex>


    <v-flex xs6 md6>
    <v-autocomplete v-model="soi" required :items="sois" item-text="title" item-value="title" 
    :rules="GroupByRequired"
    single-line 
    auto 
    label="Source of Income / Funds ">
    </v-autocomplete>
    </v-flex>





    <v-flex v-if="soi == 'Other'" xs12 md12>
    <v-text-field

    v-model="other_soi"
    :rules="GroupByRequired"
    label="Please type your Source of Income here"
    :value="Caps"
    required
    ></v-text-field>
    </v-flex>


    <v-flex xs6>

    <v-autocomplete
    @change="getCityByCountry('resi',resi_country)"  
    v-model="resi_country" 
    :items="countries" 
    :rules="GroupByRequired"
    required
    item-text="CNT_OFFICALNAME" item-value="CNT_COUNTRYCODE" single-line auto label="Country (Residence)"></v-autocomplete>
    </v-flex>

    <v-flex xs6>
    <v-autocomplete  
    @change="get_city('res')"  
    v-model="resi_city" 
    :items="resi_cities_by_id" 
    :rules="GroupByRequired"
    required
    item-text="CTY_FULLNAME" item-value="CTY_CITYCODE" single-line auto label="City (Residence)"></v-autocomplete>
    </v-flex>

    <v-flex xs12>
    <v-textarea
    :value="Caps"
    v-model="address"
    :rules="addressRules"
    :counter="150"
    label="Address"
    required
    ></v-textarea>
    </v-flex>

    <v-flex xs12>
    <v-radio-group v-model="zakat" @change="change_zk_options" :rules="GroupByRequired" row>
    <label>Zakat Deduction: {{zakat}}</label> <label class="mx-2">(If No please attach affidavit CZ-50)</label>
    <v-radio class="mx-3"  label="No" value="no"></v-radio>
    <v-radio label="Yes" value="yes"></v-radio>
    </v-radio-group>
    </v-flex>

     <div v-if="zakat == 'no'">
      
    
    <v-radio-group @change="get_zi" v-model="zakat_options" :rules="GroupByRequired" row>
    <v-flex xs1>
    <v-radio  value="file"></v-radio>
   </v-flex>

   <v-flex class="upl_cer">
       <v-btn raised class="primary mt-1" @click="onPick_zkt_attachment">{{(!zakat_certificate.name) ?  'Upload Certificate' : zakat_certificate.name}}</v-btn>   
   <input type="file" @change="check_zakat_certificate" style="display:none;" accept="image/*" ref="zkt_attachmentInput">
  
   </v-flex>
   

    <v-flex xs12 class="z_radio">
    <v-radio label="E-mail us at: info@hblasset.com" value="email"></v-radio>
    </v-flex>
    <v-flex xs12 class="z_radio">
    <v-radio  label="Courier us at: 7th Floor, Emerald Tower, G-19, Block 5, Main Clifton Road, Clifton, Karachi" value="courier"></v-radio>
    </v-flex>
    </v-radio-group>
    
    <div 
    class="error--text" 
    v-if="zk_fileSize" 
    style="color: #ff1744 !important;">
    file size should be less than 1MB
    </div>
      <div 
      class="error--text" v-if="valid4zakat_certificate && zakat_options == 'file'" style="color: #ff1744 !important;">
      Attachment is required
      </div>

    </div>

    <v-flex md12>
    <label class="mb-3">Are you resident / national of : </label>
    <v-radio-group v-model="qq" required :rules="GroupByRequired">
    <v-radio name="qq"  label="PAKISTAN ONLY" value="pk"></v-radio>
    <v-radio name="qq"  label="USA" value="us"></v-radio>
    <v-radio name="qq"  label="OTHER THAN USA & PAKISTAN" value="o"></v-radio>
    </v-radio-group>

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
"other_occ" : this.other_occ = this.other_occ.toUpperCase(),
"occ_name" :this.occ_name = this.occ_name.toUpperCase(),
"designation" : this.designation = this.designation.toUpperCase(), 
"department" : this.department = this.department.toUpperCase(),   
"org_emp_bes_name"  : this.org_emp_bes_name = this.org_emp_bes_name.toUpperCase(),
"no_of_dependants" : this.no_of_dependants = this.no_of_dependants.replace(/\D+/g, ''), 
"working_experience" : this.working_experience = this.working_experience.replace(/\D+/g, ''),  
"age_of_business" : this.age_of_business = this.age_of_business.replace(/\D+/g, ''),
"other_education" : this.other_education = this.other_education.toUpperCase(),
"other_refused_account_by_institute" : this.other_refused_account_by_institute = this.other_refused_account_by_institute.toUpperCase(),
"other_high_value_item" : this.other_high_value_item = this.other_high_value_item.toUpperCase(),
"other_soi" : this.other_soi = this.other_soi.toUpperCase(),
"address" : this.address = this.address.toUpperCase(),

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
//col: 12,

date1: '',

date2: '',

menu1: false,

menu2: false,

name: '',

channel:(!this.$route.params.user_id) ? 'Web' : 'SA',

user_id:this.$route.params.user_id || 0,

fathername: '',

mothername: '',

dob:'',

cnic:'',

cnic_fileSize:false,

soi_fileSize:false,

zk_fileSize:false,

valid4cnic_attachment:'',
cnic_attachment:{
name:''
},

issue_date:'',

pob:'',

email: '',

cell:'',

occupation:'',

occs:[
   {id:1,title:'Govt. Employee'},

   {id:2,title:'Businessman'},

   {id:3,title:'Private Service'},

   {id:4,title:'Housewife'},

   {id:5,title:'Student'},

   {id:6,title:'Retired'},

   {id:7,title:'Professional'},

   {id:8,title:'Other'},
],

occ_name:'',

other_occ:'',

designation : '',

department : '',

org_emp_bes_name : '',

working_experience : '',

age_of_business : '',

education : '',

other_education : '',

marital_status : '',

no_of_dependants : '',

public_figure : '',

average_annual_income : '',

average_annual_income_list:[
{id:1,title:'Less than 250k'},

{id:2,title:'250-500k'},

{id:3,title:'500k-1mn'},

{id:4,title:'1-10mn'},

{id:5,title:'10mn-100mn'},

{id:6,title:'Above 100mn'},
],

refused_account_by_institute : '',

other_refused_account_by_institute : '',

high_value_item : '',

other_high_value_item : '',


soi:'',

valid4soi_attachment:'',

soi_attachment:{

name:''

},

other_soi:'',

address:'',

pob_city:'',

pob_country:'',

resi_city:'',

resi_country:'',

pob_cities_by_id:[],

resi_cities_by_id:[],

countries : [],

zakat:'',

zakat_options:'',

valid4zakat_certificate:'',

zakat_certificate:{
name:''
},

qq:'',

education_list:[

{id:1,title:'Undergraduate'},

{id:2,title:'Graduate'},

{id:3,title:'Postgraduate'},

{id:4,title:'Professional'},

{id:5,title:'Other'},
],

sois:[

{id:1,title:'Salary'},

{id:2,title:'Self-Owned'},

{id:3,title:'Home Remittance'},

{id:4,title:'Inheritance'},

{id:5,title:'Stock/Investment'},

{id:6,title:'Other'},
],

e1: 0,

value:'',

email4zakat:'info@hblasset.com',

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

addressRules: [
v => !!v || 'This field is required',
v => v.length <= 150 || 'Address must be less than 15 characters',
],
userScore : '',

}

},
   created(){
      let xmls=`<?xml version="1.0" encoding="utf-8"?>
      <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
      <GetCountry xmlns="http://tempuri.org/" />
      </soap12:Body>
      </soap12:Envelope>`;

      axios.post('https://daofservice.hblasset.com/DigitalAccountOpenTillVerify.asmx?op=GetCountry',
      xmls,
      {headers:
      {'Content-Type': 'text/xml'}
      }).then(res=>{

      var parser = new DOMParser();
      var r = parser.parseFromString(res.data,'application/xml');

      var countries = JSON.parse(r.getElementsByTagName('GetCountryResult')[0].textContent).Table;

      countries.map((v => {
         
         var payload = {
            CNT_OFFICALNAME : v.CNT_OFFICALNAME,
            CNT_COUNTRYCODE : `${v.CNT_COUNTRYCODE}|${v.CNT_OFFICALNAME}`
            };
            this.countries.push(payload);

      }))


      }).catch(err=>{console.log(err)});

   },
methods: {

getRating(v){
   
      axios.get(this.$store.state.base_url + 'getRating/' + v.split('-').join(''))
            .then((res) => this.userScore = res.data)
            .catch(err => console.log(err));

},

get_city(prefix) {
   console.log(this.pob_city,prefix)
},

   
getCityByCountry(prefix,country){
let xmls1=`<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
<soap12:Body>
<getCityCodeByCountryID xmlns="http://tempuri.org/">
<CountryCode>${country.split('|')[0]}</CountryCode>
</getCityCodeByCountryID>
</soap12:Body>
</soap12:Envelope>`;

axios.post('https://daofservice.hblasset.com/DigitalAccountOpenTillVerify.asmx?op=getCityCodeByCountryID',
xmls1,
{headers:
{'Content-Type': 'text/xml'}
}).then(res=>{

var parser = new DOMParser();
var r = parser.parseFromString(res.data,'application/xml');
var d = JSON.parse(r.getElementsByTagName('getCityCodeByCountryIDResult')[0].textContent).Table;
var arr = [];
     d.map((v => {
         arr.push({
            CTY_FULLNAME : v.CTY_FULLNAME,
            CTY_CITYCODE: `${v.CTY_CITYCODE}|${v.CTY_FULLNAME}`
         });
      }));

      prefix == 'pob' ? this.pob_cities_by_id = arr : this.resi_cities_by_id = arr;

}).catch(err=>{console.log(err)});

},

change_zk_options (){
   if(this.zakat == 'yes') {
      this.zakat_options = ''
      this.zakat_certificate = {name:''}
   }   
},   
get_zi(){
   this.zakat_options == 'file' ? this.zakat_certificate.name : this.zakat_certificate = 'UPLOAD CERTIFICATE' 
},
createImage(file) {
var image = new Image();
var reader = new FileReader();
var vm = this;

reader.onload = (e) => {
vm.image = e.target.result;
};
reader.readAsDataURL(file);
},
removeImage: function (e) {
this.image = '';
},

onPick_cnic_attachment () { 
this.$refs.cnic_attachmentInput.click() 
},

check_cnic_attachment(e) {

this.cnic_attachment = e.target.files[0] || '';

this.cnic_fileSize = this.cnic_attachment.size > 1000000 ? true : false

this.valid4cnic_attachment = (this.cnic_attachment) ? false : true 


},

onPick_soi_attachment () { 
this.$refs.soi_attachmentInput.click() 
},

check_soi_attachment(e) { 

this.soi_attachment = e.target.files[0] || '';

this.soi_fileSize = this.soi_attachment.size > 1000000 ? true : false

this.valid4soi_attachment = (this.soi_attachment) ? false : true 

},

onPick_zkt_attachment () { 
this.$refs.zkt_attachmentInput.click() 
},

check_zakat_certificate(e){ 

this.zakat_certificate = e.target.files[0] || '';

this.zk_fileSize = this.zakat_certificate.size > 1000000 ? true : false

this.valid4zakat_certificate = (this.zakat_certificate) ? false : true

},

submit(){

let payload = {

name : this.name,

fathername : this.fathername,

mothername : this.mothername,

dob : this.date1,

cnic : this.cnic,

cnic_attachment : this.cnic_attachment,

cnic_issue_date : this.date2,

pob_country : this.pob_country,

pob_city : this.pob_city,

email : this.email,

cell : this.cell,

occupation : (this.other_occ == '') ? this.occupation : this.other_occ,

occ_name : this.occ_name,

designation:this.designation, 

department:this.department,   

org_emp_bes_name:this.org_emp_bes_name,

working_experience:this.working_experience,  

age_of_business:this.age_of_business,

education : (this.other_education == '') ? this.education : this.other_education,

marital_status:this.marital_status,

no_of_dependants:this.no_of_dependants,

public_figure:this.public_figure,

average_annual_income:this.average_annual_income,

refused_account_by_institute:(this.refused_account_by_institute == 'yes') ? this.other_refused_account_by_institute : this.refused_account_by_institute,

high_value_item:(this.high_value_item == 'yes') ? this.other_high_value_item : this.high_value_item,

soi : (this.other_soi == '') ? this.soi : this.other_soi,

address : this.address,

country1 : this.resi_country,

city1 : this.resi_city,

zakat : this.zakat,

zakat_options : (this.zakat == 'yes') ? '' : this.zakat_options,

zakat_certificate : (this.zakat == 'no') ? this.zakat_certificate : '',

soi_attachment : this.soi_attachment,

qq : this.qq,

channel : this.channel,

user_id : this.user_id,

};



const date = new Date()

let condition_year = date.getFullYear() - 18
let selected_year = parseInt(this.date1.split("-")[0])
payload.under_age = (selected_year <= condition_year) ? false : true ;
this.$store.dispatch('hold_ci',payload);


// For testing

// if(this.$store.state.auto_fill){
//    if(payload.qq != 'pk'){
//      this.$store.dispatch('save_form');
//   }
//   else{
//     this.$store.dispatch('move',2);
//   }  
// }


// For testing end


if(this.cnic_attachment.name == ''){ this.valid4cnic_attachment = true; }

if(this.soi_attachment.name == ''){ this.valid4soi_attachment = true; }

if(this.zakat_certificate.name == '' && this.zakat_options == 'file'){
   this.valid4zakat_certificate = true;
}

else{ this.valid4zakat_certificate = false; }



if(!this.$store.state.auto_fill
&& this.$refs.form.validate() 
&& !this.valid4cnic_attachment
&& !this.valid4soi_attachment 
&& !this.valid4zakat_certificate
){
if(payload.qq != 'pk' || payload.under_age == true){
this.$store.dispatch('save_form');
}
else{
window.scrollTo(0,0);
this.$store.dispatch('move',2);
let class_to_be_remove = document.getElementsByClassName('error--text')[0];
class_to_be_remove.parentNode.removeChild(class_to_be_remove);
}  
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