const cars = JSON.parse(DATA);
const showcaseEl = document.getElementById("showcase");

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


renderCardShowcase(cars, showcaseEl);

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
    <img class="card__img" src="${cardDataObj.img}" alt="${cardDataObj.make} ${
    cardDataObj.model
  } ${cardDataObj.engine_volume}L (${
    cardDataObj.year
  })" width="1" height="1" loading="lazy" decoding="async">
    <div class="card__body">
        <h2 class="card-body__title">${cardDataObj.make} ${cardDataObj.model} ${
    cardDataObj.year
  } г.</h2>
        <h3 class="card-body__price">${cardDataObj.price} $</h3>
        <h4 class="card-body__rating">${starsHTML} </h4>
        <dl class="card__characteristics">
          <div class="card__characteristic">
            <dt>Трансмиссия:</dt>
            <dd>${cardDataObj.transmission}</dd>
          </div>
          <div class="card__characteristic">
            <dt>Объем двигателя:</dt>
            <dd>${cardDataObj.engine_volume} L</dd>
          </div>
          <div class="card__characteristic">
            <dt>Страна:</dt>
            <dd>${cardDataObj.country}</dd>
          </div>
          <div class="card__characteristic">
            <dt>Пробег:</dt>
            <dd>${cardDataObj.odo} km</dd>
          </div>
          <div class="card__characteristic">
            <dt>Топливо:</dt>
            <dd>${cardDataObj.fuel}</dd>
          </div>
          <div class="card__characteristic">
            <dt>Цвет:</dt>
            <dd>${cardDataObj.color}</dd>
          </div>
          <div class="card__characteristic">
            <dt>Страна:</dt>
            <dd>${cardDataObj.country}</dd>
          </div>
          
        </dl>
        <div>
            <h4>Расход:</h4>
              <dl>
              <div class="card__characteristic">
                <dt>Road:</dt>
                <dd>${cardDataObj.consume?.road || '???'} L/100km</dd>
              </div>
              <div class="card__characteristic">
                <dt>City:</dt>
                <dd>${cardDataObj.consume?.city || '???'} L/100km</dd>
              </div>
              <div class="card__characteristic">
                <dt>Mixed:</dt>
                <dd>${cardDataObj.consume?.mixed || '???'} L/100km</dd>
              </div>
              </dl>
          </div>
        ${
          cardDataObj.vin
            ? `<h4 class="card-body__vin ${cardDataObj.vin_check ? `checked` : `unchecked`}">${cardDataObj.vin_check ? `<i class="fas fa-check-circle"></i>` : `<i class="fas fa-times-circle"></i>`} Vin-код: ${cardDataObj.vin}</h4>`
            : ""
        }
        <div class="card-body__stats">
        <p class="card-body__timestamp">${new Date(
          cardDataObj.timestamp
        ).toLocaleDateString()}</p>
        <p class="card-body__views">Просмотров: ${
          cardDataObj.views}</p>
          </div>
    </div>
</div>`;
}

//  const nums = [1,2,3]

//  console.log(`${nums}`);

// const incrementedNums = nums.map(num => `<h2>${num}</h2>`)

// console.log(nums, incrementedNums);

// <a href="tel:${cardDataObj.phone}" class="card-body__link">Call to seller</a>



// document.addEventListener('click', () => {
//   console.log('document Click');
// })

showcaseEl.addEventListener('click', (event) => {
  const imageEl = event.target.closest('.card__img')
  if (imageEl) {
    console.log('Image click');
  }
})

// const cardImages = document.querySelectorAll('.card__img')
// console.log(cardImages);
// cardImages.forEach((image) => {
//   image.addEventListener('click', () => {
//     console.log('Click on image');
//   })
// })

const formEl = document.getElementById('form')

form.addEventListener('submit', event => {
  event.preventDefault()
  console.log('Submit');
})