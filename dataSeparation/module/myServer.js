/**
 * Created by hqer on 2016/12/12.
 */
import React from 'react';
const actionLeft = require('../module/actions/left');
class MyServer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {

        };
        this.logout = this.logout.bind(this);
    }
    componentDidMount () {
        actionLeft.setNavSelect("myServer");
    }
    render () {
        return (
            <div className='myServer'>
                <div className='title'>统计数据</div>
                <div className='whiteSpace'>

                </div>
                {this.props.children}
            </div>
        );
    }
}
module.exports = MyServer;
