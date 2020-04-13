<template>
  <div style="height: 100% ; width: 100%">
    <v-container style="height: 100% ; width: 100%"
                 fluid fill-height grid-list-md
    >
      <v-row
              style="height: 100%"
      >
        <v-col cols="4"
               style="height: 100%"
        >
          <v-card
                  height="100%"
                  width="256"
                  class="mx-auto"
          >
            <v-navigation-drawer permanent>
              <v-list-item>
                <v-list-item-content>
                  <v-btn style="font-weight: bold" @click="()=>{this.dialog.isShow=!this.dialog.isShow ; this.dialog.title='添加清单' ; this.dialog.method=this.addlist}">add list</v-btn>
                </v-list-item-content>

              </v-list-item>

              <v-divider></v-divider>

              <!--todo:两级深度菜单,也就 清单组 还未实现-->
              <v-list
                      dense
                      nav
              >
                <v-list-item
                        @click="choosedListId = 0"
                        @contextmenu="contextListId=0"
                >
                  <v-list-item-icon>
                      <v-icon>{{items[0].listicon}}</v-icon>
                      <!--                    <v-icon>add</v-icon>-->
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title style="font-size: 15px; font-weight: bold;">{{items[0].listname}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item
                        @click="choosedListId = 1"
                        @contextmenu="contextListId=1"
                >
                  <v-list-item-icon>
                    <v-icon>{{items[1].listicon}}</v-icon>
                    <!--                    <v-icon>add</v-icon>-->
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title style="font-size: 15px; font-weight: bold;">{{items[1].listname}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item
                        v-for="(item,i) in items.slice(2)"
                        :key="item.id"
                        link
                        v-contextmenu:listcontextmenu
                        @click="choosedListId = i+2"
                        @contextmenu="contextListId = i+2"
                >
                  <v-list-item-icon>
                    <v-icon>{{item.listicon}}</v-icon>
                    <!--                    <v-icon>add</v-icon>-->
                  </v-list-item-icon>
                  <v-list-item-content>
                   <v-list-item-title>{{item.listname}}</v-list-item-title>
                  </v-list-item-content>



                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-card>
        </v-col>

        <!--        右侧真实的todolist-->
        <v-col cols="8" style="height: 100%">
          <v-card style="overflow-y: auto ; height: calc(100vh - 200px) ; overflow-x: hidden">
            <v-banner
              single-line
              sticky
              link
              v-contextmenu:deletefinished
            >
              <v-icon>{{this.items[choosedListId].listicon}}</v-icon>
              {{this.items[choosedListId].listname}}

            </v-banner>

              <v-slide-y-transition
                      class="py-0"
                      group
                      tag="v-list"
              >
                <template v-for="(task, i) in items[choosedListId].item">

                  <v-list-item :key="`${i}-${task.name}`"
                               link
                               v-contextmenu="getcontextmenu()"
                               @contextmenu="contextItemId = i"
                  >
                    <v-list-item-action @click.capture="changePoint(i, task.isDone)">
                      <v-checkbox
                              v-model="task.isDone"
                              :color="task.isDone && 'grey' || 'primary'"
                      >
                        <template v-slot:label>
                          <div
                                  :class="task.isDone && 'grey--text' || 'primary--text'"
                                  class="ml-4"
                                  v-text="task.name"
                          ></div>
                        </template>
                      </v-checkbox>
                    </v-list-item-action>
                    <v-spacer></v-spacer>

                    <div
                            :class="task.isDone && 'grey--text' || 'error--text'"
                            class="ml-4"
                            v-if="task.point > 0"
                    >
                      <span>(+{{task.point}} points)</span>
                    </div>

                    <v-spacer></v-spacer>

                    <v-scroll-x-transition>
                      <v-icon
                              v-if="task.isDone"
                              color="success"
                      >
                        check
                      </v-icon>
                    </v-scroll-x-transition>
                  </v-list-item>
                  <v-divider
                          :key="`${i}-divider`"
                  ></v-divider>
                </template>
              </v-slide-y-transition>
          </v-card>

<!--          添加任务区域-->
          <v-card style="margin-top: 30px"
                  height="50px"
          >
            <v-text-field
                    solo
                    label="添加任务"
                    prepend-inner-icon="add"
                    clearable
                    @keydown.enter="addtask"
                    v-model="newitem.name"
            >
              <template v-slot:append v-if="checknewitem()">
                <v-fade-transition leave-absolute>
                  <v-item-group>
                    <v-btn
                            icon
                            @click="isDateShow=!isDateShow"
                    >
                      <v-icon color="#1976D2" id="calicon">calendar_today</v-icon>
                    </v-btn>
                    <v-btn
                            icon
                            @click="isPointShow=!isPointShow"
                    >
                      <v-icon  color="#1976D2">money</v-icon>
                    </v-btn>
                    <span v-show="newitem.point !== 0" class="font-weight-thin" style="color: #BBDEFB">{{newitem.point}}</span>
                  </v-item-group>
                </v-fade-transition>
              </template>
            </v-text-field>
          </v-card>
        </v-col>
      </v-row>
    </v-container>



    <v-contextmenu ref="listcontextmenu">
      <v-contextmenu-item @click="renamelist">重命名清单</v-contextmenu-item>
      <v-divider></v-divider>
      <v-contextmenu-item style="color: red" @click="removelist">删除清单</v-contextmenu-item>
    </v-contextmenu>
    <!--    todo 一键删除已完成事项/一键排序已完成事项-->
    <v-contextmenu ref="taskcontextmenu">
      <v-contextmenu-item v-show="choosedListId !== 0 && checkmyday()"  @click="addtaskto(0)">添加至我的一天</v-contextmenu-item>
      <v-contextmenu-item v-show="choosedListId !== 0 && !checkmyday()"  @click="deletetaskfrommyday">从我的一天中删除</v-contextmenu-item>
      <v-divider v-show = " choosedListId !== 0"></v-divider>
      <!--      todo edititem 没有做-->
      <v-contextmenu-item @click="edititem">编辑任务</v-contextmenu-item>
      <v-divider></v-divider>
      <v-contextmenu-item style="color: red" @click="removeitem">删除任务</v-contextmenu-item>
    </v-contextmenu>

    <v-contextmenu ref="collectcontextmenu">
      <v-contextmenu-submenu title="添加至" >
        <v-contextmenu-item @click="addtaskto(0)">{{items[0].listname}}</v-contextmenu-item>
        <v-contextmenu-item v-for="(item,i) in items.slice(2)" @click="addtaskto(i+2)">{{item.listname}}</v-contextmenu-item>
      </v-contextmenu-submenu>
      <v-divider></v-divider>
      <v-contextmenu-item @click="edititem">编辑任务</v-contextmenu-item>
      <v-divider></v-divider>
      <v-contextmenu-item style="color: red" @click="removeitem">删除任务</v-contextmenu-item>
    </v-contextmenu>

    <v-contextmenu ref="deletefinished">
      <v-contextmenu-item @click="deletefinished">删除已完成</v-contextmenu-item>
    </v-contextmenu>
    <v-dialog
            v-model="dialog.isShow"
            width="500"
    >
      <v-card>
        <v-card-title
                class="headline grey lighten-2"
                primary-title
        >
          {{this.dialog.title}}
        </v-card-title>

        <v-divider></v-divider>

        <v-form style="width: 90%;margin-left: 5%;margin-top: 3%" >
          <v-text-field
                  v-model="newlistname"
                  :rules="nameRules"
                  :counter="20"
                  label="清单名"
                  required
                  @keydown.enter=dialog.method
          ></v-text-field>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
                  color="primary"
                  style="font-size: 15px;font-weight: bold"
                  text
                  @click=dialog.method
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  date dialog  -->
    <v-dialog
              class="calchoosedialog"
              v-model="isDateShow"
              width="300"
              overlay-opacity = 0
              transition="slide-y-reverse-transition"
    >
      <v-card>
        <v-date-picker width="100%" v-model="newitem.deadtime"
                       :min="curDate"
        ></v-date-picker>
      </v-card>
    </v-dialog>
    <!--    point dialog-->
    <v-dialog
              v-model="isPointShow"
              width="300"
              overlay-opacity = 0
              transition="slide-y-reverse-transition"
    >
      <v-card>
        <v-text-field
                v-model="tempPoint"
                label="价格"
                filled
                full-width
                solo rounded height="80%"

                :rules="pointRules"
                @keydown.enter="()=>{
                  if(/^\d+$/.test(tempPoint))
                    newitem.point = tempPoint
                   tempPoint = ''
                   isPointShow = false
                }"
                autofocus
        >

        </v-text-field>
      </v-card>
    </v-dialog>

<!--    <v-btn @click="testMethod">test button</v-btn>-->
<!--&lt;!&ndash;    <p>{{this.$store.state.user}}</p>&ndash;&gt;-->
<!--    <p style="color: red">{{point}}</p>-->
  </div>


</template>

<script>
  import {mapActions} from 'vuex'
  import dbh from '../../datastore/dbHelper'
  export default {
    name: 'Task',
    data () {
      return {
        items: [],
        map: [],
        curDate: new Date(+new Date() + 8 * 3600 * 1000).toISOString().substr(0, 10),
        choosedListId: 0,
        contextListId: 0,
        contextItemId: 0,
        choosedItemId: 0,
        isContextMenuShow: false,
        isDateShow: false,
        isPointShow: false,
        tempPoint: '',
        dialog: {
          isShow: false,
          title: '',
          method: ''
        },
        nameRules: [
          v => !!v || '清单名不能为空',
          v => v.length <= 20 || '清单名过长'
        ],
        pointRules: [
          v => !!v || '点数不能为空',
          v => {
            const pattern = /^\d+$/
            return pattern.test(v) || '只能输入数字'
          }
        ],
        newlistname: '',
        newitem: {
          name: '',
          isDone: false,
          deadtime: this.curDate,
          point: 0,
          id: -1
        },
        watchFlags: {
          pointChangeFlag: false
        }
      }
    },
    methods: {
      testMethod () {
        console.log(this.testlistdata)
      },
      changeDone () {
        this.$db.set('task', this.items).write()
        this.updateItems()
      },
      // 添加索引
      addmap (listid, itemid) {
        if (listid === 1) {
          return
        }
        this.map.push({from: {listid: listid, itemid: itemid}, to: {listid: 0, itemid: this.items[0].item.length - 1}})
        this.changeDone()
        // this.map.push({from: {listid: 0, itemid: this.items[0].item.length - 1}, to: {listid: listid, itemid: itemid}})
      },
      // 寻找索引对应的内容，找不到返回null
      findmap (listid, itemid) {
        let i = 0
        for (let item of this.map) {
          if (item.from.listid === listid && item.from.itemid === itemid) {
            return {listid: item.to.listid, itemid: item.to.itemid, i: i}
          }
          if (item.to.listid === listid && item.to.itemid === itemid) {
            return {listid: item.from.listid, itemid: item.from.itemid, i: i}
          }
          i++
        }
        return null
      },
      checkmap (i, flag) {
        let index = this.findmap(this.choosedListId, i)
        let index2 = {listid: this.choosedListId, itemid: i}
        if (index === null) {
          return
        }
        console.log(this.choosedListId, i, index.listid, index.itemid)
        // 0修改 1删除
        if (flag === 0) {
          this.items[index.listid].item[index.itemid].isDone = !this.items[this.choosedListId].item[i].isDone
        }
        if (flag === 1) {
          this.items[index.listid].item.splice(index.itemid, 1)
          this.map.splice(index.i, 1)
          this.deletemap(index)
          this.deletemap(index2)
        }
        this.changeDone()
      },
      deletemap (index1) {
        for (let item of this.map) {
          if (item.from.listid === index1.listid && item.from.itemid > index1.itemid) {
            item.from.itemid--
          }
          if (item.to.listid === index1.listid && item.to.itemid > index1.itemid) {
            item.to.itemid--
          }
        }
        this.changeDone()
      },
      addlist () {
        if (this.newlistname === '') {
          this.dialog.isShow = false
          return
        }
        this.items.push({listname: this.newlistname, listicon: 'mdi-view-dashboard', item: [], itemcnt: 0})
        this.newlistname = ''
        this.changeDone()
        this.dialog.isShow = false
        this.choosedListId = this.items.length - 1
      },
      renamelist () {
        this.dialog.isShow = true
        this.dialog.title = '重命名清单'
        this.dialog.method = () => {
          if (this.newlistname !== '') {
            this.items[this.contextListId].listname = this.newlistname
            this.changeDone()
            this.newlistname = ''
          }
          this.dialog.isShow = false
        }
      },
      removelist () {
        // console.log(this.contextListId)
        let i = this.items[this.contextListId].item.length
        console.log('ii', i)
        for (let x = 0; x < i; x++) {
          console.log('i', x)
          let index = this.findmap(this.contextListId, 0)
          this.deleteitem(index)
          this.items[this.contextListId].item.splice(0, 1)
        }
        this.items.splice(this.contextListId, 1)
        this.choosedListId = 0
        this.changeDone()
      },
      addtask () {
        if (this.newitem.name === '') return
        this.items[this.choosedListId].item.push(this.newitem)
        this.items[this.choosedListId].itemcnt++
        this.changeDone()
        this.newitem.name = ''
        this.newitem.id = this.items[this.choosedListId].itemcnt
        this.newitem.point = ''
        // console.log('tempPoint', this.tempPoint)
      },
      deletetaskfrommyday () {
        let index = this.findmap(this.choosedListId, this.contextItemId)
        if (index === null) return
        this.map.splice(index.i, 1)
        this.items[index.listid].item.splice(index.itemid, 1)
        this.deletemap(index)
      },
      addtaskto (id) {
        let index = this.findmap(this.choosedListId, this.contextItemId)
        if (index !== null) {
          return
        }
        this.items[id].item.push(this.items[this.choosedListId].item[this.contextItemId])
        if (this.choosedListId === 1) {
          this.items[this.choosedListId].item.splice(this.contextItemId, 1)
        }
        if (this.choosedListId >= 2) {
          this.addmap(this.choosedListId, this.contextItemId)
          console.log(this.map)
        }
        this.changeDone(0)
      },
      removeitem () {
        this.items[this.choosedListId].item.splice(this.contextItemId, 1)
        this.checkmap(this.contextItemId, 1)
        this.changeDone()
      },
      deleteitem (index) {
        if (index === null) {
          return
        }
        this.items[index.listid].item.splice(index.itemid, 1)
        console.log('del', index.listid, index.itemid)
        let index2 = this.findmap(index.listid, index.itemid)
        if (index2 === null) {
          return
        }
        this.map.splice(index.i, 1)
        this.deletemap(index)
        this.deletemap(index2)
      },
      pmap () {
        console.log('p')
        for (let item of this.map) {
          console.log(item.from.listid, item.from.itemid, item.to.listid, item.to.itemid)
        }
        console.log('map')
      },
      deletefinished () {
        let l = this.items[this.choosedListId].item.length
        for (let x = 0; x < l; x++) {
          if (this.items[this.choosedListId].item[x].isDone === true) {
            this.items[this.choosedListId].item.splice(x, 1)
            let index = this.findmap(this.choosedListId, x)
            // console.log('sss', x, index.listid, index.itemid)
            this.deleteitem(index)
            this.pmap()
            x--
            l--
          }
        }
        this.changeDone()
      },
      edititem () {
        // todo 截止日期没有显示在界面上
      },
      changePoint (i) {
        var anspoint = this.items[this.choosedListId].item[i].isDone ? -parseInt(this.items[this.choosedListId].item[i].point) : parseInt(this.items[this.choosedListId].item[i].point)
        this.CHANGEPOINT(this.point + anspoint)
        // 操作数据库设置任务完成情况 (可能会存在风险,毕竟不是直接绑定在checkbox上的)
        this.items[this.choosedListId].item[i].isDone = !this.items[this.choosedListId].item[i].isDone
        this.changeDone()
        this.items[this.choosedListId].item[i].isDone = !this.items[this.choosedListId].item[i].isDone
        this.checkmap(i, 0)
      },
      checkmyday () {
        let index = this.findmap(this.choosedListId, this.contextItemId)
        if (index === null) {
          return true
        } else {
          return false
        }
      },
      updateItems () {
        this.items = this.$db.read().get('task').value()
      },
      getcontextmenu () {
        if (this.choosedListId === 1) {
          // console.log(this.choosedListId)
          return 'collectcontextmenu'
        } else {
          // console.log(this.choosedListId)
          return 'taskcontextmenu'
        }
      },
      checknewitem () {
        if (this.newitem.name === null || this.newitem.name === '') {
          this.newitem.point = ''
          this.tempPoint = ''
          return false
        }
        return true
      },
      ...mapActions({
        CHANGEPOINT: 'editPoint'
      })
    },
    watch: {

    },
    created () {
      this.updateItems()
      this.choosedListId = 0
      if (this.items.length > 0) { this.newitem.id = this.items[this.choosedListId].itemcnt }
    },
    computed: {
      point () {
        return this.$store.state.user.point
      }
    }
  }
</script>

<style scoped>
  ::-webkit-scrollbar{
    display: none;
  }
</style>
