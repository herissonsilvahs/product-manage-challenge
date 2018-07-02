<template>
  <form v-show="login_active">
    <v-text-field
    v-model="login.email"
    :error-messages="login.emailErrors"
    label="E-mail"
    required
    ></v-text-field>

    <v-text-field
    v-model="login.password"
    :append-icon="visibility_icon ? 'far fa-eye' : 'far fa-eye-slash'"
    :append-icon-cb="() => (visibility_icon = !visibility_icon)"
    :type="visibility_icon ? 'password' : 'text'"
    name="input-10-1"
    label="Enter your password"
    hint="At least 8 characters"
    min="8"
    counter="16"
    required
    ></v-text-field>

    <v-alert v-if="login.error" :value="true" type="error">
      {{login.error}}
    </v-alert>

    <v-btn @click="signin">entry</v-btn>
  </form>
</template>

<script>
  import API from '@/services/AuthenticationService'
  export default{
    props:{
      login_active: {type: Boolean}
    },
    data(){
      return {
        visibility_icon: true,
        login: {
          email: '',
          password: '',
          error: null
        }
      }
    },
    methods:{
      signin () {
        API.user_login({
          email: this.login.email,
          password: this.login.password
        })
        .then((response)=>{
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user_data)
          this.$router.push({
            name: 'profile_dashboard',
            params: {action: 'geral'} 
          })
        })
        .catch((error)=>{
          this.login.error = error.response.data.message;
        })
      }
    }
  }
</script>