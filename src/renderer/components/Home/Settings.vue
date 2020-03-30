<template>
  <div>
    <span>todo : 1. 设置皮肤 2. 是否从网络随机获取图片用于商品 3. 商品是否使用简约模式</span>
    <div v-for="test in testbox">
      <v-menu
              offset-y absolute
      >
        <template
                v-slot:activator="{on,value=true}"
        >
          <v-btn
                  color="primary"
                  dark
                  v-on='on'
          >
            Dropdown {{test}}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  @click="testMethod"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-list-item
                  @click=""
          >
            <v-list-item-title> {{"hello world"}} </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>


    <v-btn v-contextmenu:contextmenu @click="testMethod">testcontextmenu</v-btn>

    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item>菜单1</v-contextmenu-item>
      <v-contextmenu-item>菜单2</v-contextmenu-item>
      <v-contextmenu-item>菜单3</v-contextmenu-item>
    </v-contextmenu>


    <div class="test">
      <span style="color: cornflowerblue">{{dbdata}}</span>
      <br>
      <span style="color: red"> {{vuexdata.user}} </span>
      <br>
      <span style="color: aquamarine">{{habitlist[0].id}}</span>
<!--      -->
    </div>

    <div class="habit-test">
      {{dateMark}}
    </div>

    <div>
      <v-icon>{{testboolean ? 'chevron_right' : 'chevron_left'}}</v-icon>
      <v-btn @click="testboolean=!testboolean">TESTBOOLEAN</v-btn>
    </div>

    <div class="storetest">
      {{testStoreData}}
      <v-btn @click="storeTestMethod">
        STORE TEST BUTTON
      </v-btn>
    </div>

  </div>

</template>

<script>
  import dbh from '../../datastore/dbHelper'
  import {mapActions, mapState} from 'vuex'
  import Calendar from 'vue-calendar-component'
  import _ from 'lodash'
  export default {
    name: 'Settings',
    data: () => ({
      testStoreData: '',
      testboolean: false,
      items: [
        { title: 'Click Me 1' },
        { title: 'Click Me 2' },
        { title: 'Click Me 3' },
        { title: 'Click Me 4' }
      ],
      testbox: [
        new Date(+new Date() + 8 * 3600 * 1000).toISOString().substr(0, 10),
        new Date(+new Date() + 8 * 3600 * 1000 - 24 * 60 * 60 * 1000).toISOString().substr(0, 10),
        new Date(+new Date() + 8 * 3600 * 1000 - 24 * 60 * 60 * 1000 - 24 * 60 * 60 * 1000).toISOString().substr(0, 10)
      ],
      value: '',
      dbdata: '',
      newtest: {
        name: 'nt',
        icon: '',
        slogan: '',
        allcnt: 0,
        continuouscnt: 0,
        maxcontinuouscnt: 0,
        frequency: {
          mode: 'day',
          rules: []
        },
        point: 0,
        weekpoint: 0,
        testdata: [
          1, 2, 3, 4
        ]
      }
    }),
    methods: {
      storeTestMethod () {
        this.testStoreData = this.$db.read().get('store').find({id: 'b538578b-392f-4422-a95d-ab3e189687ee'}).assign({name: 'testtt'}).write()
        console.log(this.testStoreData)
      },
      testMethod () {
        console.log(this.testbox)
        var index = this._.indexOf(this.testbox, 1)
        console.log(index)
      },
      ...mapActions({
        test: 'editPoint',
        resetUser: 'editUser'
      })
    },
    computed: {
      vuexdata () {
        return this.$store.state.user
      },
      habitlist () {
        return this.$store.state.habit.habit
      },
      dateMark () {
        var predata = this.testbox
        var npredate = predata.map((item, index) => {
          return item.replace(/-/g, '/')
        })
        return npredate
      }
    },
    components: {
      Calendar
    }
  }
</script>


<style scoped>

</style>
