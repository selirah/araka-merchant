import React from 'react'
import ReactDOM from 'react-dom'
import jwt_decode from 'jwt-decode'
import { createBrowserHistory } from 'history'
import reportWebVitals from './reportWebVitals'
import 'antd/dist/antd.css'
import 'flag-icon-css/css/flag-icon.min.css'
import './index.css'
import './responsive.css'

import App from './App'
import { I18nextProvider } from 'react-i18next'
import { i18n } from './i18n'
import { configureStore } from './configureStore'
import { secure } from './utils/secure'
import { isEmpty } from './helpers/isEmpty'
import { setUser } from './store/auth/actions'
import { authorization } from './utils/authorization'
import { logout } from './store/auth/actions'
import { path } from './helpers/path'
import moment from 'moment'

const history = createBrowserHistory()

declare global {
  interface Window {
    INITIAL_REDUX_STATE: any
  }
}

const initialState = window.INITIAL_REDUX_STATE
export const { store, persistor } = configureStore(history, initialState)

const user = secure.get('user')
const { token } = user

if (!isEmpty(token)) {
  const decode: any = jwt_decode(token)
  const d = new Date(0)
  d.setUTCSeconds(decode.exp)
  const futureTime = moment(d).format('X')
  const currentTime = moment(new Date()).format('X')
  if (futureTime > currentTime) {
    store.dispatch(setUser(user))
    authorization(token)
  } else {
    store.dispatch(logout())
    localStorage.removeItem('user')
    localStorage.removeItem('persist:root')
    localStorage.clear()
    window.location.href = path.login
  }
}

ReactDOM.render(
  <React.Fragment>
    <I18nextProvider i18n={i18n}>
      <App store={store} history={history} persistor={persistor} />
    </I18nextProvider>
  </React.Fragment>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
