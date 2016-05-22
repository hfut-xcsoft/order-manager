angular.module('app').directive('chart', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var data = {
        labels: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        datasets: [
          {
            type: 'bar',
            label: "销量",
            backgroundColor: "rgba(0,172,193,0.2)",
            borderColor: "rgba(0,172,193,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(0,172,193,0.4)",
            hoverBorderColor: "rgba(0,172,193,1)",
            data: [65, 70, 81, 75, 95, 88, 76],
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
            data: [650, 700, 810, 750, 950, 880, 760],
            yAxisID: 'y-axis-2'
          }
        ]
      };

      new Chart(element, {
          type: 'bar',
          data: data,
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
    }
  }
});
