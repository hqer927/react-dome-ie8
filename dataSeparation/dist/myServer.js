webpackJsonp([5,10],{

/***/ 553:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = __webpack_require__(229)['default'];
	
	var _possibleConstructorReturn = __webpack_require__(230)['default'];
	
	var _inherits = __webpack_require__(298)['default'];
	
	var React = __webpack_require__(10);
	
	var MyServer = function (_React$Component) {
	    _inherits(MyServer, _React$Component);
	
	    function MyServer() {
	        _classCallCheck(this, MyServer);
	
	        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	    }
	
	    MyServer.prototype.render = function render() {
	        return React.createElement(
	            'div',
	            { className: 'myServer' },
	            React.createElement(
	                'div',
	                { className: 'whiteSpace' },
	                React.createElement(
	                    'div',
	                    { className: 'title' },
	                    '\u6211\u7684\u80FD\u529B'
	                )
	            ),
	            this.props.children
	        );
	    };
	
	    return MyServer;
	}(React.Component); /**
	                     * Created by hqer on 2016/12/12.
	                     */
	
	
	module.exports = MyServer;

/***/ })

});