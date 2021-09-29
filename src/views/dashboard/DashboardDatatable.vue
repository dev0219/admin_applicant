<template>
  <v-card :key="componentkey">
    <v-data-table
      :headers="headers"
      :items="usreList"
      item-key="full_name"
      class="table-rounded"
      ref="user_list"
      :search="search"
      enable-sort
      @click:row="handleClick"
      :footer-props="{'items-per-page-options':[10,15,30]}"
      :options="options"
    >
    <template v-slot:top>
        <v-text-field
          v-model="search"
          outlined
          dense
          label="Search"
           class="search-bar-responsive"
        >
        
        </v-text-field>
      </template>

      <template v-slot:header.counter >
              <v-select
                :items="items"
                v-model="select"
                label="Select"
                single-line
                item-text="report"
                item-value="src"
                return-object
                persistent-hint
                v-on:input="changeRoute(`${select.src}`)"
              ></v-select>
      </template>
      <template #[`item.firstname`]="{item}">
        {{item.firstname}} &nbsp;&nbsp;&nbsp;{{item.lastname}}
      </template>
      <template #[`item.link`]="{item}">
        <v-btn icon :href="'https://apply.insure/f/'+item.link" target="_blank" color='primary'>
           /{{item.link}}
        </v-btn>
        
      </template>   
    </v-data-table>
   
    
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Are you remove?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="Delete(),dialog = false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="editinguser"
      max-width="1000"
    >
      <v-card class="AddNewuser">
        <v-card-title class="text-h5">
          Edit User
        </v-card-title>
        <v-card-text>
            <v-form class="multi-col-validation">
                <v-row class="profile">
                  <v-col cols="12">
                    <v-card>
                      <v-card-text>
                          <v-form class="multi-col-validation">
                              <v-row>
                              <v-col
                                  cols="12"
                                  md="6"
                              >
                                  <v-text-field
                                  v-model="firstName"
                                  label="First Name"
                                  outlined
                                  dense
                                  placeholder="First Name"
                                  hide-details
                                  ></v-text-field>
                              </v-col>

                              <v-col
                                  cols="12"
                                  md="6"
                              >
                                  <v-text-field
                                  v-model="lastName"
                                  label="Last Name"
                                  outlined
                                  dense
                                  placeholder="Last Name"
                                  hide-details
                                  ></v-text-field>
                              </v-col>

                              <v-col
                                  cols="12"
                                  md="6"
                              >
                                  <v-text-field
                                  v-model="email"
                                  label="Email"
                                  outlined
                                  dense
                                  placeholder="Email"
                                  hide-details
                                  ></v-text-field>
                              </v-col>

                              
                              <v-col
                                  cols="12"
                                  md="6"
                              >
                                  <v-text-field
                                  v-model="link"
                                  label="Link"
                                  outlined
                                  dense
                                  placeholder="Link"
                                  hide-details
                                  ></v-text-field>
                              </v-col>
                              
                              <v-col
                                  cols="12"
                                  md="6"
                              >
                                  <v-text-field
                                  v-model="agencyname"
                                  label="Agency Name"
                                  outlined
                                  dense
                                  placeholder="Agency Name"
                                  hide-details
                                  ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="6">
                                <v-text-field
                                  v-model="phone"
                                  label="Phone"
                                  outlined
                                  dense
                                  placeholder="phone"
                                  hide-details
                                  ></v-text-field>
                              </v-col>

                            
                              <v-col cols="12" md="2">
                                <label>Agent Image</label>
                                <div
                                  class="image-input agent-image"
                                  :style="{ 'background-image': `url('${imageDataAgent}')` }"
                                  @click="chooseImageAgent"
                                >
                                <v-icon class="custom-icon" size="30">
                                   {{mdiCloudUploadOutline}}
                                </v-icon>
                                  <span
                                    v-if="!imageDataAgent"
                                    class="placeholder"
                                  >
                                  
                                  </span>
                                  <input
                                    class="file-input"
                                    ref="fileInputAgent"
                                    type="file"
                                    @input="onSelectFileAgent"
                                  >
                                </div>
                              </v-col>
                              
                              <v-col cols="12" md="2">
                                <label>Property Image</label>
                                <div
                                  class="image-input agent-image"
                                  :style="{ 'background-image': `url('${imageDataProperty}')` }"
                                  @click="chooseImageProperty"
                                >
                                <v-icon class="custom-icon" size="30">
                                   {{mdiCloudUploadOutline}}
                                </v-icon>
                                  <span
                                    v-if="!imageDataProperty"
                                    class="placeholder"
                                  >
                                  
                                  </span>
                                  <input
                                    class="file-input"
                                    ref="fileInputProperty"
                                    type="file"
                                    @input="onSelectFileProperty"
                                  >
                                </div>
                              </v-col>

                              <v-col cols="12" md="2">
                                <label>Agency Image</label>
                                <div
                                  class="image-input agent-image"
                                  :style="{ 'background-image': `url('${imageDataAgency}')` }"
                                  @click="chooseImageAgency"
                                >
                                <v-icon class="custom-icon" size="30">
                                   {{mdiCloudUploadOutline}}
                                </v-icon>
                                  <span
                                    v-if="!imageDataAgency"
                                    class="placeholder"
                                  >
                                  
                                  </span>
                                  <input
                                    class="file-input"
                                    ref="fileInputAgency"
                                    type="file"
                                    @input="onSelectFileAgency"
                                  >
                                </div>
                              </v-col>
                              <v-col cols="12" md="2">
                                <label >Household Image</label>
                                <div
                                  class="image-input agent-image"
                                  :style="{ 'background-image': `url('${imageDataHousehold}')` }"
                                  @click="chooseImageHousehold"
                                >
                                <v-icon class="custom-icon" size="30">
                                   {{mdiCloudUploadOutline}}
                                </v-icon>
                                  <span
                                    v-if="!imageDataHousehold"
                                    class="placeholder"
                                  >
                                  
                                  </span>
                                  <input
                                    class="file-input"
                                    ref="fileInputHousehold"
                                    type="file"
                                    @input="onSelectFileHousehold"
                                  >
                                </div>
                              </v-col>

                              <v-col cols="12" md="2">
                                <label >Intro Image</label>
                                <div
                                  class="image-input agent-image"
                                  :style="{ 'background-image': `url('${imageDataIntro}')` }"
                                  @click="chooseImageIntro"
                                >
                                <v-icon class="custom-icon" size="30">
                                   {{mdiCloudUploadOutline}}
                                </v-icon>
                                  <span
                                    v-if="!imageDataIntro"
                                    class="placeholder"
                                  >
                                  
                                  </span>
                                  <input
                                    class="file-input"
                                    ref="fileInputIntro"
                                    type="file"
                                    @input="onSelectFileIntro"
                                  >
                                </div>
                              </v-col>
                            
                               <v-col cols="12" md="2">
                               <label >Auto Image</label>
                                <div
                                  class="image-input agent-image"
                                  :style="{ 'background-image': `url('${imageDataAuto}')` }"
                                  @click="chooseImageAuto"
                                >
                                <v-icon class="custom-icon" size="30">
                                   {{mdiCloudUploadOutline}}
                                </v-icon>
                                  <span
                                    v-if="!imageDataAuto"
                                    class="placeholder"
                                  >
                                  
                                  </span>
                                  <input
                                    class="file-input"
                                    ref="fileInputAuto"
                                    type="file"
                                    @input="onSelectFileAuto"
                                  >
                                </div>
                               </v-col>

                              <v-col
                                  cols="12"
                                  md="6"
                              >
                              <label class="text-h6" >Application Receipt Email Text</label>
                                  <v-textarea
                                  v-model="emailtext"
                                  label="Application Receipt Email Text"
                                  outlined
                                  dense
                                  placeholder=""
                                  hide-details
                                  ></v-textarea>
                              </v-col>
                              <v-col
                                  cols="12"
                                  md="6"
                              >
                          
                              </v-col>
                            
                              <v-col cols="12" md="6">
                               <v-row>
                                   <v-col cols="12" md="12">
                                    <v-btn color="primary" @click="Submit">
                                    Submit
                                    </v-btn>
                               
                                   <v-btn color="error" style="margin-left:20px" @click="Delete(delId)">
                                    Delete
                                    </v-btn>
                                  </v-col>
                               </v-row>
                              </v-col>
                                 <v-col
                                  cols="12"
                                  md="6"
                              >
                          
                              </v-col>
                              </v-row>
                          </v-form>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
            </v-form>
        </v-card-text>
      </v-card>


    </v-dialog>
  </v-card>  
