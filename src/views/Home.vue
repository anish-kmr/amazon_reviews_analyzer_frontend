<template>
  <div id="home">
     <div class="section split-section">
            <div class="box admin-section">
                <div class="box-heading">
                    <h4>
                        Search any product as you do on Amazon
                    </h4>
                    <h2>
                        Search
                    </h2>
                </div>
                <div class="box-content">
                    <ul class="box-list">
                        <li>Search any product as you would do on amazon</li>
                        <li>All Products with searched keyword will be scrapped from amazon search result</li>
                         <li>Click on product for details and analysis</li>
                         <li>Click on Visit amazon button to open original amazon website</li>
                    </ul>
                </div>
            </div>

            <div class="box student-section">
                <div class="box-heading">
                    <h4>
                       Analyse amazon product's reviews in one click 
                    </h4>
                    <h2>
                        Review Analysis
                    </h2>
                </div>
                <div class="box-content">
                    <ul class="box-list circle-type">
                        <li>In detailed page, click on analyze</li>
                        <li>Fill the Popup, check fake reviews box if you want to filter possibly fake reviews </li>
                         <li>Enter number of reviews you want to analyze (More will take more time)</li>
                         <li>Click analyze to get results</li>
                    </ul> 
                </div>
            </div>
        </div>
    
  </div>
</template>

<style scoped>
#home{
  background-color: #eaeded;
  
}
.section{
    padding:70px 40px ;
}
.split-section{
    justify-content: center;
    display:grid;
    grid-template-columns: 45% 45%;
    grid-column-gap:5%;  
}
.box{
    padding:60px ;
    background-color: white;
    box-shadow: 0px 0px 10px rgb(90, 90, 90);
}
.box-heading h4{
    text-align: center;
    font-weight: normal;
    text-transform: uppercase;
    color:#999999;
    letter-spacing:2.5px;
    font-size: 1.2rem;
    position: relative;
}
.box-heading h4::after{
    content: "" ;
    position: absolute;
    bottom:-10px;
    left:50%;
    transform: translateX(-50%);
    width:70%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.125);
}
.box-heading h2{
    margin-top: 30px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 24px;
    letter-spacing: 5px;
    font-weight: 500;
    color:#1b1b1b;
}
.box-list{
    font-size: 14px;
    padding:15px 20px;
    color:#4e4c4c;
    margin:20px 0;
}
.faculty-section{
    margin: 40px auto;
    grid-column: 1/3;
}
.box-list li{
    padding:3px;
    font-size: 18px;
    list-style-type: square;
}

</style>