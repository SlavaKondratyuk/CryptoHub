const currencylist = 'https://api.coinmarketcap.com/v1/ticker/?limit=15';
let box = document.querySelector('.box');
let img = 'https://bitflyer.blob.core.windows.net/pub/Images/bitcoin-logo.png';
let arrowUp = '<i class="tiny material-icons up">arrow_upward</i>';
let arrowDown = '<i class="tiny material-icons down">arrow_downward</i>';
let arrow1h = '';
let arrow24h = '';
let arrow7d = '';

// $(document).ready(function(){
//     // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
//     $('.modal').modal();
// });



function requst() {
    fetch(currencylist)
        .then(function (response) {
           return response.json()
        })

        .then(function (data) {

            console.log(data);
            let string = '';
            for (let i = 0; i < data.length; i ++){

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



                // console.log(arrow24);
                string +=`<div class="card"> <div class="card-image"> <img src="${img}">
<a href="#modal1" class="btn-floating halfway-fab waves-effect waves-light red waves-effect waves-light btn modal-trigger" ><i class="material-icons">add</i></a>         
<p> ${data[i].name}:</p> ${data[i].price_usd} usd:<p> rank: ${data[i].rank}</p><div class="card-content"> <h4>Changes</h4> <p>1h: ${data[i].percent_change_1h}: ${arrow1h}: </p>  <p>24h: ${data[i].percent_change_24h}: ${arrow24h} </p><p>7d: ${data[i].percent_change_7d}: ${arrow7d}</p></div></div></div>`;
            }
            box.innerHTML = string;

        })
}

requst();