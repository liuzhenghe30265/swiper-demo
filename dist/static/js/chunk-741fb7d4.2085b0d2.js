(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-741fb7d4"],{"4daf":function(e,t,i){},9002:function(e,t,i){"use strict";i("4daf")},c3bc:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"tab"},[i("swiper",{ref:"swiperTitle",staticClass:"swiper-title",attrs:{options:e.swiperOptionTitle,"auto-update":!0,"auto-destroy":!0,"delete-instance-on-destroy":!0,"cleanup-styles-on-destroy":!0}},[e._l(e.tabListData,(function(t,s){return i("swiper-slide",{key:"name"+s,ref:"swiperSlideItem",refInFor:!0,staticClass:"swiper-slide-title",attrs:{iname:t.name}},[i("div",{staticClass:"tab-name",class:{active:s===e.swiperActiveIndex},on:{click:function(t){return e.handleSlidClickFun(s)}}},[e._v(" "+e._s(t.name)+" ")])])})),i("div",{staticClass:"swiper-scrollbar",attrs:{slot:"scrollbar"},slot:"scrollbar"})],2),i("swiper",{ref:"swiperContent",staticClass:"swiper-content",attrs:{options:e.swiperOptionContent,"auto-update":!0,"auto-destroy":!0,"delete-instance-on-destroy":!0,"cleanup-styles-on-destroy":!0}},e._l(e.tabListData,(function(t,s){return i("swiper-slide",{key:"content"+s,staticClass:"swiper-slide-content"},[e._v(" "+e._s(t.name)+" ")])})),1)],1)},n=[],a={name:"Tab",components:{},data:function(){var e=this;return{swiperActiveIndex:0,titleActive:"",swiperOptionContent:{slidesPerView:"auto",on:{slideChangeTransitionStart:function(){e.swiperActiveIndex=this.activeIndex,e.swiperTitle.slideTo(this.activeIndex,500,!1)}}},swiperOptionTitle:{slidesPerView:"auto",freeMode:!0,scrollbar:{el:".swiper-scrollbar",hide:!1,draggable:!1,snapOnRelease:!0,dragSize:20}},tabListData:[{name:"直播"},{name:"推荐"},{name:"追番"},{name:"热门"},{name:"影视"},{name:"奥运"},{name:"建党百年"}]}},computed:{swiperContent:function(){return this.$refs.swiperContent.$el.swiper},swiperTitle:function(){return this.$refs.swiperTitle.$el.swiper}},mounted:function(){},methods:{handleSlideToFun:function(e){this.swiperActiveIndex=e,this.swiperContent.slideTo(e,500,!1),this.swiperTitle.slideTo(e,500,!1)},handleSlidClickFun:function(e){this.handleSlideToFun(e)}}},r=a,l=(i("9002"),i("2877")),o=Object(l["a"])(r,s,n,!1,null,null,null);t["default"]=o.exports}}]);