<template>
  <v-dialog v-model="dialog.removesuredialog" persistent width="400">
    <v-card>
      <v-card-title class="headline">
        确定要删除当前选中的习惯吗?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog.removesuredialog = false">不!</v-btn>
        <v-btn color="green darken-1" text @click="removeHabit">确定!</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'DeleteDialog',
    props: {
      dialog: {}
    },
    methods: {
      removeHabit () {
        this.$emit('removeHabit')
      }
    }
  }
</script>

<style scoped>
</style>