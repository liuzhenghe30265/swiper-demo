<template>
  <div
    class="time_picker_swiper">
    <div
      class="time_value"
      @click="handleVisible">
      {{computedTime}}
    </div>
    <div
      class="time_picker_container"
      v-show="visible">
      <div
        class="time_container">
        <h5swiper
          ref="hSwiper"
          :options="hSwiperOptions"
          class="swiper_hours">
          <swiper-slide
            v-for="(item, index) of hList"
            :key="index"
            class="pic_li">
            {{ item }}
          </swiper-slide>
        </h5swiper>
        <h5swiper
          ref="mSwiper"
          :options="mSwiperOptions"
          class="swiper_hours">
          <swiper-slide
            v-for="(item, index) of mList"
            :key="index + 'm'"
            class="pic_li">
            {{ item }}
          </swiper-slide>
        </h5swiper>
      </div>
      <div
        class="btn_container">
        <span
          @click.stop="handleCancel">
          取消
        </span>
        <span
          @click.stop="handleOK">
          确定
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper as h5swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'TimePickerSwiper',

  components: {
    h5swiper,
    swiperSlide,
  },

  props: {
    disabled: {
      type: Boolean,
      default () {
        return false
      }
    }
  },

  disabled: {
    immediate: true,
    handler: function () { }
  },

  data () {
    const _this = this
    return {
      visible: false,
      audio: null,
      selectH: '',
      selectM: '',
      hList: [],
      mList: [],
      timer: null,
      hSwiperOptions: {
        speed: 1000,
        freeMode: true,
        direction: 'vertical',
        setWrapperSize: true,
        slidesPerView: 6,
        centeredSlides: true,
        initialSlide: 0,
        slideToClickedSlide: true,
        preventClicksPropagation: false,
        observer: true,
        observeParents: true,
        mousewheel: true,
        on: {
          slideChangeTransitionStart: function () {
            // _this.audio.play()
          },
          slideChangeTransitionEnd: function () {
            // _this.audio.pause()
            // _this.audio.load()
            // _this.audio.currentTime = 0
            // _this.selectH = _this.hList[this.activeIndex]
            // const nowH = _this.$utils.formatDate(new Date(), 'hh')
            // if (_this.selectH === nowH) {
            //   _this.getMList()
            // } else {
            //   _this.mList = _this.getSelectableRange(0, 60)
            //   _this.selectM = _this.mList[0]
            // }
            // _this.mSwiper.slideTo(0, 500, false)
          }
        }
      },
      mSwiperOptions: {
        speed: 1000,
        freeMode: true,
        direction: 'vertical',
        setWrapperSize: true,
        slidesPerView: 6,
        centeredSlides: true,
        initialSlide: 0,
        slideToClickedSlide: true,
        preventClicksPropagation: false,
        observer: true,
        observeParents: true,
        mousewheel: true,
        on: {
          slideChangeTransitionStart: function () {
            // _this.audio.play()
          },
          slideChangeTransitionEnd: function () {
            _this.selectM = _this.mList[this.activeIndex]
          }
        }
      }
    }
  },

  computed: {
    computedTime () {
      const value = this.selectH !== '' && this.selectM !== '' ? this.selectH + ':' + this.selectM + ':' + '00' : '添加时间'
      return value
    },
    hSwiper () {
      return this.$refs.hSwiper.swiper
    },
    mSwiper () {
      return this.$refs.mSwiper.$el.swiper
    }
  },

  mounted () {
    clearInterval(this.timer)
    // this.setTimerPickerSelectableRange()
    this.resetTimeValue()
    this.audio = new Audio()
    this.audio.src = require('@/assets/audio/gear2.mp3')
    // this.audio.src = require('@/assets/audio/jinguStart.mp3')
    // this.audio.play()
  },

  methods: {
    resetTimeValue () {
      this.selectM = ''
      this.selectH = ''
      this.getHList()
      this.getMList()
      this.$emit('pickerTime', '')
      // this.hSwiper.enable()
      // this.mSwiper.enable()
      this.hSwiper.slideTo(0, 500)
      this.mSwiper.slideTo(0, 500)
    },
    handleOK () {
      this.visible = false
      this.$emit('pickerTime', this.selectH + ':' + this.selectM + ':' + '00')
    },
    handleCancel () {
      this.visible = false
      this.resetTimeValue()
    },
    handleVisible () {
      this.visible = !this.visible
      // if (this.visible) {
      //   // 如果没有选择过日期，设置为当前时间，如果已选择过（点击过确认按钮），则保留已确认的日期
      //   this.selectH = this.selectH === '' ? this.$utils.formatDate(new Date(), 'hh') : this.selectH
      //   this.selectM = this.selectM === '' ? this.$utils.formatDate(new Date(), 'mm') : this.selectM
      // } else {
      //   this.resetTimeValue()
      // }
    },
    getHList () {
      // const _h = this.$utils.formatDate(new Date(), 'hh')
      this.hList = this.getSelectableRange(1, 24)
    },
    getMList () {
      // const _m = this.$utils.formatDate(new Date(), 'mm')
      this.mList = this.getSelectableRange(0, 60)
    },
    getSelectableRange (start, end) {
      const arr = []
      for (let i = 0; i < end; i++) {
        arr[i] = String(i).length > 1 ? String(i) : (Array(2).join(0) + i).slice(-2)
      }
      return arr.splice(start, arr.length)
    },
    // 设置日期可选区间
    setTimerPickerSelectableRange () {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        this.getHList()
        const nowH = this.$utils.formatDate(new Date(), 'hh')
        if (this.selectH === nowH) {
          this.getMList()
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.time_picker_swiper {
  position: relative;
  max-width: 300px;
  margin: 0 auto;
  .time_value {
    height: 25px;
    line-height: 25px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    color: #fff;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
  }
  .time_picker_container {
    position: absolute;
    right: 0;
    bottom: 25px;
    padding: 10px 0;
    color: #ffffff;
    background-color: rgba(25, 25, 25, 0.5);
    border-radius: 4px;
    .hidden {
      visibility: hidden;
    }
    .time_container {
      position: relative;
      display: flex;
      padding: 10px 0;
      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 80%;
        height: 1px;
        margin-top: -17px;
        content: '';
        transform: translate(-50%);
        background: #ffffff;
      }
      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 80%;
        height: 1px;
        margin-top: 17px;
        content: '';
        transform: translate(-50%);
        background: #ffffff;
      }
      .swiper-container {
        width: 70px;
        height: 200px;
        .swiper-slide {
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.1s;
          opacity: 0.6;
          &.swiper-slide-active {
            font-size: 18px;
            font-weight: bold;
            opacity: 1;
          }
          &.swiper-slide-prev {
            font-size: 16px;
          }
          &.swiper-slide-next {
            font-size: 16px;
          }
        }
      }
    }
    .btn_container {
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 14px;
        line-height: 24px;
        display: block;
        height: 24px;
        margin: 0 5px;
        padding: 0 10px;
        cursor: pointer;
        color: #fcb718 !important;
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }
  &.disabled {
    .time_value {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
</style>
