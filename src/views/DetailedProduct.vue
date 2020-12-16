<template>
  <div>
    <div id="detail-page-container" v-if="product" >
      
      <div class="product-images">
        <div class="all-images">
          <ul class="image-list">
            <li v-for="(image_url,i) in product.images" :key="i" >
              <div class="image_container">
                <img :src="image_url" alt="" srcset="">
              </div>
            </li>
          </ul>
        </div>
        <div class="image-preview">
            <img :src="product.preview" alt="">
        </div>
      </div>

      <div class="product-info">
        <div class="title">
          <h2>{{product.title}}</h2>
        </div>
        <div class="ratings">
          <span class="rating">{{product.ratings}}</span> 
          <span class="ratingCount">{{product.ratingsCount}}</span> 
        </div>
        <div class="price">
          Price: <span id="price">{{product.price}} </span>
        </div>
        <div class="delivery">
          {{product.delivery}}
        </div>
        <div class="stock">
          {{product.stock}}
        </div>
        <div class="details">
          <ul>
            <li v-for="(detail,i) in product.details" :key=i>
              {{detail}}
            </li>
          </ul>
        </div>
        <div class="controls">
          <div @click="popup_open=true" >
            <span class="btn"> Analyze Reviews </span>
          </div>
          <div>
            <a class="btn" :href="AMAZON_URL+detail_page_url"> Visit Amazon </a>
          </div>
        </div>
      </div>

    </div>
      <div class="analysis">
        <div class="loading" v-if="loading" >
          <loading-progress
            :indeterminate="loading"
            :counter-clockwise="true"
            :hideBackground="true"
            size="64"
            rotate
            fillDuration="2"
            rotationDuration="1"
          />
          <div class="loading_status" >
            {{loading_status}}
          </div>
        </div>
        <div class="analysis-container" v-if="analysis" >
          <div class="fake-analysis">
            <div class="detected-fake"  @click="show_fake_reviews=!show_fake_reviews">
              Detected {{analysis.fake_analysis.fakeCount}} Possibly Fake Reviews
            </div>
            <div class="fake-reviews" v-if="show_fake_reviews" >
              <ul>
                <li v-for="(review,i) in analysis.fake_analysis.fake" :key="i" >
                  {{review}}
                </li>
              </ul>
            </div>
          </div>
          <div class="reviews-analysis">
            <div class="reviews-analysis-bar"  @click="show_reviews_analysis=!show_reviews_analysis">
              Reviews Analysis
            </div>
            <div class="review-analysis-content" v-if="show_reviews_analysis" >
              <div class="ratio-chart">
                <h2 class="chart-title" > Ratio of Good and Bad reviews</h2>
                <chart 
                  :data="[
                    analysis.review_analysis.num_positive_reviews,
                    analysis.review_analysis.num_negative_reviews
                  ]" 
                  :categories="['Good','Bad']" ></chart>
              </div>
              <div class="word-clouds" >
                <div class="positive-wordcloud">
                  <h2 class="cloud-title" >Positive Reviews Top Words</h2>
                  <img :src="'data:image/jpeg;base64,'+this.analysis.review_analysis.positive_wordcloud.split('\'')[1]" alt="" srcset="">
                </div>
                <div class="negative-wordcloud">
                  <h2 class="cloud-title" > Negative Reviews Top Words</h2>
                  <img :src="'data:image/jpeg;base64,'+this.analysis.review_analysis.negative_wordcloud.split('\'')[1]" alt="" srcset="">
                </div>
              </div>
              <div class="ratings-chart">
                <h2 class="chart-title"> Ratings Distribution</h2>
                <chart2 :data="analysis.review_analysis.rating" ></chart2>
              </div>
              <div class="verified-chart">
                <h2 class="chart-title" >Verified Purchases</h2>
                <chart :data="analysis.review_analysis.verified_purchases" :categories="['Verified','Unverified']" ></chart>
              </div>
            </div>

          </div>
        </div>
      </div>



      <div class="popup" :class="{popup_open:popup_open}">
        <div class="close-popup" @click="popup_open=false" >&times;</div>
        <div class="popup-header">
          <h2>Analysis Settings</h2>
        </div>
        <div class="popup-body">
          <div class="form-item">
            <label for="include-fake-detection">Include Fake Detection Filter</label>
            <input type="checkbox" v-model="isFakeEnabled" id="include-fake-detection">
          </div>
          <div class="form-item">
            <label for="num-reviews">Number of reviews to analyze : </label>
            <input type="text" id="num-reviews" v-model="num_reviews" >
          </div>
          <div class="popup-controls controls">
            <div @click="analyze_reviews" >
              <span class="btn"> Start Analyzing </span>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import chart from '../components/Chart.vue'
