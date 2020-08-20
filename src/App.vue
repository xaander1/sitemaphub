<template>
  <div id="app">
    <Menu></Menu>
    <Intro></Intro>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import Intro from './components/Intro.vue'

export default {
  name: 'App',
  components: {
    Menu,
    Intro
  }
}
</script>
