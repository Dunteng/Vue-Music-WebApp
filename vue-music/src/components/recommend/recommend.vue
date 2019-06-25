<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <!-- 注意这里的:data如果没有加的话依旧是不能上下滑动的，因为scroll是在mounted时候初始化，由于数据获取存在异步性，可能mounted的时候尚未取到数据，整个列表dom的高度是没有被撑开的以至于better-scroll无法正确初始化。所以需要传入一个discList数据（discList有说明数据已经获取到了）触发scroll的watch里面的refresh -->
      <div>
        <!-- 注意，better-scroll的scroll标签下只能是一个div包裹全部，如果这个div不把轮播图和列表都包裹起来的话，效果是只有歌单列表滚动，轮播图是固定的，那就糟了 -->
        <div v-if="recommends.length" class="slider-wrapper">
          <!-- 注意这里用了v-if来确保只有当成功获取到数据后才将slider组件添加上，从而保证slider中的循环渲染成功 -->
          <slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img @load="loadImage" :src="item.picUrl">
                <!-- 通过@load事件监听图片加载完成了没有，一旦获加载完就refresh scroll -->
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item in discList" :key="item.dissid">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Slider from "base/slider/slider";
import Loading from "base/loading/loading";
import Scroll from "base/scroll/scroll";
import { getRecommend, getDiscList } from "api/recommend";
import { ERR_OK } from "api/config";

export default {
  data() {
    return {
      recommends: [] /* 推荐内容轮播图 */,
      discList: [] /* 歌单列表数据 */
    };
  },
  created() {
    this._getRecommend();

    this._getDiscList();
  },
  methods: {
    loadImage() {
      if (!this.checkloaded) {
        /* 无中生有搞个checkloaded变量来监测加载完成与否，一开始默认为undefined，只要有一张加载成功就改值为true，不用每张图都触发这个方法，加载得到一张图就ok了 */
        this.checkloaded = true;
        this.$refs.scroll.refresh();
      }
    },
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
          //   console.log(res);
        }
      });
    },
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          console.log(res);
          this.discList = res.data.list;
        }
      });
    }
  },
  components: {
    Slider,
    Loading,
    Scroll
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>