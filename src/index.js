import React from 'react';
import ReactDOM from 'react-dom';
import '../public/Index.css'
import  App  from './App';
require('events').EventEmitter.prototype._maxListeners = 100;
ReactDOM.render(<App />, document.getElementById('root'));