<template>
  <v-app>
    

    <v-app-bar
      app
      flat
      absolute
      color="transparent"
    >
      <div class="boxed-container w-full">
        <div class="d-flex align-center mx-6" style="margin-top:80px">
          <!-- Left Content -->
        
      

          <v-spacer></v-spacer>

          <!-- Right Content -->
          <v-btn v-if="role=='User'" class="copylink mr-4" dark>Copy Link</v-btn>
          <v-btn   v-if="role=='Admin'" class="copylink mr-4" @click="Createuser" dark>Create User</v-btn>
          <app-bar-user-menu></app-bar-user-menu>
        </div>
      </div>
    </v-app-bar>

    <v-main>
    <p class="rolestyle ml-10" style="color: #000 !important">{{role}}</p>
      <div class="app-content-container boxed-container" style="max-width:2000px">
        <slot></slot>
      </div>
    </v-main>
    <v-dialog
      v-model="createuser"
      max-width="1000"
      
    >
      <v-card class="AddNewuser">
        <v-card-title class="text-h3">
          Add New User
        </v-card-title>
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
                    sm="6"
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
                 <v-col
                    cols="12"
                    sm="6"
                >
                    <v-text-field
                    v-model="phone"
                    label="Phone Number"
                    outlined
                    dense
                    placeholder="Phone Number"
                    hide-details
                    ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <label class="text-h6">Agent Image</label>
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
                <v-col cols="12" md="6">
                <label  class="text-h6">Agency Image</label>
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

                <v-col cols="12">
                    <v-btn color="primary" @click="Submit">
                    Submit
                    </v-btn>
                    <v-btn
                    @click="Cancel"
                    outlined
                    class="mx-2"
                    >
                    Cancel
                    </v-btn>
                </v-col>
                </v-row>
            </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    
  </v-app>
</template>

<script>
import { ref } from '@vue/composition-api'
import { mdiMagnify, mdiBellOutline, mdiGithub,mdiCloudUploadOutline } from '@mdi/js'
import VerticalNavMenu from './components/vertical-nav-menu/VerticalNavMenu.vue'

import AppBarUserMenu from './components/AppBarUserMenu.vue'
import axios from 'axios'
import qs from 'qs';
const BaseUrl = 'https://apply.insure/'
export default {
  components: {
    VerticalNavMenu,
    AppBarUserMenu,
  },
  setup() {
    const isDrawerOpen = ref(null)

    return {
      imageDataAgent: require('@/assets/images/avatars/1.png'),
      imageDataAgency: require('@/assets/images/avatars/default.png'),
      agencyimagename:'',
      agentimagename:'',
      firstName:'',
      link:'',
      lastName:'',
      agencyname:"",
      email:'',
      mdiCloudUploadOutline:mdiCloudUploadOutline,
      phone:'',
      emailtext:'Thank you for your application',
      createuser:false,
      isDrawerOpen,
       role:'',
      // Icons
      icons: {
        mdiMagnify,
        mdiBellOutline,
        mdiGithub,
      },
    }
  },
  created() {
   this.getUserRole()
  },
  methods:{
    Createuser() {
      this.createuser = true;
    },
    getUserRole() {
      var userdata = this.$cookies.get('user');
      if(userdata.role==1) {
        this.role = 'Admin'
      }else{
        this.role='User'
      }
      },
    async Submit() {
            const data = {
                firstname:this.firstName,
                email:this.email,
                lastname :this.lastName,
                agentimage :this.agentimagename != ''?this.agentimagename:'user.png',
                agencyimag : this.agencyimagename,
                phone : this.phone,
                link : this.link,
                agencyname : this.agencyname,
                emaitext : this.emailtext,
                role : 0,
            }
            var url = BaseUrl + 'create';
           
               const options = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(data),
                url,
              };
                 await axios(options).then(response => console.log(response))
                 this.createuser = false;
           
                     
        },
        Cancel() {
            this.createuser = false
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
        }
  }
}
</script>

<style lang="scss" scoped>
.v-app-bar ::v-deep {
  .v-toolbar__content {
    padding: 0;

    .app-bar-search {
      .v-input__slot {
        padding-left: 18px;
      }
    }
  }
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
.copylink{
  background: #ff0a83 !important;
  color:white !important;
}

.boxed-container {
  max-width: 1560px;
  margin-left: auto;
  margin-right: auto;
}
.rolestyle{
  font-size:45px;
  font-weight:500;
}
@media  screen and (max-width: 520px) {
  .rolestyle{
    font-size:30px;
    font-weight:500;
    margin-top:35px
  }
}
</style>
