<template>
  <div id="results-main">
    <div class="sort-box">
      <span id="grid-list" @click="switchGridList">Grid</span>
      <span id="compare" @click="showModel">Select 2-4 insurance to compare</span>
      <select
          name="sort-select"
          id="sort-select"
          v-model="sort"
          @change="getInsuranceList"
      >
        <option value="0">Sort by: Featured</option>
        <option value="1">Sort by: Price low to high</option>
        <option value="2">Sort by: Price high to low</option>
        <option value="3">Sort by: Name increase</option>
        <option value="4">Sort by: Name decrease</option>
      </select>
    </div>
    <div class="flex-container">
      <div class="left">
        <div>
          <h3>Best Seller</h3>
          <input
              type="checkbox"
              v-model="bestSeller"
              @change="getInsuranceList">
          <span>Best Seller</span>
        </div>

        <div>
          <h3>Policy Max</h3>
          <ul class="priceFilter">
            <li
                @click="setMaxPrice(9999,-1)"
                :class="{'selected':priceFilterIndex==-1}"
            >all
            </li>
            <li
                v-for="(price,index) in priceFilterData"
                @click="setMaxPrice(price,index)"
                :class="{'selected':index==priceFilterIndex}"
            >
              <{{price}}
            </li>
          </ul>
        </div>
        <div>
          <h3>Type</h3>
          <div v-for="(item) in type">
            <input
                type="checkbox"
                v-model="item.onOFF"
                @change="getInsuranceList"
            >
            <span>{{item.name}}</span>
          </div>
        </div>
        <div>
          <h3>Section</h3>
          <div v-for="(item) in section">
            <input
                type="checkbox"
                v-model="item.onOFF"
                @change="getInsuranceList"
            >
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div id="container">
          <ul
              :class="isGrid?'grid':'list'"
          >

            <li>
              <span>Best Seller</span>
              <h5>Name</h5>
              <p>Description</p>
              <p>Type</p>
              <p>Section</p>
              <em class="price">Price</em>
            </li>
            <li
                v-for="insurance in insuranceList"
                @click="selectInsurance(insurance.id)"
                :class="{'selected':selectedInsurance.indexOf(insurance.id)>-1}"
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
      </div>
      <CompareModel v-if="modelShow" @close="closeModel" :ids="selectedInsurance"></CompareModel>
    </div>
  </div>
</template>

