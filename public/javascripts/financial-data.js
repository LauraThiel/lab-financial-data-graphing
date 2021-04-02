const startInput = document.getElementById("start");
const endInput = document.getElementById("end");
const currencyInput = document.getElementById("currency");
let start;
let end;
let currency = currencyInput.value;

startInput.onchange = (event) => {
  start = event.target.value;
  console.log("start:", start);
  getHistoricalData();
};

endInput.addEventListener('change', (event) => {
  end = event.target.value;
  console.log("end:", end);
  getHistoricalData();
});

currencyInput.onchange = (event) => {
  currency = event.target.value;
  bitcoinPriceTracker()
};

function getHistoricalData() {
  if (!end || !start) {
      return;
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (endDate < startDate) {
    return;
  }

  axios.get(`${"http://api.coindesk.com/v1/bpi/historical/close.json"}?start=${start}&end=${end}`).then((response2) => {
    console.log(response2);
    const labels = Object.keys(response2.data.bpi);
    const data = Object.values(response2.data.bpi);
    drawChart(labels, data);
  });
}

function bitcoinPriceTracker() {
  axios.get(`${"http://api.coindesk.com/v1/bpi/historical/close.json"}?currency=${currency}`)
  .then((response) => {
    console.log(response);
    const labels = Object.keys(response.data.bpi);
    const data = Object.values(response.data.bpi);
    drawChart(labels, data);
  });
}



  function drawChart(labels, data) {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Price",
            data,
          },
        ],
      },
    });
  }

  bitcoinPriceTracker();
