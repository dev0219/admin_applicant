<template>
  <v-row style="margin-top:20px">
    <v-col cols="12">
      <v-card>
        <v-card-title>Create User</v-card-title>
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
                    v-model="phone"
                    label="Phone"
                    outlined
                    dense
                    placeholder="Phone"
                    hide-details
                    ></v-text-field>
                </v-col>

                <v-col
                    cols="12"
                    md="6"
                >
                    <v-text-field
                    v-model="address"
                    label="Address"
                    outlined
                    dense
                    placeholder="Address"
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
                <v-col cols="12" md="6">
                <label>Status</label>
                     <v-select
                        v-model="statusitem"
                        :items="status"
                    ></v-select>  
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
    </v-col>
  </v-row>
</template>
<script>
import axios from 'axios'
const BaseUrl = 'https://apply.insure/'
export default{
    data() {
        return {
            imageDataAgent: null,
            imageDataAgency: null,
            agencyimagename:'',
            agentimagename:'',
            firstName:'',
            link:'',
            lastName:'',
            phone:'',
            address:'',
            agencyname:"",
            statusitem:1,
            email:'',
            checkbox:'',
            status: [
                {text: 'Open',value:0},
                {text: 'Proposed',value:1},
                {text: 'Closed',value:2},
                {text: 'Won',value:3},
                {text: 'Lost',value:4}
            ],
        }
    },
    methods:{
        async Submit() {
            const data = {
                firstname:this.firstName,
                email:this.email,
                lastname :this.lastName,
                address : this.address,
                phone : this.phone,
                link : this.link,
                agencyname : this.agencyname,
                role : 0,
                status : this.statusitem
            }
            try{
                 await axios.post(BaseUrl + `create`, data).then(response => (console.log(response)))
                 this.$router.push('/dashboard');
            }
            catch(err){
                console.log(err);
            }           
        },
        Cancel() {
            this.$router.push('/dashboard');
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
            this.agencyimagename = input.files[0].name
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
</style>