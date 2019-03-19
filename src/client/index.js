import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

//Sass
import './sass/index.scss';

//Store
import store from '../shared/store';

ReactDOM.hydrate(
	<Provider store={store}>
		<Router>
			<App />
		</Router>	
	</Provider>, 
	document.getElementById('root')
);