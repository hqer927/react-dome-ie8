/**
 * Created by hqer on 2017/12/21.
 */
const React = require('react');
const actionLeft = require('../module/actions/left');

class TestPhone extends React.Component {
    componentDidMount () {
        actionLeft.setNavSelect('testPhone');
    }
    render () {
        return (
            <div className='testPhone'>
                <div className='whiteSpace'>
                    <div className='title'>测试号码</div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
module.exports = TestPhone;
