<template>
  <v-list
          dense
          nav
  ><v-list-item
          @click="choosedListId = 0"
          @contextmenu="contextListId=0"
  >
    <v-list-item-icon>
      <v-icon>{{items[0].listicon}}</v-icon>
      <!--                    <v-icon>add</v-icon>-->
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{items[0].listname}}</v-list-item-title>
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
        <v-list-item-title>{{items[1].listname}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item
            v-for="(item,i) in items.slice(2)"
            :key="item.id"
            link
            v-contextmenu:listcontextmenu
            @click="choosedListId = i+2"
            @contextmenu="contextListId=i+2"
    >
      <v-list-item-icon>
        <v-icon>{{ item.listicon }}</v-icon>
        <!--                    <v-icon>add</v-icon>-->
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ item.listname }}</v-list-item-title>
      </v-list-item-content>

    </v-list-item>
    <v-contextmenu ref="listcontextmenu">
      <v-contextmenu-item @click="renamelist">重命名清单</v-contextmenu-item>
      <v-divider></v-divider>
      <v-contextmenu-item style="color: red" @click="removelist">删除清单</v-contextmenu-item>
    </v-contextmenu>
  </v-list>
</template>

<script>
  export default {
    name: 'TasksList',
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
        choosedListId: 0,
        contextListId: 0,
        contextItemId: 0,
        choosedItemId: 0,
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
        ]
      }
    },
    methods: {
      updateItems () {
        this.items = this.$db.read().get('task').value()
      },
      changeDone () {
        this.$db.set('task', this.items).write()
        this.updateItems()
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
      }
    },
    mounted () {
      this.updateItems()
      this.choosedListId = 0
      this.newitem.id = this.items[this.choosedListId].itemcnt
    }
  }
</script>

<style scoped>

</style>