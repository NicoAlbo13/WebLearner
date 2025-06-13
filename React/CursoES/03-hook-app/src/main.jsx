import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MainApp } from './09-useContext/MainApp'
// import { MemoHook } from './06-memos/MemoHook'
// import { CallbackHook } from './06-memos/CallbackHook'
// import { Padre } from './07-tarea-memo/Padre'
// import HooksApp from './HooksApp'
// import { CounterApp } from './01-useState/CounterApp'
// import { CounterCustomHook } from './01-useState/CounterCustomHook'
// import { SimpleForm } from './02-useEffect/SimpleForm'
// import { SimpleFormCustomHook } from './02-useEffect/SimpleFormCustomHook'
// import { MultipleCustomHooks } from './03-examples/MultipleCustomHooks'
// import { FocusScreen } from './04-useRef/FocusScreen'
// import { Layout } from './05-useLayoutEffect/Layout'
// import './08-useReducer/intro-reducer'
// import { TodoApp } from './08-useReducer/TodoApp'
import { BrowserRouter } from "react-router";

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <MainApp/>
  </BrowserRouter>
  // </StrictMode>,
)
