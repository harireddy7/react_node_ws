import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home'
import AppSocket from './Socket/AppSocket';

const App = () => {
  const [value, setValue] = useState('');
  const [msgRxd, setMsgRxd] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  }

  const handleReceiveMsg = msg => {
    setMsgRxd(msg);
  }

  return (
    <Router>
        <Switch>
          <Route path='/' component={Home} />
        </Switch>
    </Router>
  )

  // return (
  //   <div style={{ padding: '10px', margin: '10px' }}>
  //   <AppSocket value={value} receiveMsg={handleReceiveMsg}>
  //     <div>
  //       <input type='text' value={value} onChange={handleChange} />
  //     </div>
  //     <hr/>
  //     <div>{msgRxd}</div>
  //   </AppSocket>
  //   </div>
  // )
}

export default App
