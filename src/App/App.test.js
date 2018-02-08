import React from 'react';
import ReactDOM from 'react-dom';

import { shallow, mount, render } from 'enzyme';


import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders 4 options', () => {
  expect(shallow(<App />).find('option').length).toBe(4);
});

it('has a header', () => {
  expect(shallow(<App />).find('h1').length).toBe(1);
});
