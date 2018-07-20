/**
 * Created by hqer on 2017/12/21.
 */
const React = require('react');
const actionLeft = require('../module/actions/left');

class Auth extends React.Component {
    componentDidMount () {
        actionLeft.setNavSelect('auth');
    }
    render () {
        return (
            <div className='testPhone'>
                <div className='whiteSpace'>
                    <div className='title'>认证信息</div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
module.exports = Auth;
