const currencyList = "https://api.coinmarketcap.com/v1/ticker/?limit=30";
let elem = '';
let elemIndex;
let priceValue = []; //raw data from checkboxes
let priceFilter = [];  //sorted data from checkboxes
let dataAllPriceFilter = [];
let dataAll;
let priceCheckboxCounter = 0;

//html structure
let div = document.createElement('div');
div.classList.add('row');
div.id = 'content';
document.body.appendChild(div);


//content for html structure
function request(url) {
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        let string = '';
        dataAll = data;
        for (let i = 0; i < data.length; i++ ) {
            string += `<div class="col s12 m6 l3" id="${data[i].id}-node">
                            <div class="card">
                                <div class="card-image">
                                    <img src="http://materializecss.com/images/sample-1.jpg">
                                    <span class="card-title">${data[i].name} (${data[i].symbol})</span>
                                    <a class="btn-floating halfway-fab waves-effect waves-light red modal-trigger" id="${data[i].id}"><i class="material-icons">insert_chart</i></a>
                                </div>
                                <div class="card-content">
                                    <p><strong>Price:</strong> ${data[i].price_usd}$</p>
                                    <p><strong>Market Cap:</strong> ${data[i].market_cap_usd}$</p>
                                </div>
                            </div>
                        </div>`;
        }
        div.innerHTML = string;
    });
}
request(currencyList);


//chart container
let chart = document.createElement('div');
chart.id = 'chart';
chart.className = "col s12 m12 l12";

function showChart(node) {
    chart.innerHTML = `<div class="chart-closed"><canvas id="myChart" width="400" height="150"></canvas></div>`;
    if (document.body.clientWidth >= 993) {
        let lastNode = Math.ceil((node + 1) / 4) * 4;
        click.insertBefore(chart, click.childNodes[lastNode - 1].nextSibling);
    } else if (document.body.clientWidth < 993 && document.body.clientWidth > 600) {
        let lastNode = Math.ceil((node + 1) / 2) * 2;
        click.insertBefore(chart, click.childNodes[lastNode - 1].nextSibling);
    } else {
        click.insertBefore(chart, click.childNodes[node].nextSibling);
    }

    let ctx = document.getElementById("myChart").getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

    setTimeout(function () {
        chart.children[0].classList.toggle("chart-open");
    }, 250);
}

function removeChart(elemIndex) {
    let chartNode = document.getElementById('chart');
    if (chartNode !== null) {
        chart.children[0].classList.toggle("chart-open");
        if (elemIndex > 4) {
            elemIndex--;
        }
        setTimeout(function () {
            chartNode.remove();
            showChart(elemIndex);
        }, 250);
    } else {
        showChart(elemIndex);
    }
}


//filter by price function
function filterByPrice(value) {
    dataAllPriceFilter = [];
    let checkBox = filterPrice.querySelectorAll('.filled-in');
    if (priceCheckboxCounter === checkBox.length || priceCheckboxCounter === 0) {
        dataAllPriceFilter = dataAll;
    } else {
        dataAllPriceFilter = dataAll.filter(function(number, i, arr) {
            return number.price_usd > +value[0] && number.price_usd < +value[value.length - 1];
        });
        console.log('first', value[0]);
        console.log('last', value[value.length - 1]);
    }
}


//
const click = document.getElementById('content');
click.addEventListener('click', function (event) {
    elem = event.target.parentElement.id;
    elemIndex = Array.from(this.childNodes).indexOf(document.getElementById(elem + '-node'));
    console.log('element ' + elem);
    removeChart(elemIndex);
});


//filling array with values from checkboxes
const filterPriceCheckbox = document.getElementById('filterPrice');
filterPriceCheckbox.addEventListener('click', function (event) {
    if (event.target.checked === true) {
        priceValue.push(event.target.value);
        priceCheckboxCounter++;
        console.log(priceValue);
    }
    else if (event.target.checked === false){
        priceValue.splice(priceValue.indexOf(event.target.value), 1);
        priceCheckboxCounter--;
        console.log(priceValue);
    }
});


//sort array with filter values and apply sort function
const filter = document.getElementById('filter');
filter.addEventListener('click', function (event) {
    function compareNumeric(a, b) {
        return a - b;
    }

    priceFilter = priceValue.join().split(',');
    priceFilter.sort(compareNumeric);

    filterByPrice(priceFilter);
});
