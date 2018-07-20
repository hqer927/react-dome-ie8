/**
 * Created by hqer on 2017/12/21.
 */
const React = require('react');
const actionLeft = require('../module/actions/left');

class EmailList extends React.Component {
    componentDidMount () {
        actionLeft.setNavSelect('emailList');
    }
    render () {
        return (
            <div className='testPhone'>
                <div className='whiteSpace'>
                    <div className='title'>站内消息</div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
module.exports = EmailList;
