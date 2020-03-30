<template>
  <div id="app" :style="{'height':winHeight+'px'}">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'undisciplined',
    mounted () {
      window.onresize = () => {
        this.winHeight = document.documentElement.clientHeight
      }
    },
    data () {
      return {
        winHeight: document.documentElement.clientHeight
      }
    }
  }
</script>

<style>
  /* CSS */
  ::-webkit-scrollbar{
    display: none;
  }
  #app{
    /*border: 1px solid cornflowerblue;*/
  }
</style>
