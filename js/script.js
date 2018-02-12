const currencyList = 'https://api.coinmarketcap.com/v1/ticker/?limit=30';

function request(link) {
    fetch(link)
        .then(function (response) {
            // console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}

request(currencyList);


