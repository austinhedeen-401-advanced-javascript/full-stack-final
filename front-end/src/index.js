import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import createStore from './store/create-store';
import App from './App';

const store = createStore();

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
