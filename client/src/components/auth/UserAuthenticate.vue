<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs4 offset-xs4>
        <v-flex offset-xs2 class="div_buttons">
          <v-btn
            large
            :class=" login_active ? 'btn--active grey--text': ''" @click="switchTo('login')">Sign In
          </v-btn>
          <v-btn
            large
            :class=" !login_active ? 'btn--active grey--text' : '' " @click="switchTo('registry')">
            Sign Up
          </v-btn>
        </v-flex>
        <!-- Login form -->
        <user-sign-in :login_active="login_active"/>

        <!-- Registry form -->
        <user-sign-up :login_active="login_active" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import API from '@/services/AuthenticationService'
  import UserSignUp from './UserSignUp.vue'
  import UserSignIn from './UserSignIn.vue'

  export default {
    data() {
      return {
        login_active: true,
      }
    },
    components:{
      UserSignUp,
      UserSignIn
    },
    methods: {
      /*Forms effect*/
      switchTo(form){
        if(form=='registry')
          this.login_active=false

        if(form=='login')
         this.login_active=true
      }
   }
 }
</script>

<style scoped>

</style>