<template>
  <div
    class="time_picker">
    <TimePickerSwiper>
    </TimePickerSwiper>
  </div>
</template>

<script>
import TimePickerSwiper from '@/components/TimePickerSwiper.vue'
export default {
  name: 'SwiperDemoTimepicker',

  components: {
    TimePickerSwiper
  },

  data () {
    return {

    }
  },

  mounted () {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.time_picker {
  position: absolute;
  right: 100px;
  bottom: 100px;
}
</style>