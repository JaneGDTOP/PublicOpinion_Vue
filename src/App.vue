<template>
  <div>
    <!-- 路由的出口 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'my-app'
}
</script>

<style lang='less'>
  // 消除默认样式 与浏览器紧紧贴合 reset.css
  // 1.第一步消除默认样式 可以引入 reset.css
  html, body, h3, p{
    margin: 0;
    padding: 0;
  }
</style>
