/**
 * Created by hqer on 2016/12/12.
 */
const React = require('react');
const Link = require('react-router').Link;
const header = window.GLOBAL.pageData.header;

class Header extends React.Component {
    render () {
        return (
            <div className='header'>
                <div className='headerMenu'>
                    <Link className='logoBtn' to='/index'>
                        {header.logo.img ? (
                            <img src={header.logo.img} className='logoImg'/>
                        ) : ''}
                        {header.logo.text ? (
                            <span>{header.logo.text}</span>
                        ) : ''}
                    </Link>
                </div>
            </div>
        );
    }
}
module.exports = Header;
