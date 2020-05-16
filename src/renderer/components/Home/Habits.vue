<template>
  <div style="height: 100% ; width: 100%">
    <v-container style="height: 100% ; width: 100%">
      <v-row style="height: 100% ; width: 100%">
        <!--        习惯选择区-->
        <HabitChoose :habit="habit" @IndexClick="IndexClick"></HabitChoose>
        <!--        习惯详情展示区 / 兼 todo 全部习惯概览区-->
        <HabitShow :habit="habit" :dialog="dialog" :choose-habit-index="chooseHabitIndex" @doneTodayHabit="doneTodayHabit"></HabitShow>
      </v-row>
    </v-container>

    <add-dialog :dialog="dialog" :newhabit="newhabit" @addSubmit="addSubmit"></add-dialog>
    <delete-dialog :dialog="dialog" @removeHabit="removeHabit"></delete-dialog>
<!--    <v-btn @click="testMethod">TEST BUTTON</v-btn>-->
<!--    {{_.last(habit[chooseHabitIndex].items)}}-->
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import DeleteDialog from './Habits/DeleteDialog'
  import AddDialog from './Habits/AddDialog'
  import HabitChoose from './Habits/HabitChoose'
  import HabitShow from './Habits/HabitShow'

export default {
    name: 'Habits',
    data () {
      return {
        chooseHabitIndex: 0,
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
        }
      }
    },
    methods: {
      testMethod () {
        let continueflag = this._.last(this.habit[this.chooseHabitIndex].items) ? new Date(this._.last(this.habit[this.chooseHabitIndex].items)).getTime() === new Date(this.now).getTime() - 24 * 60 * 60 * 1000 : false
        console.log(continueflag)
      },
      doneTodayHabit () {
        if (this._.indexOf(this.habit[this.chooseHabitIndex].items, this.now) !== -1) alert('今天已经完成了,明天再来吧!') // 如果今天已经完成
        else {
          // 调整时间格式
          let tempitems = this._.concat(this.habit[this.chooseHabitIndex].items, this.now)
          let temphabit = this.habit[this.chooseHabitIndex]
          let continueflag = this._.last(this.habit[this.chooseHabitIndex].items) ? new Date(this._.last(this.habit[this.chooseHabitIndex].items)).getTime() === new Date(this.now).getTime() - 24 * 60 * 60 * 1000 : false
          let tempupdateitem = {
            // 计算连续完成天数
            allcnt: temphabit.allcnt + 1,
            continuouscnt: continueflag ? temphabit.continuouscnt + 1 : 1,
            maxcontinuouscnt: Math.max(temphabit.continuouscnt + 1, temphabit.maxcontinuouscnt),
            items: tempitems
          }
          this.UPDATEHABITPRO({
            id: this.habit[this.chooseHabitIndex].id,
            assigndata: tempupdateitem
          }) // 使用VUEX中的METHOD
          this.EDITPOINT(this.point + this.habit[this.chooseHabitIndex].point) // 增加对应的积分
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
      addSubmit (newhabit) {
        this.newhabit = newhabit
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
      },
      IndexClick (index) {
        this.chooseHabitIndex = index
        // console.log(this.chooseHabitIndex)
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
      DeleteDialog,
      AddDialog,
      HabitChoose,
      HabitShow
    }
  }
</script>

<style scoped>
p{
  margin: 0px;
  padding: 0px;
  text-align: center;
}


</style>
