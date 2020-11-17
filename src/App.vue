<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'App',
  components: { 
    'app-header':Header,
  },
}
</script>

<style>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
</style>
