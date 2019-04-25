<template>
  <div id="ib-header">
    <div class="logo">
      <img src="../assets/img/logo.png" alt="">
    </div>
    <div class="headerTitle">
      <p>| Travel Insurance</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #ib-header {
    width: 100%;
    height: 5rem;
    background-color: #F0F3F6;
    color: #1F4A9D;
  }
  #ib-header .logo{
    float: left;
    position: relative;
    display: inline-block;
    height: 100%;
    width: 10rem;
  }
  #ib-header .logo img {
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
  }

  #ib-header .headerTitle{
    float: left;
    height: 100%;
  }

  #ib-header .headerTitle:before{
    content: "";
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
  #ib-header .headerTitle p{
    display:inline-block;
    font-size: 1.2rem;
    font-weight: bold;
  }

</style>
