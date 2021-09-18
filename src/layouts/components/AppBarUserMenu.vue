<template>
  <v-menu
    offset-y
    right
    nudge-bottom="14"
    min-width="230"
    content-class="user-profile-menu-content"
  >
    <template v-slot:activator="{ on, attrs }">
        <div ><p  style="margin-bottom:0px !important">Welcome Back.</p><h4  v-bind="attrs"
          v-on="on">{{username}}.<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg"><path d="M7,10L12,15L17,10H7Z"></path></svg></h4>

          </div>
        <v-avatar
          size="40px"
         
        >       
          <v-img :src="avartar"></v-img>          
        </v-avatar>
      
      
    </template>
    <v-list>
      <v-list-item link @click="logout">
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiLogoutVariant }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
const BaseUrl = 'https://apply.insure/'
import {
  mdiAccountOutline,
  mdiEmailOutline,
  mdiCheckboxMarkedOutline,
  mdiChatOutline,
  mdiCogOutline,
  mdiCurrencyUsd,
  mdiHelpCircleOutline,
  mdiLogoutVariant,
} from '@mdi/js'

export default {
  setup() {
    return {
      username:'',
      avartar:require('@/assets/images/avatars/1.png'),
      icons: {
        mdiAccountOutline,
        mdiEmailOutline,
        mdiCheckboxMarkedOutline,
        mdiChatOutline,
        mdiCogOutline,
        mdiCurrencyUsd,
        mdiHelpCircleOutline,
        mdiLogoutVariant,
      },
    }
  },
  created() {
    var userdata = this.$cookies.get('user');
    if(!userdata){
      this.$router.push('/login');
    }
    if(userdata.role==1) {
      this.username = 'Admin'
      if(userdata.argentimage == undefined){
        this.avartar = require('@/assets/images/avatars/1.png');
      }else{
        this.avartar = BaseUrl + userdata.argentimage
      }
      
    }else{
      this.username=userdata.firstname
      if(userdata.argentimage == undefined){
        this.avartar = require('@/assets/images/avatars/1.png');
      }else{
        this.avartar = BaseUrl + userdata.argentimage
      }
    }
  },
  methods:{
    logout() {
     this.$cookies.remove('user');
     this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss">
.user-profile-menu-content {
  .v-list-item {
    min-height: 2.5rem !important;
  }
}
</style>
