import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter} from 'react-router-dom';
import {store} from './App/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);