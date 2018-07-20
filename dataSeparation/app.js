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


const checkUserInfo = (nextState, replace, callback) => {
    if (!sessionStorage.devPortalUid) {
        replace('/login');
    }
    callback();
};

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRedirect to='/index' />
            <Route path='login'
                getComponents={
                    (nextState,callback) => {
                        require.ensure([],(require) => {
                            callback(null, {header:HeaderLogin,footer:Footer,middle: require('./module/Login')});
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
            <Route path='workBench'
                getComponents={
                    (nextState,callback) => {
                        require.ensure([],(require) => {
                            callback(null, {header:Header,footer:Footer, middle: require('./module/WorkBench')});
                        },'workBench');
                    }
                }>
                <IndexRedirect to='/workBench/myServer' />
                <Route path='myServer' onEnter={checkUserInfo}
                    getComponent={
                        (nextState,callback) => {
                            require.ensure([],(require) => {
                                callback(null, require('./module/myServer'));
                            },'myServer');
                        }
                    }/>
                <Route path='myApps' onEnter={checkUserInfo}
                    getComponent={
                        (nextState,callback) => {
                            require.ensure([],(require) => {
                                callback(null, require('./module/myApps'));
                            },'myApps');
                        }
                    }/>
                <Route path='testPhone' onEnter={checkUserInfo}
                       getComponent={
                        (nextState,callback) => {
                            require.ensure([],(require) => {
                                callback(null, require('./module/testPhone'));
                            },'testPhone');
                        }
                    }/>
                <Route path='smsSignature' onEnter={checkUserInfo}
                       getComponent={
                        (nextState,callback) => {
                            require.ensure([],(require) => {
                                callback(null, require('./module/smsSignature'));
                            },'smsSignature');
                        }
                    }/>
                <Route path='smsTemplate' onEnter={checkUserInfo}
                       getComponent={
                        (nextState,callback) => {
                            require.ensure([],(require) => {
                                callback(null, require('./module/smsTemplate'));
                            },'smsTemplate');
                        }
                    }/>
                <Route path='voiceTemplate' onEnter={checkUserInfo}
                       getComponent={
                        (nextState,callback) => {
                            require.ensure([],(require) => {
                                callback(null, require('./module/voiceTemplate'));
                            },'voiceTemplate');
                        }
                    }/>
                <Route path='phoneNum' onEnter={checkUserInfo}
                       getComponent={
                        (nextState,callback) => {
                            require.ensure([],(require) => {
                                callback(null, require('./module/phoneNum'));
                            },'phoneNum');
                        }
                    }/>
                <Route path='statistics/:eaId' onEnter={checkUserInfo}
                       getComponent={
                        (nextState,callback) => {
                            require.ensure([],(require) => {
                                callback(null, require('./module/statistics'));
                            },'statistics');
                        }
                    }/>
                <Route path='myAccount' onEnter={checkUserInfo}
                       getComponent={
                        (nextState,callback) => {
                            require.ensure([],(require) => {
                                callback(null, require('./module/myAccount'));
                            },'myAccount');
                        }
                    }/>
                <Route path='flowRecord' onEnter={checkUserInfo}
                       getComponent={
                        (nextState,callback) => {
                            require.ensure([],(require) => {
                                callback(null, require('./module/flowRecord'));
                            },'flowRecord');
                        }
                    }/>
                <Route path='recharge' onEnter={checkUserInfo}
                       getComponent={
                        (nextState,callback) => {
                            require.ensure([],(require) => {
                                callback(null, require('./module/recharge'));
                            },'recharge');
                        }
                    }/>
                <Route path='orderManage' onEnter={checkUserInfo}
                       getComponent={
                        (nextState,callback) => {
                            require.ensure([],(require) => {
                                callback(null, require('./module/orderManage'));
                            },'orderManage');
                        }
                    }/>
                <Route path='accountManage' onEnter={checkUserInfo}
                       getComponent={
                        (nextState,callback) => {
                            require.ensure([],(require) => {
                                callback(null, require('./module/accountManage'));
                            },'accountManage');
                        }
                    }/>
                <Route path='changePwd' onEnter={checkUserInfo}
                       getComponent={
                        (nextState,callback) => {
                            require.ensure([],(require) => {
                                callback(null, require('./module/changePwd'));
                            },'changePwd');
                        }
                    }/>
                <Route path='emailList' onEnter={checkUserInfo}
                       getComponent={
                        (nextState,callback) => {
                            require.ensure([],(require) => {
                                callback(null, require('./module/emailList'));
                            },'emailList');
                        }
                    }/>
                <Route path='auth' onEnter={checkUserInfo}
                       getComponent={
                        (nextState,callback) => {
                            require.ensure([],(require) => {
                                callback(null, require('./module/auth'));
                            },'auth');
                        }
                    }/>
            </Route>
        </Route>
    </Router>
), document.getElementById('app'));
