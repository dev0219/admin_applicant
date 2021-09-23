<template>
  <v-card >
    <v-data-table :key="componentkey"
      :headers="headers"
      :items="applicantLst"
      item-key="full_name"
      class="table-rounded"
      :search="search"
      enable-sort      
      
      :footer-props="{'items-per-page-options':[10,15,30,-1]}"
      :options="options"
       v-scroll="handleScroll"
       @update:options="handleOptionsUpdate">
     >
    >
    <template v-slot:top>
        <v-text-field
          v-model="search"
          outlined
          dense
          label="Search"
          class="search-bar-responsive"
        ></v-text-field>
      </template>
      <!-- status -->
      
      <template #[`item.name`]="{item}">
        <p  v-on:click="appInformation(item)">{{item.name}}</p>
      </template>
      <template #[`item.address`]="{item}">
        <p  v-on:click="appInformation(item)">{{item.address}}</p>
      </template>
      <template #[`item.email`]="{item}">
        <p  v-on:click="appInformation(item)">{{item.email}}</p>
      </template>
      <template #[`item.register_date`]="{item}">
        <p  v-on:click="appInformation(item)">{{item.register_date}}</p>
      </template>
      <template #[`item.insuranceType`]="{item}">
        <p  v-on:click="appInformation(item)">{{item.insuranceType}}</p>
      </template>
      <template #[`item.link`]="{item}">
         <v-btn icon :href="'https://apply.insure/f/'+item.link" target="_blank" color='primary'>
           /{{item.link}}
        </v-btn>
      </template>

      <template #[`item.status`]="{item}">
          <v-select
                :items="status"
                v-model="item.status"
                label="Select"
                 style="margin-top:15px"
                dense
                 solo
                item-text="report"
                item-value="src"
                return-object
                persistent-hint
                v-on:input="changeRoute(item.status, item._id)"
              ></v-select>
      </template>
      
    </v-data-table>
    <v-dialog
      v-model="dialog"
      max-width="1000"
    >
      <v-card>
        <v-card-title class="text-h5" style="padding:50px;color:#000 !important">
          <v-row>
            <v-col col="12" xs='12' class="modalinfo">
               <div>
                <h1 style="width: 100%;font-family: sans-serif;font-size: 20px; color: #000 !important;font-weight: 600;margin-bottom: 20px;">Property & Casualty Full App</h1>
                              <img width="20px" src="https://apply.insure/assets/images/Quote_latest_mail_3.png">
                              <a :href="'https://apply.insure/f/'+applink" target="_blank" style="text-decoration: none;font-family: sans-serif;font-size: 14px;vertical-align: super;">https://apply.insure/f/{{applink}}</a>
               </div>
               <div>
                      <img style="display: inline-block;margin: 0 10px;" width="50px" src="https://apply.insure/assets/images/Quote_latest_mail_1.png">
                        <div style="display: inline-block;text-align: center;">
                          <h3 style="margin: 0;text-align: center;color: #000 !important">11</h3>
                          <p style="    text-align: center;align-items: center;margin: 0;margin-bottom: 6px;color: #000 !important">pages</p>
                          <img width="40px" src="https://apply.insure/assets/images/Quote_latest_mail_2.png">
                        </div>
                        <img width="50px" style="margin: 0 10px;" src="https://apply.insure/assets/images/Quote_latest_mail_1.png">
               </div>
             </v-col>
          </v-row>
        </v-card-title>
        <v-card-text  style="padding:50px ;color:#000 !important">
          
             
                <v-row>
                  <v-col col="12" sm="6"> <h5 style="color: #000 !important">DisCountsData</h5><br>
                    Insurance Type : {{applicationinfo.insuranceType}}<br>
                    Own / rent : {{applicationinfo.selectedUserType}}<br>
                    Year : {{applicationinfo.yearBuilt}}<br>
                    Sq Ft : {{applicationinfo.sqft}}<br>
                    Foundation : {{applicationinfo.foundation}}<br>
                    Security System :  {{applicationinfo.security_system}}<br>
                    Dog : {{applicationinfo.dog}}<br>
                    Age of Roof : {{applicationinfo.roof_shape}}<br>
                    Roof Type : {{applicationinfo.roof_type}}<br><br>
                  
                  </v-col>
                  <v-col col="12" sm="6"> <h5 style="color: #000 !important">Applicant(s)</h5><br>
                    
                    Address : {{applicationinfo.address}}<br>
                    Email : {{applicationinfo.email}}<br>
                    Phone : {{applicationinfo.phone}}<br>
                    <div v-for="item of applicationinfo.householdmember" :key="item.name">
                              {{item.name}}  &nbsp;&nbsp;&nbsp;{{item.birthday}}&nbsp;&nbsp;&nbsp;{{item.license}}<br>
                    </div>
                    Current carrier : {{applicationinfo.carrierType}}<br>
                    Current auto premium : {{applicationinfo.current_auto_premiun}}<br><br>
                    <h5 style="color: #000 !important">Custom Questions</h5>
                      {{applicationinfo.question5}} : {{applicationinfo.answer5}} <br>
                      {{applicationinfo.question6}} : {{applicationinfo.answer6}}
                   </v-col>
                  </v-row>
               
              
               
              <v-row>
               <v-col col="12" sm="6"> <h5 style="color: #000 !important">Car(s)</h5><br>
                     <div v-for="(item, index) of applicationinfo.cardata" :key="item.cardatayear">
                              {{item.cardatayear}}  &nbsp;&nbsp;&nbsp;{{item.cartype}}&nbsp;&nbsp;&nbsp;{{item.carmodel}}&nbsp;&nbsp;&nbsp;{{item.vininfo}}<br>
                    </div>
               </v-col>
               <v-col col="12" sm="6"> <h5 style="color: #000 !important">Note(s)</h5><br><br>
                {{applicationinfo.requestorcomments}}<br></v-col>
              </v-row>
              
               

              <h5 style="color: #000 !important">Questions</h5><br>
              Short Term Rentals(airBnB,etc)	: {{applicationinfo.shortrentals}}<br>
              Property owned by corporation or a trust?	: {{applicationinfo.propertyown}}<br>
              Multiple Unit Property?	: {{applicationinfo.multipleunit}}<br>
              Have you filed any property insurance claims?	: {{applicationinfo.insuranceclaims}}<br>
              Have you ever had a policy cancelled or non-renewed in last 3 years?	: {{applicationinfo.policycancell}}<br>
              Do you have a swimming pool ?	: {{applicationinfo.swimmingpool}}<br>

               
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>  
</template>

