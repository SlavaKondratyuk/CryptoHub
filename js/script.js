//object
let btnCoint1 = document.createElement('a');
let btnCoint2 = document.createElement('a');
let container = document.querySelector('.container');
let interval = document.createElement('div');
let histominute=document.createElement('btn');
let histohour=document.createElement('btn');
let histoday=document.createElement('btn');

//class
btnCoint1.classList.add('waves-effect', 'waves-light', 'btn');
btnCoint1.textContent = 'BTC';
btnCoint2.classList.add('waves-effect', 'waves-light', 'btn');
btnCoint2.textContent = 'ETH';
interval.classList.add('btn_interval');
histominute.textContent ="histominute";
histohour.textContent ="histohour";
histoday.textContent ="histoday";
histominute.classList.add('waves-effect', 'waves-light', 'btn');
histohour.classList.add('waves-effect', 'waves-light', 'btn');
histoday.classList.add('waves-effect', 'waves-light', 'btn');
//append
container.append(btnCoint1);
container.append(btnCoint2);
container.append(interval);
interval.append(histominute);
interval.append(histohour);
interval.append(histoday);


function time(timeInterval,cripto,format) {
    fetch(`https://min-api.cryptocompare.com/data/${timeInterval}?fsym=${cripto}&tsym=USD&limit=30&aggregate=3&e=CCCAGG`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data.Data[0].time ,

            let time = data.Data.map(function (value) {
                return moment.unix(value.time).format(format);
            });
            console.log(time);

            let price = data.Data.map(function (value) {
                return value.close;
            });

            console.log(price);

            let  ctx = document.getElementById('myChart').getContext('2d');
            let chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: time,
                    datasets: [{
                        label: 'chart',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: price,
                    }]
                },

                // Configuration options go here
                options: {}
            });
        })
    }


histominute.addEventListener('click',function () {

       time('histominute',"BTC","LTS");
});
histohour.addEventListener('click',function () {

    time('histohour','BTC','LT');
});
histoday.addEventListener('click',function () {


           time('histoday','BTC','L');
});