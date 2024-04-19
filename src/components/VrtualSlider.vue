<template>
  <div class="swiper">
    <swiper
      :ref="`mySwiper-${sign}`"
      :options="options"
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
          {{item}}
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
</template>

<script>
/* eslint-disable no-unused-vars */
export default {
  name: '',

  components: {},

  props: {
    sign: {
      type: [String, Number],
      default: ''
    },
    active: {
      type: [Number, String],
      default: 0
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
          nextEl: `.swiper .swiper-button-next-${this.sign}`,
          prevEl: `.swiper .swiper-button-prev-${this.sign}`
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
    mySwiper() {
      return this.$refs[`mySwiper-${this.sign}`]
    }
  },

  watch: {
    active: {
      handler(val) {
        this.slideTo(val)
      },
      deep: false,
      immediate: false
    }
  },

  mounted() {},

  methods: {
    slideTo(index) {
      this.mySwiper ? this.mySwiper.$el.swiper.slideTo(index) : void 0
    }
  }
}
</script>

<style lang='scss' scoped>
.swiper {
  position: relative;
  width: 400px;
  margin: 0 auto;
  .swiper-container {
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
        line-height: 40px;
        &.active {
          color: red;
        }
      }
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    top: 0;
    left: 50%;
    transform: rotate(90deg);
    margin-left: -12px;
  }
  .swiper-button-next {
    top: auto;
    bottom: 0;
  }
}
</style>