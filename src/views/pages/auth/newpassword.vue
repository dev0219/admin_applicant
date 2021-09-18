<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="newpassword"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="New Password"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <v-text-field
            class="mt-2"
              v-model="confirmpassword"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Confirm Password"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            

            <v-btn
              block
              color="primary"
              class="mt-6"
              @click="reset()"
            >
             Reset Password 
            </v-btn>
          </v-form>
        </v-card-text>

      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
    >

    <!-- tree -->
    <v-img
      class="auth-tree"
      width="247"
      height="185"
      src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      src="@/assets/images/misc/tree-3.png"
    ></v-img>
     <v-dialog
      v-model="loginstatus"
      width="500"
      content-class="vdialognew"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
           Reset Failed
        </v-card-title>

        <v-card-text>
          <h4>The new password and confirmed password does not matach. Please confirm again.</h4>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="loginstatus = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import axios from 'axios'
const BaseUrl = 'https://apply.insure/'

export default {
  setup() {
    const isPasswordVisible = ref(false)
    const confirmpassword = ref('')
    const newpassword = ref('')
    const socialLink = [
      {
        icon: mdiFacebook,
        color: '#4267b2',
        colorInDark: '#4267b2',
      },
      {
        icon: mdiTwitter,
        color: '#1da1f2',
        colorInDark: '#1da1f2',
      },
      {
        icon: mdiGithub,
        color: '#272727',
        colorInDark: '#fff',
      },
      {
        icon: mdiGoogle,
        color: '#db4437',
        colorInDark: '#db4437',
      },
    ]

    return {
       loginstatus:false,
      isPasswordVisible,
      confirmpassword,
      newpassword,
      socialLink,
      userid:'',
      response:{},
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
  created() {
    this.getUserId()
  },
  methods: {
    async getUserId() {
      var token = {token:this.$route.params.id};      
            try{
                 await axios.post(BaseUrl+'getuserid',token).then(response=>(this.userid = response.data.userid))
            }
            catch(err){
                console.log(err);
            } 
    },
    async reset() {
        if(this.confirmpassword != this.newpassword){
           this.loginstatus = true
            return false;
        }
      const data = {
        newpassword: this.newpassword,
        id: this.userid
      }
      const result = null;
     
      try{
                 await axios.post(BaseUrl + 'resetpassword', data).then(response => this.response = response)
            
                 console.log("response", this.response.data.status)
                 if(this.response.data.status == 0){
                   this.$router.push('/login')
                 }
            }
            catch(err){
                console.log(err);
            } 
    
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
