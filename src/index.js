import React from 'react';
import ReactDOM from 'react-dom';
// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './redux/reducers';
// Components
import App from './containers/App';
// Styles
import './index.css';

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(ReduxThunk), // Async middleware
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Redux devtool
	)
);

ReactDOM.render(
	<Provider store={store}>
		<App />,
	</Provider>,
	document.getElementById('root')
);
