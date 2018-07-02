<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <h3>{{ item.name }}</h3>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12>
          Price: {{item.price | formatPrice}}
        </v-flex>
        <v-flex xs12>
          Expiry: {{item.duedate}}
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn flat small @click="show = !show">
        <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        More
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        icon
        :color=" cart ? 'red--text' : 'white--text' "
        @click="cart = !cart"
      >
        <v-icon >fas fa-cart-plus</v-icon>
      </v-btn>
      <v-btn
        icon
        :color=" heart ? 'red--text' : 'white--text' "
        @click="heart = !heart"
      >
        <v-icon>favorite</v-icon>
      </v-btn>
    </v-card-actions>
    <v-slide-y-transition>
      <v-card-text v-show="show">
        <v-layout row wrap>
          <v-flex xs12 text-xs-justify>
            <p>{{item.description}}</p>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-slide-y-transition>
  </v-card>
</template>

<script>
  export default{
    props: {
      item: {type: Object}
    },
    data(){
      return {
        show: false,
        cart: false,
        heart: false
      }
    }
  }
</script>