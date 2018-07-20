/**
 * Created by hqer on 2017/5/17.
 */
import React from 'react';
import {Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';
class CheckBox extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            s: this.props.s
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillReceiveProps (newProps) {
        if (newProps.s != this.state.s) {
            this.setState({s:newProps.s});
        }
    }
    handleClick () {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick();
        } else {
            if (this.state.s) {
                this.setState({s:false});
            } else {
                this.setState({s:true});
            }
        }
    }
    render () {
        const other = Object.assign({},this.props);
        delete other.v;
        delete other.s;
        delete other.style;
        return (
            <div style={this.props.style} className='CheckBoxUI'>
                <button
                    {...other}
                    type='button'
                    className={this.props.className}
                    value={this.state.s ? this.props.v : ''}
                    onClick={this.handleClick}>
                    {
                        this.state.s ? (
                            <Glyphicon glyph='ok'/>
                        ) : ''
                    }
                </button>
            </div>
        );
    }
}

CheckBox.propTypes = {
    s:PropTypes.bool.isRequired,
    v:PropTypes.string.isRequired
};
CheckBox.defaultProps = {
    s:false,
    v:''

};
module.exports = CheckBox;
