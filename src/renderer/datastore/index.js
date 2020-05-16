import Datastore from 'lowdb'
import LodashId from 'lodash-id'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import fs from 'fs-extra'
import { remote, app } from 'electron'

const APP = process.type === 'renderer' ? remote.app : app
const STORE_PATH = APP.getPath('userData')

if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(STORE_PATH)) {
    fs.mkdirpSync(STORE_PATH)
  }
}

const adapter = new FileSync(path.join(STORE_PATH, '/data.json'))

const db = Datastore(adapter)
db._.mixin(LodashId)

// 初始化部分
if (!db.has('task').value()) {
  db.set('task', []).write()
  db.get('task').insert({
    listname: '我的一天',
    listicon: 'wb_sunny',
    itemcnt: 1,
    item: [
    ]
  }).write()
  db.get('task').insert({
    listname: '收集箱',
    listicon: 'all_inbox',
    itemcnt: 2,
    item: [
    ]
  }).write()
  db.get('task').insert({
    listname: '待办清单',
    listicon: 'mdi-view-dashboard',
    itemcnt: 3,
    item: [
      {
        name: '早起',
        isDone: false,
        deadtime: new Date(+new Date() + 8 * 3600 * 1000).toISOString().substr(0, 10),
        point: 0,
        id: 0
      }
    ]
  }).write()
}

if (!db.has('user').value()) {
  db.set('user', {}).write()
  db.set('user.name', '').write()
  db.set('user.point', 0).write()
  db.set('user.version', 0).write()
  db.set('user.token', '').write()
}

if (!db.has('habit').value()) {
  db.set('habit', []).write()
  db.get('habit').insert({
    name: '习惯1',
    icon: 'add',
    slogan: 'try your best',
    allcnt: 0,
    continuouscnt: 0,
    maxcontinuouscnt: 0,
    frequency: {
      mode: 'day',
      rules: [true, true, true, false, false, false, true]
    },
    items: [],
    point: 0,
    weekpoint: 0,
    comments: [
      {
        addtime: new Date(+new Date() + 8 * 3600 * 1000).toISOString().substr(0, 10),
        text: '在这里记录你的感想'
      }
    ]
  }).write()
}

if (!db.has('store').value()) {
  db.set('store', []).write()
  db.get('store').insert({
    name: '商品1',
    icon: 'add',
    img: 'https://cdn.pixabay.com/photo/2019/09/10/11/51/women-4465904_960_720.jpg',
    description: 'this is the first goods',
    price: 2,
    amount: 100,
    buyamount: 0
  }).write()
}

if (!db.has('taskmap').value()) {
  db.set('taskmap', []).write()
}

export default db
