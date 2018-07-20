webpackJsonp([3,10],{

/***/ 550:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = __webpack_require__(229)['default'];
	
	var _possibleConstructorReturn = __webpack_require__(230)['default'];
	
	var _inherits = __webpack_require__(298)['default'];
	
	/**
	 * Created by hqer on 2016/12/12.
	 */
	var React = __webpack_require__(10);
	var about = window.GLOBAL.pageData.about;
	var actionHeader = __webpack_require__(358);
	
	var About = function (_React$Component) {
	    _inherits(About, _React$Component);
	
	    function About() {
	        _classCallCheck(this, About);
	
	        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	    }
	
	    About.prototype.componentWillMount = function componentWillMount() {
	        actionHeader.setNavSelect("index");
	    };
	
	    About.prototype.render = function render() {
	        return React.createElement(
	            'div',
	            { className: 'middleBox about' },
	            React.createElement(
	                'div',
	                { className: 'whiteSpace' },
	                React.createElement(
	                    'div',
	                    { className: 'title' },
	                    '\u516C\u53F8\u7B80\u4ECB'
	                ),
	                React.createElement('div', { className: 'textLine', dangerouslySetInnerHTML: { __html: about.profile } }),
	                React.createElement(
	                    'div',
	                    { className: 'title' },
	                    '\u8054\u7CFB\u6211\u4EEC'
	                ),
	                React.createElement('div', { className: 'textLine', dangerouslySetInnerHTML: { __html: about.contact } })
	            ),
	            this.props.children
	        );
	    };
	
	    return About;
	}(React.Component);
	
	module.exports = About;

/***/ })

});