<script>

  import CompareModel from '@/components/compare-modal.vue'

  export default {
    name: 'results-quotes',
    data() {
      return {
        isGrid: true,
        sort: 0,
        bestSeller: false,
        policyMax: 9999,
        type: [
          {
            name: 'Comprehensive',
            onOFF: false
          },
          {
            name: 'Fixed',
            onOFF: false
          }
        ],
        section: [
          {
            name: 'International Travel Medical',
            onOFF: false
          },
          {
            name: 'J1 Medical',
            onOFF: false
          },
          {
            name: 'Student Medical',
            onOFF: false
          },
          {
            name: 'Travel Medical',
            onOFF: false
          }
        ],
        insuranceList: [],
        selectedId: [],
        priceFilterIndex: -1,
        priceFilterData: [50, 100, 150, 200, 250],
        selectedInsurance: [],
        modelShow: false
      }

    },
    mounted() {
      this.getInsuranceList();
    },
    computed: {},
    methods: {
      switchGridList() {
        this.isGrid = !this.isGrid;
      },
      getInsuranceList() {
        this.axios.get("/quotes", {
          params: {
            sort: this.sort,
            bestSeller: this.bestSeller,
            policyMax: this.policyMax,
            section: this.section,
            type: this.type,
          }
        }).then(response => {
          this.insuranceList = response.data;
        })
      },
      setMaxPrice(price, index) {
        this.policyMax = price;
        this.priceFilterIndex = index;
        this.getInsuranceList();
      },
      selectInsurance(id) {
        let index = this.selectedInsurance.indexOf(id);
        if (index > -1) {
          this.selectedInsurance.splice(index, 1)
        } else {
          this.selectedInsurance.push(id)
        }
      },
      showModel() {
        if (this.selectedInsurance.length >= 2 && this.selectedInsurance.length <= 4)
          this.modelShow = true;
      },
      closeModel() {
        this.modelShow = false;
      }
    },
    watch: {},
    components: {CompareModel}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #results-main .sort-box {
    width: 100%;
    height: 3rem;
    border-bottom: 1px solid #ccc;
    box-shadow: 0 0 10px #ddd;
  }

  #grid-list {
    line-height: 3rem;
    margin-left: 3rem;
    padding: .5rem 1rem;
    border-color: #ccc;
    box-shadow: 0 0 10px #ddd;
  }

  #grid-list:hover {
    background-color: grey;
  }

  #compare {
    line-height: 3rem;
    margin-left: 3rem;
    padding: .5rem 1rem;
    border-color: #ccc;
    box-shadow: 0 0 10px #ddd;
  }

  #compare:hover {
    background-color: grey;
  }

  #sort-select {
    float: right;
    outline: black solid 1px;
    height: 100%;
  }

  #results-main .flex-container {
    display: flex;
    display: -webkit-flex;
    height: 100rem;
  }

  #results-main .flex-container .left {
    -webkit-flex: 1;
    flex: 1;
    border-right: 1px solid #ccc;
    box-shadow: 0 0 10px #ddd;
    min-width: 14rem;
    padding: 1rem;
  }

  #results-main .flex-container .left .priceFilter li:hover {
    background-color: #ff9257;
  }

  #results-main .flex-container .left .priceFilter .selected {
    background-color: #f46a32;
  }

  #results-main .left h3 {
    margin: 2rem 0 .5rem 0;
    font-weight: bolder;
  }

  #results-main .flex-container .right {
    -webkit-flex: 1;
    flex: 4;
    border-right: 1px solid #ccc;
    box-shadow: 0 0 10px #ddd;
  }

  /*grid display*/

  #results-main .right .grid li:first-child {
    display: none;
  }

  #results-main .right .grid li {
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

  #results-main .right .grid .selected {
    border: brown solid .1rem;
  }

  #results-main .right .grid li span {
    position: absolute;
    left: .5rem;
    top: .5rem;
    border-right: .013333rem solid #efefef;
    border-bottom: .013333rem solid #efefef;
    color: orange;
  }

  #results-main .right .grid li h5 {
    font-size: 1.2rem;
    font-weight: bolder;
    text-align: center;
    margin-bottom: .5rem;
    margin-top: 1rem;
  }

  #results-main .right .grid li p {
    display: block;
    text-align: left;
    color: lightslategrey;
    padding: .5rem 1rem;
  }

  #results-main .right .grid li .price {
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

  /*list display*/
  #results-main .right .list span, #results-main .right .list h5, #results-main .right .list p, #results-main .right .list .price {
    float: left;
    border-right: .013333rem solid #efefef;
    border-bottom: .013333rem solid #efefef;
    padding: .5rem;
    box-sizing: border-box;
    min-height: 5rem;
    overflow: hidden;
  }

  #results-main .right .list li:first-child {
    font-weight: bolder;
  }

  #results-main .right .list li strong {
    display: none;
    overflow: hidden;
  }

  #results-main .right .list li span {
    width: 10%;
    overflow: hidden;
  }

  #results-main .right .list li h5 {
    width: 20%;
    overflow: hidden;
  }

  #results-main .right .list li p {
    width: 20%;
    overflow: hidden;
  }

  #results-main .right .list li .price {
    width: 10%;
    overflow: hidden;
  }

  /*media display size*/
  @media all  and (max-width: 1100px) {
    #results-main .right .grid li {
      min-height: 26rem;
    }

    #results-main .right .list li span, #results-main .right .list li h5, #results-main .right .list li p, #results-main .right .list li .price {
      min-height: 6rem;
    }
  }

  @media all  and (max-width: 1000px) {
    #results-main .right .grid li {
      width: 33.33%;
    }

    #results-main .right .list li span, #results-main .right .list li h5, #results-main .right .list li p, #results-main .right .list li .price {
      min-height: 7rem;
    }
  }

  @media all  and (max-width: 800px) {
    #results-main .right .grid li {
      width: 50%;
      min-height: 25rem;
    }

    #results-main .right .list li span, #results-main .right .list li h5, #results-main .right .list li p, #results-main .right .list li .price {
      min-height: 8rem;
    }
  }

  @media all  and (max-width: 600px) {
    #results-main .right .grid li {
      width: 100%;
      min-height: 25rem;
    }

    #results-main .flex-container .left {
      display: none;
    }

    #results-main .right .list li span, #results-main .right .list li h5, #results-main .right .list li p, #results-main .right .list li .price {
      min-height: 8rem;
    }
  }
</style>
