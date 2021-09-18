<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">

        <!-- login form -->
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              outlined
              label="Email"
              placeholder="john@example.com"
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox
                label="Remember Me"
                hide-details
                class="me-3 mt-1"
              >
              </v-checkbox>

              <!-- forgot link -->
              <a
                @click="forgotlink()"
                class="mt-1"
              >
                Forgot Password?
              </a>
            </div>

            <v-btn
              block
              color="primary"
              class="mt-6"
              @click="Login()"
            >
              Login
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
           Login Failed
        </v-card-title>

        <v-card-text>
          <h4>This user does not exist.
          Please try agin.</h4>
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
import qs from 'qs';
export default {
  setup() {
    const isPasswordVisible = ref(false)
    const email = ref('')
    const password = ref('')
    const userinfo = ref(null)
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
      isPasswordVisible,
      email,
      loginstatus:false,
      userinfo:null,
      password,
      socialLink,
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
  created() {},
  methods: {
    forgotlink() {
      this.$router.push("/forgotpassword")
    },
    async Login() {
      const data = {
        email: this.email,
        password: this.password,
      }
      var _that = this;
      var url = BaseUrl + 'dashboardlogin';
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
      };
      
      await axios(options).then(response => (_that.userinfo = response))
      if(!this.userinfo.data.user){
        this.loginstatus = true
        
        return false;
      }else{
        var userinfo = {id:this.userinfo.data.user._id,email:this.userinfo.data.user.email, role:this.userinfo.data.user.role,firstname:this.userinfo.data.user.firstname,argentimage:this.userinfo.data.user.agentimage,link:this.userinfo.data.user.link};
        this.$cookies.set("user",userinfo,60 * 60 * 12);
        this.$router.push('/')
      }
    },
  },
}
</script>
<style>
.vdialognew{
  margin-top:-500px
}
</style>
<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
