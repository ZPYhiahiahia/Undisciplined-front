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
      // 根据登录状态监控网络状态 并即使推送消息
      window.addEventListener('online', () => {
        if (this.$store.state.user.token === '') return
        const option = {
          title: 'Undisciplined',
          body: '网络已连接，一切如常'
        }
        const notification1 = new window.Notification(option.title, option)
        notification1.onclick = () => {
          console.log('clicktest online')
        }
      })
      window.addEventListener('offline', () => {
        if (this.$store.state.user.token === '') return
        const option = {
          title: 'Undisciplined',
          body: '网络已断开，请注意及时联网同步信息'
        }
        const notification1 = new window.Notification(option.title, option)
        notification1.onclick = () => {
          console.log('clicktest offline')
        }
      })
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
