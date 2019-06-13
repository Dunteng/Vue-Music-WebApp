<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        class="dot"
        v-for="(item,index) in dots"
        :key="item"
        :class="{active: currentPageIndex===index}"
      ></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { addClass } from "common/js/dom";
import BScroll from "better-scroll";

export default {
  name: "slider",
  props: {
    loop: {
      /* 循环轮播 */
      type: Boolean,
      default: true
    },
    autoPlay: {
      /* 自动轮播 */
      type: Boolean,
      default: true
    },
    interval: {
      /* 轮播时间间隔 */
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    };
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth();
      this._initDots();
      this._initSlider();

      if (this.autoPlay) {
        this._play();
      }
    }, 20);

        /* 监听窗口改变事件 */
      window.addEventListener('resize', () => {
        if (!this.slider) {/* 如果slider还未初始化，直接退出 */
          return
        }
        this._setSliderWidth()
        this.slider.refresh()
      })
  },
  activated() {
    if (this.autoPlay) {
      this._play()
    }
  },
  deactivated() {
    clearTimeout(this.timer)
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    // 初始化轮播图宽度
    _setSliderWidth() {
      this.children = this.$refs.sliderGroup.children;

      let width = 0;
      let sliderWidth = this.$refs.slider.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        addClass(child, "slider-item");

        child.style.width = sliderWidth + "px";
        width += sliderWidth;
      }
      if (this.loop ) {
        width += 2*sliderWidth; /* 加多左右两个轮播图的宽度，为了实现无缝流畅滚动，不会噌的一下跳过去 */
      }
      this.$refs.sliderGroup.style.width = width + "px";
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,/* 是否无缝轮播 */
          threshold: 0.3,
          speed: 400
        }
      });
        // better-scroll内置一个事件scrollEnd，即一张轮播图划完时触发
      this.slider.on("scrollEnd", () => {
        let pageIndex = this.slider.getCurrentPage().pageX; /* getCurrentPage是better-scroll内置的函数 */
        if (this.loop) {  /* 记住如果是无缝轮播的话，会多出两个节点，所以pageIndex要自减1 */
        //   pageIndex -= 1;   
        }
        this.currentPageIndex = pageIndex;
        console.log('pageIndex = this.slider.getCurrentPage().pageX  '+pageIndex);
        console.log('currentPageIndex  '+this.currentPageIndex);
        if (this.autoPlay) {
          this._play();
        }
      });

      this.slider.on("beforeScrollStart", () => {
        if (this.autoPlay) {
          clearTimeout(this.timer);
        }
      });
    },
    // 初始化轮播图的点
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    _play() {
      let pageIndex = this.currentPageIndex + 1;
      if (this.loop) {
        // pageIndex += 1;
      }
      this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400);  /* goToPage是better-scroll的内置方法，用于跳转到指定轮播图 */
      }, this.interval);
      
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.slider {
  min-height: 1px;

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>