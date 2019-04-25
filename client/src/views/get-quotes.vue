<template>
  <div id="ib-main">
    <ul class="information">
      <li class="policy-max">
        <div class="subTitle">Policy Maximum</div>
        <select
            name="policy-max-select" class="policy-max"
            @blur="inspect('max')"
            @focus="ErrOff('max')"
            :class="{'input-error':errList.max.err}"
            v-model="quoteInfo.maxPrice"
        >
          <option value="0">Choose your policy maximum</option>
          <option
              v-for="opt in maxPolicyList"
              :value="opt.value"
          >{{opt.price}}
          </option>
        </select>
        <span class="max-error error" v-show="errList.max.err">{{errList.max.msg}}</span>
      </li>
      <li class="age">
        <div class="subTitle">Age</div>
        <input
            type="text"
            placeholder="Choose your age"
            v-model="quoteInfo.age"
            @blur="inspect('age')"
            @focus="ErrOff('age')"
            :class="{'input-error':errList.age.err}"
        >
        <span class="age-error error" v-show="errList.age.err">{{errList.age.msg}}</span>
      </li>
      <li class="travelDates">
        <div class="subTitle">Travel Dates (mm/dd/yyyy)</div>
        <date-picker
            class="date-picker"
            v-model="quoteInfo.startDate"
            lang="en"
            format="MM-DD-YYYY"
            placeholder="Start Date"
            :not-before="TodayDate"
            :not-after="quoteInfo.endDate"
            :class="{'input-error':errList.start.err}"
        ></date-picker>
        <date-picker
            class="date-picker"
            v-model="quoteInfo.endDate"
            lang="en"
            format="MM-DD-YYYY"
            placeholder="End Date"
            :not-before="quoteInfo.startDate"
            :class="{'input-error':errList.end.err}"
        ></date-picker>
        <span class="date-error error" v-show="errList.start.err">{{errList.start.msg}}</span>
        <span class="date-error error" v-show="errList.end.err">{{errList.end.msg}}</span>
      </li>
      <li class="citizenShip">
        <div class="subTitle">Citizenship</div>
        <input
            type="text"
            placeholder="Choose your Country of Citizenship"
            v-model="quoteInfo.citizen"
            @blur="inspect('citizen')"
            @focus="ErrOff('citizen')"
            :class="{'input-error':errList.citizen.err}"
        >
        <span class="citizen-error error" v-show="errList.citizen.err">{{errList.citizen.msg}}</span>
      </li>
      <li class="mailingState">
        <div class="subTitle">Mailing State</div>
        <input
            type="text"
            placeholder="Choose State"
            v-model="quoteInfo.state"
            @blur="inspect('state')"
            @focus="ErrOff('state')"
            :class="{'input-error':errList.state.err}"
        >
        <span class="State-error error" v-show="errList.state.err">{{errList.state.msg}}</span>
      </li>
    </ul>
    <div class="submit-button">
      <div
          class="submit"
          :class="{'disabled-btn':quoteInfoErr}"
          @click="submit"
      >GET QUOTES
      </div>
    </div>
    <div class="reset">
      <a class="reset" href="javascript:;" @click="reset">Reset Form</a>
    </div>
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker'

  export default {
    name: 'get-quotes',
    data() {
      return {
        maxPolicyList: [
          {
            'value': 50,
            'price': '50,000'
          },
          {
            'value': 100,
            'price': '100,000'
          },
          {
            'value': 250,
            'price': '250,000'
          },
          {
            'value': 500,
            'price': '500,000'
          }
        ],
        quoteInfo: {
          'maxPrice': '0',
          'age': '',
          'startDate': '',
          'endDate': '',
          'citizen': '',
          'state': ''
        },
        errList: {
          'max': {
            'err': false,
            'msg': ''
          },
          'age': {
            'err': false,
            'msg': ''
          },
          'start': {
            'err': false,
            'msg': ''
          },
          'end': {
            'err': false,
            'msg': ''
          },
          'citizen': {
            'err': false,
            'msg': ''
          },
          'state': {
            'err': false,
            'msg': ''
          },
        },
        quoteInfoErr: true
      }

    },
    computed: {
      TodayDate() {
        return this.timeFormate(new Date())
      }
    },
    methods: {
      timeFormate(timeStamp) {
        let year = new Date(timeStamp).getFullYear();
        let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
        let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
        return month + '-' + date + '-' + year;
      },
      inspect(flag) {
        switch (flag) {
          case 'max':
            console.log(this.quoteInfo.maxPrice)
            if (this.quoteInfo.maxPrice == 0 || this.quoteInfo.maxPrice == '') {
              this.errList.max.err = true;
              this.errList.max.msg = 'You haven\'t choose maximum policy!'
            } else {
              this.errList.max.err = false
              this.errList.max.msg = ''
            }
            break;
          case 'age':
            this.quoteInfo.age = this.quoteInfo.age.replace(/[^0-9]/ig, "");
            let regex = /^([0-1]?[0-9]?[0-9])|([1-2][0-9]{3})$/;
            if (!this.quoteInfo.age) {
              this.errList.age.err = true;
              this.errList.age.msg = 'Age can\'t be empty!'
            } else {
              let format = regex.test(this.quoteInfo.age);
              let NumOnly = regex.test(this.quoteInfo.age);
              if (format) {
                let year = new Date().getFullYear();
                /*console.log(year)*/
                if ((this.quoteInfo.age > 100 && this.quoteInfo.age < 1000) || ((year - this.quoteInfo.age) > 100 && this.quoteInfo.age > 1000) || this.quoteInfo.age > year) {
                  this.errList.age.err = true;
                  this.errList.age.msg = 'Age can\'be more than 100 or less than 1!'
                } else {
                  this.errList.age.err = false;
                  this.errList.age.msg = ''
                }
              } else {
                this.errList.age.err = true;
                this.errList.age.msg = 'Age can only be a birth year or age!'
              }
            }
            break;
          case 'start':
            console.log('start', this.quoteInfo.startDate)
            if (!this.quoteInfo.startDate) {
              this.errList.start.err = true;
              this.errList.start.msg = 'You haven\'t choose start date!'
            } else {
              this.errList.start.err = false
              this.errList.start.msg = ''
            }
            break;
          case 'end':
            if (!this.quoteInfo.endDate) {
              this.errList.end.err = true;
              this.errList.end.msg = 'You haven\'t choose end date!'
            } else {
              if (this.quoteInfo.endDate < this.quoteInfo.startDate) {
                this.errList.end.err = true;
                this.errList.end.msg = 'End date must be later than start date!'
              } else {
                this.errList.end.err = false
                this.errList.end.msg = ''
              }
            }
            break;
          case 'citizen':
            this.quoteInfo.citizen = this.quoteInfo.citizen.replace(/[^a-zA-Z\s*]/ig, "").trim();
            if (!this.quoteInfo.citizen) {
              this.errList.citizen.err = true;
              this.errList.citizen.msg = 'Citizen ship can\'t be empty!'
            } else {
              this.errList.citizen.err = false
              this.errList.citizen.msg = ''
            }
            break;
          case 'state':
            this.quoteInfo.state = this.quoteInfo.state.replace(/[^a-zA-Z\s*]/ig, "").trim();
            if (!this.quoteInfo.state) {
              this.errList.state.err = true;
              this.errList.state.msg = 'Mailing state can\'t be empty!'
            } else {
              this.errList.state.err = false
              this.errList.state.msg = ''
            }
            break;

        }
      },
      ErrOff(flag) {
        this.errList[flag].err = false;
        this.errList[flag].msg = '';
        console.log(this.errList[flag].err, this.errList[flag].msg)
      },
      inspectQuoteInfo() {
        let emptFlag = false;
        let errFlag = false;
        Object.keys(this.quoteInfo).forEach(key => {
          if (this.quoteInfo[key] == '') {
            emptFlag = true
          }
        });
        if (this.quoteInfo.maxPrice == 0) {
          emptFlag = true
        }
        if (!emptFlag) {
          Object.keys(this.errList).forEach(key => {
            if (this.errList[key].err)
              errFlag = this.errList[key].err;
          });

          this.quoteInfoErr = errFlag;
        } else {
          this.quoteInfoErr = emptFlag;
        }
        console.log('empty', emptFlag)
        console.log('err', errFlag)
      },
      submit() {
        this.inspectQuoteInfo();
        // console.log('this.quoteInfoErr', this.quoteInfoErr)
        if (!this.quoteInfoErr) {
          this.axios.post("/quotes", {
            quoteInfo: this.quoteInfo
          }).then((response) => {
            if (response.status == 200) {
              this.$router.push({
                name: "ResultQuotes"
              })
            } else {
              alert(response.data.message)
            }
          })
        }
      },
      reset() {
        this.quoteInfo = {
          'maxPrice': '0',
          'age': '',
          'startDate': '',
          'endDate': '',
          'citizen': '',
          'state': ''
        }
      }
    },
    watch: {
      quoteInfo: {
        handler() {
          this.inspectQuoteInfo()
        },
        deep: true
      }
    },
    components: {
      DatePicker
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #ib-main {
    margin: 1rem .8rem;
  }

  #ib-main .information {
    margin-bottom: 1rem;
  }

  #ib-main .information:after {
    display: block;
    clear: both;
    height: 0;
    content: "";
    visibility: hidden;
    overflow: hidden;
  }

  #ib-main .information li {
    box-sizing: border-box;
    float: left;
    width: 50%;
    padding-bottom: 2rem;
    min-height: 7rem;
  }

  #ib-main .information li:nth-child(odd) {
    padding-right: 1rem;
  }

  #ib-main .information li .subTitle {
    font-weight: bold;
    margin-bottom: .5rem;
  }

  #ib-main .information li input, select {
    box-sizing: border-box;
    width: 100%;
    outline: lightgray .1rem solid;
    padding: .5rem .8rem;
  }

  #ib-main .information li .error {
    padding-left: .4rem;
    font-size: .75rem;
    color: #a50608;
  }

  #ib-main .information li select option {
  }

  #ib-main .information li .input-error {
    outline-color: #a50608;
  }

  #ib-main .information li .date-picker {
    width: 50%;
    float: left;
  }

  #ib-main .submit-button {
    text-align: center;
    width: 100%;
  }

  #ib-main .submit {
    width: 100%;
    height: 3rem;
    background-color: #EB7F33;
    line-height: 3rem;
    font-weight: bold;
    color: white;
    margin-bottom: 1rem;
  }

  #ib-main .disabled-btn {
    background: #A9A9A9;
    background: linear-gradient(#BFBFBF, #999);
  }

  #ib-main .reset {
    width: 100%;
    text-align: center;
    color: #1F4A9D;
    font-style: italic;
    text-decoration: underline;
  }

  #ib-main .reset a {
    padding: 1rem;
  }

  @media all and (max-width: 500px) {
    #ib-main .information li {
      float: left;
      width: 100%;
    }

    #ib-main .information li:nth-child(odd) {
      padding-right: 0;
    }

    #ib-main .submit {
      width: 10rem;
      display: inline-block;
    }
  }
</style>
