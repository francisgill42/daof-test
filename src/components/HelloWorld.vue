<template>
<v-layout wrap>
  <v-container>


<v-text-field v-model="amount" @keyup="amount_to_word">
</v-text-field>
<span>{{aiw}}</span>
</v-container>
</v-layout>

</template>

<script>
  export default {
    data: () => ({
        amount:'',
        aiw:'',
    }),
    methods:{
      amount_to_word () {
        var th = ['', 'thousand', 'million', 'billion', 'trillion'];
        var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        var s = this.amount;

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
            this.aiw = str.replace(/\s+/g, ' ') + str1;
      }
    }
  }
</script>