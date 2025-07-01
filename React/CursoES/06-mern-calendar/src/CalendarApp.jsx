import { BrowserRouter } from "react-router"
import {Provider} from 'react-redux'
import { AppRouter } from "./routes/AppRouter"
import { store } from "./store/store"

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </Provider>
  )
}
