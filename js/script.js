// const currencylist = 'https://api.coinmarketcap.com/v1/ticker/?limit=25';
let box = document.querySelector('.box');
let img = 'https://bitflyer.blob.core.windows.net/pub/Images/bitcoin-logo.png';
let arrowUp = '<i class="tiny material-icons up">arrow_upward</i>';
let arrowDown = '<i class="tiny material-icons down">arrow_downward</i>';
let arrow1h = '';
let arrow24h = '';
let arrow7d = '';
let elem = '';
let elemIndex;
let priceValue = []; //raw data from checkboxes
let priceFilter = [];  //sorted data from checkboxes
let dataAll;
let dataAllPriceFilter = [];
let priceCheckboxCounter = 0;
let filterCounter = 0;
let dataSortValue;

// function requst() {
//     fetch(currencylist)
//         .then(function (response) {
//            return response.json()
//         })
//
//         .then(function (data) {
//
//             console.log(data);

const currencyList = 'https://api.coinmarketcap.com/v1/ticker/?limit=30';
// let box = document.querySelector('.box');
// let btcicon = 'http://bitcoin-4k.com/wp-content/uploads/2017/06/btc.png';
const btn = document.querySelector('#btn-sort-max');
const alph = document.querySelector ('#btn-sort-alph');
const val = document.querySelector ('#btn-sort-min');
const value = document.querySelector ('#btn-sort-day');
const vall = document.querySelector ('#btn-sort-hour');
const rank = document.querySelector ('#btn-sort-rank');

function createCard(data) {
    let string = '';

    for ( let i = 0; i < data.length; i++ ) {
        if(data[i].percent_change_1h > 0){
            arrow1h = arrowUp;
        }
        else{
            arrow1h = arrowDown;
        }

        if(data[i].percent_change_24h > 0){
            arrow24h = arrowUp;
        }
        else{
            arrow24h = arrowDown;
        }
        if(data[i].percent_change_7d > 0){
            arrow7d = arrowUp;
        }
        else{
            arrow7d = arrowDown;
        }

        string += `<div class="card"> <div class="card-image"><img src=img/svg/${data[i].id}.svg><span class="card-title"> ${data[i].name} </span> <a class="btn-floating halfway-fab waves-effect waves-light red modal-trigger" href="#modal1" id="${data[i].symbol}"><i class="material-icons">add</i></a> </div>  <div class="card-content"> <p>rank: ${data[i].rank}</p> <p> ${data[i].symbol}: ${data[i].price_usd} USD</p> <h5 class="card-sub-title">Change</h5> <div class="change-box"> <p class="change-item">1h: ${data[i].percent_change_1h}: ${arrow1h}</p> <p class="change-item">24h: ${data[i].percent_change_24h}: ${arrow24h}</p> <p class="change-item">7d: ${data[i].percent_change_7d}: ${arrow7d}</p> </div> </div> </div> `;
    }
    box.innerHTML = string;
}

function dataSort() {
    if (filterCounter === 1) {
        dataSortValue = dataAllPriceFilter;
        console.log('filter', dataSortValue);
    } else {
        console.log('NO filter', dataSortValue);
        dataSortValue = data2;
    }
}

function request(link) {
    fetch(link)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            dataAll = data;
            createCard(data);
            return data;
        })
        .then(function (data2) {
            btn.addEventListener('click', function(){
                dataSort();
                createCard(max(dataSortValue));
            });
            alph.addEventListener('click', function(){
                dataSort();
                createCard(sort(dataSortValue));
            });
            val.addEventListener('click', function() {
                dataSort();
                createCard(min(dataSortValue));
            });
            value.addEventListener('click', function(){
                dataSort();
                createCard(day(dataSortValue));
            });
            vall.addEventListener('click', function(){
                dataSort();
                createCard(hour(dataSortValue));
            });
            rank.addEventListener('click', function(){
                dataSort();
                createCard(rank1(dataSortValue));
            });
        });
}
request(currencyList);

$('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '10%', // Ending top style attribute
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            // alert("Ready");
            // console.log(modal, trigger);
            let grap = document.querySelector('.grap');
            grap.innerHTML = `<canvas id="myChart"></canvas>`;
            id = trigger[0].id;
            graphOnOpen(id, 'histohour', 24, 'D.MM | HH:mm');
            let modHead = document.querySelector('.modal-title');
            modHead.textContent = id;
            console.log(trigger[0].id);
        },
        complete: function() {
            // alert('Closed');
        } // Callback for Modal close
    }
);
//             let string = '';
//             for (let i = 0; i < data.length; i ++){
//                 // console.log(arrow24);
//                 string +=`<div class="card"> <div class="card-image"> <img src="${img}">
// <a href="#modal1" class="btn-floating halfway-fab waves-effect waves-light red waves-effect waves-light btn modal-trigger" ><i class="material-icons">add</i></a>
// <p> ${data[i].name}:</p> ${data[i].price_usd} usd:<p> rank: ${data[i].rank}</p><div class="card-content"> <h4>Changes</h4> <p>1h: ${data[i].percent_change_1h}:  </p>  <p>24h: ${data[i].percent_change_24h}:  </p><p>7d: ${data[i].percent_change_7d}: </p></div></div></div>`;
//             }
//             box.innerHTML = string;

//         })
// }
//
// requst();
//

//filter by price function
function filterByPrice(value) {
    dataAllPriceFilter = [];
    let checkBox = filterPrice.querySelectorAll('.filled-in');
    if (priceCheckboxCounter === checkBox.length || priceCheckboxCounter === 0) {
        dataAllPriceFilter = dataAll;
    } else if (priceCheckboxCounter === 1 && checkBox[checkBox.length - 1].checked === true) {
        dataAllPriceFilter = dataAll.filter(function(number, i, arr) {
            return number.price_usd >= +value[value.length - 1];
        });
    } else if (priceCheckboxCounter > 1 && checkBox[checkBox.length - 1].checked === true){
        console.log('log');
        console.log(+value[0]);
        console.log(+value[value.length - 2]);
        console.log(+value[value.length - 1]);
        dataAllPriceFilter = dataAll.filter(function(number, i, arr) {
            let a = [];
            let b = [];
            a = number.price_usd > +value[0] && number.price_usd < +value[value.length - 2];
            b = number.price_usd >= +value[value.length - 1];
            return  a + b;
        });
    } else {
        dataAllPriceFilter = dataAll.filter(function(number, i, arr) {
            return number.price_usd > +value[0] && number.price_usd < +value[value.length - 1];
        });
    }
    console.log(dataAllPriceFilter);
    createCard(dataAllPriceFilter);
}

//filling array with values from checkboxes
const filterPriceCheckbox = document.getElementById('filterPrice');
filterPriceCheckbox.addEventListener('click', function (event) {
    if (event.target.checked === true) {
        priceValue.push(event.target.value);
        priceCheckboxCounter++;
        console.log(event.target.checked);
    }
    else if (event.target.checked === false){
        priceValue.splice(priceValue.indexOf(event.target.value), 1);
        priceCheckboxCounter--;
    }
});

//sort array with filter values and apply sort function
const filter = document.getElementById('filter');
filter.addEventListener('click', function (event) {
    function compareNumeric(a, b) {
        return a - b;
    }

    filterCounter = 1;

    priceFilter = priceValue.join().split(',');
    priceFilter.sort(compareNumeric);
    console.log(priceFilter);
    filterByPrice(priceFilter);
});