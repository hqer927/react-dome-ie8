/**
 * Created by hqer on 2016/12/12.
 */
const React = require('react');
const Link = require('react-router').Link;
const footer = window.GLOBAL.pageData.footer;

class Footer extends React.Component {
    render () {
        return (
            <div className='footer'>
                <div className='footerMenu'>
                    {footer.leftItems.length ? (
                        <ul className='leftItem'>
                            {footer.leftItems.map((item,i) => (
                                item && item.url ? (
                                    <li className='item' key={i}>
                                        <Link to={item.url}>
                                            {item && item.img ? (
                                                <img src={item.img} className='leftItemImg'/>
                                            ) : ''}
                                            {item && item.text ? (
                                                <span>{item.text}</span>
                                            ) : ''}
                                        </Link>
                                    </li>
                                ) : (
                                    <li className='item' key={i}>
                                        {item && item.img ? (
                                            <img src={item.img} className='leftItemImg'/>
                                        ) : ''}
                                        {item && item.text ? (
                                            <span>{item.text}</span>
                                        ) : ''}
                                    </li>
                                )
                            ))}
                        </ul>
                    ) : ''}
                    {footer.rightItems.length ? (
                        <ul className='rightItem'>
                            {footer.rightItems.map((item,i) => (
                                item && item.url ? (
                                    <li className='item' key={i}>
                                        <Link to={item.url}>
                                            {item && item.img ? (
                                                <img src={item.img} className='leftItemImg'/>
                                            ) : ''}
                                            {item && item.text ? (
                                                <span>{item.text}</span>
                                            ) : ''}
                                        </Link>
                                    </li>
                                ) : (
                                    <li className='item' key={i}>
                                        {item && item.img ? (
                                            <img src={item.img} className='leftItemImg'/>
                                        ) : ''}
                                        {item && item.text ? (
                                            <span>{item.text}</span>
                                        ) : ''}
                                    </li>
                                )
                            ))}
                        </ul>
                    ) : ''}
                </div>
            </div>
        );
    }
}
module.exports = Footer;
