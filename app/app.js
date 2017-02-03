import React from 'react';
import ReactDOM from 'react-dom';
import routes from './config/routes';
import { Provider } from "react-redux";
import store from "./components/store";

const App = document.getElementById('app');


ReactDOM.render(
    <Provider store={store}>
        { routes }
    </Provider>,
    App
    );
