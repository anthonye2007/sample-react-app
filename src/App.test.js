import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from "enzyme";

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('renders specific element', () => {
    let wrapper = shallow(<App />);
    expect(wrapper.find('.App-title').text()).toEqual('Welcome to React :^)');
});
