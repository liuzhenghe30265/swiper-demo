<template>
  <div class="tab">
    <swiper
      ref="swiperTitle"
      class="swiper-title"
      :options="swiperOptionTitle"
      :auto-update="true"
      :auto-destroy="true"
      :delete-instance-on-destroy="true"
      :cleanup-styles-on-destroy="true"
    >
      <swiper-slide
        v-for="(item, index) of tabListData"
        ref="swiperSlideItem"
        :key="'name' + index"
        :iname="item.name"
        class="swiper-slide-title"
      >
        <div
          class="tab-name"
          :class="{ active: index === swiperActiveIndex }"
          @click="handleSlidClickFun(index)"
        >
          {{ item.name }}
        </div>
      </swiper-slide>
      <div
        class="swiper-scrollbar"
        slot="scrollbar"
      >
      </div>
    </swiper>
    <swiper
      ref="swiperContent"
      class="swiper-content"
      :options="swiperOptionContent"
      :auto-update="true"
      :auto-destroy="true"
      :delete-instance-on-destroy="true"
      :cleanup-styles-on-destroy="true"
    >
      <swiper-slide
        v-for="(item, index) of tabListData"
        :key="'content' + index"
        class="swiper-slide-content"
      >
        {{ item.name }}
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
//  vue-awesome-swiper 官网 https://github.surmon.me/vue-awesome-swiper/
export default {
  name: 'Tab',
  components: {},
  data() {
    const _this = this
    return {
      swiperActiveIndex: 0,
      titleActive: '',
      swiperOptionContent: {
        slidesPerView: 'auto',
        on: {
          slideChangeTransitionStart: function () {
            _this.swiperActiveIndex = this.activeIndex
            _this.swiperTitle.slideTo(this.activeIndex, 500, false)
          }
        }
      },
      swiperOptionTitle: {
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: false,
          draggable: false,
          snapOnRelease: true,
          dragSize: 20
        }
      },
      tabListData: [
        {
          name: '直播'
        },
        {
          name: '推荐'
        },
        {
          name: '追番'
        },
        {
          name: '热门'
        },
        {
          name: '影视'
        },
        {
          name: '奥运'
        },
        {
          name: '建党百年'
        }
      ]
    }
  },
  computed: {
    swiperContent() {
      return this.$refs.swiperContent.$el.swiper
    },
    swiperTitle() {
      return this.$refs.swiperTitle.$el.swiper
    }
  },
  mounted() {},
  methods: {
    handleSlideToFun(index) {
      this.swiperActiveIndex = index
      this.swiperContent.slideTo(index, 500, false)
      this.swiperTitle.slideTo(index, 500, false)
    },
    handleSlidClickFun(index) {
      this.handleSlideToFun(index)
    }
  }
}
</script>

<style lang="scss">
.tab {
  max-width: 300px;
  margin: 0 auto;
  border: 1px solid #ececec;
}
.swiper-slide-title {
  width: auto !important;
  .tab-name {
    padding: 10px;
    cursor: pointer;
    &.active {
      color: #2ea9fe;
    }
  }
}
.swiper-slide-content {
  padding: 10px;
  line-height: 40px;
}
</style>