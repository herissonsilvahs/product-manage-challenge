<template>
  <v-content>
    <!-- Dashboard content -->
    <v-container v-if="$store.state.userLogged" fluid>
      <v-navigation-drawer app clipped fixed>
        <v-list dense class="pt-0">
          <v-list-group
            prepend-icon="fas fa-user"
            no-action
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>Profile</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile 
              :to="{ name: 'profile_dashboard', params: { action: 'geral' } }"
              @click="">
              <v-list-tile-action>
                <v-icon>fas fa-list-alt</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Geral</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile 
              :to="{ name: 'profile_dashboard', params: { action: 'access' } }"
              @click="">
              <v-list-tile-action>
                <v-icon>fas fa-lock</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Access Control</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>

          <v-list-group
            prepend-icon="fas fa-shopping-bag"
            no-action
            v-if="$store.state.user.type == 0"
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>Product</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile 
              :to="{ name: 'product_dashboard', params: { action: 'list' } }"
              @click="">
              <v-list-tile-action>
                <v-icon>fas fa-th-list</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>List</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
      <router-view />
    </v-container>
    <!-- End Dashboard content -->

    <!-- Alert for user not legged -->
    <v-alert v-else-if="!$store.state.userLogged" :value="true" type="error">
      User not logged, please login <router-link to="/">here</router-link> for access this page.
    </v-alert>
    <!-- End Alert -->

  </v-content>
</template>

<script>
  // import ProductDashboard from '@/components/dashboards/ProductDashboard'
  // import ProfileDashboard from '@/components/dashboards/ProfileDashboard'

  export default {
    data(){
      return{
        right: null
      }
    },
    components: {
      // ProductDashboard,
      // ProfileDashboard
    },
    methods:{
      
    }
  }
</script>