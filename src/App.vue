<template>
  <v-app id="inspire" >
    <v-navigation-drawer
      v-model="drawer"
      app>

      <v-list-item class="purple darken-3 white--text">
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            ALUNOS
          </v-list-item-title>
          <v-list-item-subtitle class="white--text">
            Painel De Controle
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items" 
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

      
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>PAINEL DE CONTROLE ALUNOS</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>     
    </v-main>
  
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null,
      items: [
          { title: 'Cadastro De Alunos', icon: 'mdi-account-group', to: '/registro' },
          { title: 'Lista De Alunos', icon: 'mdi-clipboard-list-outline', to: '/alunos' },
        ],
     }),
  }
</script>