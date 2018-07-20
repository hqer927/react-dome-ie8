/**
 * Created by hqer on 2016/12/12.
 */
const React = require('react');
const Link = require('react-router').Link;
const hashHistory = require('react-router').hashHistory;
const Reflux = require('reflux');
const ReactMixin = require('react-mixin');
const storeHeader = require('../module/store/header');
const actionHeader = require('../module/actions/header');
const Fetch = require('../config/fetch');


const header = window.GLOBAL.pageData.header;

class Header extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data:{
                isLogin: window.GLOBAL.isLogin ? window.GLOBAL.isLogin : 0,
                name:window.GLOBAL.userInfo && window.GLOBAL.userInfo.name ? window.GLOBAL.userInfo.name : '',
                unReadMail:0,
                navSelect:'index'
            }
        };
        this.logout = this.logout.bind(this);
    }
    componentWillMount () {
        const data = {
            isLogin: window.GLOBAL.isLogin ? window.GLOBAL.isLogin : 0,
            name:window.GLOBAL.userInfo && window.GLOBAL.userInfo.name ? window.GLOBAL.userInfo.name : ''
        };
        actionHeader.setUserInfo(data);
    }
    componentDidMount () {
        if (sessionStorage && sessionStorage.devPortalUid && !(window.GLOBAL.userInfo && window.GLOBAL.userInfo.name)) {
            window.GLOBAL.userId = sessionStorage.devPortalUid;
            const userInfo = new Promise(((resolve) => {
                Fetch.set(header.action,{
                    method: 'POST',
                    cache: 'no-cache',
                    body: JSON.stringify({
                        userId:window.GLOBAL.userId
                    })
                }).then((r) => {
                    if (r.code) {
                        window.GLOBAL.isLogin = r.isLogin;
                        window.GLOBAL.userInfo = r.userInfo;
                        let newData = {};
                        newData.isLogin = r.isLogin;
                        newData.name = r.userInfo.name;
                        resolve(newData);
                    }
                });
            }));
            userInfo.then((_obj) => {
                return new Promise(((resolve) => {
                    Fetch.set(header.rightMenu.email.action,{
                        method: 'POST',
                        cache: 'no-cache',
                        body: JSON.stringify({
                            userId:window.GLOBAL.userId
                        })
                    }).then((r) => {
                        if (r.code) {
                            _obj.unReadMail = r.unReadMail;
                            resolve(_obj);
                        }
                    });
                }));
            }).then((_obj) => {
                actionHeader.setUserInfo(_obj);
            });
        }
    }
    logout () {
        Fetch.set(header.rightMenu.userName.action,{
            method: 'POST',
            cache: 'no-cache',
            body: JSON.stringify({
                userId:window.GLOBAL.userId
            })
        }).then((r) => {
            if (r.code && r.isExit) {
                window.GLOBAL.isLogin = 0;
                window.GLOBAL.userInfo = '';
                sessionStorage.removeItem('devPortalUid');
                let newData = {};
                newData.isLogin = 0;
                newData.name = '';
                newData.unReadMail = 0;
                newData.navSelect = 'index';
                actionHeader.setUserInfo(newData);
                hashHistory.push('/index');
            }
        });
    }
    render () {
        return (
            <div className='header'>
                <div className='headerMenu'>
                    <Link className='logoBtn' to='/index'>
                        {header.logo.img ? (
                            <img src={header.logo.img} className='logoImg'/>
                        ) : ''}
                        {header.logo.text ? (
                            <span>{header.logo.text}</span>
                        ) : ''}
                    </Link>
                    {
                        this.state.data.isLogin ? (
                            <ul className='centerMenu'>
                                {
                                    header.centerMenu.loginNav.map((item,i) => (
                                        header.centerMenu[item] && header.centerMenu[item].child && header.centerMenu[item].child.length ? (
                                            <li key={i} className={this.state.data.navSelect === item ? 'navItem select' : 'navItem'}>
                                                <span className='navTitle'>{header.centerMenu[item].text}</span>
                                                <div className={`showMenuBox ${item}`}>
                                                    <ul className='showMenu'>
                                                        {
                                                            header.centerMenu[item].child.map((cItem,j) => (
                                                                cItem && cItem.child && cItem.child.length ? (
                                                                    <li key={j} className='showMenuItem'>
                                                                        <span className='showMenuItemTitle'>{cItem.text}</span>
                                                                        <ul className='menu'>
                                                                            {
                                                                                cItem.child.map((iItem,n) => (
                                                                                    <li key={n}>
                                                                                        <Link to={iItem.url}>{iItem.text}</Link>
                                                                                    </li>
                                                                                ))
                                                                            }
                                                                        </ul>
                                                                    </li>
                                                                ) : (
                                                                    <li key={j} className='showMenuItem'>
                                                                        <Link to={cItem.url}>{cItem.text}</Link>
                                                                    </li>
                                                                )
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </li>
                                        ) : (
                                            <li key={i} className={this.state.data.navSelect === item ? 'navItem select' : 'navItem'}>
                                                <Link to={header.centerMenu[item].url}>
                                                    <span className='navTitle'>{header.centerMenu[item].text}</span>
                                                </Link>
                                            </li>
                                        )
                                    ))
                                }
                            </ul>
                        ) : (
                            <ul className='centerMenu'>
                                {
                                    header.centerMenu.unLoginNav.map((item,i) => (
                                        header.centerMenu[item] && header.centerMenu[item].child && header.centerMenu[item].child.length ? (
                                            <li key={i} className={this.state.data.navSelect === item ? 'navItem select' : 'navItem'}>
                                                <span className='navTitle'>{header.centerMenu[item].text}</span>
                                                <div className={`showMenuBox ${item}`}>
                                                    <ul className='showMenu'>
                                                        {
                                                            header.centerMenu[item].child.map((cItem,j) => (
                                                                cItem && cItem.child && cItem.child.length ? (
                                                                    <li key={j} className='showMenuItem'>
                                                                        <span className='showMenuItemTitle'>{cItem.text}</span>
                                                                        <ul className='menu'>
                                                                            {
                                                                                cItem.child.map((iItem,n) => (
                                                                                    <li key={n}>
                                                                                        <Link to={iItem.url}>{iItem.text}</Link>
                                                                                    </li>
                                                                                ))
                                                                            }
                                                                        </ul>
                                                                    </li>
                                                                ) : (
                                                                    <li key={j} className='showMenuItem'>
                                                                        <Link to={cItem.url}>{cItem.text}</Link>
                                                                    </li>
                                                                )
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </li>
                                        ) : (
                                            <li key={i} className={this.state.data.navSelect === item ? 'navItem select' : 'navItem'}>
                                                <Link to={header.centerMenu[item].url}>
                                                    <span className='navTitle'>{header.centerMenu[item].text}</span>
                                                </Link>
                                            </li>
                                        )
                                    ))
                                }
                            </ul>
                        )
                    }
                    {
                        this.state.data.isLogin ? (
                            <div className='rightMenu'>
                                <div className='userName'>
                                    <span>{header.rightMenu.userName.beforeTips + this.state.data.name}</span>
                                    <div className='iconTips' onClick={this.logout}>退出</div>
                                </div>
                                <Link className='emailBox' to={header.rightMenu.email.url}><div className={this.state.data.unReadMail ? 'icon icon-emailGraySmall redDot' : 'icon icon-emailGraySmall'}></div></Link>
                            </div>
                        ) : (
                            <div className='rightMenu'>
                                {
                                    header.rightMenu.unLoginBtns.map((item,i) => (
                                        <Link key={i} role='button' className={item.key} to={item.url}>{item.text}</Link>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}
ReactMixin.onClass(Header, Reflux.connect(storeHeader,'data'));
module.exports = Header;
