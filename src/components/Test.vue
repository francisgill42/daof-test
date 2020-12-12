<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left"><strong>Key</strong></th>
          <th class="text-left"><strong>Values</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,i) in countries" :key="i">
          <td>{{ item.CNT_COUNTRYCODE }}</td>
          <td>{{ item.CNT_OFFICALNAME }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import axios from 'axios';

  export default {
    data () {
      return {
          countries : []
       
      }
    },
    created(){
     
      this.countries = [];
   },
  }
</script>

<style>

</style>