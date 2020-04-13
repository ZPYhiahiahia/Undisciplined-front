<template>
  <v-app id="inspire" style="height: 100% ; width: 100% ; ">
<!--    border: 0.1px solid #424242;-->
    <systemtoolbar @drawerTaggle="drawer=!drawer"></systemtoolbar>
    <v-content style="height: 100% ; width: 100%">
<!--      <v-container fluid fill-height grid-list-md>-->
        <router-view></router-view>
<!--      </v-container>-->
    </v-content>
  </v-app>
</template>

<script>
  import systemtoolbar from './Home/Systemtoolbar'
  export default {
    name: 'Home',
    props: {
      source: String
    },
    data: () => ({
      dialog: false
      // right: null
    }),
    methods: {
    },
    components: {
      systemtoolbar
    }
  }
</script>

<style scoped>
  ::-webkit-scrollbar{
    display: none;
  }

</style>
