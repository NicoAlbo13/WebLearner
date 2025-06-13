import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router'
import './styles.css'
import { JournalApp } from './JournalApp'
import { store } from './store/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <JournalApp/>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