<script>
import { mdiSquareEditOutline, mdiDotsVertical } from '@mdi/js'
import data from './datatable-data'
import axios from 'axios'
const BaseUrl = 'https://apply.insure/'
import {
  mdiMagnify,
  mdiAbTesting,
  mdiAbacus,
  mdiAbjadArabic,
  mdiAbjadHebrew,
  mdiAbugidaDevanagari,
  mdiAbugidaThai,
  mdiAccessPoint,
  mdiAccessPointCheck,
  mdiAccessPointMinus,
  mdiAccessPointNetwork,
  mdiAccessPointNetworkOff,
  mdiAccessPointOff,
  mdiAccessPointPlus,
  mdiAccessPointRemove,
  mdiAccountAlertOutline,
  mdiAccountArrowLeftOutline,
  mdiAccountArrowRightOutline,
  mdiAccountBoxMultipleOutline,
  mdiAccountBoxOutline,
  mdiAccountCancelOutline,
  mdiAccountCashOutline,
  mdiAccountCheckOutline,
  mdiAccountChildOutline,
  mdiAccountCircleOutline,
  mdiAccountClockOutline,
  mdiAccountCogOutline,
  mdiAccountDetailsOutline,
  mdiAlarmLightOutline,
  mdiAlertBoxOutline,
  mdiAlertCircleCheckOutline,
  mdiAlertDecagramOutline,
  mdiAlertMinusOutline,
  mdiAlertOutline,
  mdiAlertPlusOutline,
  mdiCheckOutline,
  mdiClipboardOutline,
  mdiClipboardPlayOutline,
  mdiCloseOutline,
  mdiCloudCheckOutline,
  mdiCloudDownloadOutline,
  mdiCogOutline,
  mdiCompassOffOutline,
  mdiContactlessPaymentCircleOutline,
  mdiCrownOutline,
  mdiDeleteOutline,
  mdiDiamondOutline,
  mdiEmailOpenOutline,
  mdiEmoticonHappyOutline,
  mdiFileMultipleOutline,
  mdiFlaskEmptyOutline,
   mdiPencilOutline,
} from '@mdi/js'

