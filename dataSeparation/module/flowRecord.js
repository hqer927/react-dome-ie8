/**
 * Created by hqer on 2017/12/21.
 */
const React = require('react');
const actionLeft = require('../module/actions/left');

class FlowRecord extends React.Component {
    componentDidMount () {
        actionLeft.setNavSelect('flowRecord');
    }
    render () {
        return (
            <div className='myServer'>
                <div className='whiteSpace'>
                    <div className='title'>流量前向交易</div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
module.exports = FlowRecord;
