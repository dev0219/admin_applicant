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
            <v-btn
              block
              color="primary"
              class="mt-6"
              @click="Sendemail()"
            >
              Send Email
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const BaseUrl = 'https://apply.insure/'
import qs from 'qs';
export default {
    data() {
        return {
            email:""
        }
    },
    methods:{     
        async Sendemail() {
            const data = {email: this.email}
             var url = BaseUrl + 'sendemail';
              const options = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(data),
                url,
              };
            await axios(options).then(response => console.log(response))            
        }
    }
}
</script>
    <style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>