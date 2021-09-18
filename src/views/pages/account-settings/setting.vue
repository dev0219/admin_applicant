<template>
  <v-row class="profile">
    <v-col cols="12">
      <v-card>
        <v-card-title class="text-h3">Your Profile</v-card-title>
        <v-card-text class="text-h6">This information will appear on your application web page <br> When your clients </v-card-text>
        <v-card-text >
            <v-form class="multi-col-validation" :key="componentkey">
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
                    :disabled="true"
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

              
                 <v-col cols="12" md="6">
                  <label class="text-h6">Agent Image</label>
                  <div
                    class="image-input"
                    :style="{ 'background-image': `url(${imageDataAgent})` }"
                    @click="chooseImageAgent"
                  >
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
                
                <v-col cols="12" md="6">
                  <label  class="text-h6">Property Image</label>
                  <div
                    class="image-input"
                    :style="{ 'background-image': `url(${imageDataProperty})` }"
                    @click="chooseImageProperty"
                  >
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

                <v-col cols="12" md="6">
                  <label class="text-h6">Agency Image</label>
                  <div
                    class="image-input"
                    :style="{ 'background-image': `url(${imageDataAgency})` }"
                    @click="chooseImageAgency"
                  >
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
                <v-col cols="12" md="6">
                   <label  class="text-h6">Household Image</label>
                  <div
                    class="image-input"
                    :style="{ 'background-image': `url(${imageDataHousehold})` }"
                    @click="chooseImageHousehold"
                  >
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

                <v-col cols="12" md="6">
                  <label class="text-h6">Intro Image</label>
                  <div
                    class="image-input"
                    :style="{ 'background-image': `url(${imageDataIntro})` }"
                    @click="chooseImageIntro"
                  >
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
               

                <v-col
                    cols="12"
                    md="6"
                >
               
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

              

                 

                <v-col cols="12">
                    <v-btn color="primary" @click="Submit">
                    Submit
                    </v-btn>
                </v-col>
                </v-row>
            </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import axios from 'axios'
const BaseUrl = 'https://apply.insure/'
import qs from 'qs';
export default{
    data() {
        return {
            useritem:{},
            imageDataAgent: require('@/assets/images/avatars/1.png'),
            imageDataAgency: require('@/assets/images/avatars/default.png'),
            imageDataHousehold: require('@/assets/images/avatars/default.png'),
            imageDataProperty: require('@/assets/images/avatars/imgpsh_fullsize_anim.png'),
            imageDataIntro: require('@/assets/images/avatars/imgpsh_fullsize_anim.png'),
            agencyimagename:'',
            agentimagename:'',
            propertyimagename:'',
            householdimagename:'',
            introimagename:'',
            firstName:'',
            link:'',
            lastName:'',
            emailtext:'',
            phone:'',
            address:'',
            agencyname:"",
            email:'',
            componentkey:0,
        }
    },
    created () {
       this.getuser(this.$cookies.get('user').id)
    },
    methods:{
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
            this.emailtext = this.useritem.emailtext == undefined || this.useritem.emailtext == ''?"":this.useritem.emailtext,
            this.imageDataAgent = this.useritem.agentimage == undefined || this.useritem.agentimage == ''?require('@/assets/images/avatars/1.png'):BaseUrl+this.useritem.agentimage,
            this.imageDataIntro = this.useritem.introimage == undefined || this.useritem.introimage == ''?require('@/assets/images/avatars/imgpsh_fullsize_anim.png'):BaseUrl+this.useritem.introimage,
            
            this.imageDataProperty = this.useritem.propertyimage == undefined || this.useritem.propertyimage == ''?require('@/assets/images/avatars/imgpsh_fullsize_anim.png'):BaseUrl+this.useritem.propertyimage,
            this.imageDataAgency = this.useritem.agencyimage == undefined || this.useritem.agencyimage == ''?require('@/assets/images/avatars/default.png'):BaseUrl+this.useritem.agencyimage,
            this.imageDataHousehold = this.useritem.householdimage == undefined || this.useritem.householdimage == ''?require('@/assets/images/avatars/default.png'):BaseUrl+this.useritem.householdimage
            this.componentkey++;
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
                role : 0,
            }
           var url = BaseUrl + 'edit';
           const options = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(data),
                url,
              };
             await axios(options).then(response => (console.log(response)))        },
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
            this.agencyimagename = input.files[0].name
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
            this.introimagename = input.files[0].name
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
            this.propertyimagename = input.files[0].name
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
            this.householdimagename = input.files[0].name
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
            this.agentimagename = input.files[0].name
            
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
        }

    }
}
</script>
<style scoped>
.base-image-input {
  display: block;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}
.placeholder {
  background: #F0F0F0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
}
.placeholder:hover {
  background: #E0E0E0;
}
.file-input {
  display: none;
}
.profile{
margin-top: 20px;
    padding: 0px 20% 0px 20%;
}
</style>