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

        <!-- Registry form -->
        <form v-show="!login_active">
          <v-text-field
          v-model="registry.name"
          label="Name"
          required
          ></v-text-field>

          <v-text-field
          v-model="registry.email"
          :error-messages="registry.emailErrors"
          label="E-mail"
          required
          ></v-text-field>

          <v-text-field
          v-model="registry.cpf"
          :error-messages="registry.cpfErrors"
          label="CPF"
          return-masked-value
          mask="###.###.###-##"
          required
          ></v-text-field>

          <v-text-field
          v-model="registry.birthday"
          return-masked-value
          mask="##/##/####"
          label="Birthday"
          required
          ></v-text-field>

          <v-text-field
          v-model="registry.password"
          :append-icon="visibility_icon ? 'far fa-eye' : 'far fa-eye-slash'"
          :append-icon-cb="() => (visibility_icon = !visibility_icon)"
          :type="visibility_icon ? 'password' : 'text'"
          label="Password"
          min="8"
          required
          counter="16"
          ></v-text-field>

          <v-alert v-if="registry.error" :value="true" type="error">
            {{registry.error}}
          </v-alert>

          <v-alert v-if="registry.success" :value="true" type="success">
            {{registry.success}}
          </v-alert>

          <v-btn @click="signup">Submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import API from '@/services/AuthenticationService'

  export default {
    data() {
      return {
        visibility_icon: true,
        login_active: true,
        registry: {
          name: '',
          password: '',
          email: '',
          cpf: '',
          birthday: '',
          emailErrors: undefined,
          cpfErrors: undefined,
          error: null,
          success: null
        },
        login: {
          email: '',
          password: '',
          error: null
        }
      }
    },
    methods: {
      clear () {
        this.registry.name = ''
        this.registry.password = ''
        this.registry.email = ''
        this.registry.cpf = ''
        this.registry.birthday = ''
        this.registry.error = ''
        this.registry.emailErrors = undefined
        this.registry.cpfErrors = undefined
      },

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
      },

      invertedDate(){
      /* Temporary solution for format date to database */
      return  (this.registry.birthday.substr(6, 4)+'/'+
              this.registry.birthday.substr(3, 2)+'/'+
              this.registry.birthday.substr(0, 2))
      },

      signup () {
        
        API.user_register({
          name: this.registry.name,
          email: this.registry.email,
          cpf: this.registry.cpf,
          password: this.registry.password,
          type: 1,
          birthday: this.invertedDate()
        })
        .then((response)=>{
          this.clear()
          this.registry.success = "Successful registration!"
        })
        .catch((error)=>{
          console.log(error.response.data)
          /* Show error case email or cpf exist in system */
          if(error.response.data.Error.code === 11000)
          {
              const errorMsg = new String(error.response.data.Error.errmsg)

              if(errorMsg.search('email') != -1)
                this.registry.emailErrors = "Email exist, enter other email"
              else
                this.registry.emailErrors = undefined

              if(errorMsg.search('cpf') != -1)
                this.registry.cpfErrors = "This cpf exist in system"
              else
                this.registry.cpfErrors = undefined

          }else
              this.error = error.response.data.Error.message // show some error
        })
      },

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
  .div_buttons button{
    
  }
</style>