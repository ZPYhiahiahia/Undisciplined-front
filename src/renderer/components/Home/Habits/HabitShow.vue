<template>
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
            <v-card style="padding: 0">
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
</template>

<script>
  import Calendar from 'vue-calendar-component'
  export default {
    name: 'HabitShow',
    props: {
      habit: null,
      chooseHabitIndex: 0,
      dialog: {}
    },
    data () {
      return {
        fab: false
      }
    },
    methods: {
      doneTodayHabit () {
        this.$emit('doneTodayHabit')
      }
    },
    computed: {
      now () {
        return new Date(+new Date() + 8 * 3600 * 1000).toISOString().substr(0, 10)
      }
    },
    components: {
      Calendar
    }
  }
</script>

<style scoped>
  p{
    margin: 0;
    padding: 0;
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