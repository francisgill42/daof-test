<template>
 <v-container fluid>
   <v-form ref="form">
<v-layout wrap>

<v-flex xs12>
     <blockquote class="blockquote">1. I/We will not claim repatriation from Pakistan of Dividends and Sale proceeds of the units except as permissible under the Rules of the State Bank of Pakistan or Ministry of Finance, Government of Pakistan.</blockquote>
</v-flex>

<v-flex xs12>
  <blockquote class="blockquote">2. I/We hereby acknowledge having read and understood the relevant Trust Deed(s) and Offering Documents(s) and guidelines (on the back of this Form) that govern this transaction and further acknowledge having understood the risks involved and I/We agree to abide by the terms and conditions therein.</blockquote>
</v-flex>

<v-flex xs12>
  <blockquote class="blockquote">3. In case of any change in any information provided through this form, I hereby undertake to immediately inform HBL AMC of the same and provide an updated information to HBL AMC within thirty (30) days.</blockquote>
</v-flex>


<v-flex xs12>
     <blockquote class="blockquote">4. I/We hereby confirm that all information provided in this form is correct to the best of my knowledge and the documents submitted along with this application are genuine. I/We also confirm having read and understand the Trust Deeds and Offering Documents that govern the transactions and in particular the risk disclosures. I confirm that I/We have understood the details of Sales Load to be deducted including taxes thereon as well as the advice given in the Risk Profile section.</blockquote>
</v-flex>

<v-flex xs12>
  <blockquote class="blockquote">5. I/We hereby permit HBL AMC, subject to applicable local laws, to share my information with domestic or overseas regulators or tax authorities where necessary to establish my tax liability in any jurisdiction. Where required by domestic or overseas regulators or tax authorities, I/We further agree that HBL AMC may withhold from account(s) such amount as may be required according to applicable laws, regulation and directives. I/We will indemnify and hold harmless HBL AMC from any loss, action, cost, expense (including, but not limited to sums paid in settlement of claims, reasonable attorney's and consultant fees, and expert fees), claim damages, or liability which arises or is incurred by HBL AMC in discharging its obligation under FATCA/CRS as a result of disclosures to external tax authorities.</blockquote>
</v-flex>

<v-flex xs12>
  <blockquote class="blockquote">6. I undertake to notify HBL AMC within 30 Calender days if there is a change in any information which I have provided to HBL AMC. I/We understand and accept that HBL AMC reserves the right to close or suspend my account, without prior notice, if required document/information is not submitted within a stipulated time.</blockquote>
</v-flex>

<v-flex xs12>
  <blockquote class="blockquote">
     <v-checkbox
     class="mb-2"
      v-model="checkbox"
      label="I accept the Terms of Conditions"
      required
      :rules="CheckRules"
    ></v-checkbox>
<v-btn class="primary" :loading="loading" @click="submit">Continue</v-btn>
&nbsp;
<v-btn class="info" @click="back" text>Back</v-btn>
</blockquote>


</v-flex>

</v-layout>
   </v-form>
</v-container>
</template>
<script>



export default {
   computed: {
    loading() {
      return this.$store.state.loading;
   }
   },
   data () {
      return {
        checkbox: false,
        CheckRules:[
          v => !!v || 'Kindly Accept Terms and Conditions',
],
      }
    },
  methods:{ 
    back () { 
         this.$store.dispatch('move',2) 
    },
    submit () { 
      if(this.$refs.form.validate()){
      
        this.$store.dispatch('save_form') 
    
    } 
    }
  },
}
</script>

