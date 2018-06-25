<template>
    <div v-if="$store.state.userLogged">
        <component-header />
        <div class="container-fluid">
            <div class="row">
                <ul class="nav flex-column col-2 text-left">
                  <li class="nav-item" v-show="$store.state.user.type === 0">
                    <a class="nav-link" href="#/dashboard" @click="showView('product')">Product</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#/dashboard" @click="showView('profile')">Profile</a>
                  </li>
                </ul>
                <div class="col-10" v-if="view ==='product'">
                    <product-dashboard />
                </div>
                <div class="col-10" v-else-if="view === 'profile'">
                    <profile-dashboard />
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="!$store.state.userLogged">
        <div class="alert alert-danger" role="alert">
            User not logged, please login <router-link to="/">here</router-link> 
            for access this page.
        </div>
    </div>
</template>

<script>
    import ComponentHeader from '@/components/Header'
    import ProductDashboard from '@/components/dashboards/ProductDashboard'
    import ProfileDashboard from '@/components/dashboards/ProfileDashboard'

    export default {
        data(){
            return{
                view: 'profile'
            }
        },
        components: {
            ComponentHeader,
            ProductDashboard,
            ProfileDashboard
        },
        methods:{
            showView(view){
                this.view = view;
            }
        }
    }
</script>