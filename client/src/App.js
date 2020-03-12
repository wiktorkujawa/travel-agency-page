import React, { useEffect, Fragment } from 'react';
import AppNavbar from './components/AppNavbar'
import OfferList from './components/OfferList';
import SingleOffer from './components/SingleOffer';
import About from './components/About';
import InsurancePage from './components/InsurancePage';
import GalleryPage from './components/GalleryPage';
import QuestionPage from './components/QuestionPage';
import LoginModal from './components/auth/LoginModal';
import MainPage from './components/MainPage';
import Footer from './components/Footer';
import AnnouncementPage from './components/AnnouncementPage';
import { Container, NavLink } from 'reactstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import ResetPassword from './components/auth/ResetPassword';
import ReceivePassword from './components/auth/ReceivePassword';
import AdminModal from './components/admin/AdminModal';

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Fragment>
      {/* <NavLink href="https://github.com/wiktorkujawa/" className="social-card" target={"_blank"}>
        <i className="fa fa-github fa-4x" aria-hidden="true"></i>
      </NavLink> */}
      <Route {...rest} component={(props) => (
        <div className="public-route">
          <AppNavbar />
          <Component {...props} />
          <Footer />
        </div>
      )}
      />
    </Fragment>
  )
}
const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => (<Component {...props} />)}
    />
  );
};

const App = props => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);


  return (
    <Provider store={store}>
      <div className="App">

        <Router>
          <Container fluid={true} className="page-container">

            <main>
              <Switch>

                <PublicRoute path="/" exact component={MainPage} />

                <PublicRoute path="/announcements" component={AnnouncementPage} />

                <PublicRoute exact path="/tourist-trips/" component={OfferList} />
                <PublicRoute exact path="/tourist-trips/:type" component={OfferList} />
                <PublicRoute path="/tourist-trips/:type/:oferta" component={SingleOffer} />

                <AdminRoute path="/admin" exact component={LoginModal} />
                <AdminRoute path="/admin/reset_password" component={ResetPassword} />
                <AdminRoute path="/password/reset/:id/:token" exact component={ReceivePassword} />

                <AdminRoute path="/admin-modal/" exact component={AdminModal} />
                <AdminRoute path="/admin-modal/:type" exact component={AdminModal} />

                <PublicRoute path="/about" component={About} />

                <PublicRoute path="/insurance" component={InsurancePage} />

                <PublicRoute path="/faq" component={QuestionPage} />

                <PublicRoute path="/gallery" component={GalleryPage} />

              </Switch>
            </main>

          </Container>

        </Router>


      </div>
    </Provider>
  );
}

export default App;