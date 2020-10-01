<template>
<v-container class="bd">
<v-form ref="form">
<v-container grid-list-xl>
<v-layout wrap>

<v-flex xs12 md12>
<h2>Bank Details</h2>
</v-flex>

<v-flex xs12 md6>
<v-autocomplete @change="get_branches(bankname1)" :rules="bankRules" v-model="bankname1" :items="banks" item-text="BNK_SHORTNAME" item-value="BNK_ID" single-line auto label="Bank Name"></v-autocomplete>
</v-flex>


<v-flex xs12 md6>
<v-autocomplete :rules="branchRules" v-model="branchname" :items="branches" item-text="BBR_NAME" item-value="BBR_ID" single-line auto label="Branch Name"></v-autocomplete>
</v-flex>

<v-flex xs12 md6>
<v-text-field :rules="accounttitlteRules" :value="Caps"  v-model="accounttitle" label="Account Title" required></v-text-field>
</v-flex>

<v-flex xs12 md6>
<v-text-field :value="Caps" v-model="iban" @keyup="restrict_iban" :rules="ibanRules" :counter="24" label="IBAN Number" required></v-text-field>
</v-flex>

<v-flex xs12 md12>
<h2 class="mb-3">Investment Details</h2>
<strong>Please Note: Minimum Initial Investment is Rs. 1,000/-</strong>
</v-flex>

<v-flex md12>
<v-autocomplete 
v-model="fundname" 
:items="funds" 
item-text="fundname" 
item-value="fundname" 
single-line 
auto 
:rules="fundnameRules"
label="Name of Fund"
>
</v-autocomplete>
</v-flex>
<v-flex xs12 md4>
<v-text-field :rules="amountRules" v-model="amount" @keyup="amount_to_word" label="Amount" required></v-text-field>
</v-flex>

<v-flex xs12 md8>
<v-text-field readonly v-model="aiw" :value="aiw" label="Amount In Words" required></v-text-field>
</v-flex>

<v-flex xs6>
<v-autocomplete :rules="paymentmodeRules" v-model="paymentmode" :items="paymentmodes" item-text="pm" item-value="pm" single-line auto label="Payment Mode"></v-autocomplete>
</v-flex>
<v-flex xs6>
<v-text-field v-model="front_end_load"  readonly :value="front_end_load" label="Front End Load" required></v-text-field>
</v-flex>

<v-flex xs12 md4>
<v-btn raised width="100%" class="primary mt-2" @click="onPickFile">
       {{(!attachment.name) ?  'Upload Instrument Copy' : attachment.name}}
</v-btn>   
<input required type="file" @change="checkFile" style="display:none;" accept="image/*" ref="fileInput">
<div class="error--text" v-if="inv_fileSize" style="color: #ff1744 !important;">file size should be less than 1MB</div>
<div class="error--text" v-if="valid" style="color: #ff1744 !important;">Attachment is required</div>
</v-flex>

<v-flex xs12>
<v-autocomplete :rules="bankname1Rules" v-model="bankname" :items="banks" item-text="BNK_SHORTNAME" item-value="BNK_ID" single-line auto label="Bank Name"></v-autocomplete>
</v-flex>

<v-flex xs12>
<v-text-field :value="Caps" :rules="instrumentRules"  v-model="instrument" label="Instrument Number" required></v-text-field>
</v-flex>


<v-flex xs12 md12>
<h2>Other Instructions/Information</h2>
</v-flex>

<v-flex xs12 md6>
<v-autocomplete 
:rules="Account_Statement_FrequencyRules" 
v-model="asf" 
:items="Account_Statement_Frequency" 
item-text="asf" 
item-value="asf" 
single-line 
auto 
label="Frequency of Account Statement"
>
</v-autocomplete>
</v-flex>

<v-flex xs12 md6>
<v-autocomplete 
@change="get_dpo"
:rules="Dividend_Pay_OutRules" 
v-model="dpo" 
:items="Dividend_Pay_Out" 
item-text="dpo" 
item-value="dpo" 
single-line 
auto 
label="Dividend pay-out"
>
</v-autocomplete>
</v-flex>

      <v-flex>
                     
      <strong class="float-left mt-4">Type Of Units:</strong>
      <v-checkbox
      :disabled="disabled"
      class="px-3 mt-3"
      v-model="type_of_units"
      label="Growth"
      value="growth"
      :rules="type_of_unitsRules"
      ></v-checkbox> 
      </v-flex>  


