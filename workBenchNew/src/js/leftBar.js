/**
 * Created by hqer on 2018/3/7.
 */
import React from 'react';
import PropTypes from 'prop-types';
const $ = require('jquery');
class LeftBar extends React.Component {
    componentDidUpdate () {
        $('.navigation-bar-left-item.active').parents('.navigation-bar-left-item').each(function () {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
            }
        });
    }
    render () {
        return (
            <ul className='navigation-bar-left'>
                {
                    this.props.data && this.props.data.length ? (
                        this.props.data.map((item1,i) => (
                            <li key={i} className={`navigation-bar-left-item level1 ${item1 && item1.url ? (this.props.activeId === item1.url.activeId ? 'active pointer' : 'pointer') : ''}`} onClick={(e) => this.props.goPage(e,item1.url)}>
                                <div className='navigation-bar-left-item-btn level1'>
                                    {
                                        item1 && item1.icon ? (
                                            <div className='navigation-bar-left-item-icon level1'>
                                                <img src={item1.icon}/>
                                            </div>
                                        ) : ''
                                    }
                                    {
                                        item1 && item1.text ? (
                                            <div className='navigation-bar-left-item-text level1' title={item1.text}>{item1.text}</div>
                                        ) : ''
                                    }
                                </div>
                                {
                                    item1 && item1.children.length ? (
                                        <div className='navigation-bar-left-item-sign level1'></div>
                                    ) : ''
                                }
                                {
                                    item1 && item1.children.length ? (
                                        <ul className='navigation-bar-left-item-children level1'>
                                            {
                                                item1.children.map((item2,j) => (
                                                    <li key={j}  className={`navigation-bar-left-item level2 ${item2 && item2.url ? (this.props.activeId === item2.url.activeId ? 'active pointer' : 'pointer') : ''}`} onClick={(e) => this.props.goPage(e,item2.url)}>
                                                        <div className='navigation-bar-left-item-text level2' title={item2.text}>{item2.text}</div>
                                                        {
                                                            item2 && item2.children.length ? (
                                                                <ul className='navigation-bar-left-item-children level2'>
                                                                    {
                                                                        item2.children.map((item3,k) => (
                                                                            <li key={k}  className={`navigation-bar-left-item level3 ${item3 && item3.url ? (this.props.activeId === item3.url.activeId ? 'active pointer' : 'pointer') : ''}`} onClick={(e) => this.props.goPage(e,item3.url)}>
                                                                                <div className='navigation-bar-left-item-text level3' title={item3.text}>{item3.text}</div>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            ) : ''
                                                        }
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    ) : ''
                                }
                            </li>
                        ))
                    ) : ''
                }
            </ul>
        );
    }
}
LeftBar.propTypes = {
    data:PropTypes.array.isRequired,
    activeId:PropTypes.string.isRequired,
    goPage:PropTypes.func.isRequired
};
LeftBar.defaultProps = {
    data:[],
    activeId:''
};
module.exports = LeftBar;
