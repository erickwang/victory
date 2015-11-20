/*global document:false window:false*/
import React from "react";
import ReactDOM from "react-dom";
import Radium from "radium";
import {VictoryPie} from "../src/index";

const rand = function () {
  return Math.max(Math.floor(Math.random() * 10000), 1000);
};

const getData = function () {
  return [
    { x: "<5", y: rand() },
    { x: "5-13", y: rand() },
    { x: "14-17", y: rand() },
    { x: "18-24", y: rand() },
    { x: "25-44", y: rand() },
    { x: "45-64", y: rand() },
    { x: "≥65", y: rand() }
  ];
};

@Radium
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      sliceColors: [
        "#D85F49",
        "#F66D3B",
        "#D92E1D",
        "#D73C4C",
        "#FFAF59",
        "#E28300",
        "#F6A57F"
      ],
      sliceWidth: 60,
      style: {
        parent: {
          border: "1px solid #ccc",
          margin: 20
        },
        data: {
          strokeWidth: 2
        },
        labels: {
          fill: "white",
          padding: 10
        }
      }
    };
  }

  componentWillMount() {
    window.setInterval(() => {
      this.setState({
        data: getData()
      });
    }, 5000);
  }

  render() {
    return (
      <div>
        <VictoryPie style={this.state.style}/>

        <VictoryPie
          style={{
            parent: {border: "1px solid #ccc", margin: 20},
            labels: {fontSize: 20, padding: 100}
          }}
        />

        <VictoryPie style={this.state.style} innerRadius={140}/>

        <VictoryPie
          style={{
            parent: {border: "1px solid #ccc", margin: 20},
            data: {stroke: "transparent", opacity: 0.4}
          }}
        />

        <VictoryPie style={this.state.style} endAngle={90} startAngle={-90}/>

        <VictoryPie
          padding={{top: 30, left: 30}}
          style={this.state.style}
          data={this.state.data}
          innerRadius={100}
          animate={{velocity: 0.03}}
          sliceColors={this.state.sliceColors}
        />

        <VictoryPie
          style={this.state.style}
          endAngle={90}
          innerRadius={140}
          padAngle={5}
          startAngle={-90}
        />
      </div>
    );
  }
}

App.propTypes = {
  data: React.PropTypes.array
};

const content = document.getElementById("content");
ReactDOM.render(<App data={getData()}/>, content);
