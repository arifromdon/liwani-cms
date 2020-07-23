import React, { Component } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class BarChart extends Component {
  render (){
    const { dataHistory, fetching } = this.props
    const barChartStacked = {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: ''
        }

      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%'
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },

      series: [
        {
          name: "Pengeluaran",
          colorByPoint: false,
          data: [
            {
              name: "Jan",
              y: 62.74,
              drilldown: "Chrome"
            },
            {
              name: "Feb",
              y: 10.57,
              drilldown: "Firefox"
            },
            {
              name: "Mar",
              y: 7.23,
              drilldown: "Internet Explorer"
            },
            {
              name: "Apr",
              y: 5.58,
              drilldown: "Safari"
            },
            {
              name: "Mei",
              y: 4.02,
              drilldown: "Edge"
            },
            {
              name: "Juni",
              y: 1.92,
              drilldown: "Opera"
            },
            {
              name: "Juli",
              y: 7.62,
              drilldown: null
            }
          ]
        }
      ]
    };

    return (
      <div className="app mb-5">
        <div className="row">
          <div className="mixed-chart w-100">
            <HighchartsReact
              highcharts={Highcharts}
              options={barChartStacked}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BarChart;