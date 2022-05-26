<template>
  <div class="sidebar">
    <router-link to="/">
      <div id="card">
        <p>HOME</p>
      </div>
    </router-link>
    <router-link to="/con4">
      <div id="card">
        <p>変換</p>
      </div>
    </router-link>
    <router-link to="/about">
      <div id="card">
        <p>About</p>
      </div>
    </router-link>
  </div>
  <router-view class="maincon" />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.sidebar {
  height: 100%;
  width: 15%;
  position: absolute;
  left: 0;
  top: 0;
  padding-top: 40px;
  border-right-color: black;
  border-right-style: solid;
  border-right-width: 2px;

  div {
    padding: 8px;
    font-size: 24px;
    display: block;
  }

  #card {
    font-size: 2rem;
    width: 100%;
    font-weight: 700;
    line-height: 10px;
    text-align: left;
  }
}

.maincon {
  margin-left: 15%;
}
</style>
