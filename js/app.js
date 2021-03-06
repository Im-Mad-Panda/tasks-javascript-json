let cars = [];
const showcaseEl = document.getElementById("showcase");
const sortSelectEl = document.getElementById('sortSelect')
const searchFormEl = document.getElementById('searchForm')
const filterFormEl = document.getElementById('filterForm')
const filterFields = ["make", "transmission", "fuel"]

renderFilterForm(cars, filterFormEl)
// {
//     "id": "89aed5b8c686ebd713a62873e4cd756abab7a106",
//     "make": "BMW",
//     "model": "M3",
//     "year": 2010,
//     "img": "http://dummyimage.com/153x232.jpg/cc0000/ffffff",
//     "color": "Goldenrod",
//     "vin": "1G6DW677550624991",
//     "country": "United States",
//     "rating": 4.5,
//     "price": 2269,
//     "views": 5,
//     "seller": "Ellery Girardin",
//     "vin_check": true,
//     "top": false,
//     "timestamp": 1601652988000,
//     "phone": "+1 (229) 999-8553",
//     "fuel": "Benzin",
//     "engine_volume": 1.4,
//     "transmission": "CVT",
//     "odo": 394036,
//     "consume": { "road": 4.8, "city": 12.3, "mixed": 8.4 }
//   }

getCars()

async function getCars() {
  try {
    const response = await fetch('/data/cars.json');
    if (response.ok) {
        const json = await response.json();
        cars = json
        renderCardShowcase(cars, showcaseEl);
    } else{
        throw `Bad response! ${response.statusText} (${response.status})`
    }
  } catch (error) {
    console.warn(error);
  }
}


filterFormEl.addEventListener('submit', event => {
  event.preventDefault()
  const query = filterFields.map(field => {
    return Array.from(event.target[field]).filter(input => input.checked).map(input => input.value)
  })
  const filteredCars = cars.filter(car => {
    return query.every((values, i) => {
      return values.length > 0 ? values.includes(car[filterFields[i]]) : true
    })
  })
  console.table(filteredCars);
  renderCardShowcase(filteredCars, showcaseEl);
})

searchFormEl.addEventListener('submit', event => {
  event.preventDefault()
  // console.log(event.target);
  // console.log(event.target.search);
  // console.log(event.target.search.value);
  const query = event.target.search.value.trim().toLowerCase().split(' ').filter(word => !!word)
  console.log(query);
  const searchFields = ["make", "model", "year"]
  const filteredCars = cars.filter(car => {
    return query.every(word => {
      return searchFields.some(field => {
        return String(car[field]).toLowerCase().includes(word)
      })
    })
  })
  console.table(filteredCars);
  renderCardShowcase(filteredCars, showcaseEl);
})



sortSelectEl.addEventListener('change', event => {
  const [key, order] = event.target.value.split('/')
  if (typeof cars[0][key] === 'string') {
    cars.sort((a, b) => {
      return (a[key].localeCompare(b[key])) * order
    })
  } else {
    cars.sort((a, b) => {
      return (a[key] - b[key]) * order
    })
  }
  // if (sortingType === 'price-high-low') {
  //   cars.sort((a, b) => {
  //     return b.price - a.price
  //   })
  // } else if (sortingType === 'price-low-high') {
  //   cars.sort((a, b) => {
  //     return a.price - b.price
  //   })
  // } else if (sortingType === 'year-high-low') {
  //   cars.sort((a, b) => {
  //     return b.year - a.year
  //   })
  // } else if (sortingType === 'year-low-high') {
  //   cars.sort((a, b) => {
  //     return a.year - b.year
  //   })
  // }
  renderCardShowcase(cars, showcaseEl);
})




{/* <fieldset>
  <legend>Make</legend>
  <label>
    <input type="checkbox" name="make" value="Audi">
    Audi
  </label>
  <label>
    <input type="checkbox" name="make" value="BMW">
    BMW
  </label>
</fieldset> */}



function renderFilterForm(cardsDataArr, filterFormEl) {
  filterFormEl.firstElementChild.innerHTML = createFilterFieldsets(cardsDataArr).join("");
}

function createFilterFieldsets(cardsDataArr) {
  return filterFields.map(field => {
    const values = Array.from(new Set(cardsDataArr.map(cardDataObj => cardDataObj[field]))).sort()
    return createFilterFieldset(field, values)
  })
}

function createFilterFieldset(field, values) {
  const labels = values.map((value) => createFilterCheckbox(field, value)).join('');
  return `<fieldset>
  <legend>${field}</legend>
  ${labels}
</fieldset>`
}

function createFilterCheckbox(field, value) {
  return `<label>
  <input type="checkbox" name="${field}" value="${value}">
  ${value}
</label>`
}











function renderCardShowcase(cardsDataArr, cardShowcaseEl) {
  cardShowcaseEl.innerHTML = createCardShowcaseHTML(cardsDataArr).join("");
}