<v-flex xs12 md12>
<h2 class="mb-3">FATCA Checklist</h2>
<strong >For Individual Account Holders</strong>
<p class="mt-3">*if any of the below is selected as "YES" then kindly provide country specific supporting documents with details</p>

</v-flex>
<v-card-text>

<v-container grid-list-xl>
<v-layout wrap>
<v-container fluid>
<v-flex>
<!-- <v-btn class="primary" @click="submit">Continue</v-btn> -->
<h2>Do you have Multiple Nationalities/Passports?</h2>
<v-radio-group class="display-5" v-model="multiple_nat">
<v-radio label="Yes" value="yes"></v-radio>
<v-radio label="No" value="no"></v-radio>
</v-radio-group>
<v-layout v-if="multiple_nat == 'yes'" row>
<v-flex xs12 md4>
<v-text-field v-model="nat1" label="Nationality 1"></v-text-field>
</v-flex>
<v-flex xs12 md4>
<v-text-field v-model="nat2" label="Nationality 2"></v-text-field>
</v-flex>
<v-flex xs12 md4>
<v-text-field v-model="nat3" label="Nationality 3"></v-text-field>
</v-flex>
</v-layout>
</v-flex>



<v-flex>
<h2>Do you currently hold US green card or US Permanent Residency?</h2>
<v-radio-group class="display-5" @change="check_conflict" v-model="green_card">
<v-radio label="Yes" value="yes"></v-radio>
<v-radio label="No" value="no"></v-radio>
</v-radio-group>
</v-flex>

<v-flex>
<h2>Are you a Tax Resident in the US?</h2>
<v-radio-group class="display-5" @change="check_conflict" v-model="tax_resi">
<v-radio label="Yes" value="yes"></v-radio>
<v-radio label="No" value="no"></v-radio>
</v-radio-group>
</v-flex>

<v-flex>
<h2>Overseas/Care-of mailing address & Phone No</h2>
<v-layout row>
<v-flex xs12 md6>
<v-text-field :value="Caps" v-model="co_ma" placeholder="type address here"></v-text-field>
</v-flex>
<v-flex xs12 md6>
<v-text-field type="number" v-model="co_mp" placeholder="type phone here"></v-text-field>
</v-flex>
</v-layout>

</v-flex>

<v-flex>
<h2>Have you renounced your foreign citizenship or residency?</h2>
<v-radio-group class="display-5" v-model="for_citi">
<v-radio label="Yes" value="yes"></v-radio>
<v-radio label="No" value="no"></v-radio>
</v-radio-group>
</v-flex>

<v-flex>
<h2 class="mb-3">Have you given Power of Attorney to any Person residency overseas?</h2>
<strong>Please provide Attorney's Address (in case of yes)</strong>
<v-radio-group class="display-5" v-model="attor">
<v-radio label="Yes" value="yes"></v-radio>
<v-radio label="No" value="no"></v-radio>
</v-radio-group>
<v-text-field :rules="attor_attrRules" v-model="attor_addr" v-if="attor == 'yes'" placeholder="type address here"></v-text-field>
</v-flex>

<v-flex>
<h2 class="mb-3">Have you given any standing instruction to transfer funds to an account in US?</h2>
<v-radio-group class="display-5" v-model="trans_fund">
<v-radio label="Yes" value="yes"></v-radio>
<v-radio label="No" value="no"></v-radio>
</v-radio-group>
</v-flex>

<v-flex>

<h2 class="mb-3">W8BEN/W9 Forms submitteds with date of Submission.</h2>
<v-radio-group class="display-5"  v-model="wf">
<v-radio label="Yes" value="yes"></v-radio>
<v-radio label="No" value="no"></v-radio>
</v-radio-group>
<v-flex v-if="wf == 'yes'">

<h3 class="mb-3">
<a href="http://localhost/pro/sales_app_live/public/forms_pdf/W8-Form.pdf" target="_blank">W8</a> (FOR NON US USERS)</h3>
<h3 class="mb-3"><a href="http://localhost/pro/sales_app_live/public/forms_pdf/W9-Form.pdf" target="_blank">W9</a> (FOR US USERS)</h3>

