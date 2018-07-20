/**
 * Created by hqer on 2018/3/7.
 */
import React from 'react';
import PropTypes from 'prop-types';
const $ = require('jquery');
class TopBar extends React.Component {
    componentDidUpdate () {
        $('.navigation-bar-top-nav-item.active').parents('.navigation-bar-top-nav').addClass('.active');
    }
    render () {
        return (
            <ul className='navigation-bar-top'>
                {
                    this.props.data && this.props.data.logo ? (
                        <li className={`navigation-bar-top-logo ${this.props.data.logo && this.props.data.logo.url ? (this.props.activeId === this.props.data.logo.url.activeId ? 'active pointer' : 'pointer') : ''}` } onClick={(e) => this.props.goPage(e,this.props.data.logo.url)}>
                            {
                                this.props.data.logo && this.props.data.logo.img ? (
                                    <img className='navigation-bar-top-logo-img' src={this.props.data.logo.img}/>
                                ) : ''
                            }
                            {
                                this.props.data.logo && this.props.data.logo.text ? (
                                    <span className='navigation-bar-top-logo-text'>{this.props.data.logo.text}</span>
                                ) : ''
                            }
                        </li>
                    ) : ''
                }
                {
                    this.props.data && this.props.data.nav ? (
                        this.props.data.nav.map((item,i) => (
                            <li key={i + 1} className={`navigation-bar-top-nav nav-${i} ${item && item.url && this.props.activeId === item.url.activeId ? 'active' : ''}`}>
                                <span className={`navigation-bar-top-nav-text ${item && item.url ? 'pointer' : ''}`} onClick={(e) => this.props.goPage(e,item.url)}>{item.text}</span>
                                {
                                    item && item.children && item.children.length ? (
                                        <ul className='navigation-bar-top-nav-children'>
                                            {
                                                this.props.data.nav.children.map((cItem,j) => (
                                                    <li key={j} className={`navigation-bar-top-nav-item ${cItem && cItem.url ? (this.props.activeId === cItem.url.activeId ? 'active pointer' : 'pointer') : ''}`} onClick={(e) => this.props.goPage(e,cItem.url)}>{cItem.text}</li>
                                                ))
                                            }
                                        </ul>
                                    ) : ''
                                }
                            </li>
                        ))
                    ) : ''
                }
                {
                    this.props.data && this.props.data.user ? (
                        <li className='navigation-bar-top-right'>
                            <div className={`navigation-bar-top-user ${this.props.data.user && this.props.data.user.url ? (this.props.activeId === this.props.data.user.url.activeId ? 'active pointer' : 'pointer') : ''}`} onClick={(e) => this.props.goPage(e,this.props.data.user.url)}>
                                <div className='navigation-bar-top-user-text' title={this.props.data.user.userName}>{this.props.data.user.userName}</div>
                                {
                                    this.props.data.user && this.props.data.user.children && this.props.data.user.children.length ? (
                                        <ul className='navigation-bar-top-user-children'>
                                            {
                                                this.props.data.user.children.map((item,i) => (
                                                    <li key={i} className={`navigation-bar-top-user-item ${item && item.url ? (this.props.activeId === item.url.activeId ? 'active pointer' : 'pointer') : ''}`} onClick={(e) => this.props.goPage(e,item.url)}>{item.text}</li>
                                                ))
                                            }
                                        </ul>
                                    ) : ''
                                }
                            </div>
                            <div className={`navigation-bar-top-message ${this.props.data.message && this.props.data.message.url ? (this.props.activeId === this.props.data.message.url.activeId ? 'active pointer' : 'pointer') : ''}`} onClick={(e) => this.props.goPage(e,this.props.data.message.url)}>
                                {
                                    this.props.data.message.unRead ? (
                                        <div className='navigation-bar-top-unRead'>{this.props.data.message.unRead}</div>
                                    ) : ''
                                }
                            </div>
                        </li>
                    ) : ''
                }
                {
                    this.props.data && this.props.data.unLogin ? (
                        <li className='navigation-bar-top-right btns'>
                            {
                                this.props.data.unLogin.map((item,i) => (
                                    <div key={i} className={`navigation-bar-top-btn btn-${i}`} onClick={(e) => this.props.goPage(e,item.url)}>{item.text}</div>
                                ))
                            }
                        </li>
                    ) : ''
                }
            </ul>
        );
    }
}
TopBar.propTypes = {
    data:PropTypes.object.isRequired,
    activeId:PropTypes.string.isRequired,
    goPage:PropTypes.func.isRequired
};
TopBar.defaultProps = {
    data:{},
    activeId:''
};
module.exports = TopBar;
