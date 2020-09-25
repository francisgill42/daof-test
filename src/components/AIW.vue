<template>
<div>
<v-text-field  v-model="amount" @keyup="amount_to_word" label="Amount" required></v-text-field>
<v-text-field readonly v-model="aiw" :value="aiw" label="Amount In Words" required></v-text-field>
</div>
</template>
<script>

export default{
    data :() => ({ 
        amount:'',
        aiw:'',
    }),

    methods:{
    amount_to_word () {

this.amount = this.amount.replace(/[\, ]/g, '');

let th = ['', 'thousand', 'million', 'billion', 'trillion'];
let dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
let tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
let tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
let s = this.amount;
if(s != ''){
s = s.replace(/[\, ]/g, '');
if (s != parseFloat(s)) return 'not a number';
let x = s.indexOf('.');
let fulllength=s.length;

if (x == -1) x = s.length;
if (x > 15) return 'too big';
let startpos=fulllength-(fulllength-x-1);
let n = s.split('');

let str = '';
let str1 = ''; //i added another word called cent
let sk = 0;
for (let i = 0; i < x; i++) {
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
//for (let i = x + 1; i < y; i++) str += dg[n[i]] + ' ' ;
let j=startpos;

for (let i = j; i < fulllength; i++) {

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
for (let i = 0; i < splitStr.length; i++) {         
splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
}

this.aiw = splitStr.join(' ') + 'only';
this.amount = this.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   
}
else{
this.aiw = '';
}
}
}
}
</script>