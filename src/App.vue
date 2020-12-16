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
a{
  text-decoration: none;
}
li{list-style-type: none;}
.btn{
  background-color: #febd69;
  padding:7.5px 15px;
  border-radius: 5px;
  color:#252525;
  transition: .6s all;
}
.btn:hover{
  cursor: pointer;
  transition: .3s all;
  background-color:#f6aa46 ;

}
.vue-progress-path .progress {
  stroke: #231f20;
}

.vue-progress-path .background {
  stroke: #ececec;
}
</style>
