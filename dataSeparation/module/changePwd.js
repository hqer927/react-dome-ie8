/**
 * Created by hqer on 2017/12/21.
 */
const React = require('react');
const actionLeft = require('../module/actions/left');

class ChangePwd extends React.Component {
    componentDidMount () {
        actionLeft.setNavSelect('changePwd');
    }
    render () {
        return (
            <div className='testPhone'>
                <div className='whiteSpace'>
                    <div className='title'>密码更改</div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
module.exports = ChangePwd;
