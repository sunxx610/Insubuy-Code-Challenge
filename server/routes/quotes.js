const express = require('express');
const router = express.Router();
const mockData = require('../public/mockData/mockData');

/* GET users listing. */
router.get('/', (req, res) => {
  sendFilteredData(req, res);
});

router.post('/', (req, res) => {
  sendResponseData(req, res);
});

const sendFilteredData = (req, res) => {
  let dataList = mockData.quotes;
  let sort = req.query.sort||'',
    bestSeller = req.query.bestSeller,
    policyMax = req.query.policyMax||'',
    section = req.query.section||'',
    type = req.query.type||'',
    ids = req.query.ids||'',
    _section = [],
    _type = [];


  if(section){
    section.forEach(item => {
      item = JSON.parse(item);
      if (item.onOFF) {
        _section.push(item.name)
      }
    });
  }
  if(type){
    type.forEach(item => {
      item = JSON.parse(item);
      if (item.onOFF) {
        _type.push(item.name)
      }
    });
  }

  if (bestSeller!='false'&&bestSeller) {
    dataList = bestSellerFilter(dataList);
  }




  if (ids.length) {
    dataList = idsFilter(dataList,ids);
  }
  if (_section.length) {
    dataList = sectionFilter(dataList,_section);
  }
  if (_type.length) {
    dataList = typeFilter(dataList,_type);
  }
  if (policyMax != '9999' && policyMax) {
    dataList = maxPriceFilter(dataList, policyMax);
  }
  if (sort != 0 && sort) {
    dataList = sortedData(sort, dataList);
  }
  res.status(200).send(dataList);
};
const bestSellerFilter = (data) => {
  return data.filter(item => {
    if (item.bestSellers) {
      return item
    }
  })
};
const idsFilter = (data,ids) => {
  return data.filter(item => {
    console.log(item.id)
    if (ids.indexOf(item.id.toString())>-1) {
      return item
    }
  })
};
const sectionFilter = (data,_section) => {
  return data.filter(item => {
    if (_section.indexOf(item.section)>-1) {
      return item
    }
  })
};
const typeFilter = (data,_type) => {
  return data.filter(item => {
    if (_type.indexOf(item.type)>-1) {
      return item
    }
  })};
const maxPriceFilter = (data, maxPrice) => {
  return data.filter(item => {
    if (item.price <= maxPrice) {
      return item
    }
  })
}
const sortedData = (sort, data) => {
  let newData = [];
  switch (sort) {
    case '1':
      newData = data.sort(keysort("price", true));
      break;
    case '2':
      newData = data.sort(keysort("price", false));
      break;
    case '3':
      newData = data.sort(keysort("name", 3));
      break;
    case '4':
      newData = data.sort(keysort("name", 4));
      break;
  }
  return newData;
}

function keysort(key, sortType) {
  return function (a, b) {
    if (sortType === 3)
      return a[key].localeCompare(b[key]);
    else if (sortType === 4)
      return b[key].localeCompare(a[key]);
    else
      return sortType ? a[key] - b[key] : b[key] - a[key];
  }
}

const sendResponseData = (req, res) => {
  if (!checkValidations(req)) {
    res.status(500).send({error: true, message: `One or more conditions not met`});
  }
  else {
    res.status(200).send({'success': true});
  }
};

const checkValidations = req => {
  for (let i in req.body.quoteInfo) {
    if (req.body.quoteInfo[i] === '') {
      return false;
    }
  }
  return true;
};


module.exports = router;
