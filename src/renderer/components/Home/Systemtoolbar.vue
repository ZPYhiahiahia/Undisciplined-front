<template>
  <v-app-bar
          :clipped-left="$vuetify.breakpoint.lgAndUp"
          app
          color="blue darken-3"
          dark
          dense
          style="-webkit-user-select: none;-webkit-app-region: drag"
  >
    <v-toolbar-title
            style="width: 300px"
            class="ml-0 pl-4"
    >
      <span class="hidden-sm-and-down">Undisciplined</span>
    </v-toolbar-title>
    <v-tabs style="-webkit-app-region: no-drag"
            centered
            show-arrows
    >
      <v-tab to="tasks">任务</v-tab>
      <v-tab to="habits">习惯</v-tab>
      <v-tab to="store">成就商店</v-tab>
      <v-tab to="settings">设置</v-tab>
    </v-tabs>
    <v-spacer />
    <v-btn style="-webkit-app-region: no-drag"
           icon
           @click.native.stop="winControl('minimize')"
    >
      <v-icon>remove</v-icon>
    </v-btn>
    <v-btn style="-webkit-app-region: no-drag"
           icon
           @click.native.stop="winControl('maximize')"
           v-show="isMaximized"
    >
      <v-icon style="font-size: 20px;">filter_none</v-icon>
    </v-btn>
    <v-btn style="-webkit-app-region: no-drag"
           icon
           @click.native.stop="winControl('maximize')"
           v-show="!isMaximized"
    >
      <v-icon>crop_square</v-icon>
    </v-btn>
    <v-btn style="-webkit-app-region: no-drag"
           icon
           @click.native.stop="winControl('close')"
    >
      <v-icon color="red">close</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
  import {remote} from 'electron'
  export default {
    name: 'Systemtoolbar',
    data: () => ({
      isMaximized: false
    }),
    methods: {
      winControl (action) {
        const browserWindow = remote.getCurrentWindow()
        switch (action) {
          case 'minimize':
            browserWindow.minimize()
            break
          case 'maximize':
            // if (this.isMaximized) {
            if (browserWindow.isMaximized()) {
              browserWindow.unmaximize()
            } else {
              if (this.isMaximized) {
                browserWindow.unmaximize()
              } else {
                browserWindow.maximize()
              }
            }
            // this.isMaximized = browserWindow.isMaximized()
            this.isMaximized = !this.isMaximized

            break
          case 'close':
            browserWindow.close()
            break
          default:
            break
        }
      }
    }
  }
</script>

<style scoped>

</style>