</template>

<script>
import { mdiSquareEditOutline, mdiDotsVertical } from '@mdi/js'
import data from './datatable-data'
import qs from 'qs';
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
  mdiUploadOutline,
  mdiCloudUploadOutline,
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
      select: { report: 'All', src: 'all' },
        items: [
          { report: 'All', src: 'all' },
          { report: 'YTD', src: 'ytd' },
          { report: '30 Day Total', src: '30' },
          { report: '7 Day Total', src: '7' },
          { report: '1 Day Total', src: '' }
        ],
      editinguser:false,
      useritem:{},
      imageDataAgent: require('@/assets/images/avatars/1.png'),
      imageDataAgency: require('@/assets/images/avatars/default.png'),
      imageDataAuto: require('@/assets/images/avatars/default.png'),
      imageDataHousehold: require('@/assets/images/avatars/default.png'),
      imageDataProperty: require('@/assets/images/avatars/imgpsh_fullsize_anim.png'),
      imageDataIntro: require('@/assets/images/avatars/imgpsh_fullsize_anim.png'),
      agencyimagename:'',
      agentimagename:'',
      propertyimagename:'',
      householdimagename:'',
      introimagename:'',
      autoimagename:'',
      firstName:'',
      link:'',
      lastName:'',
      emailtext:'',
      phone:'',
      address:'',
      agencyname:"",
      email:'',
      
      delId:"",
      componentkey:0,
      search: '',
      dialog:false,
      statusitem:'',
      mdiCloudUploadOutline:mdiCloudUploadOutline,
      mdiDeleteOutline:mdiDeleteOutline,
      mdiPencilOutline:mdiPencilOutline,
      headers: [
        { text: 'NAME', value: 'firstname' ,width:"200px",},
        { text: 'LINK', value: 'link' ,width:"100px",}, 
        { text: 'EMAIL', value: 'email' ,width:"100px",},
        { text:'LAST APP',value:"lastdate",width:"150px",},
        { text:'30 Day Total',value:"counter",width:"150px",sortable: true},
        { text:'USER CREATED',value:'created_at',width:"200px",},

      ],
      usreList: [],
      options: {
        page: 1,
        itemsPerPage: 10,
      },
      status: [
        {text: 'Open',value:0},
        {text: 'Proposed',value:1},
        {text: 'Closed',value:2},
        {text: 'Won',value:3},
        {text: 'Lost',value:4}
      ],
      statusColor,
      // icons
      icons: {
        mdiSquareEditOutline,
        mdiDotsVertical,
      },
    }
  },
  created() {   
    this.getUsers();
  },
  methods:{  
    handleClick(val){
       this.getuser(val._id);
    },
    changeRoute(a) {
      this.getUsers()
      },
    DelConfirm(id) {
           this.delId = id;
           this.dialog = true;
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
    Seldate(arrayApp) {
      var date = new Date();
      var selDate = '';
      if(this.select.src == 'ytd'){
        var start = new Date(date.getFullYear(), 0, 0);
        var diff = date - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        selDate = day;
      }else if(this.select.src == 'all'){
        return arrayApp.length;
      }else{
        selDate = this.select.src;
      }
      
      date.setDate(date.getDate() - selDate);
      var finalDate = (date.getMonth()+1) +'/'+ date.getDate()  +'/'+date.getFullYear();      
      var newApp = arrayApp.filter(function(item){return new Date(item.register_date).getTime() > new Date(finalDate).getTime()});
      return newApp.length;
    },
     async Submit() {
        const data = {
            id:this.useritem._id,
            firstname:this.firstName,
            email:this.email,
            lastname :this.lastName,
            link : this.link,
            phone : this.phone,
            agencyname : this.agencyname,
            emailtext : this.emailtext,
            agentimage : this.agentimagename == ''?this.useritem.agentimage:this.agentimagename,
            introimage : this.introimagename == ''?this.useritem.introimage:this.introimagename,
            propertyimage : this.propertyimagename == ''?this.useritem.propertyimage:this.propertyimagename,
            householdimage : this.householdimagename ==''?this.useritem.householdimage:this.householdimagename,
            agencyimage : this.agencyimagename == ''?this.useritem.agencyimage:this.agencyimagename,
            autoimage : this.autoimagename == ''?this.useritem.autoimage:this.autoimagename,
            role : 0,
        }
        var url = BaseUrl + 'edit';
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url,
          };
          await axios(options).then(response => (console.log(response)))   
          this.editinguser = false;    
          this.getUsers(); 
      },
     async onSelectFileAgency () {
            const input = this.$refs.fileInputAgency
            const files = input.files
            if (files && files[0]) {
                const reader = new FileReader
                reader.onload = e => {
                this.imageDataAgency = e.target.result
                }
                reader.readAsDataURL(files[0])
                this.$emit('input', files[0])
            }
            const formData = new FormData();
            formData.append('file', input.files[0]);
            try{
                await axios.post(BaseUrl+'fileupload', formData);
            }
            catch(err){
                console.log(err);
            }
              var newname = input.files[0].name
            newname = newname.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '').toLowerCase()
            newname = newname.replace(/\s+/g, '').toLowerCase()
            this.agencyimagename = newname
        },
        async onSelectFileIntro () {
            const input = this.$refs.fileInputIntro
            const files = input.files
            if (files && files[0]) {
                const reader = new FileReader
                reader.onload = e => {
                this.imageDataIntro = e.target.result
                }
                reader.readAsDataURL(files[0])
                this.$emit('input', files[0])
            }
            const formData = new FormData();
            formData.append('file', input.files[0]);
            try{
                await axios.post(BaseUrl+'fileupload', formData);
            }
            catch(err){
                console.log(err);
            }
              var newname = input.files[0].name
            newname = newname.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '').toLowerCase()
            newname = newname.replace(/\s+/g, '').toLowerCase()
            this.introimagename = newname
        },
        async onSelectFileProperty () {
            const input = this.$refs.fileInputProperty
            const files = input.files
            if (files && files[0]) {
                const reader = new FileReader
                reader.onload = e => {
                this.imageDataProperty = e.target.result
                }
                reader.readAsDataURL(files[0])
                this.$emit('input', files[0])
            }
            const formData = new FormData();
            formData.append('file', input.files[0]);
            try{
                await axios.post(BaseUrl+'fileupload', formData);
            }
            catch(err){
                console.log(err);
            }
             var newname = input.files[0].name
            newname = newname.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '').toLowerCase()
            newname = newname.replace(/\s+/g, '').toLowerCase()
            this.propertyimagename = newname
        },
        async onSelectFileHousehold () {
            const input = this.$refs.fileInputHousehold
            const files = input.files
            if (files && files[0]) {
                const reader = new FileReader
                reader.onload = e => {
                this.imageDataHousehold = e.target.result
                }
                reader.readAsDataURL(files[0])
                this.$emit('input', files[0])
            }
            const formData = new FormData();
            formData.append('file', input.files[0]);
            try{
                await axios.post(BaseUrl+'fileupload', formData);
            }
            catch(err){
                console.log(err);
            }
            var newname = input.files[0].name
            newname = newname.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '').toLowerCase()
            newname = newname.replace(/\s+/g, '').toLowerCase()
            this.householdimagename = newname
        },
         async onSelectFileAuto () {
            const input = this.$refs.fileInputAuto
            const files = input.files
            if (files && files[0]) {
                const reader = new FileReader
                reader.onload = e => {
                this.imageDataAuto = e.target.result
                }
                reader.readAsDataURL(files[0])
                this.$emit('input', files[0])
            }
            const formData = new FormData();
            formData.append('file', input.files[0]);
            try{
                await axios.post(BaseUrl+'fileupload', formData);
            }
            catch(err){
                console.log(err);
            }
            var newname = input.files[0].name
            newname = newname.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '').toLowerCase()
            newname = newname.replace(/\s+/g, '').toLowerCase()
            this.autoimagename = newname
        },
        async onSelectFileAgent () {
            const input = this.$refs.fileInputAgent
            const files = input.files
            if (files && files[0]) {
                const reader = new FileReader
                reader.onload = e => {
                this.imageDataAgent = e.target.result
                }
                reader.readAsDataURL(files[0])
                this.$emit('input', files[0])
            }
            const formData = new FormData();
            formData.append('file', input.files[0]);
            try{
                await axios.post(BaseUrl+'fileupload', formData);
            }
            catch(err){
                console.log(err);
            }
            var newname = input.files[0].name
            newname = newname.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '').toLowerCase()
            newname = newname.replace(/\s+/g, '').toLowerCase()
            this.agentimagename = newname
            
        },
        chooseImageAgency () {
            this.$refs.fileInputAgency.click()
        },
        chooseImageAgent () {
            this.$refs.fileInputAgent.click()
        },
        chooseImageProperty () {
            this.$refs.fileInputProperty.click()
        },
        chooseImageHousehold () {
            this.$refs.fileInputHousehold.click()
        },
        chooseImageIntro () {
            this.$refs.fileInputIntro.click()
        },
        chooseImageAuto () {
            this.$refs.fileInputAuto.click()
        },
    async getUsers() {
      var _that = this;
      var applicantLst = [];
            try{
                 await axios.get(BaseUrl + `all`).then(response => (_that.usreList = response.data))
                 await axios.get(BaseUrl + `allapplicant`).then(response => (applicantLst = response.data))
                 for(var i=0;i<_that.usreList.length;i++) {
                   var arrApp = applicantLst.filter(function(item){ return _that.usreList[i]['email'] == item.agentemail && _that.usreList[i]['link'] == item.link})
                    if(arrApp.length > 0){
                      _that.usreList[i]['counter'] = await this.Seldate(arrApp);
                              var date = new Date(Math.max(...arrApp.map(e => new Date(e.register_date))));
                      _that.usreList[i]['lastdate'] =  (date.getMonth()+1) +'-'+ date.getDate()  +'-'+date.getFullYear();
                    }

                   
                      var date = new Date(_that.usreList[i]['created_at']);
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
                     _that.usreList[i]['timestap'] = date;
                     _that.usreList[i]['created_at'] = (date.getMonth()+1) +'-'+ date.getDate()  +'-'+date.getFullYear() + ' ' + hour + ':' + min + ':' + sec;

                   
                 }
                  _that.usreList.sort(function(x, y){
                        return y.timestap - x.timestap;
                    })

                   this.$cookies.set('userCnt',this.usreList.length);
                 this.componentkey++;
            }
            catch(err){
                console.log(err);
            }   
    },
     async Delete(id) {
       const data = {
         id : id
       }
            try{
                 await axios.post(BaseUrl + `delete`,data).then(response => (console.log(response)))

                 this.getUsers();
                 this.editinguser = false;
            }
            catch(err){
                console.log(err);
            }   
    },
    async getuser(id) {
            const data = {id:id}
            var url = BaseUrl + 'getuser';
              const options = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(data),
                url,
              };
           await axios(options).then(response => (this.useritem = response.data))

            this.firstName = this.useritem.firstname,
            this.lastName = this.useritem.lastname,
            this.link = this.useritem.link,
            this.agencyname=this.useritem.agencyname,
            this.phone = this.useritem.phone,
            this.email = this.useritem.email,
            this.delId = this.useritem._id,
            this.emailtext = this.useritem.emailtext == undefined || this.useritem.emailtext == ''?"":this.useritem.emailtext,
            this.imageDataAgent = this.useritem.agentimage == undefined || this.useritem.agentimage == ''?require('@/assets/images/avatars/1.png'):BaseUrl+this.useritem.agentimage,
            this.imageDataIntro = this.useritem.introimage == undefined || this.useritem.introimage == ''?require('@/assets/images/avatars/imgpsh_fullsize_anim.png'):BaseUrl+this.useritem.introimage,
             this.imageDataAuto = this.useritem.autoimage == undefined || this.useritem.autoimage == ''?require('@/assets/images/avatars/default.png'):BaseUrl+this.useritem.autoimage,
            this.imageDataProperty = this.useritem.propertyimage == undefined || this.useritem.propertyimage == ''?require('@/assets/images/avatars/imgpsh_fullsize_anim.png'):BaseUrl+this.useritem.propertyimage,
            this.imageDataAgency = this.useritem.agencyimage == undefined || this.useritem.agencyimage == ''?require('@/assets/images/avatars/default.png'):BaseUrl+this.useritem.agencyimage,
            this.imageDataHousehold = this.useritem.householdimage == undefined || this.useritem.householdimage == ''?require('@/assets/images/avatars/default.png'):BaseUrl+this.useritem.householdimage
            this.editinguser = true
            console.log("get user information ", this.useritem)
        },
    

  }
}
</script>
<style>
.v-sheet.v-card {
    border-radius: 6px;
    box-shadow: 0 0 0 0 !important;
}
.AddNewuser{
  border-radius:30px !important
}
.image-input{
 display: block;
  width: 150px;
  height: 150px;
  cursor: pointer;
  background-size :cover;
  background-position: center center
}

.agent-image{
    text-align:center;
}
.agent-image:hover {
    opacity: 0.3;
    text-align:center;
}
.agent-image:hover .custom-icon {
    opacity: 1;
    color:black;
}
.custom-icon{
  opacity:0;
    top:40%;
}

.placeholder{
background: #F0F0F0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica
}
  

.placeholder:hover{
 background: #E0E0E0
}
 .search-bar-responsive{
     position: fixed;top: 52px;left:30%;width:400px;z-index: 1;
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
}

.file-input{
 display :none
}
 .theme--light.v-data-table td {
    color: #000 !important;
}
.v-text-field--outlined > .v-input__control > .v-input__slot {
    background: #fff !important;
}
.cretebtn{
  position: fixed;
    right: 19%;
    top: 5%;
    z-index: 1;
}
</style>

