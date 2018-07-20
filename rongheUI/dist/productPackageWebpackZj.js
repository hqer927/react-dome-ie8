webpackJsonp([6,8],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(435);


/***/ }),

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _from = __webpack_require__(309);
	
	var _from2 = _interopRequireDefault(_from);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports["default"] = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }
	
	    return arr2;
	  } else {
	    return (0, _from2["default"])(arr);
	  }
	};

/***/ }),

/***/ 435:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _toConsumableArray = __webpack_require__(434)['default'];
	
	var _JSON$stringify = __webpack_require__(195)['default'];
	
	var _Object$assign = __webpack_require__(3)['default'];
	
	var _classCallCheck = __webpack_require__(231)['default'];
	
	var _possibleConstructorReturn = __webpack_require__(232)['default'];
	
	var _inherits = __webpack_require__(233)['default'];
	
	/**
	 * Created by hqer on 2017/11/24.
	 */
	var React = __webpack_require__(40);
	var ReactDOM = __webpack_require__(192);
	var $ = __webpack_require__(193);
	var Table = __webpack_require__(241).Table;
	var Glyphicon = __webpack_require__(241).Glyphicon;
	
	var UICheckBox = __webpack_require__(428);
	var UIRadioBtn = __webpack_require__(429);
	var UIInput = __webpack_require__(426);
	var UIDropDown = __webpack_require__(422);
	
	var ProductPackageAdd = function (_React$Component) {
	    _inherits(ProductPackageAdd, _React$Component);
	
	    function ProductPackageAdd(props) {
	        _classCallCheck(this, ProductPackageAdd);
	
	        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
	
	        _this.state = {
	            data: _this.props.data,
	            isVisibleList: [{ check: 1, text: '是', value: 1 }, { check: 0, text: '否', value: 0 }],
	            ladderPrice: [{ amount: '', price: '' }, { amount: '', price: '' }],
	            show: {
	                validTimeUnit: true,
	                productId: false,
	                ladderPrice: _this.props.data.isShowLadder ? true : false
	            },
	            unit: {
	                ladderPrice: _this.props.data.ladderUnit
	            },
	            errorTips: {
	                eaPriceName: '',
	                eaName: '',
	                productId: '',
	                eaTemplatePackage: '',
	                validTime: '',
	                eaTemplatePackageInfo: [{
	                    price: '',
	                    amount: ''
	                }],
	                userSource: '',
	                userLevel: '',
	                isVisible: '',
	                describe: '',
	                ladderPrice: ''
	            },
	            isSubmit: {
	                eaPriceName: false,
	                validTime: false,
	                userSource: false,
	                userLevel: false,
	                describe: false,
	                productId: false,
	                eaTemplatePackageInfo: [{
	                    price: false,
	                    amount: false
	                }]
	            }
	        };
	        _this.rule = _this.rule.bind(_this);
	        _this.handleChangeEaPriceName = _this.handleChangeEaPriceName.bind(_this);
	        _this.handleBlurEaPriceName = _this.handleBlurEaPriceName.bind(_this);
	        _this.handleChangeProductId = _this.handleChangeProductId.bind(_this);
	        _this.handleBlurProductIde = _this.handleBlurProductIde.bind(_this);
	        _this.handleChangeValidTime = _this.handleChangeValidTime.bind(_this);
	        _this.handleBlurValidTime = _this.handleBlurValidTime.bind(_this);
	        _this.handleChangeDescribe = _this.handleChangeDescribe.bind(_this);
	        _this.returnPriceValue = _this.returnPriceValue.bind(_this);
	        _this.returnAmountValue = _this.returnAmountValue.bind(_this);
	        _this.handleBlurDescribe = _this.handleBlurDescribe.bind(_this);
	
	        _this.selectEaName = _this.selectEaName.bind(_this);
	        _this.selectEaTemplatePackage = _this.selectEaTemplatePackage.bind(_this);
	        _this.selectValidTimeUnit = _this.selectValidTimeUnit.bind(_this);
	        _this.ladderPriceAddItem = _this.ladderPriceAddItem.bind(_this);
	        _this.ladderPriceAddItemNew = _this.ladderPriceAddItemNew.bind(_this);
	
	        _this.submit = _this.submit.bind(_this);
	        return _this;
	    }
	
	    ProductPackageAdd.prototype.submit = function submit() {
	        var _errorTips = _Object$assign({}, this.state.errorTips);
	        var _isSubmit = _Object$assign({}, this.state.isSubmit);
	        var _show = _Object$assign({}, this.state.show);
	        var _isOk = true;
	        if (!_isSubmit.eaPriceName) {
	            _isOk = false;
	            if (_errorTips.eaPriceName === '' && this.state.data.eaPriceName === '') {
	                _errorTips.eaPriceName = '* 能力套餐名称不能为空';
	            }
	        }
	        if (!_isSubmit.validTime) {
	            _isOk = false;
	            if (_errorTips.validTime === '' && this.state.data.validTime.value === '') {
	                _errorTips.validTime = '* 使用有效期不能为空';
	            }
	        }
	        if (!_isSubmit.describe) {
	            _isOk = false;
	            if (_errorTips.describe === '' && this.state.data.describe === '') {
	                _errorTips.describe = '* 使用规则不能为空';
	            }
	        }
	        if (!_isSubmit.userSource) {
	            _isOk = false;
	            if (_errorTips.userSource === '' && !this.state.data.userSource.find(function (n) {
	                return n.check === 1;
	            })) {
	                _errorTips.userSource = '* 可见用户来源不能为空';
	            }
	        }
	        if (!_isSubmit.userLevel) {
	            _isOk = false;
	            if (_errorTips.userLevel === '' && !this.state.data.userLevel.find(function (n) {
	                return n.check === 1;
	            })) {
	                _errorTips.userLevel = '* 可见用户等级不能为空';
	            }
	        }
	        if (_show.productId && !_isSubmit.productId) {
	            _isOk = false;
	            if (_errorTips.productId === '' && this.state.data.productId === '') {
	                _errorTips.productId = '* 产品ID不能为空';
	            }
	        }
	        if (_isSubmit.eaTemplatePackageInfo.length) {
	            _isSubmit.eaTemplatePackageInfo.map(function (item, i) {
	                if (!item.price) {
	                    _errorTips.eaTemplatePackageInfo[i].price = '* 价格不能为空！';
	                    _isOk = false;
	                }
	                if (!item.amount) {
	                    _errorTips.eaTemplatePackageInfo[i].amount = '* 规格不能为空！';
	                    _isOk = false;
	                }
	            });
	        }
	        if (this.state.data.eaName.v === '') {
	            _isOk = false;
	            _errorTips.eaName = '* 所属能力不能为空';
	        }
	        if (this.state.data.eaTemplatePackage.v === '') {
	            _isOk = false;
	            _errorTips.eaTemplatePackage = '* 能力套餐模板不能为空';
	        }
	        if (_show.ladderPrice && this.state.data.ladderPrice.length < 2) {
	            _isOk = false;
	            _errorTips.ladderPrice = '* 阶梯计费详情不能为空';
	        } else {
	            _errorTips.ladderPrice = '';
	        }
	        if (_isOk) {
	            $.ajax({
	                url: window.productPackagePageData.eaPriceName.actionUrl,
	                data: {
	                    'eaPriceName': this.state.data.eaPriceName,
	                    'eaId': this.state.data.eaName.v,
	                    'eaPriceId': this.state.data.eaPriceId
	                },
	                type: 'post',
	                dataType: 'json',
	                success: function (r) {
	                    if (r.result == 'notConflict') {
	                        $('#packageData').val(_JSON$stringify(this.state.data));
	                        $('#productPackage')[0].submit();
	                    } else {
	                        window.parent.global.setTips('systemTips', r.result);
	                    }
	                }.bind(this)
	            });
	        } else {
	            this.setState({ errorTips: _errorTips });
	        }
	    };
	
	    ProductPackageAdd.prototype.rule = function rule(_data) {
	        var newData = _Object$assign({}, _data);
	        var newShow = _Object$assign({}, this.state.show);
	        for (var i = 0; i < window.productPackagePageData.productId.showRule.length; i++) {
	            if (newData.eaName.v === window.productPackagePageData.productId.showRule[i].eaName) {
	                newShow.productId = window.productPackagePageData.productId.showRule[i].result;
	                break;
	            }
	        }
	        return { data: newData, show: newShow, isUseRule: false };
	    };
	
	    ProductPackageAdd.prototype.componentWillMount = function componentWillMount() {
	        var _this2 = this;
	
	        var newState = this.rule(this.state.data);
	        var _isSubmit = _Object$assign({}, this.state.isSubmit);
	        var _isVisibleList = [].concat(_toConsumableArray(this.state.isVisibleList));
	        var _errorTips = _Object$assign({}, this.state.errorTips);
	        _isVisibleList.map(function (item) {
	            if (item.value === _this2.state.data.isVisible) {
	                item.check = 1;
	            } else {
	                item.check = 0;
	            }
	        });
	        if (this.state.data.type) {
	            _isSubmit.eaPriceName = true;
	            _isSubmit.validTime = true;
	            _isSubmit.userSource = true;
	            _isSubmit.userLevel = true;
	            _isSubmit.describe = true;
	        }
	        if (this.state.data.productId != '') {
	            _isSubmit.productId = true;
	        }
	        if (this.state.data.ladderPrice.length > 1) {
	            _isSubmit.ladderPrice = true;
	        }
	        if (this.state.data.eaTemplatePackageInfo.length) {
	            _isSubmit.eaTemplatePackageInfo = [];
	            _errorTips.eaTemplatePackageInfo = [];
	            this.state.data.eaTemplatePackageInfo.map(function (item) {
	                _isSubmit.eaTemplatePackageInfo.push({ price: item.price != '' ? true : false, amount: item.amount != '' ? true : false });
	                _errorTips.eaTemplatePackageInfo.push({ price: '', amount: '' });
	            });
	        }
	        newState.errorTips = _errorTips;
	        newState.isSubmit = _isSubmit;
	        newState.isVisibleList = _isVisibleList;
	        this.setState(newState);
	    };
	
	    ProductPackageAdd.prototype.shouldComponentUpdate = function shouldComponentUpdate(newProps, newState) {
	        if (newState.isUseRule) {
	            var _newState = this.rule(newState.data);
	            this.setState(_newState);
	            return false;
	        } else {
	            return true;
	        }
	    };
	
	    ProductPackageAdd.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
	        if (prevState.data != this.state.data) {
	            $('#productPackage').val(_JSON$stringify(this.state.data));
	            var _mainHeight = $('.mainBox').outerHeight();
	            if (window.parent.global.setDomHeight && _mainHeight) {
	                window.parent.global.setDomHeight(_mainHeight, 'mainFrame');
	            }
	        }
	    };
	
	    ProductPackageAdd.prototype.handleChangeEaPriceName = function handleChangeEaPriceName(event) {
	        var _eT = event.srcElement ? event.srcElement : event.target;
	        var _val = _eT.value;
	        var newData = _Object$assign({}, this.state.data);
	        var _errorTips = _Object$assign({}, this.state.errorTips);
	        if (_val === '') {
	            newData.eaPriceName = '';
	            _errorTips.eaPriceName = '* 能力套餐名称不能为空';
	        } else if (/^[A-Za-z0-9\u4E00-\u9FFF()-.+]+$/.test(_val)) {
	            newData.eaPriceName = _val;
	            _errorTips.eaPriceName = '';
	        }
	        this.setState({ data: newData, errorTips: _errorTips });
	    };
	
	    ProductPackageAdd.prototype.handleBlurEaPriceName = function handleBlurEaPriceName() {
	        var _errorTips = _Object$assign({}, this.state.errorTips);
	        var _isSubmit = _Object$assign({}, this.state.isSubmit);
	        if (this.state.data.eaPriceName === '') {
	            _errorTips.eaPriceName = '* 能力套餐名称不能为空';
	            _isSubmit.eaPriceName = false;
	        } else if (/^[A-Za-z0-9\u4E00-\u9FFF()-.+]+$/.test(this.state.data.eaPriceName)) {
	            _errorTips.eaPriceName = '';
	            _isSubmit.eaPriceName = true;
	        } else {
	            _errorTips.eaPriceName = '* 能力套餐名称不能为空';
	            _isSubmit.eaPriceName = false;
	        }
	        this.setState({ errorTips: _errorTips, isSubmit: _isSubmit });
	    };
	
	    ProductPackageAdd.prototype.handleChangeProductId = function handleChangeProductId(event) {
	        var _eT = event.srcElement ? event.srcElement : event.target;
	        var _val = _eT.value;
	        var newData = _Object$assign({}, this.state.data);
	        var _errorTips = _Object$assign({}, this.state.errorTips);
	        if (_val === '') {
	            newData.productId = '';
	            _errorTips.productId = '* 产品ID不能为空';
	        } else if (/^\d{1,10}$/.test(_val)) {
	            newData.productId = _val;
	            _errorTips.productId = '';
	        }
	        this.setState({ data: newData, errorTips: _errorTips });
	    };
	
	    ProductPackageAdd.prototype.handleBlurProductIde = function handleBlurProductIde() {
	        var _errorTips = _Object$assign({}, this.state.errorTips);
	        var _isSubmit = _Object$assign({}, this.state.isSubmit);
	        if (this.state.data.productId === '') {
	            _errorTips.productId = '* 产品ID不能为空';
	            _isSubmit.productId = false;
	        } else if (/^\d{1,10}$/.test(this.state.data.productId)) {
	            _errorTips.productId = '';
	            _isSubmit.productId = true;
	        }
	        this.setState({ errorTips: _errorTips, isSubmit: _isSubmit });
	    };
	
	    ProductPackageAdd.prototype.handleChangeValidTime = function handleChangeValidTime(event) {
	        var _eT = event.srcElement ? event.srcElement : event.target;
	        var _val = _eT.value;
	        var newData = _Object$assign({}, this.state.data);
	        var _errorTips = _Object$assign({}, this.state.errorTips);
	        var newShow = _Object$assign({}, this.state.show);
	        if (_val === '') {
	            newData.validTime.value = '';
	            _errorTips.validTime = '* 使用有效期不能为空';
	            newShow.validTimeUnit = true;
	            this.setState({ data: newData, errorTips: _errorTips, show: newShow });
	        } else if (_val === '永') {
	            newData.validTime.value = '永';
	            _errorTips.validTime = '* 使用有效期格式不正确';
	            newShow.validTimeUnit = false;
	            this.setState({ data: newData, errorTips: _errorTips, show: newShow });
	        } else if (/^[1-9]\d*$/.test(_val) || _val === '永久' || /^[a-zA-Z]*$/.test(_val)) {
	            newData.validTime.value = _val;
	            _errorTips.validTime = '';
	            if (_val === '永久') {
	                newShow.validTimeUnit = false;
	            } else {
	                newShow.validTimeUnit = true;
	            }
	            this.setState({ data: newData, errorTips: _errorTips, show: newShow });
	        }
	    };
	
	    ProductPackageAdd.prototype.handleBlurValidTime = function handleBlurValidTime() {
	        var _errorTips = _Object$assign({}, this.state.errorTips);
	        var _isSubmit = _Object$assign({}, this.state.isSubmit);
	        if (this.state.data.validTime.value === '') {
	            _errorTips.validTime = '* 使用有效期不能为空';
	            _isSubmit.validTime = false;
	        } else if (/^[1-9]\d*$/.test(this.state.data.validTime.value) || this.state.data.validTime.value === '永久') {
	            _errorTips.validTime = '';
	            _isSubmit.validTime = true;
	        } else {
	            _errorTips.validTime = '* 使用有效期格式不正确';
	            _isSubmit.validTime = false;
	        }
	        this.setState({ errorTips: _errorTips, isSubmit: _isSubmit });
	    };
	
	    ProductPackageAdd.prototype.handleChangeDescribe = function handleChangeDescribe(event) {
	        var _eT = event.srcElement ? event.srcElement : event.target;
	        var _val = _eT.value;
	        var newData = _Object$assign({}, this.state.data);
	        var _errorTips = _Object$assign({}, this.state.errorTips);
	        if (_val === '') {
	            newData.describe = '';
	            _errorTips.describe = '* 使用规则不能为空';
	        } else {
	            newData.describe = _val;
	            _errorTips.describe = '';
	        }
	        this.setState({ data: newData, errorTips: _errorTips });
	    };
	
	    ProductPackageAdd.prototype.handleBlurDescribe = function handleBlurDescribe() {
	        var _errorTips = _Object$assign({}, this.state.errorTips);
	        var _isSubmit = _Object$assign({}, this.state.isSubmit);
	        if (this.state.data.describe === '') {
	            _errorTips.describe = '* 使用规则不能为空';
	            _isSubmit.describe = false;
	        } else {
	            _errorTips.describe = '';
	            _isSubmit.describe = true;
	        }
	        this.setState({ errorTips: _errorTips, isSubmit: _isSubmit });
	    };
	
	    ProductPackageAdd.prototype.returnAmountValue = function returnAmountValue(_i, _obj) {
	        var newData = _Object$assign({}, this.state.data);
	        var _errorTips = _Object$assign({}, this.state.errorTips);
	        var _isSubmit = _Object$assign({}, this.state.isSubmit);
	        if (_obj.state.v === '') {
	            newData.eaTemplatePackageInfo[_i].amount.num = _obj.state.v;
	            _errorTips.eaTemplatePackageInfo[_i].amount = '* 规格不能为空！';
	            _isSubmit.eaTemplatePackageInfo[_i].amount = false;
	        } else {
	            newData.eaTemplatePackageInfo[_i].amount.num = _obj.state.v * 1;
	            _errorTips.eaTemplatePackageInfo[_i].amount = '';
	            _isSubmit.eaTemplatePackageInfo[_i].amount = true;
	        }
	        this.setState({ errorTips: _errorTips, isSubmit: _isSubmit, data: newData });
	    };
	
	    ProductPackageAdd.prototype.returnPriceValue = function returnPriceValue(_i, _obj) {
	        var newData = _Object$assign({}, this.state.data);
	        var _errorTips = _Object$assign({}, this.state.errorTips);
	        var _isSubmit = _Object$assign({}, this.state.isSubmit);
	        if (_obj.state.v === '') {
	            newData.eaTemplatePackageInfo[_i].price.num = _obj.state.v;
	            _errorTips.eaTemplatePackageInfo[_i].price = '* 价格不能为空！';
	            _isSubmit.eaTemplatePackageInfo[_i].price = false;
	        } else {
	            newData.eaTemplatePackageInfo[_i].price.num = _obj.state.v * 1;
	            _errorTips.eaTemplatePackageInfo[_i].price = '';
	            _isSubmit.eaTemplatePackageInfo[_i].price = true;
	        }
	        this.setState({ errorTips: _errorTips, isSubmit: _isSubmit, data: newData });
	    };
	
	    ProductPackageAdd.prototype.selectEaName = function selectEaName(_obj) {
	        if (this.state.data.eaName.v !== _obj.state.v) {
	            window.productPackagePageData.eaName.cache = _obj.state.v;
	            $.ajax({
	                url: window.productPackagePageData.eaName.actionUrl,
	                data: {
	                    'eaPriceName': this.state.data.eaPriceName,
	                    'eaId': _obj.state.v,
	                    'eaPriceId': this.state.data.eaPriceId
	                },
	                type: 'post',
	                dataType: 'json',
	                success: function (r) {
	                    var newData = _Object$assign({}, this.state.data);
	                    var _errorTips = _Object$assign({}, this.state.errorTips);
	                    if (r.resultCode === '200') {
	                        newData.eaTemplatePackage = _Object$assign({}, r.result);
	                        newData.eaName.v = window.productPackagePageData.eaName.cache;
	                    } else if (window.productPackagePageData.eaName.tipsCode[r.resultCode].showTips === 1) {
	                        window.parent.global.setTips(window.productPackagePageData.eaName.tipsCode[r.resultCode].type, window.productPackagePageData.eaName.tipsCode[r.resultCode].text);
	                    } else if (window.productPackagePageData.eaName.tipsCode[r.resultCode].showTips === 0) {
	                        _errorTips.eaName = window.productPackagePageData.eaName.tipsCode[r.resultCode].text;
	                    }
	                    this.setState({ data: newData, errorTips: _errorTips });
	                }.bind(this)
	            });
	        }
	    };
	
	    ProductPackageAdd.prototype.selectEaTemplatePackage = function selectEaTemplatePackage(_obj) {
	        if (this.state.data.eaTemplatePackage.v !== _obj.state.v) {
	            window.productPackagePageData.eaTemplatePackage.cache = _obj.state.v;
	            $.ajax({
	                url: window.productPackagePageData.eaTemplatePackage.actionUrl,
	                data: {
	                    'eaPriceName': this.state.data.eaPriceName,
	                    'eaId': this.state.data.eaName.v,
	                    'eaPriceId': this.state.data.eaPriceId,
	                    'eaTemplateId': _obj.state.v
	                },
	                type: 'post',
	                dataType: 'json',
	                success: function (r) {
	                    var newData = _Object$assign({}, this.state.data);
	                    var _errorTips = _Object$assign({}, this.state.errorTips);
	                    var _show = _Object$assign({}, this.state.show);
	                    var _unit = _Object$assign({}, this.state.unit);
	                    if (r.resultCode === '200') {
	                        newData.eaTemplatePackageInfo = _Object$assign([], r.result.eaTemplatePackageInfo);
	                        newData.ladderPrice = _Object$assign([], r.result.ladderPrice);
	                        newData.eaTemplatePackage.v = window.productPackagePageData.eaTemplatePackage.cache;
	                        _show.ladderPrice = r.result.isShowLadder;
	                        _unit.ladderPrice = r.result.ladderUnit;
	                        _errorTips.eaTemplatePackageInfo = [];
	                        for (var i = 0; i < r.result.eaTemplatePackageInfo.length; i++) {
	                            _errorTips.eaTemplatePackageInfo.push({ price: '', amount: '' });
	                        }
	                    } else if (window.productPackagePageData.eaTemplatePackage.tipsCode[r.resultCode].showTips === 1) {
	                        window.parent.global.setTips(window.productPackagePageData.eaTemplatePackage.tipsCode[r.resultCode].type, window.productPackagePageData.eaTemplatePackage.tipsCode[r.resultCode].text);
	                    } else if (window.productPackagePageData.eaTemplatePackage.tipsCode[r.resultCode].showTips === 0) {
	                        _errorTips.eaTemplatePackage = window.productPackagePageData.eaTemplatePackage.tipsCode[r.resultCode].text;
	                    }
	                    this.setState({ data: newData, errorTips: _errorTips, show: _show, unit: _unit });
	                }.bind(this)
	            });
	        }
	    };
	
	    ProductPackageAdd.prototype.selectValidTimeUnit = function selectValidTimeUnit(_obj) {
	        var newData = _Object$assign({}, this.state.data);
	        if (newData.validTime.unit.v !== _obj.state.v) {
	            newData.validTime.unit.v = _obj.state.v;
	            this.setState({ data: newData });
	        }
	    };
	
	    ProductPackageAdd.prototype.checkUserSource = function checkUserSource(_i) {
	        var newData = _Object$assign({}, this.state.data);
	        var _errorTips = _Object$assign({}, this.state.errorTips);
	        var _isSubmit = _Object$assign({}, this.state.isSubmit);
	        if (newData.userSource[_i].check === 0) {
	            newData.userSource[_i].check = 1;
	        } else {
	            newData.userSource[_i].check = 0;
	        }
	        var isErrorTips = true;
	        for (var i = 0; i < newData.userSource.length; i++) {
	            if (newData.userSource[i].check === 1) {
	                isErrorTips = false;
	                break;
	            }
	        }
	        if (isErrorTips) {
	            _isSubmit.userSource = false;
	            _errorTips.userSource = '* 可见用户来源不能为空';
	        } else {
	            _errorTips.userSource = '';
	            _isSubmit.userSource = true;
	        }
	        this.setState({ data: newData, errorTips: _errorTips, isSubmit: _isSubmit });
	    };
	
	    ProductPackageAdd.prototype.checkUserLevel = function checkUserLevel(_i) {
	        var newData = _Object$assign({}, this.state.data);
	        var _errorTips = _Object$assign({}, this.state.errorTips);
	        var _isSubmit = _Object$assign({}, this.state.isSubmit);
	        if (newData.userLevel[_i].check === 0) {
	            newData.userLevel[_i].check = 1;
	        } else {
	            newData.userLevel[_i].check = 0;
	        }
	        var isErrorTips = true;
	        for (var i = 0; i < newData.userLevel.length; i++) {
	            if (newData.userLevel[i].check === 1) {
	                isErrorTips = false;
	                break;
	            }
	        }
	        if (isErrorTips) {
	            _errorTips.userLevel = '* 可见用户等级不能为空';
	            _isSubmit.userLevel = false;
	        } else {
	            _errorTips.userLevel = '';
	            _isSubmit.userLevel = true;
	        }
	        this.setState({ data: newData, errorTips: _errorTips, isSubmit: _isSubmit });
	    };
	
	    ProductPackageAdd.prototype.checkRadioItem = function checkRadioItem(_i) {
	        var newData = _Object$assign({}, this.state.data);
	        this.state.isVisibleList.map(function (item, i) {
	            if (_i === i) {
	                item.check = 1;
	                newData.isVisible = item.value;
	            } else {
	                item.check = 0;
	            }
	        });
	        this.setState({ data: newData });
	    };
	
	    ProductPackageAdd.prototype.returnLadderPriceAmountValue = function returnLadderPriceAmountValue(_i, _obj) {
	        var newData = _Object$assign({}, this.state.data);
	        if (_obj.state.v !== '' && !(_i > 0 && _obj.state.v < newData.ladderPrice[_i - 1].amount)) {
	            newData.ladderPrice[_i].amount = _obj.state.v * 1;
	        }
	        if (newData.ladderPrice.length - 1 > _i && newData.ladderPrice[_i + 1].amount <= _obj.state.v) {
	            for (var i = _i + 1; i < newData.ladderPrice.length; i++) {
	                if (newData.ladderPrice[i - 1].price * 100 > 1) {
	                    newData.ladderPrice[i].amount = newData.ladderPrice[i - 1].amount + 1;
	                    newData.ladderPrice[i].price = Math.round(newData.ladderPrice[i - 1].price * 100 - 1) / 100;
	                } else {
	                    newData.ladderPrice.splice(i, 1);
	                }
	            }
	        }
	        this.setState({ data: newData });
	    };
	
	    ProductPackageAdd.prototype.returnLadderPricePriceValue = function returnLadderPricePriceValue(_i, _obj) {
	        var newData = _Object$assign({}, this.state.data);
	        if (_obj.state.v !== '' && !(_i === 0 && _obj.state.v * 1 < 0.02) && !(_i > 0 && _obj.state.v > newData.ladderPrice[_i - 1].price)) {
	            newData.ladderPrice[_i].price = _obj.state.v * 1;
	        }
	        if (newData.ladderPrice.length - 1 > _i && newData.ladderPrice[_i + 1].price * 1 >= _obj.state.v * 1) {
	            for (var i = _i + 1; i < newData.ladderPrice.length; i++) {
	                if (newData.ladderPrice[i - 1].price * 100 > 1) {
	                    newData.ladderPrice[i].amount = newData.ladderPrice[i - 1].amount + 1;
	                    newData.ladderPrice[i].price = Math.round(newData.ladderPrice[i - 1].price * 100 - 1) / 100;
	                } else {
	                    var length = newData.ladderPrice.length - i;
	                    newData.ladderPrice.splice(i, length);
	                }
	            }
	        }
	        this.setState({ data: newData });
	    };
	
	    ProductPackageAdd.prototype.ladderPriceAddItem = function ladderPriceAddItem() {
	        var newData = _Object$assign({}, this.state.data);
	        var newItem = { amount: newData.ladderPrice[newData.ladderPrice.length - 1].amount + 1, price: Math.round(newData.ladderPrice[newData.ladderPrice.length - 1].price * 100 - 1) / 100 };
	        if (newItem.price > 0) {
	            newData.ladderPrice.push(newItem);
	            this.setState({ data: newData });
	        }
	    };
	
	    ProductPackageAdd.prototype.ladderPriceDelItem = function ladderPriceDelItem(_i) {
	        var newData = _Object$assign({}, this.state.data);
	        if (_i === newData.ladderPrice.length - 1) {
	            newData.ladderPrice.splice(_i, 1);
	            newData.ladderPrice[newData.ladderPrice.length - 1].amount = newData.ladderPrice[newData.ladderPrice.length - 2].amount + 1;
	        }
	        this.setState({ data: newData });
	    };
	
	    ProductPackageAdd.prototype.returnLadderPriceAmountValueNew = function returnLadderPriceAmountValueNew(_i, _obj) {
	        var _errorTips = _Object$assign({}, this.state.errorTips);
	        var newData = _Object$assign({}, this.state.data);
	        var newLadderPrice = [].concat(_toConsumableArray(this.state.ladderPrice));
	        if (_obj.state.v !== '') {
	            newLadderPrice[_i].amount = _obj.state.v * 1;
	            newLadderPrice[_i + 1].amount = _obj.state.v + 1;
	        }
	        var isLadderPrice = true;
	        newLadderPrice.map(function (item) {
	            if (item.amount === '' || item.price === '') {
	                isLadderPrice = false;
	            }
	        });
	        if (isLadderPrice) {
	            newData.ladderPrice = [].concat(_toConsumableArray(newLadderPrice));
	            _errorTips.ladderPrice = '';
	        }
	        this.setState({ ladderPrice: newLadderPrice, data: newData, errorTips: _errorTips });
	    };
	
	    ProductPackageAdd.prototype.returnLadderPricePriceValueNew = function returnLadderPricePriceValueNew(_i, _obj) {
	        var _errorTips = _Object$assign({}, this.state.errorTips);
	        var newData = _Object$assign({}, this.state.data);
	        var newLadderPrice = [].concat(_toConsumableArray(this.state.ladderPrice));
	        if (_obj.state.v !== '') {
	            if (_i === 0 && _obj.state.v * 100 < 2) {
	                newLadderPrice[0].price = 0.02;
	                newLadderPrice[1].price = 0.01;
	            } else if (_i === 0) {
	                newLadderPrice[0].price = _obj.state.v * 1;
	                newLadderPrice[1].price = Math.round(_obj.state.v * 100 - 1) / 100;
	            } else if (_i === 1 && _obj.state.v * 100 < 1) {
	                newLadderPrice[1].price = 0.01;
	            } else if (_i === 1) {
	                newLadderPrice[1].price = _obj.state.v * 1;
	            }
	        }
	        var isLadderPrice = true;
	        newLadderPrice.map(function (item) {
	            if (item.amount === '' || item.price === '') {
	                isLadderPrice = false;
	            }
	        });
	        if (isLadderPrice) {
	            newData.ladderPrice = [].concat(_toConsumableArray(newLadderPrice));
	            _errorTips.ladderPrice = '';
	        }
	        this.setState({ ladderPrice: newLadderPrice, data: newData, errorTips: _errorTips });
	    };
	
	    ProductPackageAdd.prototype.ladderPriceAddItemNew = function ladderPriceAddItemNew() {
	        var _errorTips = _Object$assign({}, this.state.errorTips);
	        var newLadderPrice = [].concat(_toConsumableArray(this.state.ladderPrice));
	        var isLadderPrice = true;
	        newLadderPrice.map(function (item) {
	            if (item.amount === '' || item.price === '') {
	                isLadderPrice = false;
	            }
	        });
	        if (!isLadderPrice) {
	            _errorTips.ladderPrice = '* 阶梯计费详情不能为空';
	        }
	        this.setState({ errorTips: _errorTips });
	    };
	
	    ProductPackageAdd.prototype.render = function render() {
	        var _this3 = this;
	
	        return React.createElement(
	            'div',
	            { className: 'productPackageArea' },
	            this.state.data.type ? React.createElement(
	                'div',
	                { className: 'item fl' },
	                '\u80FD\u529B\u5957\u9910ID\uFF1A',
	                this.state.data.eaPriceId
	            ) : '',
	            React.createElement(
	                'div',
	                { className: 'item fl' },
	                React.createElement(
	                    'span',
	                    null,
	                    '\u80FD\u529B\u5957\u9910\u540D\u79F0\uFF1A'
	                ),
	                React.createElement('input', {
	                    type: 'text',
	                    className: 'inputBtn long',
	                    value: this.state.data.eaPriceName,
	                    maxLength: window.productPackagePageData.eaPriceName.maxLength,
	                    placeholder: window.productPackagePageData.eaPriceName.placeholder,
	                    onChange: this.handleChangeEaPriceName,
	                    onBlur: this.handleBlurEaPriceName
	                }),
	                React.createElement(
	                    'div',
	                    { className: 'errorTips' },
	                    this.state.errorTips.eaPriceName
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'item fl' },
	                React.createElement(
	                    'span',
	                    null,
	                    '\u6240\u5C5E\u80FD\u529B\uFF1A'
	                ),
	                React.createElement(UIDropDown, { className: 'inputBtn', v: this.state.data.eaName.v, a: this.state.data.eaName.a, returnValue: this.selectEaName }),
	                React.createElement(
	                    'div',
	                    { className: 'errorTips' },
	                    this.state.errorTips.eaName
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'item fl' },
	                React.createElement(
	                    'span',
	                    null,
	                    '\u80FD\u529B\u5957\u9910\u6A21\u677F\uFF1A'
	                ),
	                React.createElement(UIDropDown, { className: 'inputBtn', v: this.state.data.eaTemplatePackage.v, a: this.state.data.eaTemplatePackage.a, returnValue: this.selectEaTemplatePackage }),
	                React.createElement(
	                    'div',
	                    { className: 'errorTips' },
	                    this.state.errorTips.eaTemplatePackage
	                )
	            ),
	            this.state.data.eaTemplatePackageInfo.length ? React.createElement(
	                'div',
	                { className: 'item fl all' },
	                React.createElement(
	                    Table,
	                    { hover: true, responsive: true, bordered: true, className: 'eaTemplatePackageInfo fl all' },
	                    React.createElement(
	                        'thead',
	                        null,
	                        React.createElement(
	                            'tr',
	                            null,
	                            React.createElement(
	                                'th',
	                                null,
	                                React.createElement(
	                                    'div',
	                                    { className: 'th0' },
	                                    '\u8BA1\u8D39\u70B9\u540D\u79F0'
	                                )
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                React.createElement(
	                                    'div',
	                                    { className: 'th1' },
	                                    '\u8BA1\u8D39\u7C7B\u578B'
	                                )
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                React.createElement(
	                                    'div',
	                                    { className: 'th2' },
	                                    '\u8BA1\u8D39\u65B9\u5F0F'
	                                )
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                React.createElement(
	                                    'div',
	                                    { className: 'th3' },
	                                    '\u89C4\u683C'
	                                )
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                React.createElement(
	                                    'div',
	                                    { className: 'th4' },
	                                    '\u4EF7\u683C'
	                                )
	                            )
	                        )
	                    ),
	                    this.state.data.eaTemplatePackageInfo.length ? React.createElement(
	                        'tbody',
	                        null,
	                        this.state.data.eaTemplatePackageInfo.map(function (item, i) {
	                            return React.createElement(
	                                'tr',
	                                { key: i },
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    React.createElement(
	                                        'div',
	                                        { className: 'th0' },
	                                        item.pointTypeName
	                                    )
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    React.createElement(
	                                        'div',
	                                        { className: 'th1' },
	                                        item.feeType
	                                    )
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    React.createElement(
	                                        'div',
	                                        { className: 'th0' },
	                                        item.feeMode
	                                    )
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    item.amount.type === 1 ? React.createElement(
	                                        'div',
	                                        { className: 'th3' },
	                                        React.createElement(UIInput, { type: 'positiveInt', className: 'inputBtn small', maxValue: window.productPackagePageData.amount.maxValue, maxLength: window.productPackagePageData.amount.maxLength, placeholder: window.productPackagePageData.amount.placeholder, v: item.amount.num, onBlur: _this3.returnAmountValue.bind(_this3, i) }),
	                                        React.createElement(
	                                            'span',
	                                            null,
	                                            item.amount.unit
	                                        ),
	                                        React.createElement(
	                                            'div',
	                                            { className: 'errorTips' },
	                                            _this3.state.errorTips.eaTemplatePackageInfo[i].amount
	                                        )
	                                    ) : item.amount.type === 0 ? React.createElement(
	                                        'div',
	                                        { className: 'th3' },
	                                        React.createElement(
	                                            'span',
	                                            null,
	                                            item.amount.num + item.amount.unit
	                                        )
	                                    ) : React.createElement(
	                                        'div',
	                                        { className: 'th3' },
	                                        React.createElement(
	                                            'span',
	                                            null,
	                                            '--'
	                                        )
	                                    )
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    item.price.type === 1 ? React.createElement(
	                                        'div',
	                                        { className: 'th4' },
	                                        React.createElement(UIInput, { type: 'money', className: 'inputBtn small', maxValue: window.productPackagePageData.price.maxValue, maxLength: window.productPackagePageData.price.maxLength, placeholder: window.productPackagePageData.price.placeholder, v: typeof item.price.num === 'number' ? item.price.num.toFixed(2) : item.price.num, onBlur: _this3.returnPriceValue.bind(_this3, i) }),
	                                        React.createElement(
	                                            'span',
	                                            null,
	                                            item.price.unit
	                                        ),
	                                        React.createElement(
	                                            'div',
	                                            { className: 'errorTips' },
	                                            _this3.state.errorTips.eaTemplatePackageInfo[i].price
	                                        )
	                                    ) : item.price.type === 0 ? React.createElement(
	                                        'div',
	                                        { className: 'th4' },
	                                        React.createElement(
	                                            'span',
	                                            null,
	                                            item.price.num + item.price.unit
	                                        )
	                                    ) : React.createElement(
	                                        'div',
	                                        { className: 'th4' },
	                                        React.createElement(
	                                            'span',
	                                            null,
	                                            '--'
	                                        )
	                                    )
	                                )
	                            );
	                        }, this)
	                    ) : ''
	                )
	            ) : '',
	            this.state.show.ladderPrice ? React.createElement(
	                'div',
	                { className: 'item fl all' },
	                React.createElement(
	                    'span',
	                    { className: 'fl' },
	                    '\u9636\u68AF\u8BA1\u8D39\u8BE6\u60C5\uFF1A'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'errorTips ladderPrice' },
	                    this.state.errorTips.ladderPrice
	                ),
	                React.createElement(
	                    Table,
	                    { hover: true, responsive: true, bordered: true, className: 'ladderPriceList fl all' },
	                    React.createElement(
	                        'thead',
	                        null,
	                        React.createElement(
	                            'tr',
	                            null,
	                            React.createElement(
	                                'th',
	                                null,
	                                React.createElement(
	                                    'div',
	                                    { className: 'th0' },
	                                    '\u8BA1\u8D39\u6570\u91CF'
	                                )
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                React.createElement(
	                                    'div',
	                                    { className: 'th1' },
	                                    '\u5355\u4EF7\uFF08',
	                                    this.state.unit.ladderPrice,
	                                    '\uFF09'
	                                )
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                React.createElement(
	                                    'div',
	                                    { className: 'th2' },
	                                    '\u64CD\u4F5C'
	                                )
	                            )
	                        )
	                    ),
	                    this.state.data.ladderPrice.length > 1 ? React.createElement(
	                        'tbody',
	                        null,
	                        this.state.data.ladderPrice.map(function (item, i) {
	                            return i === _this3.state.data.ladderPrice.length - 1 ? React.createElement(
	                                'tr',
	                                { key: i },
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        item.amount,
	                                        ' \u4EE5\u4E0A '
	                                    )
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    React.createElement(UIInput, { type: 'money', className: 'inputBtn small', maxValue: window.productPackagePageData.ladderPrice.price.maxValue, maxLength: window.productPackagePageData.ladderPrice.price.maxLength, placeholder: window.productPackagePageData.ladderPrice.price.placeholder, v: typeof item.price === 'number' ? item.price.toFixed(2) : item.price, onBlur: _this3.returnLadderPricePriceValue.bind(_this3, i) })
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    i < window.productPackagePageData.ladderPrice.maxItem ? React.createElement(
	                                        'div',
	                                        { className: 'th2' },
	                                        i > 1 ? React.createElement(Glyphicon, { glyph: 'remove', onClick: _this3.ladderPriceDelItem.bind(_this3, i) }) : '',
	                                        React.createElement(Glyphicon, { glyph: 'plus', onClick: _this3.ladderPriceAddItem })
	                                    ) : React.createElement(
	                                        'div',
	                                        { className: 'th2' },
	                                        React.createElement(Glyphicon, { glyph: 'remove', onClick: _this3.ladderPriceDelItem.bind(_this3, i) })
	                                    )
	                                )
	                            ) : React.createElement(
	                                'tr',
	                                { key: i },
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    i === 0 ? React.createElement(
	                                        'span',
	                                        null,
	                                        '0 \u81F3 '
	                                    ) : React.createElement(
	                                        'span',
	                                        null,
	                                        _this3.state.data.ladderPrice[i - 1].amount + 1,
	                                        ' \u81F3 '
	                                    ),
	                                    React.createElement(UIInput, { type: 'positiveInt', className: 'inputBtn small', maxValue: window.productPackagePageData.ladderPrice.amount.maxValue, maxLength: window.productPackagePageData.ladderPrice.amount.maxLength, placeholder: window.productPackagePageData.ladderPrice.amount.placeholder, v: item.amount, onBlur: _this3.returnLadderPriceAmountValue.bind(_this3, i) })
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    React.createElement(UIInput, { type: 'money', className: 'inputBtn small', maxValue: window.productPackagePageData.ladderPrice.price.maxValue, maxLength: window.productPackagePageData.ladderPrice.price.maxLength, placeholder: window.productPackagePageData.ladderPrice.price.placeholder, v: typeof item.price === 'number' ? item.price.toFixed(2) : item.price, onBlur: _this3.returnLadderPricePriceValue.bind(_this3, i) })
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    React.createElement('div', { className: 'th2' })
	                                )
	                            );
	                        }, this)
	                    ) : React.createElement(
	                        'tbody',
	                        null,
	                        React.createElement(
	                            'tr',
	                            { key: 0 },
	                            React.createElement(
	                                'td',
	                                null,
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '0 \u81F3 '
	                                ),
	                                React.createElement(UIInput, { type: 'positiveInt', className: 'inputBtn small', v: this.state.ladderPrice[0].amount, maxValue: window.productPackagePageData.ladderPrice.amount.maxValue, maxLength: window.productPackagePageData.ladderPrice.amount.maxLength, placeholder: window.productPackagePageData.ladderPrice.amount.placeholder, onBlur: this.returnLadderPriceAmountValueNew.bind(this, 0) })
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                React.createElement(UIInput, { type: 'money', className: 'inputBtn small', v: typeof this.state.ladderPrice[0].price === 'number' ? this.state.ladderPrice[0].price.toFixed(2) : this.state.ladderPrice[0].price, maxValue: window.productPackagePageData.ladderPrice.price.maxValue, maxLength: window.productPackagePageData.ladderPrice.price.maxLength, placeholder: window.productPackagePageData.ladderPrice.price.placeholder, onBlur: this.returnLadderPricePriceValueNew.bind(this, 0) })
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                React.createElement('div', { className: 'th2' })
	                            )
	                        ),
	                        React.createElement(
	                            'tr',
	                            { key: 1 },
	                            React.createElement(
	                                'td',
	                                null,
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    this.state.ladderPrice[0].amount === '' ? 'xxx' : this.state.ladderPrice[0].amount + 1,
	                                    ' \u4EE5\u4E0A '
	                                )
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                React.createElement(UIInput, { type: 'money', className: 'inputBtn small', v: typeof this.state.ladderPrice[1].price === 'number' ? this.state.ladderPrice[1].price.toFixed(2) : this.state.ladderPrice[1].price, maxValue: window.productPackagePageData.ladderPrice.price.maxValue, maxLength: window.productPackagePageData.ladderPrice.price.maxLength, placeholder: window.productPackagePageData.ladderPrice.price.placeholder, onBlur: this.returnLadderPricePriceValueNew.bind(this, 1) })
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                React.createElement(
	                                    'div',
	                                    { className: 'th2' },
	                                    React.createElement(Glyphicon, { glyph: 'plus', onClick: this.ladderPriceAddItemNew })
	                                )
	                            )
	                        )
	                    )
	                )
	            ) : '',
	            this.state.show.productId ? React.createElement(
	                'div',
	                { className: 'item fl' },
	                React.createElement(
	                    'span',
	                    null,
	                    '\u4EA7\u54C1ID\uFF1A'
	                ),
	                React.createElement('input', {
	                    type: 'text',
	                    className: 'inputBtn',
	                    value: this.state.data.productId,
	                    maxLength: window.productPackagePageData.productId.maxLength,
	                    placeholder: window.productPackagePageData.productId.placeholder,
	                    onChange: this.handleChangeProductId,
	                    onBlur: this.handleBlurProductIde
	                }),
	                React.createElement(
	                    'div',
	                    { className: 'errorTips' },
	                    this.state.errorTips.productId
	                )
	            ) : '',
	            React.createElement(
	                'div',
	                { className: 'item fl' },
	                React.createElement(
	                    'span',
	                    null,
	                    '\u4F7F\u7528\u6709\u6548\u671F\uFF1A'
	                ),
	                React.createElement('input', {
	                    type: 'text',
	                    className: 'inputBtn small',
	                    value: this.state.data.validTime.value,
	                    maxLength: window.productPackagePageData.validTime.maxLength,
	                    placeholder: window.productPackagePageData.validTime.placeholder,
	                    onChange: this.handleChangeValidTime,
	                    onBlur: this.handleBlurValidTime
	                }),
	                this.state.show.validTimeUnit ? React.createElement(UIDropDown, { className: 'inputBtn small', v: this.state.data.validTime.unit.v, a: this.state.data.validTime.unit.a, returnValue: this.selectValidTimeUnit }) : '',
	                React.createElement(
	                    'div',
	                    { className: 'underTips' },
	                    window.productPackagePageData.validTime.underTips
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'errorTips' },
	                    this.state.errorTips.validTime
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'item fl all' },
	                React.createElement(
	                    'span',
	                    { className: 'fl' },
	                    '\u53EF\u89C1\u7528\u6237\u6765\u6E90\uFF1A'
	                ),
	                React.createElement(
	                    'ul',
	                    null,
	                    this.state.data.userSource.map(function (item, i) {
	                        return React.createElement(
	                            'li',
	                            { key: i, className: 'fl' },
	                            React.createElement(UICheckBox, { s: item.check ? true : false, v: item.text, onClick: _this3.checkUserSource.bind(_this3, i) }),
	                            React.createElement(
	                                'span',
	                                null,
	                                item.text
	                            )
	                        );
	                    })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'errorTips' },
	                    this.state.errorTips.userSource
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'item fl all' },
	                React.createElement(
	                    'span',
	                    { className: 'fl' },
	                    '\u53EF\u89C1\u7528\u6237\u7B49\u7EA7\uFF1A'
	                ),
	                React.createElement(
	                    'ul',
	                    null,
	                    this.state.data.userLevel.map(function (item, i) {
	                        return React.createElement(
	                            'li',
	                            { key: i, className: 'fl' },
	                            React.createElement(UICheckBox, { s: item.check ? true : false, v: item.text, onClick: _this3.checkUserLevel.bind(_this3, i) }),
	                            React.createElement(
	                                'span',
	                                null,
	                                item.text
	                            )
	                        );
	                    })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'errorTips' },
	                    this.state.errorTips.userLevel
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'item fl all' },
	                React.createElement(
	                    'span',
	                    { className: 'fl' },
	                    '\u95E8\u6237\u662F\u5426\u53EF\u89C1\uFF1A'
	                ),
	                React.createElement(
	                    'ul',
	                    { className: 'fl' },
	                    this.state.isVisibleList.map(function (item, i) {
	                        return React.createElement(
	                            'li',
	                            { key: i, className: 'fl' },
	                            React.createElement(UIRadioBtn, { s: item.check === 1 ? true : false, onClick: _this3.checkRadioItem.bind(_this3, i) }),
	                            React.createElement(
	                                'span',
	                                null,
	                                item.text
	                            )
	                        );
	                    })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'errorTips' },
	                    this.state.errorTips.isVisible
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'item fl all' },
	                React.createElement(
	                    'span',
	                    { className: 'fl' },
	                    '\u4F7F\u7528\u89C4\u5219\uFF1A'
	                ),
	                React.createElement('textarea', { className: 'fl all', maxLength: window.productPackagePageData.describe.maxLength, placeholder: window.productPackagePageData.describe.placeholder, onChange: this.handleChangeDescribe, onBlur: this.handleBlurDescribe, value: this.state.data.describe }),
	                React.createElement(
	                    'div',
	                    { className: 'errorTips' },
	                    this.state.errorTips.describe
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'item fl all' },
	                React.createElement(
	                    'div',
	                    { className: 'greenBtn fl', onClick: this.submit },
	                    this.state.data.type ? '修改' : '新增'
	                )
	            )
	        );
	    };
	
	    return ProductPackageAdd;
	}(React.Component);
	
	ReactDOM.render(React.createElement(ProductPackageAdd, { data: JSON.parse($('#packageData').val()) }), document.getElementById('app'));

/***/ })

});