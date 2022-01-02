import { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import Game from './pages/Game';

const App = () => {
  return (
    <Fragment>
      <Layout>
        <Switch>
          <Route path='/home' exact>
            <Home />
          </Route>
          <Route path='/game' exact>
            <Game />
          </Route>
          <Route path='*'>
            <Redirect to='/home' />
          </Route>
        </Switch>
      </Layout>
    </Fragment>
  );
};

export default App;