import chart2 from '../components/Chart2.vue'
export default {
  components: {
    chart,
    chart2,
  },
  data(){
    return {
      detail_page_url:'',
      product:'',
      isFakeEnabled:true,
      num_reviews:100,
      reviews:{},
      popup_open:false,
      loading:false,
      loading_status:'Loading...',
      analysis:'',
      show_fake_reviews:false,
      show_reviews_analysis:true,
    }
  },
  mounted() {
    if(this.analysis) return
    this.detail_page_url =  decodeURIComponent(this.$route.query.p)
    axios.get(`${this.SCRAPPER_URL}/detail?url=${encodeURIComponent(this.detail_page_url)}`)
    .then(res=>{
      console.log('res ',res)
      this.product = res.data
    })
    .catch(err=>{
      console.log('err:',err)
    })
    
  },
  methods: {
    async detect_fake_reviews(reviews){
      let payload = {reviews}
      return axios.post(`${this.FAKE_DETECTOR_URL}/classify`,payload)
      .then(res=>{
        console.log('fake res ',res)
        let genuine=[],fake=[]
        for(let i=0;i<reviews.length;i++){
          if(res.data.predictions[i] >=0.5) genuine.push(reviews[i])
          else fake.push(reviews[i])
        }
        return { genuine, fake }
      })
      .catch(err=>{
        console.log('err',err)
        throw new Error('Error Detecting fake reviews.')
      })
    },
    async get_reviews_analysis(reviews){
      let payload = {reviews}
      return axios.post(`${this.REVIEW_ANALYSIS_URL}/classify`,payload)
      .then(res=>{
        console.log('analysis res ',res)
        return res.data.analysis
      })
      .catch(err=>{
        console.log('err',err)
        throw new Error('Error Analysing reviews.')
      })
    },
    async scrap_reviews(){
      let encoded_url = encodeURIComponent(this.product.review_page_url)
      return axios.get(`${this.SCRAPPER_URL}/reviews?url=${encoded_url}&n=${this.num_reviews}`)
      .then(res=>{
        console.log('res of scrap ',res)
        return res.data.reviews
      })
      .catch(err=>{
        console.log('err',err)
        throw new Error('Error Scrapping Reviews.')
      })
    },
  
    local_analysis(){
      let num_verified=0,star4_5=0,star3_4=0,star2_3=0,star1_2=0
      this.reviews.forEach(review => {
        if(review.verified === "Verified Purchase") num_verified+=1;
        let stars = parseInt(review.rating.split(' out of 5 stars')[0])
        if(stars>=4) star4_5+=1
        else if(stars>=3) star3_4+=1
        else if(stars>=2) star2_3+=1
        else if(stars>=1) star1_2+=1
      });
      return {
        verified_purchases:[num_verified,this.reviews.length-num_verified],
        rating:[
          star1_2,
          star2_3,
          star3_4,
          star4_5
        ]
      }  

    },
    async analyze_reviews(){
      this.popup_open = false
      this.loading = true
      try{
          this.loading_status = `Scrapping ${this.num_reviews} reviews from Amazon...`
          let reviews = await this.scrap_reviews();
          this.reviews = reviews
          reviews = reviews.map(review=>review.title+' : '+review.content)
          console.log("transformed reviews array",reviews)
          this.loading_status = `Detecting Fake Reviews from Scrapped reviews...`
          console.log('scrapped ',this.num_reviews,'reviews ',reviews)
          let detected = await this.detect_fake_reviews(reviews)
          console.log('detected ',detected)
          let analysis = {
            fake_analysis:{
              genuine:detected.genuine,
              fake:detected.fake,
              fakeCount:detected.fake.length,
              genuineCount:detected.genuine.length,
              totalCount:reviews.length
            },
            review_analysis:{},
          }
          this.loading_status = `Analyzing Reviews...`
          let review_analysis = await this.get_reviews_analysis(detected.genuine)
          let more_analysis = this.local_analysis()
          console.log("more",more_analysis)
          analysis.review_analysis = {...review_analysis,...more_analysis}
          this.analysis = analysis
          


      }
      catch(err){
          console.log("error ",err)
      }
      this.loading = false
    },

  },
}
</script>