<v-radio-group v-model="wform_options" row :rules="GroupByRequired">
<v-flex xs1 class="z_radio">
<v-radio value="file" label="File"></v-radio>
</v-flex>
<v-flex v-if="wform_options == 'file'" xs11 style="margin-top: -1%;">
<v-btn raised @click="onPickwForm"  class="primary">{{wform.name}}</v-btn>
<input required type="file" @change="checkwForm" style="display:none;" ref="wformInput">
<div v-if="valid_4_wform == true" style="color: #ff1744 !important;">Attachment is required</div>
</v-flex>
<v-flex xs12 class="z_radio">
<v-radio label="E-mail us at: info@test.com" value="email"></v-radio>
</v-flex>
<v-flex xs12 class="z_radio">
<v-radio  label="Courier us at: 7th Floor, Emerald Tower, G-19, Block 5, Main Clifton Road, Clifton, Karachi" value="courier"></v-radio>
</v-flex>
</v-radio-group>

</v-flex>

</v-flex>

  <v-flex xs12>
    <v-btn class="primary" @click="submit">Continue</v-btn>
    &nbsp;
    <v-btn class="info" @click="back" text>Back</v-btn>
  </v-flex>

</v-container>
</v-layout>
</v-container>
</v-card-text>

</v-layout>
</v-container>
</v-form>
</v-container>
</template>
<script>

import axios from 'axios'

