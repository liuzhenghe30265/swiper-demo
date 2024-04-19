<template>
  <div>
    <VrtualSlider
      v-if="list.length"
      :sign="1"
      :list="list"
      :active="active"
      @change="handleChange"
    />
  </div>
</template>

<script>
import VrtualSlider from '@/components/VrtualSlider'
export default {
  name: '',

  components: {
    VrtualSlider
  },

  props: {},

  data() {
    return {
      active: 0,
      list: []
    }
  },

  computed: {},

  watch: {},

  mounted() {
    const list = []
    for (let index = 0; index < 100; index++) {
      list.push(index)
    }
    this.list = list
  },

  methods: {
    handleChange(index) {
      this.active = index
    }
  }
}
</script>

<style lang='scss' scoped>
</style>