import {Switch, Route} from 'react-router-dom'

import './App.css'

import Home from './components/Home'
import NotFound from './components/NotFound'
import About from './components/About'
import SpecificState from './components/SpecificState'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <SpecificState exact path="/state/:stateCode" component={SpecificState} />
    <Route component={NotFound} />
  </Switch>
)

export default App
