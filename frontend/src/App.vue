<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html, body {
  padding: 0;
  margin: 0;
}

.wrapper {
  background-color: #efefef;

  nav {
    background-color: #cccccc !important;
  }

  // sidebar css
  #sidebar {
    background-color: #505256 !important;
    li {
      background-color: #353638;
      :hover {
        background-color: #1f1f21 !important;
        color: #17a2b8 !important;
        text-decoration: none;
      }
    }
  }
}
</style>
