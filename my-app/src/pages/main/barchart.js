import React from 'react';
import {Bar} from '@ant-design/plots';

class Barchart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    const response = await fetch('http://127.0.0.1:8000/data_explore');
    const jsonData = await response.json();
    this.setState({ data: jsonData });
  }

  render() {
    const config = {
      data: this.state.data,
      xField: 'x',
      yField: 'y',
      seriesField: 'series',
      isStack: true,
    };

    return <Bar {...config} />;
  }
}

export default Barchart;