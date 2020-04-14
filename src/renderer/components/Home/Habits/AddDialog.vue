<template>
  <v-dialog
          v-model="dialog.adddialog"
          width="500"
          persistent
  >
    <v-card>
      <v-container>
        <v-form
                ref="habitForm"
        >
          <v-row>
            <v-col cols="4">
              <v-text-field label="习惯名称" v-model="newhabit.name"
                            dense
                            autofocus
                            :rules="requiredRules"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field label="鼓励语" v-model="newhabit.slogan"
                            dense
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field label="完成获得的积分奖励" v-model="newhabit.point"
                            :rules="numberRules"
                            dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col>
              <v-chip-group
                      multiple
                      active-class="primary--text"
              >
                <v-chip outlined v-model="newhabit.frequency.rules[0]">周一</v-chip>
                <v-chip outlined v-model="newhabit.frequency.rules[1]">周二</v-chip>
                <v-chip outlined v-model="newhabit.frequency.rules[2]">周三</v-chip>
                <v-chip outlined v-model="newhabit.frequency.rules[3]">周四</v-chip>
                <v-chip outlined v-model="newhabit.frequency.rules[4]">周五</v-chip>
                <v-chip outlined v-model="newhabit.frequency.rules[5]">周六</v-chip>
                <v-chip outlined v-model="newhabit.frequency.rules[6]">周日</v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
          <v-divider></v-divider>
<!--          {{newhabit.frequency.rules}}-->
        </v-form>

        <v-divider></v-divider>
        <v-row>
          <v-spacer></v-spacer>
          <v-col>
            <v-btn color="blue darken-1" text small @click="dialog.adddialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text small @click="addSubmit">Save</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'AddDialog',
    props: {
      dialog: {},
      newhabit: {}
    },
    data () {
      return {
        requiredRules: [value => !!value || 'Required.'],
        numberRules: [
          v => !!v || '不可以为空值',
          v => {
            const pattern = /^\d+$/
            return pattern.test(v) || '只能输入数字'
          }
        ]
      }
    },
    methods: {
      addSubmit () {
        if (this.$refs.habitForm.validate()) {
          // console.log(this.newhabit)
          this.$emit('addSubmit', this.newhabit)
        }
      }
    }
  }
</script>

<style scoped>

</style>
