<template>
  <div id="header">
    <div class="logo">
      <img src="@/assets/amazon/58.png" alt="" srcset="">
    </div>
    <div class="search">
      <div class="searchbar">
        <input type="text" v-model="searchString" >
        <div class="search-btn" @click="search">
          <i class="fas fa-search"></i>
        </div>
      </div>
    </div>
    <div class="nav">

    </div>  
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      searchString:'',
    }
  },
  mounted() {
    let s = this.$route.query.s
    if(s) this.searchString = decodeURIComponent(s)
  },
  methods:{
    search(){
      this.$router.push(`/search?s=${encodeURIComponent(this.searchString)}`)
    }
  }
}
</script>

<style scoped>
#header{
  width: 100%;
  background-color: #231f20;
  display: grid;
  grid-template-columns: 15% 65% auto ;
  align-items: center;
}
.searchbar{
  position: relative;
}

.searchbar input{
  width: 100%;
  padding:10px 0 10px 10px;
  outline: none;
  border:none;
  border-radius: 5px;
  font-size: 18px;
}
.search-btn{
  position: absolute;
  top:0;
  right:0;
  background-color: #febd69;
  height: 100%;
  padding:10px 15px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
