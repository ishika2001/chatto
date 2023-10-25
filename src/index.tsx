import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '../src/styles/global.css'
import store from './slices/store';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from 'redux-persist';


let persistor = persistStore(store);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <App/>
  </PersistGate>
</Provider>,
);







