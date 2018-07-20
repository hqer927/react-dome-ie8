/**
 * Created by hqer on 2016/12/12.
 */
const React = require('react');
/*const actionHeader = require('../module/actions/header');*/

class Index extends React.Component {
    componentWillMount () {
        actionHeader.setNavSelect("index");
    }
    render () {
        return (
            <div className='order devDoc About'>
                <div className='whiteSpace'>
                    <div className='title'>首页</div>
                    <div className='UploadArea'>
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
module.exports = Index;
