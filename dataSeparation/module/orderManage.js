/**
 * Created by hqer on 2017/12/21.
 */
const React = require('react');
const actionLeft = require('../module/actions/left');

class OrderManage extends React.Component {
    componentDidMount () {
        actionLeft.setNavSelect('orderManage');
    }
    render () {
        return (
            <div className='myServer'>
                <div className='whiteSpace'>
                    <div className='title'>订单管理</div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
module.exports = OrderManage;
