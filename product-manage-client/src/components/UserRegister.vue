<template>
    <div class="hello">
        <component-header />
        <div class="container-fluid">
            <div class="row justify-content-md-center"">
                <form class="form col-5">
                    <div class="form-group">
                        <label for="inputName">Name</label>
                        <input required type="text" name="name" v-model="name" class="form-control" id="inputName" placeholder="Name">
                    </div>
                    <div class="form-group">
                        <label for="inputEmail">Email address</label>
                        <input required type="email" name="email" v-model="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email">
                        <small id="emailHelp" class="form-text text-muted"></small>
                    </div>
                    <div class="form-group">
                        <label for="inputCpf">CPF</label>
                        <input required type="text" name="cpf" v-model="cpf" class="form-control" id="inputCpf" placeholder="000.000.000-00">
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
                    <div class="alert alert-success" v-if="success" role="alert">
                        {{success}}
                    </div>
                    <button @submit.prevent="register" type="submit" class="btn btn-primary">Registry</button>
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
            success:null,
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
        async register() {

            const data = {
                name: this.name,
                email: this.email,
                cpf: this.cpf,
                password: this.password,
                type: 1,
                birthday: this.birthday
            }
            try{
                await Auth.user_register(data);
            }catch(error){
                this.error = error.response.data.message;
            }

            this.error = "Registry success";
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
