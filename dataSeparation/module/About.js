/**
 * Created by hqer on 2016/12/12.
 */
const React = require('react');
const about = window.GLOBAL.pageData.about;
const actionHeader = require('../module/actions/header');

class About extends React.Component {
    componentWillMount () {
        actionHeader.setNavSelect('index');
    }
    render () {
        return (
            <div className='middleBox about'>
                <div className='whiteSpace'>
                    <div className='title'>公司简介</div>
                    <div className='textLine'dangerouslySetInnerHTML={{__html:about.profile}}></div>
                    <div className='title'>联系我们</div>
                    <div className='textLine'dangerouslySetInnerHTML={{__html:about.contact}}></div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
module.exports = About;
