import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'
import './App.css'
import { FC } from 'react'
import LoginScreen from '../components/screens/LoginScreen'

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={LoginScreen} />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  )
}

export default App
