import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { Header, Icon, List } from 'semantic-ui-react'


class App extends Component {
  state = {
    values: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/values')
      .then((response) => {
        this.setState({
          values: response.data
        });
      })
  }
  render() {
    return (
      <div className="App">
        <Header as='h1'>
          <Icon name='users' />
          <Header.Content>Social Site</Header.Content>
        </Header>
        <List>
        {this.state.values.map((value: any) => (
            <List.Item key={value.id}>{value.name}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
