import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux";
import AppRoute from './routes/AppRoute.jsx'
import { store } from './app/store.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AppRoute />
  </Provider>
)
