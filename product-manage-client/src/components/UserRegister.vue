<template>
    <div class="hello">
        <component-header />
        <div class="container-fluid">
            <div class="row justify-content-md-center"">
                <form class="form col-5" @submit.prevent="register">
                    <div class="form-group">
                        <label for="inputName">Name</label>
                        <input required type="text" name="name" v-model="name" class="form-control" id="inputName" placeholder="Name">
                    </div>
                    <div class="form-group">
                        <label for="inputEmail">Email address</label>
                        <input required type="email" name="email" v-model="email" class="form-control" id="inputEmail" placeholder="Enter email">
                        <div class="alert alert-danger" v-if="emailError" role="alert">
                            {{emailError}}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputCpf">CPF</label>
                        <input required type="text" name="cpf" v-model="cpf" class="form-control" id="inputCpf" placeholder="000.000.000-00">
                        <div class="alert alert-danger" v-if="cpfError" role="alert">
                            {{cpfError}}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputBirthday">Birthday</label>
                        <input required type="date" name="birthday" v-model="birthday" class="form-control" id="inputBirthday">
                    </div>
                    <div class="form-group">
                        <label for="inputPassword">Password</label>
                        <input required type="password" name="password" v-model="password" class="form-control" id="inputPassword" placeholder="Password">
                    </div>
                    <div class="alert alert-danger" v-if="error" role="alert">
                        {{error}}
                    </div>
                    <button type="submit" class="btn btn-dark">Registry</button>
                </form>
            </div>
        </div>
        </div>
</template>

<script>

import Auth from '@/services/AuthenticationService'
import ComponentHeader from '@/components/Header'

export default {
    name: 'UserRegister',
    data () {
        return {
            error: null,
            emailError: null,
            cpfError: null,
            name: '',
            email: '',
            cpf: '',
            birthday: '',
            password: ''

        }
    },
    components: {
        ComponentHeader
    },
    methods:{
        async register()
        {

            const data = {
                name: this.name,
                email: this.email,
                cpf: this.cpf,
                password: this.password,
                type: 1,
                birthday: this.birthday
            }
            try
            {
                await Auth.user_register(data);
                this.$router.push('/')
            }catch(error)
            {
                /* Show error case email or cpf exist in system */
                if(error.response.data.Error.code === 11000)
                {
                    const errorMsg = new String(error.response.data.Error.errmsg)
                    if(errorMsg.search('email') != -1)
                        this.emailError = "Email exist, enter other email please"

                    else if(errorMsg.search('cpf') != -1)
                        this.cpfError = "This cpf exist in system"
                }else
                    this.error = error.response.data // show some error
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
