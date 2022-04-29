import React from 'react';
export default './tic_tac_toe';
import {Game} from './tic_tac_toe';
import './main.css';
import ReactDOM from 'react-dom/client';

/*
* NOTES:
* props = parameter sent into the child component
* state = something private and inherent to the currect/parrent component
* most functions should be handled/floated up to the parent-most component
* list items need unique keys for react to work with it
* if items are ordered, then you can use the index
* if not, each unordered item needs a unique key
* */


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <p>test</p>
    <Game />
  </React.StrictMode>
);