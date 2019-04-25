<template>
  <div id="model">
    <div class="mask" @click="close"></div>
    <ul>
      <li
          v-for="insurance in insuranceList"
      >
        <span v-if="insurance.bestSellers">Best Seller</span>
        <span v-else></span>
        <h5>{{insurance.name}}</h5>
        <p><strong>Description:</strong> {{insurance.description}}</p>
        <p><strong>Type: </strong> {{insurance.type}}</p>
        <p><strong>section:</strong> {{insurance.section}}</p>
        <em class="price"><strong>Price: $</strong>{{insurance.price}}.00</em>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    props: ['ids'],
    data() {
      return {
        insuranceList: []
      }
    },
    mounted() {
      this.getCompareInsurance()
    },
    methods: {
      getCompareInsurance() {
        console.log(this.ids)
        this.axios.get("/quotes", {
          params: {
            ids: this.ids
          }
        }).then(response => {
          console.log(response.data)
          this.insuranceList = response.data;
        })
      },
      close(){
        console.log(11111111111111111)
        this.$emit('close');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #model{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  #model .mask{
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: .8;
    background-color: #333333;
    z-index: 3;
  }

  #model ul{
    position: absolute;
    left: 10%;
    top: 5%;
    bottom: 20%;
    right: 10%;
    margin: auto;
    z-index: 6;
    background-color: white;
  }
  #model li {
    border-right: .013333rem solid #efefef;
    border-bottom: .013333rem solid #efefef;
    width: 25%;
    float: left;
    text-align: center;
    box-sizing: border-box;
    padding: 1rem;
    position: relative;
    min-height: 22rem;
  }


  #model li span {
    position: absolute;
    left: .5rem;
    top: .5rem;
    border-right: .013333rem solid #efefef;
    border-bottom: .013333rem solid #efefef;
    color: orange;
  }

  #model li h5 {
    font-size: 1.2rem;
    font-weight: bolder;
    text-align: center;
    margin-bottom: .5rem;
    margin-top: 1rem;
  }

  #model li p {
    display: block;
    text-align: left;
    color: lightslategrey;
    padding: .5rem 1rem;
  }

  #model li .price {
    display: block;
    font-size: 1.2rem;
    font-weight: bolder;
    text-align: center;
    color: firebrick;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 3rem;
    margin: 0 auto;
  }
</style>
