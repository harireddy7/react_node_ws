import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home'
import { fetchContacts } from './redux/actions/contacts';
import AppSocket from './Socket/AppSocket';

const App = ({ getContacts }) => {
  const [value, setValue] = useState('');
  const [msgRxd, setMsgRxd] = useState('');

  useEffect(() => {
    getContacts();
  }, [])

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

const mapDispatchToProps = (dispatch) => {
  return {
    getContacts: () => dispatch(fetchContacts())
  }
}

export default connect(null, mapDispatchToProps)(App);
