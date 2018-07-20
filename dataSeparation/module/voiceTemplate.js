/**
 * Created by hqer on 2017/12/21.
 */
import React from 'react';
const actionLeft = require('../module/actions/left');
class VoiceTemplate extends React.Component {
    componentDidMount () {
        actionLeft.setNavSelect('voiceTemplate');
    }
    render () {
        return (
            <div className='myServer'>
                <div className='whiteSpace'>
                    <div className='title'>语音模板</div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
module.exports = VoiceTemplate;
