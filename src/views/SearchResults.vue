<template>
  <div id="search-page-container">
    <div class="searchString-container">
      Search results for <span class="searchString"> {{searchString}} </span>
    </div>
    <div class="search-results-container">
      <ul>
        <li v-for="(product,i) in searchResults" :key="i" class="product-container" @click="()=>detailedPage(product.amazonLink)"  >
          <div class="product-image">
            <img :src="product.image" alt="" srcset="">
          </div>
          <div class="product-info">
            <div class="product-title"> {{product.title}} </div>
            <div class="product-rating"> 
              {{product.avgStars}} | 
              <span class="product-reviewCount"> {{product.reviewCount}} </span> reviews

            </div>
            <div class="product-price"> &#8377;{{product.price}} </div>
            <div class="product-controls">
              <div class="visit-site-btn">
                <a class="btn" :href="AMAZON_URL+product.amazonLink"> Visit Amazon </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      searchString:'',
      s:'',
      searchResults:[],
    }
  },
  mounted() {
    this.s = this.$route.query.s
    this.searchString = decodeURIComponent(this.s)
    axios.get(`${this.SCRAPPER_URL}/search?s=${this.s}`)
    .then(res=>{
      console.log('res : ',res)
      this.searchResults = res.data.products
    })
    .catch(err=>{
      console.log('Error searching :' ,err)
    })
  },
  methods: {
    detailedPage(url){
      this.$router.push('/dp?p='+encodeURIComponent(url))
    }
  },
}
</script>

<style scoped>
#search-page-container{
  margin:20px
}
.searchString-container{
  font-size: 18px;
  margin-bottom: 50px;
  padding-left: 10%;
  position: relative;
}
.searchString-container::after{
  content: '';
  position: absolute;
  bottom: -20px;
  left:0;
  height:2px;
  width: 100%;
  background-color: #e6e6e6;
}
.searchString{
  color:#0232b6;
  font-style: italic;
  font-weight: bold;
  font-size: 20px;
  margin-left: 4px;
}
.search-results-container{
  margin: 20px 10%
}
.product-container{
  display: grid;
  grid-template-columns: 200px auto;
  grid-gap:50px;
  margin-bottom: 30px;
  padding:10px;
  border-bottom: 1px solid #efefef;
}
.product-container:hover{
  cursor: pointer;
}
.product-image{text-align: center;}
.product-image img{
  /* height: 200px; */
  /* width: 200px; */
}
.product-info>div{
  margin-bottom: 6px;
}
.product-title{
  font-weight: 800;
  font-size: 18px;
}
.product-price{
  font-weight: 500;
  font-size: 24px;
  color:#B12704;
}
.product-controls{
  margin-top:30px;
}
</style>