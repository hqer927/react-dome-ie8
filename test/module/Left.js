/**
 * Created by hqer on 2016/12/12.
 */
const React = require('react');
const Link = require('react-router').Link;
const Reflux = require('reflux');
const ReactMixin = require('react-mixin');
import {Glyphicon } from 'react-bootstrap';
const storeLeft = require('../module/store/left');
const actionLeft = require('../module/actions/left');
const Fetch = require('../config/fetch');

const leftMenu = window.GLOBAL.pageData.workBench.leftMenu;
const header = window.GLOBAL.pageData.header;

class Left extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data:{
                unPayOrder:0,
                unReadMail:0,
                navSelect:'myServer'
            },
            showList:[]
        };
    }
    componentDidMount () {
        const leftState = new Promise(((resolve) => {
            Fetch.set(leftMenu.action,{
                method: 'POST',
                cache: 'no-cache',
                body: JSON.stringify({
                    userId:window.GLOBAL.userId
                })
            }).then((r) => {
                if (r.code) {
                    resolve(r.showList);
                }
            });
        }));
        leftState.then((_obj) => {
            this.setState({showList:_obj});
            return new Promise(((resolve) => {
                Fetch.set(header.rightMenu.email.action,{
                    method: 'POST',
                    cache: 'no-cache',
                    body: JSON.stringify({
                        userId:window.GLOBAL.userId
                    })
                }).then((r) => {
                    if (r.code) {
                        const newData = {};
                        newData.unReadMail = r.unReadMail;
                        resolve(newData);
                    }
                });
            }));
        }).then((_obj) => {
            return new Promise(((resolve) => {
                Fetch.set(leftMenu.unPayOrderAction,{
                    method: 'POST',
                    cache: 'no-cache',
                    body: JSON.stringify({
                        userId:window.GLOBAL.userId
                    })
                }).then((r) => {
                    if (r.code) {
                        _obj.unPayOrder = r.unPayOrder;
                        resolve(_obj);
                    }
                });
            }));
        }).then((_obj) => {
            actionLeft.setLeftState(_obj);
        });
    }
    render () {
        return (
            <div className='leftMenu'>
                {
                    this.state.showList.length ? (
                        <ul className='menu'>
                            {
                                this.state.showList.map((item,i) => (
                                    <li key={i} className={this.state.data.navSelect === item.key || (item.children && item.children.find((n) => n.key === this.state.data.navSelect)) ? 'item selected' : 'item'}>
                                        {
                                            item.children.length ? (
                                                this.state.data.navSelect === item.key || (item.children && item.children.find((n) => n.key === this.state.data.navSelect)) ? (
                                                    <Glyphicon className='itemIcon' glyph='minus'/>
                                                ) : (
                                                    <Glyphicon className='itemIcon' glyph='plus'/>
                                                )
                                            ) : ''
                                        }
                                        {
                                            item.children.length ? (
                                                <Link to={item.children[0].type ? `${leftMenu.menu[item.children[0].key].url}/${item.children[0].param}` : leftMenu.menu[item.children[0].key].url}>
                                                    <div className='itemTitle'>{item.title}</div>
                                                </Link>
                                            ) : (
                                                <Link to={item.type ? `${leftMenu.menu[item.key].url}/${item.param}` : leftMenu.menu[item.key].url}>
                                                    <div className='itemTitle'>{item.title}</div>
                                                </Link>
                                            )
                                        }
                                        {
                                            item.children.length ? (
                                                <ul className='linkMenu'>
                                                    {
                                                        item.children.map((cItem,j) => (
                                                            <li key={j} className='linkItem'>
                                                                <Link to={cItem.type ? `${leftMenu.menu[cItem.key].url}/${cItem.param}` : leftMenu.menu[cItem.key].url} title={cItem.title} activeClassName='active'>{cItem.title}</Link>
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
            </div>
        );
    }
}
ReactMixin.onClass(Left, Reflux.connect(storeLeft,'data'));
module.exports = Left;
