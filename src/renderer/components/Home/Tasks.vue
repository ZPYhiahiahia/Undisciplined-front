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
                  <v-btn @click="()=>{this.dialog.isShow=!this.dialog.isShow ; this.dialog.title='添加清单' ; this.dialog.method=this.addlist}">add list</v-btn>
                </v-list-item-content>

              </v-list-item>

              <v-divider></v-divider>

              <!--todo:两级深度菜单,也就 清单组 还未实现-->
              <v-list
                      dense
                      nav
              >
                <v-list-item
                        v-for="(item,i) in items"
                        :key="item.id"
                        link
                        v-contextmenu:listcontextmenu
                        @click="choosedListId = i"
                        @contextmenu="contextListId=i"
                >
                  <v-list-item-icon>
                    <v-icon>{{ item.listicon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.listname }}</v-list-item-title>
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
<!--                  <v-divider-->
<!--                          v-if="i !== 0"-->
<!--                          :key="`${i}-divider`"-->
<!--                  ></v-divider>-->

                  <v-list-item :key="`${i}-${task.name}`"
                               v-contextmenu:taskcontextmenu
                               @contextmenu="contextItemId=i"
                  >
                    <v-list-item-action @click.capture="changePoint(i)">
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
              <template v-slot:append v-if="newitem.name.length">
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
      <!--      todo edititem 没有做-->
      <v-contextmenu-item @click="edititem">编辑任务</v-contextmenu-item>
      <v-divider></v-divider>
      <v-contextmenu-item style="color: red" @click="removeitem">删除任务</v-contextmenu-item>
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

        <v-form>
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
        items: [
          {
            listname: '',
            listicon: '',
            itemcnt: '',
            item: [{}]
          }
        ],
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
      addlist () {
        if (this.newlistname === '') {
          this.dialog.isShow = false
          return
        }
        this.$db.get('task').insert({listname: this.newlistname, listicon: 'mdi-view-dashboard', item: [], itemcnt: 0}).write()
        this.newlistname = ''
        this.updateItems()
        this.dialog.isShow = false
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
        this.items.splice(this.contextListId, 1)
        this.changeDone()
      },
      addtask () {
        if (this.newitem.name === '') return
        this.items[this.choosedListId].item.push(this.newitem)
        this.items[this.choosedListId].itemcnt++
        this.changeDone()
        this.newitem.name = ''
        this.newitem.id = this.items[this.choosedListId].itemcnt
      },
      removeitem () {
        this.items[this.choosedListId].item.splice(this.contextItemId, 1)
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
      },
      updateItems () {
        this.items = this.$db.read().get('task').value()
      },
      ...mapActions({
        CHANGEPOINT: 'editPoint'
      })
    },
    watch: {

    },
    mounted () {
      this.updateItems()
      this.choosedListId = 0
      this.newitem.id = this.items[this.choosedListId].itemcnt
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