export default {
computed:{

Caps(){
return  {
    "accounttitle" : this.accounttitle = this.accounttitle.toUpperCase(),
    "iban" : this.iban = this.iban.toUpperCase(),
    "instrument" : this.instrument = this.instrument.toUpperCase(),
    "co_ma" : this.co_ma = this.co_ma.toUpperCase(),
}

},  

},
data () {
return {
test:'',
disabled:'',      
inv_fileSize:false,
valid:'',
wf_fileSize:false,
valid_4_wform:'',
accounttitle:'', 
GroupByRequired : [
v => !!v || 'This field is required',
], 
accounttitlteRules: [
v => !!v || 'This field is required',
],
instrument:'',
instrumentRules:[
v => !!v || 'This field is required',
],
type_of_units:'',
type_of_unitsRules:[
v => !!v || 'This field is required',
],
paymentmodes:[
//{id:1,pm:'IBFT'},
{id:2,pm:'Cheque'},
// {id:3,pm:'Pay Oder'},
// {id:4,pm:'Demand Draft'},
// {id:5,pm:'Real Time Gross Settlement (RTGS)'},
],
amount:'',
amountRules: [
v => !!v || 'This field is required',
v => v.replace(/[\, ]/g, '') >= 1000 || 'Minimum Amount is 1000',
v => v.replace(/[\, ]/g, '') <= 25000 || 'Maximum Amount is 25000',
],
attachment:{
name:'',
},
aiw:'',
front_end_load:'N/A',
bankname:'',
bankRules: [
v => !!v || 'This field is required',
],
paymentmode:'',
paymentmodeRules:[
v => !!v || 'This field is required',
],
fundname:'',
fundnameRules:[
v => !!v || 'This field is required',
],
asf:'',
Account_Statement_Frequency:[
{id:1,asf:'Monthly'},
{id:2,asf:'Quarterly'},
{id:3,asf:'Annually'},
{id:4,asf:'Do not send'},
],
Account_Statement_FrequencyRules:[
v => !!v || 'This field is required',      
],
dpo:'',
Dividend_Pay_Out:[
{id:1,dpo:'Cash'},
{id:2,dpo:'Reinvestment (Net of applicable taxes)'},
],
Dividend_Pay_OutRules:[
v => !!v || 'This field is required',      
],

funds:[
{id:1,fundname:'AI Cash Fund'},
{id:2,fundname:'AI Money Market Fund'},
{id:3,fundname:'AI Islamic Money Market Fund'},
// {id:4,fundname:'AI Government Securities Fund'},
// {id:5,fundname:'AI Income Fund'},
// {id:6,fundname:'AI Islamic Income Fund'},
// {id:7,fundname:'AI Islamic Asset Allocation Fund'}
],
branchname:'',
fundnameRules:[
v => !!v || 'This field is required',
],
branchRules:[
v => !!v || 'This field is required',
],
banks:[],
branches:[],
customer_id:'',
bankname1:'',
bankname1Rules:[
v => !!v || 'This field is required',      
],

iban:'',
ibanRules: [
v => !!v || 'This field is required',
v => v.length == 24 || 'IBAN must be 24 characters',
],
nat1:'',
nat2:'',
nat3:'',
multiple_nat:'no',
green_card:'no',
tax_resi:'no',
for_citi:'no',
attor:'no',
attor_addr:'',
attor_attrRules:[ v => !!v || 'This field is Required'],
trans_fund:'no',
wf:'no',   
wform_options:'',
co_ma:'', 
co_mp:'',
wform:{
name:''
},
}
},
watch: {
menu (val) {
val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
},
},
   created(){
   // this.getCityByCountry();
   
   let xmls= `<?xml version="1.0" encoding="utf-8"?>
   <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <soap:Body>
   <GetBank xmlns="http://tempuri.org/" />
   </soap:Body>
   </soap:Envelope>`;

   axios.post('https://daofservice.test.com/DigitalAccountOpenTillVerify.asmx?op=GetBank',
   xmls,
   {headers:
   {'Content-Type': 'text/xml'}
   }).then(res=>{

   var parser = new DOMParser();
   var r = parser.parseFromString(res.data,'application/xml');
   var d = JSON.parse(r.getElementsByTagName('GetBankResult')[0].textContent).Table;

        d.map((v => {
         
         var payload = {
            BNK_SHORTNAME : v.BNK_SHORTNAME,
            BNK_ID : `${v.BNK_ID}|${v.BNK_SHORTNAME}`
            };
           
            this.banks.push(payload);

      }))


   }).catch(err=>{console.log(err)});


   },
methods: {

get_branches(val){
let xmls1=`<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <GetBankBranchByBankID xmlns="http://tempuri.org/">
      <BankID>${val.split('|')[0]}</BankID>
    </GetBankBranchByBankID>
  </soap12:Body>
</soap12:Envelope>`;

axios.post('https://daofservice.test.com/DigitalAccountOpenTillVerify.asmx?op=GetBankBranchByBankID',
xmls1,
{headers:
{'Content-Type': 'text/xml'}
}).then(res=>{

var parser = new DOMParser();
var r = parser.parseFromString(res.data,'application/xml');
var d = JSON.parse(r.getElementsByTagName('GetBankBranchByBankIDResult')[0].textContent).Table;
       var branch_arr = [];
        d.map((v => {
                
            branch_arr.push({
            BBR_NAME : v.BBR_NAME,
            BBR_ID: `${v.BBR_ID}|${v.BBR_NAME}`,

         });
           
      }))

      this.branches = branch_arr;
}).catch(err=>{console.log(err)});

},
get_dpo () {

   if(this.dpo == 'Cash'){
      this.disabled = true;
      this.type_of_units = 'NA'
   }
   else{
      this.disabled = false;
   } 
},

check_conflict(){
if(this.green_card == 'yes' || this.tax_resi == 'yes') {
this.$store.dispatch('move',4);
}
},
back() {  
this.$store.dispatch('move',1) 
},
onPickFile() { 
this.$refs.fileInput.click() 
},
checkFile(e) { 

this.attachment = e.target.files[0] || '';

this.inv_fileSize = this.attachment.size > 1000000 ? true : false

this.valid = (this.attachment) ? false : true

},
onPickwForm(){ this.$refs.wformInput.click() },
checkwForm(e){ 
    this.wform = e.target.files[0] ;
    this.valid_4_wform = false;
},
restrict_iban(){ this.iban = (this.iban.length > 24) ? (this.iban.length <= 25) ? this.iban.slice(0, -1) : '' : this.iban  },



submit(){

if(this.attachment.name == ''){
this.valid = true;
}

if(this.wform.name == ''){
this.valid_4_wform = true;
}
if(this.$refs.form.validate() && !this.valid){

//bank details    

var bank_details = {
bankname1:this.bankname1,
branchname:this.branchname,
accounttitle:this.accounttitle,
iban:this.iban,
};

this.$store.dispatch('hold_bd',bank_details);

// bank details end


//Investment Details 

var investment_details = {
fundname:this.fundname,
amount:this.amount,
aiw:this.aiw,
front_end_load:this.front_end_load,
paymentmode:this.paymentmode,      
attachment:this.attachment,      
bankname:this.bankname,
instrument:this.instrument,
customer_id:this.customer_id
};

this.$store.dispatch('hold_id',investment_details);

//Investment Details End



//other details    

var others_details = {
asf:this.asf,
dpo:this.dpo,
type_of_units:this.type_of_units,
customer_id:this.customer_id
};

this.$store.dispatch('hold_od',others_details);

// other details end



// Fatca Details
var nats = [];
nats.push(this.nat1);
nats.push(this.nat2);
nats.push(this.nat3);
nats = nats.filter( (el) => el != "").toString();

var fatca_details = {
multiple_nat:this.multiple_nat,
nats:(this.multiple_nat == 'yes') ? nats :'',
green_card:this.green_card,
tax_resi:this.tax_resi,
for_citi:this.for_citi,
co_ma:this.co_ma,
co_mp:this.co_mp,
attor:this.attor,
attor_addr:(this.attor == 'yes') ? this.attor_addr : '',
trans_fund:this.trans_fund,
wf:this.wf,
wform:(this.wf == 'no') ? '' : this.wform,
wform_options: (this.wf == 'no') ? '' : this.wform_options,
customer_id:this.customer_id
};

this.$store.dispatch('hold_fd',fatca_details);

//Fatca Details End

this.$store.dispatch('move',3);
}
else{ 
    setTimeout(() => { 
        window.scrollTo(0,document.getElementsByClassName('error--text')[0].offsetTop);
    },100);
    }
},      
save (date) { this.$refs.menu.save(date) },

amount_to_word () {

this.amount = this.amount.replace(/[\, ]/g, '');

var th = ['', 'thousand', 'million', 'billion', 'trillion'];
var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
var s = this.amount;
if(s != ''){
s = s.replace(/[\, ]/g, '');
if (s != parseFloat(s)) return 'not a number';
var x = s.indexOf('.');
var fulllength=s.length;

if (x == -1) x = s.length;
if (x > 15) return 'too big';
var startpos=fulllength-(fulllength-x-1);
var n = s.split('');

var str = '';
var str1 = ''; //i added another word called cent
var sk = 0;
for (var i = 0; i < x; i++) {
if ((x - i) % 3 == 2) {
if (n[i] == '1') {
str += tn[Number(n[i + 1])] + ' ';
i++;
sk = 1;
} else if (n[i] != 0) {
str += tw[n[i] - 2] + ' ';

sk = 1;
}
} else if (n[i] != 0) {
str += dg[n[i]] + ' ';
if ((x - i) % 3 == 0) str += 'hundred ';
sk = 1;
}
if ((x - i) % 3 == 1) {
if (sk) str += th[(x - i - 1) / 3] + ' ';
sk = 0;
}
}
if (x != s.length) {

str += 'and '; //i change the word point to and 
str1 += 'cents '; //i added another word called cent
//for (var i = x + 1; i < y; i++) str += dg[n[i]] + ' ' ;
var j=startpos;

for (var i = j; i < fulllength; i++) {

if ((fulllength - i) % 3 == 2) {
if (n[i] == '1') {
str += tn[Number(n[i + 1])] + ' ';
i++;
sk = 1;
} else if (n[i] != 0) {
str += tw[n[i] - 2] + ' ';

sk = 1;
}
} else if (n[i] != 0) {

str += dg[n[i]] + ' ';
if ((fulllength - i) % 3 == 0) str += 'hundred ';
sk = 1;
}
if ((fulllength - i) % 3 == 1) {

if (sk) str += th[(fulllength - i - 1) / 3] + ' ';
sk = 0;
}
}
}
let aiw = str.replace(/\s+/g, ' ') + str1;
let splitStr = aiw.toLowerCase().split(' ');
for (var i = 0; i < splitStr.length; i++) {         
splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
}

this.aiw = splitStr.join(' ') + 'only';
this.amount = this.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   
}
else{
this.aiw = '';
}
}
},
}
</script>