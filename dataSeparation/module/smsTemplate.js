/**
 * Created by hqer on 2017/12/21.
 */
import React from 'react';
const actionLeft = require('../module/actions/left');
class SmsTemplate extends React.Component {
    componentDidMount () {
        actionLeft.setNavSelect('smsTemplate');
    }
    render () {
        return (
            <div className='myServer'>
                <div className='whiteSpace'>
                    <div className='title'>短信模板</div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
module.exports = SmsTemplate;
