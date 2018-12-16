import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import Chart from './components/Chart';
import UsageHBarGraph from './components/HBarGraph'
import { Bar, Line, Pie } from 'react-chartjs-2';
import Grid from 'react-css-grid'
import Helpers from './components/Helpers'

class Apps extends Component {

  constructor(props) {
    super(props);
    this.state = {members: []
    }
  }//close props constructor

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(members => this.setState({ members: members }));
  }

  
  render() {
    //console.log(this.state.members.map(member => member.user));
    return (
      <div className="App">
        <header className="App-header">
          <p>
            SYNC TO CENTRAL METRICS
          </p>
        </header>
        <h1># | Date | User | File Size | Elements Count| Types Count| </h1>
          {this.state.members.map(member =>
            <div key={member.id}>{member.id} | {member.date.toLocaleDateString()} | {member.user} | {member.rvtFileSize} | {member.elementsCount} | {member.typesCount}</div>)}

            
      </div>
      
    );
  }
}

class DataTable extends Component {
  constructor(props) {
    super(props);

    this.options = {
      defaultSortName: 'ID',  // default sort column name
      defaultSortOrder: 'Date'  // default sort order
    };
    this.state = {members: []
    };
  }


  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(members => this.setState({ members: members }));
  }

  render() {
    return (
      <div>
        <BootstrapTable data={ this.members } options={ this.options }>
        {this.state.members.map(member =>
        <div>
          <TableHeaderColumn dataField='id' isKey={ true } dataSort={ true }>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name' dataSort={ true }>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='Date'>Product Price</TableHeaderColumn>
            </div>
            )}
        </BootstrapTable>
      </div>
    );
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      members:[]
  }
}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(mem => this.setState({ members: mem }))
  }




  render() {
    console.log(this.state.members.map(x => x.date))
    
    
const sizeElements = {
  labels: this.state.members.map(x=>x.date),

  datasets: [
    {
      label: 'File Size',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: this.state.members.map(x => x.rvtFileSize/1000),
      fill:false
    },
    {
      label: 'Elements count',
      yAxisID: 'elementsCount',
      borderColor: 'rgba(0,0,132,1)',
      borderWidth: 1,
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: this.state.members.map(x => x.elementsCount),
      fill:false
    },

  ],

};
    


const elementTypes = {
  labels: this.state.members.map(x=>x.date),
  datasets: [
    {
      label: 'Types count',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: this.state.members.map(x => x.typesCount),
      fill:false
    }
  ]
};

const title = {
  
    title: {
        display: true,
        text: 'Model size and elements count',
        fontSize: 26
    },
    legend: {
      display: true,
      position: 'bottom'
  },
  scales: {
    xAxes: [
      {
            position: "bottom",
            id: "x-axis-1",
            ticks: {
              callback: function(value) { 
                  return new Date(value).toLocaleDateString('en-GB'); 
              }
            }
            
        }, 
        {
            position: "top",
            id: "x-axis-2",
            ticks: {
              callback: function(value) { 
                  return new Date(value).toLocaleTimeString(); 
              }
            }
        }],
    yAxes: [
        {
            position: 'left',
            id: 'y-axis-left',
            ticks: {
                callback: function(label, index, labels) {
                    return label/1000+'MB';
                }
            },
            scaleLabel: {
                display: true,
                labelString: 'Model size in MB'
            }
        },
        {
          position: 'right',
          id: 'elementsCount',
          ticks: {
              callback: function(elementsCount) {
                  return elementsCount/1000+'k';
              },
          },
          gridLines: {
            display:false
        },
          scaleLabel: {
              display: true,
              labelString: '1k = 1000 elements'
          }
      }
    ]}

}

const typeCountTitle = {
  
  title: {
      display: true,
      text: 'Element types count',
      fontSize: 26
  },
  legend: {
    display: true,
    position: 'bottom'
},
scales: {

  xAxes: [
{
      position: "bottom",
      id: "x-axis-1",
      ticks: {
        callback: function(value) { 
          return new Date(value).toLocaleDateString('en-GB'); 
        }
      }
      
  }, 
  {
      position: "top",
      id: "x-axis-2",
      ticks: {
        callback: function(value) { 
            return new Date(value).toLocaleTimeString(); 
        }
      }
  }],

  yAxes: [
      {
          ticks: {
              callback: function(label, index, labels) {
                  return label/1000+'k';
              }
          },
          scaleLabel: {
              display: true,
              labelString: '1k = 1000 elements'
          }
      }
  ]
}

}
    return (
      

      <div className="App">
        <div className="App-header">
          <h2>CQT Revit Model</h2>
        </div>
        <Grid
        width={768}
        gap={24}>
        <div><Line data = {sizeElements}   options={title}/></div>
        <div><Line data = {elementTypes} options = {typeCountTitle} /></div>
      </Grid>

      </div>
    );
  }
}

export default App;