function createCardShowcaseHTML(cardsDataArr) {
  return cardsDataArr.map((cardDataObj) => createCardHTML(cardDataObj));
}

function createCardHTML(cardDataObj) {
  let starsHTML = "";
  for (let i = 0; i < 5; i++) {
    if (cardDataObj.rating > i + 0.5) {
      starsHTML += `<i class="fas fa-star"></i>`;
    }
    else if (cardDataObj.rating == i + 0.5) {
      starsHTML += `<i class="fas fa-star-half-alt"></i>`;
    }
    else {
      starsHTML += `<i class="far fa-star"></i>`;
    }
  }

  return `<div class="card">

  
    <img class="card__img" src="${cardDataObj.img}" alt="${cardDataObj.make} ${cardDataObj.model
    } ${cardDataObj.engine_volume}L (${cardDataObj.year
    })" width="1" height="1" loading="lazy" decoding="async">

  <div class="card-body-top">
  ${cardDataObj.top
      ? `<p class="card__top ${cardDataObj.top ? `top` : `untop`}">?????? ${cardDataObj.top ? `<i class="fas fa-certificate"></i>` : ``}</p>`
      : ""
    }
</div>

    <div class="card__body">
        <h2 class="card-body__title">${cardDataObj.make} ${cardDataObj.model} ${cardDataObj.year
    } ??.</h2>
        <h3 class="card-body__price">${cardDataObj.price} $</h3>
        <h4 class="card-body__rating">${starsHTML} </h4>
        <dl class="card__characteristics">
          <div class="card__characteristic">
            <dt>??????????????????????:</dt>
            <dd>${cardDataObj.transmission}</dd>
          </div>
          <div class="card__characteristic">
            <dt>?????????? ??????????????????:</dt>
            <dd>${cardDataObj.engine_volume} L</dd>
          </div>
          <div class="card__characteristic">
            <dt>????????????:</dt>
            <dd>${cardDataObj.country}</dd>
          </div>
          <div class="card__characteristic">
            <dt>????????????:</dt>
            <dd>${cardDataObj.odo} km</dd>
          </div>
          <div class="card__characteristic">
            <dt>??????????????:</dt>
            <dd>${cardDataObj.fuel}</dd>
          </div>
          <div class="card__characteristic">
            <dt>????????:</dt>
            <dd>${cardDataObj.color}</dd>
          </div>
          <div class="card__characteristic">
            <dt>????????????:</dt>
            <dd>${cardDataObj.country}</dd>
          </div>
          
        </dl>
        <div>
            <h4>????????????:</h4>
              <dl>
              <div class="card__characteristic-consume">
                <dt>Road:</dt>
                <dd>${cardDataObj.consume?.road || `<i class="fas fa-minus"></i> `} L/100km</dd>
              </div>
              <div class="card__characteristic-consume">
                <dt>City:</dt>
                <dd>${cardDataObj.consume?.city || '<i class="fas fa-minus"></i> '} L/100km</dd>
              </div>
              <div class="card__characteristic-consume">
                <dt>Mixed:</dt>
                <dd>${cardDataObj.consume?.mixed || '<i class="fas fa-minus"></i> '} L/100km</dd>
              </div>
              </dl>
          </div>
        ${cardDataObj.vin
      ? `<h4 class="card-body__vin ${cardDataObj.vin_check ? `checked` : `unchecked`}">${cardDataObj.vin_check ? `<i class="fas fa-check-circle"></i>` : `<i class="fas fa-times-circle"></i>`} Vin-??????: ${cardDataObj.vin}</h4>`
      : ""
    }
        <div class="card-body__stats">
        <p class="card-body__timestamp">${new Date(
      cardDataObj.timestamp
    ).toLocaleDateString()}</p>
        <p class="card-body__views">????????????????????: ${cardDataObj.views}</p>
          </div>
    </div>
</div>`;
}



// const arr = [2,1,3,12,15,28,6,7,90]
// const arr = [{ name: 'Ivan' }, { name: 'Andrey' }, { name: 'David' }, { name: 'Aleksey' }, { name: 'Katerina' }, { name: 'Yulia' }, { name: 'Anton' }, { name: 'Oleg' }]
// console.log(arr);

// arr.sort((a, b) => {
//   return a.name.localeCompare(b.name)
// })

// console.log(arr);


// a - b === (a - b) * 1

// b - a === (a - b) * -1


// const numbers = [1,12,56,12,78,32,45,1,2,3,2,6,12]

// // const filteredNumbers = numbers.filter(number => {
// //   return number > 10
// // })
// console.log(numbers);
// // console.log(filteredNumbers);

// const moreThanZero = numbers.every(number => {
//   console.log(number);
//   return number > 0
// })
// const moreThanZero = numbers.some(number => {
//   console.log(number);
//   return number > 0
// })

// console.log(moreThanZero);



