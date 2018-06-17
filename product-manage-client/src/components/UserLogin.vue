<template>
    <div class="hello">
        <div class="row justify-content-md-center"">
            <form class="form col-5">
                <div class="form-group">
                    <label for="inputEmail">Email address</label>
                    <input type="email" name="email" v-model="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                    <label for="inputPassword">Password</label>
                    <input type="password" name="password" v-model="password" class="form-control" id="inputPassword" placeholder="Password">
                </div>
                <div class="alert alert-danger" v-if="error" role="alert">
                    {{error}}
                </div>
                <button @click="login" type="button" class="btn btn-primary">Login</button>
            </form>
        </div>
    </div>
</template>

<script>

    import Auth from '@/services/AuthenticationService'

    export default {
        name: 'UserLogin',
        data() {
            return {
                error: null,
                email: '',
                password: ''
            }
        },
        methods: {
            async login() {
                const data = {
                    email: this.email,
                    password: this.password
                }

                try{
                    const response = await Auth.user_login(data);

                    console.log(response);

                }catch(error){
                    this.error = error.response.data.message;
                }
            }
        }
    }
</script>