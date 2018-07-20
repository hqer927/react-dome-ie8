/**
 * Created by hqer on 2017/12/21.
 */
const React = require('react');
const actionLeft = require('../module/actions/left');

class AccountManage extends React.Component {
    componentDidMount () {
        actionLeft.setNavSelect('accountManage');
    }
    render () {
        return (
            <div className='testPhone'>
                <div className='whiteSpace'>
                    <div className='title'>账号管理</div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
module.exports = AccountManage;