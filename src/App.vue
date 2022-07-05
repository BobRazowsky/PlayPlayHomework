<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
	<RouterView />
</template>

<style>
@import '@/assets/base.css';

@font-face {
  font-family: Oswald;
  src: url('./assets/Oswald-Regular.ttf');
}

#app {
  max-width: 1280px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: 'Oswald';
}

</style>