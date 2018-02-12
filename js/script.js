const currencyList = "https://chasing-coins.com/api/v1/top-coins/30";

function request(link) {
    fetch(link, {
        mode: 'no-cors'
    })
        .then(function (responce) {
            return responce.json();
        })
        .then (function (data) {
            console.log(data);
        })

}
request(currencyList);