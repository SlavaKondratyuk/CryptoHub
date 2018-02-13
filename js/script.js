



let lnk = "https://api.coinmarketcap.com/v1/ticker/";
console.log(lnk);

function reguest(url) {

    fetch(url)
        .then (function (response) {
            return response.json();

        })
        .then(function (data) {
            console.log(data);

        });
}

reguest(lnk);



