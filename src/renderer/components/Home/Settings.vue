<template>
  <div>
    <div class="testdiv">
<!--      <span>{{userinfo}}</span>-->
<!--      <span>{{dialog}}</span>-->
      <v-btn
        @click="sync"
      >TEST BUTTON</v-btn>
    </div>
    <v-divider></v-divider>
    <v-card style="float: right;width: 100%">
      <v-card-title>
        <span>用户状态： </span>
        <span v-if="userinfo.token !== ''">欢迎，{{userinfo.name}}</span>
        <span v-else>用户未登录</span>
      </v-card-title>
      <v-card-actions>
        <v-btn v-if="userinfo.token === ''" color="#1976D2"
               @click.stop="dialog.logindialog = !dialog.logindialog"
        ><span style="color: white">登录</span></v-btn>
        <v-btn v-if="userinfo.token !== ''" class="red darken-4"><span style="color: white"
                                                 @click.stop="logout"
        >注销</span></v-btn>
      </v-card-actions>
    </v-card>
    <v-card style="float: right;width: 100%">
      <v-card-title>
        <span>同步</span>
      </v-card-title>
      <v-card-text>
        <span>
          需要注意的是：目前的同步功能对于冲突的处理能力几乎为0。一定要记得及时同步，出现冲突，后果自负！
        </span>
      </v-card-text>
      <v-card-actions>
        <v-btn color="#1976D2"
               @click=""
               :loading="button.syncButton"
        >
          <span style="color: white">同步数据</span>
        </v-btn>
      </v-card-actions>
    </v-card>
    <span>todo : 1. 设置皮肤 2. 是否从网络随机获取图片用于商品 3. 商品是否使用简约模式</span>





    <v-dialog
            v-model="dialog.logindialog"
            width="500"
            persistent
    >
      <v-card>
        <v-card-title
                class="headline grey lighten-2"
                primary-title
        >
          登录
        </v-card-title>

        <v-divider></v-divider>

        <v-form
                ref="loginRules"
        >
          <v-text-field
                  v-model="loginForm.username"
                  :rules="nameRules"
                  :counter="16"
                  label="用户名"
                  required
          ></v-text-field>
          <v-text-field
                  v-model="loginForm.password"
                  :rules="nameRules"
                  :counter="16"
                  label="密码"
                  type="password"
                  required
                  @keydown.enter="login"
          ></v-text-field>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
                  text
                  @click="dialog.logindialog = !dialog.logindialog"
          >
            Cancel
          </v-btn>
          <v-btn
                  color="primary"
                  text
                  @click="login"
          >
            Login
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import dbh from '../../datastore/dbHelper'
  import qs from 'qs'
  export default {
    name: 'Settings',
    data: () => ({
      dialog: {
        logindialog: false
      },
      button: {
        syncButton: false
      },
      loginForm: {
        username: '',
        password: ''
      },
      nameRules: [
        v => !!v || '不可以为空值',
        v => v.length <= 16 || '必须小于16个字符'
      ]
    }),
    methods: {
      testMethod () {
        this.dialog.logindialog = !this.dialog.logindialog
        console.log('dialog open')
      },
      login () {
        if (this.$refs.loginRules.validate()) {
          // post server
          this.$axios.post('/user/login', {
            name: this.loginForm.username,
            password: this.loginForm.password
          }).then((res) => {
            const token = res.data.result
            if (token) {
              this.EDITUSER({key: 'token', value: token})
              this.EDITUSER({key: 'name', value: this.loginForm.username})
              // close dialog
              this.dialog.logindialog = !this.dialog.logindialog
              // reset
              this.loginForm = {
                username: '',
                password: ''
              }
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      logout () {
        this.dialog.logindialog = false
        this.EDITUSER({key: 'token', value: ''})
        this.EDITUSER({key: 'name', value: ''})
      },
      sync () {
        /*
        * 这里直接把数据库操作写在此函数里了，不然引用很多vuex的action也很麻烦，并且此同步方法未来有可能会被取代。
        * */
        // 调整按钮为loding状态
        this.button.syncButton = true

        // 获取所需要的数据
        let userinfo = dbh.get('user')
        delete userinfo.token
        let habit = dbh.get('habit')
        let task = dbh.get('task')
        let store = dbh.get('store')
        this.$axios({
          url: '/api/v1/sync/onlinesync',
          headers: {
            'Authorization': this.userinfo.token,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: qs.stringify({
            userinfo,
            habit,
            task,
            store
          }),
          method: 'POST'
        }).then(res => {
          console.log(res)
          // 提交服务器观察返回值
          // console.log(userinfo)

          this.button.syncButton = false
        }).catch(err => {
          console.log(err)
        })

        // 更新数据库 （注意version）
      },
      ...mapActions({
        CHANGEDONE: 'getUser',
        EDITTOKEN: 'editToken',
        EDITUSER: 'editUser'
      })
    },
    computed: {
      userinfo () {
        this.CHANGEDONE()
        return this.$store.state.user.user
      }
    }
  }
</script>


<style scoped>

</style>
