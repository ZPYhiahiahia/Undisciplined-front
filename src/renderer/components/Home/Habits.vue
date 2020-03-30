<template>
  <div style="height: 100% ; width: 100%">
<!--    <div class="test">-->
<!--      {{chooseHabitIndex}}-->
<!--      {{habit[chooseHabitIndex].items}}-->
<!--    </div>-->
    <v-container style="height: 100% ; width: 100%">
      <v-row style="height: 100% ; width: 100%">
<!--        习惯选择区-->
        <v-col cols="4" class="fill-height deep-purple lighten-1">
          <v-card class="fill-height" style="overflow-y: auto">
            <v-list>
<!--              <v-divider></v-divider>-->
              <v-list-item
                      v-for="(item,index) in habit"
                      :key="item.id"
                      @click="chooseHabitIndex = index"
              >
<!--                <v-list-item-icon><v-icon>{{item.icon}}</v-icon></v-list-item-icon>-->
                <v-list-item-content>
                  <v-list-item-title>{{item.name}}</v-list-item-title>
                  <v-tooltip bottom >
                    <template v-slot:activator="{ on }">
                      <v-list-item-subtitle v-on="on">{{item.slogan}}</v-list-item-subtitle>
                    </template>
                    <span>{{item.slogan}}</span>
                  </v-tooltip>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-chip :color=" _.indexOf(item.items, now)!==-1 && 'success' || 'primary'">
                  <v-icon v-if="_.indexOf(item.items, now)!==-1"
                          left
                  >done</v-icon>
                  {{item.allcnt + '天'}}
                </v-chip>
                <!--                <v-chip color="primary" :input-value="chipAttr.value">{{item.allcnt + '天'}}</v-chip>-->
<!--                <v-chip input-value="true" filter filter-icon="add">test</v-chip>-->
<!--                <v-chip value="true">test</v-chip>-->
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
<!--        习惯详情展示区 / 兼 todo 全部习惯概览区-->
        <v-col cols="8" style="height: 100% ;
                                -webkit-user-select:none;
                                -moz-user-select:none;
                                -ms-user-select:none;
                                user-select:none;"
               class="indigo lighten-1">

          <v-card style="height: 100% ; overflow-y: scroll">
              <v-card>
                <v-btn
                        block
                        x-large
                        depressed
                        outlined
                        :color="_.indexOf(habit[chooseHabitIndex].items, now) !== -1 && 'success' || 'primary'"
                        @click="doneTodayHabit"
                >
                  <v-icon left v-if="_.indexOf(habit[chooseHabitIndex].items, now) !== -1">done</v-icon>
                  <span v-if="_.indexOf(habit[chooseHabitIndex].items, now) !== -1" class="font-weight-bold">{{habit[chooseHabitIndex].name + ' ' + '今日已完成'}}</span>
                  <span v-else class="font-weight-bold">{{habit[chooseHabitIndex].name + ' ' + '今日未完成'}}</span>
                </v-btn>
              </v-card>
            <v-container style="margin-top: 0">
              <v-row>
                <v-col cols="4">
                  <v-card style="padding: 0">
                    <p>共完成</p>
                    <p>{{habit[chooseHabitIndex].allcnt}}</p>
                  </v-card>
                </v-col>
                <v-col cols="4">
                  <v-card>
                    <p>最多连续</p>
                    <p>{{habit[chooseHabitIndex].maxcontinuouscnt}}</p>
                  </v-card>
                </v-col>
                <v-col cols="4">
                  <v-card>
                    <p>当前连续</p>
                    <p>{{habit[chooseHabitIndex].continuouscnt}}</p>
                  </v-card>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col>
                  <v-card style="padding: 0px">
                    <div>
                      <Calendar
                              :markDate='habit[chooseHabitIndex].items'
                              futureDayHide="0000000000"
                              ref="Calendar"
                      ></Calendar>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col>
                  <v-card>
                    感言区 : 还没做
                  </v-card>
                </v-col>
              </v-row>

              <v-speed-dial
                      style=""
                      v-model="fab"
                      right
                      bottom
                      fixed
                      direction="top"
                      transition="slide-y-reverse-transition"
              >
                <template v-slot:activator>
                  <v-btn
                          v-model="fab"
                          color="blue darken-2"
                          dark
                          fab
                  >
                    <v-icon v-if="fab">mdi-close</v-icon>
                    <v-icon v-else>mdi-account-circle</v-icon>
                  </v-btn>
                </template>
