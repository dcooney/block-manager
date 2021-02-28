import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
require('./helpers/sticky');
require('./helpers/otherPlugins');

// Render App.
ReactDOM.render(<App />, document.getElementById('app'));
