<template>
  <v-card id="account-setting-card">
    <!-- tabs -->
    <v-tabs
      v-model="tab"
      show-arrows
    >
  
      <v-tab
        v-for="tab in tabs"
        :key="tab.icon"
        :class="tab.title"
      >
        
      <span>{{ tab.title }}</span>
      <div class="counter" :key="componentkey" v-if="tab.title == 'Applications'">{{applicantCnt}}</div>
  
      <div class="counter"  :key="componentkey" v-if="tab.title == 'Allusers'">{{userCnt}}</div>
        
      </v-tab>
    </v-tabs>

    <!-- tabs item -->
    <v-tabs-items v-model="tab">
      <v-tab-item class="res_datatable" >
        <action-datatable></action-datatable>
      </v-tab-item>

      <v-tab-item v-if="!isadmin">
        <SettingDatatable  ></SettingDatatable>
      </v-tab-item>

      <v-tab-item v-if="isadmin" class="res_datatable" >
        <dashboard-datatable></dashboard-datatable>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mdiAccountOutline, mdiLockOpenOutline, mdiInformationOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'

// demos
import DashboardDatatable from './DashboardDatatable.vue'
import ActionDatatable from './ActionDatatable.vue'
import SettingDatatable from '../pages/account-settings/setting.vue'
import axios from 'axios'
const BaseUrl = 'https://apply.insure/'
export default {
  components: {
     DashboardDatatable,
     ActionDatatable,
     SettingDatatable
  },
  setup() {
    const tab = ref('')
    // tabs
    const tabs = [
      { title: 'Applications', icon: mdiInformationOutline },
      { title: 'Settings', icon: mdiLockOpenOutline },
      { title: 'Allusers', icon:  mdiAccountOutline},
    ]

    // account settings data
    const accountSettingData = {
      account: {
        avatarImg: require('@/assets/images/avatars/1.png'),
        username: 'johnDoe',
        name: 'john Doe',
        email: 'johnDoe@example.com',
        role: 'Admin',
        status: 'Active',
        company: 'Google.inc',
      },
      information: {
        bio: 'The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scaLabel 😀, and lightning 😍 fast search and discovery experiences.',
        birthday: 'February 22, 1995',
        phone: '954-006-0844',
        website: 'https://themeselection.com/',
        country: 'USA',
        languages: ['English', 'Spanish'],
        gender: 'male',
      },
    }

    return {
      tab,
      tabs,
     isadmin:false,
      applicantCnt:'',
     usreList: [],
     componentkey:0,
     userCnt:'',
      accountSettingData,
      icons: {
        mdiAccountOutline,
        mdiLockOpenOutline,
        mdiInformationOutline,
      },
    }
  },
  created() {
     this.getCnt();
     this.getUsers()
    if(this.$cookies.get('user').role == 0) {
       this.isadmin = false
        this.tabs = this.tabs.filter(function(item) {
            return item.title !== "Allusers"
           
        })
      }else{
         this.isadmin = true;
        this.tabs = this.tabs.filter(function(item) {
         
            return item.title !== "Settings"
        })
      }
   
  },
  methods:{
    getCnt() {
      var _that = this;
      setInterval(function(){ _that.getUsers(); }, 3000);
    },
    async getUsers() {
       this.userCnt = this.$cookies.get('userCnt');
       this.applicantCnt = this.$cookies.get('applicantcounter');
       this.componentkey++;
    },
  }
}
</script>
<style>
 .counter{
    width:27px;height:15px;border-radius:40%;color:black;font-size:13px;margin-left:10px
  }
   .Applications{
    margin-left:20%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background: #fff;
  }
   .res_datatable {
    padding: 0px 350px;
  }
@media  screen and (max-width: 1900px) {
  .res_datatable {
    padding: 0px 350px;
  }
  .Applications{
    margin-left:20%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background: #fff;
  }
}
@media  screen and (max-width: 1801px) {
  .res_datatable {
    padding: 0px 220px;
  }
  .Applications{
    margin-left:20%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background: #fff;
  }
}
@media  screen and (max-width: 1565px) {
  .res_datatable {
    padding: 0px 150px;
  }
  .Applications{
    margin-left:20%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background: #fff;
  }
}
@media  screen and (max-width: 1444px) {
  .res_datatable {
    padding: 0px 120px;
  }
  .Applications{
    margin-left:20%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background: #fff;
  }
}
@media  screen and (max-width: 1372px) {
  .res_datatable {
    padding: 0px 90px;
  }
  .Applications{
    margin-left:20%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background: #fff;
  }
}
@media  screen and (max-width: 1313px) {
  .res_datatable {
    padding: 0px 80px;
  }
  .Applications{
    margin-left:20%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background: #fff;
  }
}
@media  screen and (max-width: 1298px) {
  .res_datatable {
    padding: 0px 50px;
  }
  .Applications{
    margin-left:20%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background: #fff;
  }
}
@media  screen and (max-width: 1000px) {
  .res_datatable {
    padding: 0px 25px;
  }
  .Applications{
    margin-left:20%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background: #fff;
  }
}
@media  screen and (max-width: 768px) {
  .res_datatable {
    padding: 0px 0px;
  }
  .Applications{
    margin-left:18%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background: #fff;
  }
}
@media  screen and (max-width: 636px) {
  .Applications{
    margin-left:15%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background: #fff;
  }
}
@media  screen and (max-width: 414px) {
  .Applications{
    margin-left:0%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background: #fff;
  }
}

#account-setting-card{
  margin-top:80px;
      height: calc(100vh - 200px);
}
.tabs-style{
  background: #fff;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}
.v-slide-group__content {
  background: #f4f5fa;
}

.Settings{
  background: #fff;
  border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}
.Allusers{
   background: #fff;
  border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}
.v-application.theme--light .v-tabs:not(.v-tabs--vertical) {
    box-shadow: 0 0 0 0 !important;
}
</style>
