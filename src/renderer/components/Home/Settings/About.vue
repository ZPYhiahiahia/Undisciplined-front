<template>
  <v-card style="float: right;width: 100%">
    <span class="title font-weight-thin font-italic font-weight-light">关于Undisciplined</span>
    <br>
    <span>当前版本{{'v0.1'}}</span>
    <v-btn bottom small color="accent">检测更新</v-btn>
    <br>
    <v-switch :label="`自动更新?`"></v-switch>
    <span>
      <a @click.prevent="openInBrowser('https://github.com/ZPYhiahiahia/Undisciplined-front')">浏览项目源码</a>
    </span>
  </v-card>
</template>

<script>
  export default {
    name: 'about',
    methods: {
      openInBrowser (url) {
        this.$electron.shell.openExternal(url)
      }
    }
  }
</script>

<style scoped>

</style>
