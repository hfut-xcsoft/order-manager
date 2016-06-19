angular.module('app').directive('chart', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var chart;
      scope.$watch(attrs.chart, function () {
        var data = scope.$eval(attrs.chart);
        var chartData = {
          labels: data.map(function (day) {
            return day.date
          }),
          datasets: [
            {
              type: 'bar',
              label: "销量",
              backgroundColor: "rgba(0,172,193,0.2)",
              borderColor: "rgba(0,172,193,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(0,172,193,0.4)",
              hoverBorderColor: "rgba(0,172,193,1)",
              data: data.map(function (day) {
                return day.count
              }),
              yAxisID: 'y-axis-1'
            },
            {
              label: "销售额",
              type: 'line',
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(255,202,40,0.4)",
              borderColor: "rgba(255,202,40,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(255,202,40,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 2,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(255,202,40,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: data.map(function (day) {
                return day.total_price
              }),
              yAxisID: 'y-axis-2'
            }
          ]
        };
        chart && chart.destroy();
        chart = new Chart(element, {
            type: 'bar',
            data: chartData,
            options: {
              responsive: true,
              tooltips: {
                mode: 'label'
              },
              scales: {
                yAxes: [{
                  position: "left",
                  id: "y-axis-1",
                  ticks: {
                    beginAtZero: true
                  }
                }, {
                  position: "right",
                  id: "y-axis-2",
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          }
        );
      });
    }
  }
});
