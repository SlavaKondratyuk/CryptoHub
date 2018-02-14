$('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: 0, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '10%', // Ending top style attribute
        // ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        //     alert("Ready");
        //     console.log(modal, trigger);
        // },
        //complete: function() { alert('Closed'); } // Callback for Modal close
    }
);

const currencyList = "https://api.coinmarketcap.com/v1/ticker/?limit=30";
let elem = '';


let div = document.createElement('div');
div.classList.add('row');
document.body.appendChild(div);

function request(url) {
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        let string = '';
        for (let i = 0; i < data.length; i++ ) {
            string += `<div class="col s12 m6 l3">
                            <div class="card">
                                <div class="card-image">
                                    <img src="http://materializecss.com/images/sample-1.jpg">
                                    <span class="card-title">${data[i].name} (${data[i].symbol})</span>
                                    <a class="btn-floating halfway-fab waves-effect waves-light red modal-trigger" id="${data[i].id}" href="#modal1"><i class="material-icons">insert_chart</i></a>
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

let modal = document.createElement('div');
modal.id = 'modal1';
modal.className = "modal";
modal.innerHTML = `<div class="modal-content"><h4>Modal Header</h4><p>A bunch of text</p></div>`;
document.body.appendChild(modal);

function showChart(node) {
    $(document).ready(function(){
        // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
        $('.modal').modal();
    });
}

const click = document.querySelector('.row');
click.addEventListener('click', function (event) {
    elem = event.target.parentElement.id;
    showChart(this.parentElement.parentElement);
});