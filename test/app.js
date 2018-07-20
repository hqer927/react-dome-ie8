/**
 * Created by hqer on 2017/12/4.
 */
require ('./less/main.less');
const React = require('react');
const ReactDOM = require('react-dom');
const hashHistory = require('react-router').hashHistory;
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const IndexRedirect = require('react-router').IndexRedirect;

const App = require('./module/App');
const Header = require('./module/Header');
const HeaderLogin = require('./module/HeaderLogin');
const Footer = require('./module/Footer');


ReactDOM.render((
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRedirect to='/index' />
            <Route path='login'
                getComponents={
                    (nextState,callback) => {
                        require.ensure([],(require) => {
                            callback(null,{header:HeaderLogin,footer:Footer,middle: require('./module/Login')});
                        },'login');
                    }
                }/>
            <Route path='index'
                getComponents={
                    (nextState,callback) => {
                        require.ensure([],(require) => {
                            callback(null, {header:Header,footer:Footer, middle: require('./module/Index')});
                        },'index');
                    }
                }/>
            <Route path='about'
                getComponents={
                    (nextState,callback) => {
                        require.ensure([],(require) => {
                            callback(null, {header:Header,footer:Footer, middle: require('./module/About')});
                        },'about');
                    }
                }/>
        </Route>
    </Router>
), document.getElementById('app'));
