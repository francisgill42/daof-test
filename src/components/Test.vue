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
      let xmls=`<?xml version="1.0" encoding="utf-8"?>
      <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
      <GetCountry xmlns="http://tempuri.org/" />
      </soap12:Body>
      </soap12:Envelope>`;

      axios.post('https://daofservice.test.com/DigitalAccountOpenTillVerify.asmx?op=GetCountry',
      xmls,
      {headers:
      {'Content-Type': 'text/xml'}
      }).then(res=>{

      var parser = new DOMParser();
      var r = parser.parseFromString(res.data,'application/xml');

      this.countries = JSON.parse(r.getElementsByTagName('GetCountryResult')[0].textContent).Table;

      }).catch(err=>{console.log(err)});

   },
  }
</script>

<style>

</style>