export default {
  setup() {
    const statusColor = {
      /* eslint-disable key-spacing */
      Current: 'primary',
      Professional: 'success',
      Rejected: 'error',
      Resigned: 'warning',
      Applied: 'info',
      /* eslint-enable key-spacing */
    }

    return {
      delId:"",
      applink:"",
      applicationinfo:{name:'',address:'',email:'',phone:''},
      baseurl:BaseUrl,
      componentkey:0,
      search: '',
      isadmin:true,
      dialog:false,
      statusitem:'Open',
      mdiDeleteOutline:mdiDeleteOutline,
      mdiPencilOutline:mdiPencilOutline,
      headers: [
        { text: 'NAME', value: 'name' , class: 'my-header-style'},
        { text: 'ADDRESS', value: 'address' , class: 'my-header-style'},
        { text: 'EMAIL', value: 'email' , class: 'my-header-style'},        
        {text: 'DATE APPLIED', value: 'register_date', class: 'my-header-style' },       
        { text: 'TYPE', value: 'insuranceType' , class: 'my-header-style'},    
        { text: 'STATUS', value: 'status' , class: 'my-header-style',sortable:false,width:'200px'},
        { text: 'LINK', value: 'link' , class: 'my-header-style'},

        // { text: 'ACTION', value: 'actions' },
      ],
      applicantLst: [],
      select: { report: 'Open', src:'Open' },
      status: [
        {report: 'Open',src:'Open'},
        {report: 'Proposed',src:'Proposed'},
        {report: 'Closed',src:'Closed'},
        {report: 'Won',src:'Won'},
        {report: 'Lost',src:'Lost'}
      ],
      options: {
        page: 1,
        itemsPerPage: 10,
        sortBy:['register_date'],
        sortDesc: ['false'],
         
      },
      statusColor,
      // icons
      icons: {
        mdiSquareEditOutline,
        mdiDotsVertical,
      },
      current_page_status:{
          itemsPerPage: 10,
          page:1,
          sortBy:['register_date'],
          sortDesc: ['false'],}
    }
  },
  created() {
    this.getUsers();
    this.setInterval();
  },
  methods:{   
    handleOptionsUpdate(val) {
     
        this.current_page_status = {
          itemsPerPage: val.itemsPerPage,
          page:val.page,
          sortBy:val.sortBy,
          sortDesc: val.sortDesc
        };
    },
   handleScroll: function(evt, el) {

     if (window.scrollY > 160) {
       
     }
   },
    setInterval() {
      var _that = this;
       setInterval(function(){ 
         var current_itemperpage = {};      
         _that.getUsers(); 
          _that.options.itemsPerPage = _that.current_page_status.itemsPerPage,
          _that.options.page = _that.current_page_status.page,
         _that.options.sortBy = _that.current_page_status.sortBy,
         _that.options.sortDesc =  _that.current_page_status.sortDesc,
          _that.search = _that.search
         }, 6000);
    },
    async changeRoute(val,id){
      var data = {status:val.src,id:id};
      await axios.post(BaseUrl+'statusupdate', data).then(response => (console.log(response)));
    } ,
    appInformation(val) {
       this.applink = val.link;
       this.applicationinfo.name = val.name;

       this.applicationinfo.householdmember = val.householdmember;
       if(this.applicationinfo.householdmember.length>0){
         for(var m=0;m<this.applicationinfo.householdmember.length;m++){
      
             var date = new Date(this.applicationinfo.householdmember[m]['birthday']);
                     var hour = date.getHours();
                     var min = date.getMinutes();
                     var sec = date.getSeconds();
                     this.applicationinfo.householdmember[m]['birthday'] = (date.getMonth()+1) +'-'+ date.getDate()  +'-'+date.getFullYear();
         
         
           
         }
       }
       this.applicationinfo.question5 = val.question5?val.question5:'';
       this.applicationinfo.question6 = val.question6?val.question6:'';
       this.applicationinfo.answer5 = val.answer5?val.answer5:'';
       this.applicationinfo.answer6 = val.answer6?val.answer6:'';
       this.applicationinfo.address = val.address 
       this.applicationinfo.email = val.email 
       this.applicationinfo.phone = val.phone
       this.applicationinfo.carrierType = val.carrierType 
       this.applicationinfo.requestorcomments = val.requestorcomments 
       this.applicationinfo.mailingadress = val.mailingadress 
       this.applicationinfo.birthday = val.birthday 
       this.applicationinfo.roof_shape = val.roof_shape 
       this.applicationinfo.foundation = val.foundation 
       this.applicationinfo.roof_type = val.roof_type 
       this.applicationinfo.selectedUserType = val.selectedUserType 
       this.applicationinfo.yearBuilt = val.yearBuilt 
       this.applicationinfo.sqft = val.sqft 
       this.applicationinfo.insuranceclaims = val.insuranceclaims
       this.applicationinfo.cardata = val.cardata 
       if(this.applicationinfo.cardata.length>0){
         for(var i=0;i<this.applicationinfo.cardata.length;i++){
           this.applicationinfo.cardata[i]['vininfo']='';
           if(val.vin[i]){
                   this.applicationinfo.cardata[i]['vininfo'] = val.vin[i]['vininfo']
           }
           
         }
       }
       this.applicationinfo.security_system = val.security_system 
       this.applicationinfo.current_auto_premiun = val.current_auto_premiun
       this.applicationinfo.dog = val.dog
       this.applicationinfo.shortrentals = val.shortrentals
       this.applicationinfo.propertyown = val.propertyown
       this.applicationinfo.multipleunit = val.multipleunit
       this.applicationinfo.policycancell = val.policycancell
       this.applicationinfo.swimmingpool = val.swimmingpool
       this.applicationinfo.register_date = val.register_date;
       this.applicationinfo.quote_id = val.quote_id 
       this.applicationinfo.license = val.license 
       this.applicationinfo.agentemail = val.agentemail 
       this.applicationinfo.insuranceType = val.insuranceType 
       this.dialog = true
    },
    async Status(a,item){
      item.status = a;
      const data = {user:item}
       try{
                 await axios.post(BaseUrl + `status`, data).then(response => (console.log(response)))
                 this.getUsers();
            }
            catch(err){
                console.log(err);
            }  
    },
    async getUsers() {
      var userdata = this.$cookies.get('user');
     
      var _that = this;
            try{
                 await axios.get(BaseUrl + `allapplicant`).then(response => (this.applicantLst = response.data))
                 if(this.applicantLst.length > 0){
                   for(var i=0;i<this.applicantLst.length;i++){
                     var date = new Date(this.applicantLst[i]['register_date']);
                     var hour = date.getHours();
                     var min = date.getMinutes();
                     var sec = date.getSeconds();
                     if(hour < 10) {
                       hour = '0' + hour;
                     }
                     if(min < 10) {
                       min = '0' + min;
                     }
                     if(sec < 10) {
                       sec = '0' + sec;
                     }
                     this.applicantLst[i]['timestap'] = date;
                     this.applicantLst[i]['register_date'] = (date.getMonth()+1) +'-'+ date.getDate()  +'-'+date.getFullYear() + ' ' + hour + ':' + min + ':' + sec;
                   }
                   
                   this.applicantLst.sort(function(x, y){
                        return y.timestap - x.timestap;
                    })
                   
                 }
                  if(userdata.role==1) {
                      this.headers = this.headers.filter(function(item) {
                          return item.text !== "TYPE" &&  item.text !== "STATUS" 
                      })                      
                    }else{
                      this.headers = this.headers.filter(function(item) {
                          return item.text !== "LINK" 
                      })
                      this.applicantLst = this.applicantLst.filter(function(item) {return item.agentemail == userdata.email && item.link == userdata.link});
                    }
                    this.$cookies.set('applicantcounter', this.applicantLst.length);
                 this.componentkey++;
            }
            catch(err){
                console.log(err);
            }   

           
    },
  }
}
</script>
<style>
.v-sheet.v-card {
    border-radius: 40px;
    box-shadow: 0 0 0 0 !important;
    
}
.v-data-table th {
    font-weight: 600;
    background-color: #fff !important;
}
 .text-start{
   color:#000 !important
 }
 .theme--light.v-data-table td {
    color: #000 !important;
}
.v-text-field--outlined > .v-input__control > .v-input__slot {
    background: #fff !important;
}
.search-bar-responsive{
     position: fixed;top: 52px;left:30%;width:400px;z-index: 1;
  }
.modalinfo{
  display:flex
}
@media  screen and (max-width: 1565px) {
  .search-bar-responsive{
     position: fixed;top: 52px;left:30%;
  }
}
@media  screen and (max-width: 1079px) {
  .search-bar-responsive{
     position: fixed;top: 142px;left:30%;
  }
}
@media  screen and (max-width: 996px) {
  .search-bar-responsive{
     position: fixed;top: 142px;left:30%;width:400px;
  }
}
@media  screen and (max-width: 876px) {
  .search-bar-responsive{
     position: fixed;top: 142px;left:30%;width:320px;
  }
}
@media  screen and (max-width: 715px) {
  .search-bar-responsive{
     position: fixed;top: 142px;left:30%;width:280px;
  }
}
@media  screen and (max-width: 576px) {
  .search-bar-responsive{
     position: relative;top: 20px;left:0%;width:100%;
  }
  .modalinfo{
      display:block
    }
}

</style>
