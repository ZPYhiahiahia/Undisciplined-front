<template>
  <div class="fill-height">
    <v-container style="overflow-y: auto" fluid class="fill-height"
    >
      <v-row dense style="margin-top: 0">
        <v-col>
          <v-banner sticky single-line style="margin-top: 0">
              <span style="width: 100% ; text-align: center">我的积分余额: {{point}}</span>
          </v-banner>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col
                v-for="good in store"
                :key="good.id"
                cols="4"
        >
          <v-card>
            <v-img
                    :src="good.img"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
            >
              <v-card-title v-text="good.name"></v-card-title>
              <v-card-text>
                价格: {{good.price}}
                <v-spacer></v-spacer>
                剩余: {{good.amount - good.buyamount + '/' +  good.amount}}
              </v-card-text>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon
                     @click="buyGood(good.id, good.buyamount , good.amount, good.price)"
              >
                <v-icon>shopping_cart</v-icon>
              </v-btn>

<!--              <v-btn icon>-->
<!--                <v-icon>mdi-pencil</v-icon>-->
<!--              </v-btn>-->

              <v-btn icon
                     @click="REMOVEGOOD(good.id)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-btn
              fixed
              dark
              fab
              bottom
              right
              small
              color="#1976D2"
              @click="dialog.adddialog = !dialog.adddialog"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-container>
    <v-dialog
            v-model="dialog.adddialog"
            width="500"
            persistent
    >
      <v-card>
        <v-container>
          <v-form
            ref="storeForm"
          >
            <v-row>
              <v-col cols="4">
                <v-text-field label="奖品名称" v-model="newGood.name"
                              dense
                              autofocus
                >

                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field label="奖品价格" v-model="newGood.price"
                              :rules="numberRules"
                              dense
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field label="奖品数量" v-model="newGood.amount"
                              :rules="numberRules"
                              dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col>
                <v-text-field
                        label="商品详情描述" v-model="newGood.description"
                        hint="可以为空"
                ></v-text-field>
              </v-col>
            </v-row>
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
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'Store',
    data () {
      return {
        dialog: {
          adddialog: false
        },
        newGood: {
          name: '',
          price: '',
          amount: '',
          description: ''
        },
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
      buyGood (goodid, goodbuyamount, goodamount, goodprice) {
        const upkey = 'buyamount'
        goodbuyamount++
        if (goodprice <= this.point) {
          if (goodbuyamount !== goodamount) {
            this.UPDATEGOOD({
              goodid,
              upkey,
              upvalue: parseInt(goodbuyamount)
            })
          } else this.REMOVEGOOD(goodid)
          this.EDITPOINT(this.point - goodprice)
        } else {
          alert('积分不够哦,努力做任务获得积分把')
        }
      },
      testMethod (id = 'succ') {
        console.log(id)
        this.REMOVEGOOD(id)
      },
      addSubmit () {
        if (this.$refs.storeForm.validate()) {
          this.ADDGOOD(this.newGood)
          this.dialog.adddialog = !this.dialog.adddialog
          this.newGood = {
            name: '',
            price: '',
            amount: '',
            description: ''
          }
          this.CHANGEDONE()
        }
      },
      ...mapActions({
        CHANGEDONE: 'getStore',
        ADDGOOD: 'editStore',
        REMOVEGOOD: 'removeGood',
        UPDATEGOOD: 'buyGood',
        EDITPOINT: 'editPoint'
      })
    },
    computed: {
      point () {
        return this.$store.state.user.point
      },
      store () {
        this.CHANGEDONE()
        return this.$store.state.store.store
      }
    }
  }
</script>

<style scoped>
  ::-webkit-scrollbar{
    display: none;
  }
</style>
