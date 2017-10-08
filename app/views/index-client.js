import React from 'react';
import ReactDOM from 'react-dom';
import {App} from '../client/components';
import { hydrate as emotionHydrate } from 'emotion'

const {ids} = window.__data;

emotionHydrate(ids);
ReactDOM.hydrate(<App />, document.getElementById('root'));
