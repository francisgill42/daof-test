<template>
<v-container>
<v-layout wrap>
<v-flex xs12>
<v-stepper v-model="e1">
<v-stepper-header class="mb-5">

<v-stepper-step :complete="e1 > 1" step="1">Customer Information</v-stepper-step>
<v-divider class="primary"></v-divider>

<v-stepper-step :complete="e1 > 2" step="2">Investment Details</v-stepper-step>
<v-divider class="primary"></v-divider>


<v-stepper-step :complete="e1 > 3" step="3">Declaration</v-stepper-step>
<v-divider class="primary"></v-divider>

<v-stepper-step :complete="e1 > 4" step="4">Confirmation</v-stepper-step>

</v-stepper-header>

<v-stepper-items>

<v-stepper-content step="0">        
<Test />
</v-stepper-content>

<v-stepper-content step="1">        
<CI />
</v-stepper-content>


<v-stepper-content step="2">
<ID />
</v-stepper-content>

<v-stepper-content step="3">
<Declaration />
</v-stepper-content>

<v-stepper-content step="4">
<Thankyou />
</v-stepper-content>

</v-stepper-items>

</v-stepper>

</v-flex>
</v-layout>
</v-container>
</template>

<script>
import Test from '../components/Test';
import CI from '../components/CI';
import ID from '../components/ID';
import Declaration from '../components/Declaration';
import Thankyou from '../components/Thankyou';
import {EventBus} from '../main';

export default {
components: { Test,CI,ID,Declaration,Thankyou },
 computed: {
    e1() {
      return this.$store.state.e1
    }
  },
}
</script>