import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {  
  // base_url:'https://salesappai.vardasolutions.com/api/',  
  base_url:'http://45.76.106.58/api/',  
  // base_url:'https://salesapp.test.com/api/',  
  name:'',
  fathername:'',
  mothername:'',
  dob:'',
  cnic:'',
  cnic_issue_date:'',
  pob_city:'',
  pob_country:'',
  email:'',
  cell:'',
  occupation:'',
  education:'',
  under_age:true,
  channel:'',
  user_id:0,      
  customer_id:0,
  e1:1,
  loading:false,
  err:'',
  thanks_msg:'',
  auto_fill:false,
  prefilled_input_field : 'PREFILLED INPUT FIELD',
  prefilled_date_field : '1988-09-27',


},
  mutations: { 

    move(state,payload){
      state.e1 = payload
    },
    setHeight(state){
      state.height = 0
    },
    hold_ci(state,payload){

  state.name = payload.name;
  state.fathername = payload.fathername;
  state.mothername = payload.mothername;
  state.dob = payload.dob;
  state.cnic = payload.cnic;
  state.cnic_issue_date = payload.cnic_issue_date;
  state.pob_city = payload.pob_city;
  state.pob_country = payload.pob_country;
  state.email = payload.email;
  state.cell = payload.cell;
  state.occupation = payload.occupation;
  state.education = payload.education;
  state.under_age = payload.under_age;
  state.channel = payload.channel;
  state.user_id = payload.user_id;
  
},



    save_form(state,attachments){
      state.loading = true;
      var ci = new FormData();
      ci.append('name',(state.auto_fill) ? state.prefilled_input_field : state.name);
      ci.append('father_name',(state.auto_fill) ? state.prefilled_input_field : state.fathername);
      ci.append('mother_name',(state.auto_fill) ? state.prefilled_input_field : state.mothername);
      ci.append('dob',(state.auto_fill) ? state.prefilled_date_field : state.dob);
      ci.append('cnic',(state.auto_fill) ? state.prefilled_input_field : state.cnic);
      ci.append('cnic_issue_date',(state.auto_fill) ? state.prefilled_date_field : state.cnic_issue_date);
      ci.append('pob_city',(state.auto_fill) ? state.prefilled_input_field : state.pob_city);
      ci.append('pob_country',(state.auto_fill) ? state.prefilled_input_field : state.pob_country);
      ci.append('email',(state.auto_fill) ? state.prefilled_input_field : state.email);
      ci.append('cell',(state.auto_fill) ? state.prefilled_input_field : state.cell);
      ci.append('occupation',(state.auto_fill) ? state.prefilled_input_field : state.occupation);
      ci.append('education',(state.auto_fill) ? state.prefilled_input_field : state.education);

      ci.append('cnic_attachment',(state.auto_fill) ? state.prefilled_input_field : attachments.cnic_attachment);
      ci.append('soi_attachment',(state.auto_fill) ? state.prefilled_input_field : attachments.soi_attachment);
      ci.append('zakat_certificate',(state.auto_fill) ? state.prefilled_input_field : attachments.zkt_attachment);

      axios.post(state.base_url+'save_customer_info',ci)
      .then((ci_res) => {

    if(ci_res.status == 200){
      var generate_form = new FormData();
  
      generate_form.append('channel',state.channel);
      generate_form.append('customer_id',ci_res.data);
      generate_form.append('user_id',state.user_id);
      generate_form.append('customer_name',state.name);
      generate_form.append('cnic',state.cnic);
      generate_form.append('email',state.email);

      axios.post(state.base_url+'generate_form',generate_form)
      .then((res) => {
        if(res.status == 200){
          state.loading = false;
          state.e1 = 4;
          state.thanks_msg = 'Dear Investor, Your account has been successfully created. Our representative will contact you soon.';
          
          // var send_mail = new FormData();

          // send_mail.append('user_id',state.user_id);
          // send_mail.append('customer_name',state.name);
          // send_mail.append('cnic',state.cnic);
          // send_mail.append('email',state.email);

          // axios.post(state.base_url+'send_mail',send_mail)
          // .then((res) => {
           
          // }).catch((err) => console.log(err) );

        }
      }).catch((err) => console.log(err) );
    }
 
}).catch(() => {
  state.err = 'Internal Server Error';
  state.loading = false;
});  
  
},



},
  actions: {

    hold_ci(context,payload){
      context.commit('hold_ci',payload);
    },

    hold_bd(context,payload){
      context.commit('hold_bd',payload);
    },

    hold_id(context,payload){
      context.commit('hold_id',payload);
    },

    hold_od(context,payload){ 
      context.commit('hold_od',payload);
    },

    hold_fd(context,payload){
      context.commit('hold_fd',payload);
    },
    save_form(context,payload){
      context.commit('save_form',payload);
    },

    check_status(context){
      context.commit('check_status');
    },
   
    move(context,payload){
      context.commit('move',payload);
     
    },
    setHeight(context){
      context.commit('setHeight');
     
    },
  }
})
