<template>
  <v-col cols="4" class="fill-height deep-purple lighten-1">
    <v-card class="fill-height" style="overflow-y: auto">
      <v-list>
        <!--              <v-divider></v-divider>-->
        <v-list-item
                v-for="(item,index) in habit"
                :key="item.id"
                @click="IndexClick(index)"
        >
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
        </v-list-item>
      </v-list>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    name: 'HabitChoose',
    props: {
      habit: null
    },
    methods: {
      IndexClick (index) {
        this.$emit('IndexClick', index)
      }
    },
    computed: {
      now () {
        return new Date(+new Date() + 8 * 3600 * 1000).toISOString().substr(0, 10)
      }
    }
  }
</script>

<style scoped>

</style>