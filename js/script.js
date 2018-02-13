const currencyList = 'https://api.coinmarketcap.com/v1/ticker/?limit=30';
let box = document.querySelector('.box');
let btcicon = 'http://bitcoin-4k.com/wp-content/uploads/2017/06/btc.png';

function createCard(data) {
    let string = '';
    for ( let i = 0; i < data.length; i++ ) {
        string += `<div class="card"> <div class="card-image"> <img src="${btcicon}"> <span class="card-title"> ${data[i].name} </span> <a class="btn-floating halfway-fab waves-effect waves-light red modal-trigger" href="#modal1" id="${data[i].symbol}"><i class="material-icons">add</i></a> </div>  <div class="card-content"> <p>rank: ${data[i].rank}</p> <p> ${data[i].symbol}: ${data[i].price_usd} USD</p> <h5>Change</h5> <div class="change-box"> <p class="change-item">1h: ${data[i].percent_change_1h}</p> <p class="change-item">24h: ${data[i].percent_change_24h}</p> <p class="change-item">7d: ${data[i].percent_change_7d}</p> </div> </div> </div> `;
    }
    box.innerHTML = string;
}
function request(link) {
    fetch(link)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            createCard(data);
        });
}
request(currencyList);


//
// $(document).ready(function(){
//     // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
//     $('.modal').modal();
// });

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
            console.log(trigger[0].id);

        },
        complete: function() {
            // alert('Closed');
        } // Callback for Modal close
    }
);

