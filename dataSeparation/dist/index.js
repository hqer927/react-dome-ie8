webpackJsonp([2,10],{

/***/ 549:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = __webpack_require__(229)['default'];
	
	var _possibleConstructorReturn = __webpack_require__(230)['default'];
	
	var _inherits = __webpack_require__(298)['default'];
	
	/**
	 * Created by hqer on 2016/12/12.
	 */
	var React = __webpack_require__(10);
	var actionHeader = __webpack_require__(358);
	
	var Index = function (_React$Component) {
	    _inherits(Index, _React$Component);
	
	    function Index() {
	        _classCallCheck(this, Index);
	
	        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	    }
	
	    Index.prototype.componentWillMount = function componentWillMount() {
	        actionHeader.setNavSelect("index");
	    };
	
	    Index.prototype.render = function render() {
	        return React.createElement(
	            'div',
	            { className: 'order devDoc About' },
	            React.createElement(
	                'div',
	                { className: 'whiteSpace' },
	                React.createElement(
	                    'div',
	                    { className: 'title' },
	                    '\u9996\u9875'
	                ),
	                React.createElement('div', { className: 'UploadArea' })
	            ),
	            this.props.children
	        );
	    };
	
	    return Index;
	}(React.Component);
	
	module.exports = Index;

/***/ })

});