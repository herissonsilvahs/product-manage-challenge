<template>
  <v-layout>
    <v-flex xs10 offset-xs1>
      <v-card>
        <v-layout
          column
          fill-height
        >
          <v-card-title>
            <v-spacer></v-spacer>
            <div class="display-1 pl-5 pt-5">{{$store.state.user.name}}</div>
            <v-spacer></v-spacer>
            <v-btn dark icon class="mr-3">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-card-title>
        </v-layout>

        <v-divider inset></v-divider>

        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="indigo">fas fa-id-badge</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{$store.state.user.cpf}}</v-list-tile-title>
            <v-list-tile-sub-title>CPF</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider inset></v-divider>

        <v-list two-line>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">fas fa-birthday-cake</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{$store.state.user.birthday | formatDate}}</v-list-tile-title>
              <v-list-tile-sub-title>Birthday</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">mail</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{$store.state.user.email}}</v-list-tile-title>
              <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">fas fa-user</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>
              {{$store.state.user.type == 0 ? 'Administrator': 'Client'}}
              </v-list-tile-title>
              <v-list-tile-sub-title>Nivel</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  
</script>