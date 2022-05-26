<template>
  <div class="home">
    <img alt="FFu logo" src="../assets/logo.png" />
    <div class="sentence">
      <p class="title">変換</p>
      <div class="grid">
        <router-link to="/con4">
          <div class="card">
            <p class="title">Convert to mp4</p>
            <p>ファイルの変換を行います</p>
          </div>
        </router-link>
        <router-link to="/about">
          <div class="card">
            <p class="title">About</p>
            <p>このソフトウェアの概要です</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
