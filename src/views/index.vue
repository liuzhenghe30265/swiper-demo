<template>
  <div class="device_swiper">
    <div
      v-if="title"
      class="ds_title"
    >
      {{ title }}
    </div>
    <div class="ds_inner">
      <swiper
        :ref="`mySwiper-${sign}`"
        :options="options"
        class="swiper_container"
      >
        <swiper-slide
          v-for="(item, index) of renderList.slides"
          :key="index"
          :index="fromIndex + index"
        >
          <div
            class="slider_inner"
            :class="{ active: active == fromIndex + index }"
          >
            <div
              class="si_icon"
              :style="{ backgroundImage: computedBackgroundImage(item)}"
            />
            <div class="si_name"> {{ item.deviceName }}</div>
          </div>
        </swiper-slide>
      </swiper>
      <div
        class="swiper-button-prev"
        :class="`swiper-button-prev-${sign}`"
      />
      <div
        class="swiper-button-next"
        :class="`swiper-button-next-${sign}`"
      />
    </div>
  </div>
</template>

<script>
import { getDeviceOptions } from '@/utils/config'
export default {
  name: 'DeviceSwiperContainer',

  components: {},

  props: {
    active: {
      type: [Number, String],
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    sign: {
      type: [String, Number],
      default: ''
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    const _this = this
    return {
      fromIndex: 0,
      renderList: {},
      options: {
        virtual: {
          slides: this.list,
          cache: true,
          renderExternal: function (data) {
            this.fromIndex = data.from
            this.mySwiper.$el.children[0].style.top = data.offset + 'px'
            this.renderList = data
          }.bind(this)
        },
        cssMode: true,
        speed: 500,
        direction: 'vertical',
        centeredSlides: true,
        slidesPerView: 3,
        observer: true,
        observeParents: true,
        mousewheel: true,
        navigation: {
          nextEl: `.device_swiper .swiper-button-next-${this.sign}`,
          prevEl: `.device_swiper .swiper-button-prev-${this.sign}`
        },
        on: {
          tap: function (swiper, event) {
            // this.slideTo(this.clickedIndex, 500, false)
            // const data = _this.list[this.clickedIndex]
            // _this.handleClick(data)
            _this.$emit('change', this.clickedSlide.getAttribute('index'))
          },
          slideChangeTransitionStart: function () {},
          slideChangeTransitionEnd: function () {
            // const data = _this.list[this.activeIndex]
            // _this.handleClick(data)
          }
        }
      }
    }
  },

  computed: {
    computedBackgroundImage() {
      return data => {
        const options = getDeviceOptions(data.level)
        return `url(${options.icon})`
      }
    },
    mySwiper() {
      return this.$refs[`mySwiper-${this.sign}`]
    }
  },

  watch: {
    active: {
      handler(val, oldVal) {
        this.slideTo(val)
      },
      deep: false,
      immediate: false
    }
  },

  mounted() {
    // this.slideTo(this.active)
  },

  methods: {
    slideTo(index) {
      this.mySwiper ? this.mySwiper.$el.swiper.slideTo(index) : void 0
    }
    // handleClick(data) {
    //   console.log('.......handleClick', data)
    // }
  }
}
</script>

<style lang='scss' scoped>
.device_swiper {
  position: relative;
  .ds_title {
    margin: 0 0 10px 0;
  }
  .ds_inner {
    position: relative;
    min-width: 120px;
    padding: 30px 0;
    .swiper_container {
      overflow: inherit;
      overflow-y: clip;
      box-sizing: border-box;
      height: 320px;
      .swiper-slide {
        box-sizing: border-box;
        .slider_inner {
          display: flex;
          align-items: center;
          flex-flow: column;
          justify-content: center;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding: 0 20px;
          cursor: pointer;
          .si_icon {
            width: 68px;
            height: 44px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
          }
          .si_name {
            font-family: D-DIN;
            font-size: 12px;
            line-height: 14px;
            display: flex;
            justify-content: center;
            width: 80px;
            height: 42px;
            word-break: break-word;
          }
          &.active {
            color: var(--theme-color);
          }
        }
      }
    }
    .swiper-button-prev,
    .swiper-button-next {
      top: 30px;
      left: 50%;
      width: 30px;
      height: 16px;
      padding: 0;
      cursor: pointer;
      transform: translateX(-50%);
      &:after {
        width: 100%;
        height: 100%;
        content: '';
        background-image: url(~@/assets/images/createMission/icon01.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }
    }
    .swiper-button-next {
      top: auto;
      bottom: 10px;
      transform: translateX(-50%) rotate(180deg);
    }
  }
}
</style>