<style scoped>
#detail-page-container{
  display: grid;
  grid-template-columns: 530px auto;
  margin: 50px 20px;
}
.product-images{
  display: grid;
  grid-template-columns: 50px auto;
}
.image-preview{
  height:450px;
  width:450px;
}
.image-preview img{
  width: 100%;
  height: 100%;
}
.ratings{
  margin:7px 0;
}
.ratings span {
  margin-right:10px
}

.ratingCount{
  color:#007185
}
.price{
  margin: 15px 0;
  color:#565959
}
#price{
  color:#B12704;
  font-size: 24px;
  line-height: 24px;
  font-weight: 500;
}
.delivery{
  color:#565959
}
.stock{
  font-size: 20px;
  color:#007600;
  margin: 10px 0;
}
.details{
  padding: 10px 20px;
}
.details li{
  list-style-type: disc;
  line-height: 20px;
}
.controls{
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}
.controls>div{
  margin-right: 30px;
}


.popup{
  position: fixed;
  box-shadow: 0 0 10px 5px #707070;
  border:1px solid #ececec;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  background-color: white;
  display: none;
}
.close-popup{
  position: absolute;
  right:10px;
  font-size: 28px;
}
.close-popup:hover{cursor: pointer;}
.popup-header{
  padding:10px 20px
}
.popup-body{
  padding:15px 30px;
}
.form-item{
  padding:10px 0;
}
.form-item label{
  font-size: 18px;
  color:#565959;
  margin-right: 20px;
}
.form-item input{
  width:50px;
  padding: 4px 8px;
  outline: none;
  border: 1px solid #707070
}
.popup-controls>div {margin-right: 0 !important;}
.popup-controls {justify-content:flex-end;padding:10px 0}
.popup_open{
  display: block;
}

.loading{
  text-align: center;
}
.loading_status{
  color:#565959;
  font-size: 20px;
}
.analysis{
  margin-bottom: 50px;
}
.detected-fake, .reviews-analysis-bar{
  padding: 20px 30px;
  font-size: 20px;
  color:#1d1d1d;
  background-color: #fff1b7;
  position: relative;
}
.fake-analysis,.reviews-analysis{
 border-bottom: 2px solid #d5cece;
}
.detected-fake:hover,.reviews-analysis:hover{
  cursor: pointer;
}
.fake-reviews{
  padding: 10px 60px;
  background-color: #fff1b7; 
}
.fake-reviews li{
  color:#707070;
  list-style-type: disc;
  margin-bottom: 10px;
}
.review-analysis-content>div{
  
  margin: 20px 8%;
}
.ratio-chart, .verified-chart{
  margin: 25px auto !important;
  width:60%;
}
.word-clouds{
  margin: 25px auto;
  display: grid;
  grid-template-columns: 45% 45%;
  justify-content: center;
  grid-gap: 50px;
}
.word-clouds img{
  width: 100%;
}
.chart-title,.cloud-title{
  color:#707070;
  text-align: center;
  padding:20px;
}
</style>