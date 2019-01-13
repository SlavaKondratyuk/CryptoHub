let img = 'https://bitflyer.blob.core.windows.net/pub/Images/bitcoin-logo.png';
let arrowUp = '<i class="tiny material-icons up">arrow_upward</i>';
let arrowDown = '<i class="tiny material-icons down">arrow_downward</i>';
let arrow1h = '';
let arrow24h = '';
let arrow7d = '';

const currencyList = 'https://api.coinmarketcap.com/v1/ticker/?limit=30';
let box = document.querySelector('.box');
let btcicon = 'http://bitcoin-4k.com/wp-content/uploads/2017/06/btc.png';
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



function request(link) {
    fetch(link)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            createCard(data);
            return data;
        })
        .then(function (data2) {
            btn.addEventListener('click', function(){
                createCard(max(data2));
            });
            alph.addEventListener('click', function(){
                createCard(sort(data2));
            });
            val.addEventListener('click', function() {
                createCard(min(data2));
            });
            value.addEventListener('click', function(){
                createCard(day(data2));
            });
            vall.addEventListener('click', function(){
                createCard(hour(data2));
            });
            rank.addEventListener('click', function(){
                createCard(rank1(data2));
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
