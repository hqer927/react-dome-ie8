/**
 * Created by hqer on 2017/12/21.
 */
const React = require('react');
const actionLeft = require('../module/actions/left');

class Recharge extends React.Component {
    componentDidMount () {
        actionLeft.setNavSelect('recharge');
    }
    render () {
        return (
            <div className='myServer'>
                <div className='whiteSpace'>
                    <div className='title'>充值</div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
module.exports = Recharge;
