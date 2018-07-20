/**
 * Created by hqer on 2018/3/7.
 */
require ('../less/main.less');
const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

const TopBar = require('./topBar');
const LeftBar = require('./leftBar');

const getUrlParams = (name) => {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = $('script').last().attr('src').split('?')[1].match(reg);
    if (r != null)
    { return unescape(r[2]); }
    return null;
};

class NavigationBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            token:this.props.token,
            topData:{},
            leftData:[],
            nextUrl:''
        };
        this.goToPage = this.goToPage.bind(this);
        this._router = this._router.bind(this);
    }
    componentDidUpdate () {
        if (document.documentElement.clientWidth < $('.navigation-bar .navigation-bar-top').width()) {
            $('.navigation-bar .navigation-bar-top-content').addClass('navigation-bar-top-absolute');
        } else {
            $('.navigation-bar .navigation-bar-top-content').removeClass('navigation-bar-top-absolute');
        }
        if (document.documentElement.clientHeight < $('.navigation-bar .navigation-bar-left').height()) {
            $('.navigation-bar .navigation-bar-left').addClass('navigation-bar-left-absolute');
        } else {
            $('.navigation-bar .navigation-bar-left').removeClass('navigation-bar-left-absolute').height(document.documentElement.clientHeight);
        }
    }
    componentDidMount () {
        $.ajax({
            type: 'POST',
            data:{token:this.state.token,appId:this.props.appId},
            url: decodeURIComponent(getUrlParams('menuUrl')),
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback:'getBarData',
            success:function (r) {
                if (r.code && r.validity) {
                    const newState = {token:r.token,nextUrl:r.nextUrl};
                    newState.topData = JSON.parse(JSON.stringify(r.result.top));
                    newState.leftData = JSON.parse(JSON.stringify(r.result.left));
                    this.setState(newState);
                } else if (r.nextUrl.indexOf('?') > -1) {
                    window.location.href = `${r.nextUrl}&token=${r.token}`;
                } else {
                    window.location.href = `${r.nextUrl}?token=${r.token}`;
                }
            }.bind(this)
        });
        $(window).resize(() => {
            if (document.documentElement.clientWidth < $('.navigation-bar .navigation-bar-top').width()) {
                $('.navigation-bar .navigation-bar-top-content').addClass('navigation-bar-top-absolute');
            } else {
                $('.navigation-bar .navigation-bar-top-content').removeClass('navigation-bar-top-absolute');
            }
            if (document.documentElement.clientHeight < $('.navigation-bar .navigation-bar-left').height()) {
                $('.navigation-bar .navigation-bar-left').addClass('navigation-bar-left-absolute');
            } else {
                $('.navigation-bar .navigation-bar-left').removeClass('navigation-bar-left-absolute').height(document.documentElement.clientHeight);
            }
        });
    }
    goToPage (e,_url) {
        if (typeof _url === 'object') {
            _url.token = this.state.token;
            this._router(_url);
        }
        e.stopPropagation();
    }
    _router (r) {
        if (typeof r === 'object' && r.type === 0) {
            let newUrl;
            if (r.url.indexOf('?') > -1) {
                newUrl = `${r.url}&token=${r.token}&activeId=${r.activeId}`;
            } else {
                newUrl = `${r.url}?token=${r.token}&activeId=${r.activeId}`;
            }
            if (r && r.subUrl) {
                newUrl = `${newUrl}&subUrl=${encodeURIComponent(r.subUrl)}`;
            }
            window.location.href = newUrl;
        } else if (typeof r === 'object' && r.type === 2) {
            this.setState({token:r.token});
            $.ajax({
                type: 'POST',
                data:{token:r.token,appId:this.props.appId},
                url:r.url,
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback:r.subUrl,
                success:function (r1) {
                    if (r1.code) {
                        this._router(r1);
                    }
                }.bind(this)
            });
        } else {
            this.setState({token:r.token});
        }
    }
    render () {
        return (
            <div className='navigation-bar'>
                <div className='navigation-bar-top-content'>
                    <TopBar data={this.state.topData} goPage={this.goToPage} activeId={this.props.activeId}/>
                </div>
                <div className='navigation-bar-left-content'>
                    <LeftBar data={this.state.leftData} goPage={this.goToPage} activeId={this.props.activeId}/>
                </div>
            </div>
        );
    }
}
ReactDOM.render(
    (
        <NavigationBar
            token={getUrlParams('token')}
            appId={getUrlParams('appId')}
            activeId={getUrlParams('activeId')}
        />
    ), document.getElementById(getUrlParams('id')));
