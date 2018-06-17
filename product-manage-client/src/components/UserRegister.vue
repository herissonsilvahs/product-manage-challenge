<template>
    <div class="hello">
        <div class="row justify-content-md-center"">
            <form class="form col-5">
                <div class="form-group">
                    <label for="inputName">Name</label>
                    <input type="text" name="name" v-model="name" class="form-control" id="inputName" placeholder="Name">
                </div>
                <div class="form-group">
                    <label for="inputEmail">Email address</label>
                    <input type="email" name="email" v-model="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                    <label for="inputCpf">CPF</label>
                    <input type="text" name="cpf" v-model="cpf" class="form-control" id="inputCpf" placeholder="000.000.000-00">
                </div>
                <div class="form-group">
                    <label for="inputBirthday">Birthday</label>
                    <input type="date" name="birthday" v-model="birthday" class="form-control" id="inputBirthday">
                </div>
                <div class="form-group">
                    <select name="user_type" v-model="user_type" class="custom-select">
                        <option value="">User Type</option>
                        <option value="0">Administrator</option>
                        <option value="1">Client</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="inputPassword">Password</label>
                    <input type="password" name="password" v-model="password" class="form-control" id="inputPassword" placeholder="Password">
                </div>
                <button @click="register" type="button" class="btn btn-primary">Registry</button>
            </form>
        </div>
    </div>
</template>

<script>

import Header from './Header.vue'
import AuthenticationService from '@/services/AuthenticationService';

export default {
    name: 'UserRegister',
    data () {
        return {
            name: '',
            email: '',
            cpf: '',
            birthday: '',
            user_type: '',
            password: ''

        }
    },
    components: {
        Header
    },
    methods:{
        async register() {
            const data = {
                name: this.name,
                email: this.email,
                cpf: this.cpf,
                password: this.password,
                type: this.user_type,
                birthday: this.birthday
            }
            const response = await AuthenticationService.user_register(data);
            console.log(response);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .hello{ text-align: center; }
</style>
