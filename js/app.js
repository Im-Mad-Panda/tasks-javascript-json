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
//     "rating": 1,
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
  return `<div class="card">
    <img class="card__img" src="${cardDataObj.img}" alt="${cardDataObj.make} ${cardDataObj.model} ${cardDataObj.engine_volume}L (${cardDataObj.year})" width="1" height="1" loading="lazy" decoding="async">
    <div class="card__body">
        <h2 class="card-body__title">${cardDataObj.make} ${cardDataObj.model} ${cardDataObj.year} г.</h2>
        <h3 class="card-body__price">${cardDataObj.price} $</h3>
        <div class="card-body__characteristic">
        <ul class="card__characteristic">
            <li>${cardDataObj.fuel} ${cardDataObj.engine_volume} л.</li>
        </ul>
          <ul class="card__characteristic">
            <li>Трансмиссия: ${cardDataObj.transmission}</li>
          </ul>
        </div>
        <h4 class="card-body__vin">Vin-код: ${cardDataObj.vin}</h4>
        <p class="card-body__timestamp">

        
            </p>
        
    </div>
</div>`;
}


//  const nums = [1,2,3]

//  console.log(`${nums}`);

// const incrementedNums = nums.map(num => `<h2>${num}</h2>`)

// console.log(nums, incrementedNums);

// <a href="tel:${cardDataObj.phone}" class="card-body__link">Call to seller</a>
