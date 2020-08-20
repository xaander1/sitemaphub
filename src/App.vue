<template>
  <div id="app">
    <Menu></Menu>
    <Intro></Intro>
    <Form></Form>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import Intro from './components/Intro.vue'
import Form from './components/Form.vue'

export default {
  name: 'App',
  components: {
    Menu,
    Intro,
    Form
  }
}
</script>
