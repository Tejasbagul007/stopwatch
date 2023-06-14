/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
//import 'react-native-gesture-handler';
// import { Provider } from 'react-redux';
// import { store } from './Task33/redux/store';
//import store from './Task3/redux/store';
//import store from './Component/redux/store';



// const AppRedux = () =>(
//     <Provider store={store} >
//         <App/>
//     </Provider>
// );

// AppRegistry.registerComponent(appName, () => AppRedux);

// ---------------------------------------------

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
