<template>
    <div class="hello">
        <div class="row justify-content-md-center"">
            <form class="form col-5">
                <div class="form-group">
                    <label for="inputName">Name</label>
                    <input type="text" class="form-control" id="inputName" placeholder="Name">
                </div>
                <div class="form-group">
                    <label for="inputEmail">Email address</label>
                    <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="inputCpf">CPF</label>
                    <input type="password" class="form-control" id="inputCpf" placeholder="000.000.000-00">
                </div>
                <div class="form-group">
                    <label for="inputBirthday">Birthday</label>
                    <input type="date" class="form-control" id="inputBirthday">
                </div>
                <div class="form-group">
                    <select name="" class="custom-select">
                        <option value="">User Type</option>
                        <option value="0">Administrator</option>
                        <option value="1">Client</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="inputPassword">Password</label>
                    <input type="password" class="form-control" id="inputPassword" placeholder="Password">
                </div>
                <button type="button" class="btn btn-primary">Registry</button>
            </form>
        </div>
    </div>
</template>

<script>

import Header from './Header.vue'

export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    components: {
        Header
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .hello{ text-align: center; }
</style>
