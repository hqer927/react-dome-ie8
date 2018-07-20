/**
 * Created by hqer on 2017/12/21.
 */
const React = require('react');
const actionLeft = require('../module/actions/left');

class MyAccount extends React.Component {
    componentDidMount () {
        actionLeft.setNavSelect('myAccount');
    }
    render () {
        return (
            <div className='myServer'>
                <div className='whiteSpace'>
                    <div className='title'>我的账户</div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
module.exports = MyAccount;
