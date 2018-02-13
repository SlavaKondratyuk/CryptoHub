const currencyList = 'https://api.coinmarketcap.com/v1/ticker/?limit=30';

const btn = document.querySelector('#btn-sort-max');
btn.addEventListener('click', function(){
    max(currencyList);
});

const alph = document.querySelector ('#btn-sort-alph');
alph.addEventListener('click', function(){
    sort(currencyList);
});

const val = document.querySelector ('#btn-sort-min');
val.addEventListener('click', function(){
    min(currencyList);
});
const value = document.querySelector ('#btn-sort-day');
value.addEventListener('click', function(){
    console.log('test');
    day(currencyList);
});

const vall = document.querySelector ('#btn-sort-hour');
vall.addEventListener('click', function(){
    hour(currencyList);
});




function hour(link){
    fetch(link)
        .then(function(response) { return response.json()})
        .then(function (data) {
            data.sort(function (a, b) {
                return a.percent_change_1h - b.percent_change_1h;

            });
            console.log(data);
        })
}

function day(link){
    fetch(link)
        .then(function(response) { return response.json()})
        .then(function (data) {
            data.sort(function (a, b) {
                return a.percent_change_24h - b.percent_change_24h;
                });
            console.log(data);
        })
}


function max(link){
    fetch(link)
        .then(function(response) { return response.json()})
        .then(function (data) {
            data.sort(function (a, b) {
                return a.price_usd -b.price_usd;

            });
            console.log(data);
           return data;

})
}
function min(link){
    fetch(link)
        .then(function(response) { return response.json()})
        .then(function (data) {
            data.sort(function (a, b) {
                return  b.price_usd - a.price_usd;

            });
            console.log(data);
            return data;
        })
}
function sort(link){
    fetch(link)
        .then(function(response) { return response.json()})
        .then(function (data) {
            data.sort(function (a, b) {
                if (a.id > b.id) {
                    return 1;
                }
                if (a.id < b.id) {
                    return -1;
                }
             });
            console.log(data);
        })
}