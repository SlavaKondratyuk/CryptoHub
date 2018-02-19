$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});

let box = document.querySelector('.box');
let img = "https://bitflyer.blob.core.windows.net/pub/Images/bitcoin-logo.png";

const currencyList = 'https://api.coinmarketcap.com/v1/ticker/?limit=30';


function request (link) {

    fetch(link)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);
            currencyBox(data)
        })

}


request(currencyList);



function currencyBox(data) {

    let string = '';

    for (let i = 0 ; i < data.length ; i++){
        string  += `<div class="card"><div class="card-image"><img src="${img}"><span class="card-title">${data[i].name}</span><a href="#modal1" class="btn-floating halfway-fab waves-effect waves-light red waves-effect waves-light btn modal-trigger"><i class="material-icons">add</i></a></div><div class="card-content"><h4> price ${data[i].price_usd}</h4><p>Change 1h ${data[i].percent_change_1h}</p><p>Change 7d ${data[i].percent_change_7d}</p><p>Change 24h ${data[i].percent_change_24h}</p></div></div>`;
    }




    box.innerHTML = string;

}







let enterPoint = 'https://min-api.cryptocompare.com/data/histominute?fsym=';
let enterPointHour = 'https://min-api.cryptocompare.com/data/histohour?fsym=';
let enterPointDay = 'https://min-api.cryptocompare.com/data/histoday?fsym=';
const currencyList2 = 'https://min-api.cryptocompare;.com/data/histominute?fsym=BTC&tsym=USD&limit=60&aggregate=1';





var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: item.time,
        datasets: [{
            label: "price",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: item.price,
        }]
    },

    options: {}
})




//
// const isJSON = (input) => (
//     input.length && rxOne.test(
//         input.replace(rxTwo, '@')
//             .replace(rxThree, ']')
//             .replace(rxFour, '')
//     )
// );
//





// let myblock = document.querySelector('.myblock');


// let myblock = document.querySelector('.myblock');
//
// myblock.addEventListener("click", function () {
//     request(currencyList)
// });
//
//
//
// let flyBlock = document.querySelector('.flyBlock');
//
// flyBlock.addEventListener("click", function () {
//     let qashions = prompt('what you want');
//     if (qashions === 'yes'){
//         alert('hello')
//     }else {
//         alert('go away')
//     }
// });