<!--                <v-btn-->
<!--                        fab-->
<!--                        dark-->
<!--                        small-->
<!--                        color="green"-->
<!--                >-->
<!--                  <v-icon>mdi-pencil</v-icon>-->
<!--                </v-btn>-->
                <v-btn
                        fab
                        dark
                        small
                        color="indigo"
                        @click="dialog.adddialog = !dialog.adddialog"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn
                        fab
                        dark
                        small
                        color="red"
                        @click="dialog.removesuredialog = !dialog.removesuredialog"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-speed-dial>

            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

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
            {{newhabit.frequency.rules}}
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
<!--    <v-btn @click="testMethod">TEST BUTTON</v-btn>-->
<!--    {{dialog}}-->
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import Calendar from 'vue-calendar-component'
  export default {
    name: 'Habits',
    data () {
      return {
        chooseHabitIndex: 0,
        fab: false,
        dialog: {
          adddialog: false,
          removesuredialog: false
        },
        newhabit: {
          name: '',
          slogan: '',
          point: '',
          frequency: {
            mode: 'day',
            rules: [false, false, false, false, false, false, false]
          }
        },
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
      testMethod () {
        this.dialog.adddialog = !this.dialog.adddialog
      },
      doneTodayHabit () {
        if (this._.indexOf(this.habit[this.chooseHabitIndex].items, this.now) !== -1) alert('今天已经完成了,明天再来吧!')
        else {
          let tempitems = this._.concat(this.habit[this.chooseHabitIndex].items, this.now)
          let temphabit = this.habit[this.chooseHabitIndex]
          let tempupdateitem = {
            allcnt: temphabit.allcnt + 1,
            continuouscnt: temphabit.continuouscnt + 1,
            maxcontinuouscnt: Math.max(temphabit.continuouscnt + 1, temphabit.maxcontinuouscnt),
            items: tempitems
          }
          this.UPDATEHABITPRO({
            id: this.habit[this.chooseHabitIndex].id,
            assigndata: tempupdateitem
          })
          this.EDITPOINT(this.point + this.habit[this.chooseHabitIndex].point)
          // this.CHANGEDONE()
        }
      },
      removeHabit () {
        // console.log(this.habit[this.chooseHabitIndex].id)
        this.REMOVEHABIT(this.habit[this.chooseHabitIndex].id)
        this.CHANGEDONE()
        this.chooseHabitIndex = 0
        this.dialog.removesuredialog = !this.dialog.removesuredialog
      },
      addSubmit () {
        if (this.$refs.habitForm.validate()) {
          this.ADDHABIT(this.newhabit)
          this.dialog.adddialog = !this.dialog.adddialog
          this.newhabit = {
            name: '',
            slogan: '',
            point: '',
            frequency: {
              mode: 'day',
              rules: [false, false, false, false, false, false, false]
            }
          }
          this.CHANGEDONE()
        }
      },
      ...mapActions({
        CHANGEDONE: 'getHabit',
        ADDHABIT: 'addHabit',
        REMOVEHABIT: 'removeHabit',
        UPDATEHABIT: 'editHabit',
        UPDATEHABITPRO: 'editHabitPro',
        EDITPOINT: 'editPoint'
      })
    },
    computed: {
      point () {
        return this.$store.state.user.point
      },
      habit () {
        return this.$store.state.habit.habit
      },
      now () {
        return new Date(+new Date() + 8 * 3600 * 1000).toISOString().substr(0, 10)
      },
      habitbtntext () {
        if (this._.indexOf(this.habit[this.chooseHabitIndex].items, this.now) === -1) return '今日未完成'
        else return '今日已完成'
      }
    },
    mounted () {
      this.CHANGEDONE()
    },
    components: {
      Calendar
    }
  }
</script>

<style scoped>
p{
  margin: 0px;
  padding: 0px;
  text-align: center;
}

.wh_container >>> .wh_content_all{
  background-color:#ffffff!important;
  border:1px solid #dfe0e6;
  width:100%;
  border-radius: 6px;
}
.wh_container{
  margin: auto!important;
  width: 100%;
}

.wh_container >>> .wh_item_date{
  color:#211d48;

}
.wh_container >>> .wh_item_date:hover{
  /*color:#ffffff;*/
  /*background: #136aa7;*/
  background-color: white;
  border-radius: 50%;
}
.wh_container >>>  .wh_other_dayhide{
  color:#cccccc;
}

.wh_container >>> .wh_content_item{
  margin-bottom: 5px;
  margin-top: 5px;
}

.wh_container >>> .wh_content{
  color:black;
}

.wh_container >>> .wh_top_tag{
  color:black;
}
.wh_container >>> .wh_content_li{
  color:#162947;
  font-weight: bold;
}
.wh_container >>> .wh_jiantou1{
  border-top: 2px solid #162947;
  border-left: 2px solid #162947;
}
.wh_container >>> .wh_jiantou2{
  border-top: 2px solid #162947;
  border-right: 2px solid #162947;
}


.wh_container >>> .wh_content_item>.wh_isMark{
  /*background-color: rgba(19,105,167,0.15);*/
  background-color: cornflowerblue!important;
  /*border-radius: 0px;*/
}
.wh_container >>> .wh_content_item .wh_isToday{
  background-color: white;
  /*border-radius: 0px;*/
  /*color: #ffffff;*/
}
.wh_container >>> .wh_content_item .wh_chose_day{
  /*background-color: rgba(19,105,167,1);*/
  background-color: white;
  /*border-radius: 0px;*/
  /*color: #ffffff;*/
}

#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}

  ::-webkit-scrollbar{
    display: none;
  }
</style>
