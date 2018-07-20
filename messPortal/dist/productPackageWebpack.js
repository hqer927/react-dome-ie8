webpackJsonp([0,2],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _toConsumableArray = __webpack_require__(2)['default'];
	
	var _JSON$stringify = __webpack_require__(56)['default'];
	
	var _Object$assign = __webpack_require__(58)['default'];
	
	var _classCallCheck = __webpack_require__(64)['default'];
	
	var _possibleConstructorReturn = __webpack_require__(65)['default'];
	
	var _inherits = __webpack_require__(87)['default'];
	
	/**
	 * Created by hqer on 2017/11/24.
	 */
	var React = __webpack_require__(95);
	var ReactDOM = __webpack_require__(247);
	var $ = __webpack_require__(248);
	var Table = __webpack_require__(249).Table;
	var Glyphicon = __webpack_require__(249).Glyphicon;
	
	var UICheckBox = __webpack_require__(422);
	var UIRadioBtn = __webpack_require__(423);
	var UIInput = __webpack_require__(424);
	var UIDropDown = __webpack_require__(425);
	
	var ProductPackageAdd = function (_React$Component) {
	    _inherits(ProductPackageAdd, _React$Component);
	
	    function ProductPackageAdd(props) {
	        _classCallCheck(this, ProductPackageAdd);
	
	        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
	
	        _this.state = {
	            data: JSON.parse($('#packageData').val()),
	            isUseRule: false,
	            feeModesList: [],
	            isVisibleList: [{ check: 1, text: '是', value: 1 }, { check: 0, text: '否', value: 0 }],
	            ladderPrice: [{ amount: '', price: '' }, { amount: '', price: '' }],
	            show: {
	                validTimeUnit: true,
	                productId: false,
	                amount: false,
	                price: false,
	                ladderPrice: false
	            },
	            unit: {
	                amount: '',
	                price: '',
	                ladderPrice: ''
	            },
	            errorTips: {
	                eaPriceName: '',
	                eaName: '',
	                productId: '',
	                feeTypes: '',
	                feeModes: '',
	                validTime: '',
	                price: '',
	                amount: '',
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
	                amount: false,
	                price: false
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
	        _this.selectFeeTypes = _this.selectFeeTypes.bind(_this);
	        _this.selectFeeModes = _this.selectFeeModes.bind(_this);
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
	        if (_show.price && !_isSubmit.price) {
	            _isOk = false;
	            if (_errorTips.price === '' && this.state.data.price === '') {
	                _errorTips.price = '* 价格不能为空';
	            } else if (_errorTips.price === '' && this.state.data.price * 1 < 0) {
	                _errorTips.price = '* 价格不能为负';
	            }
	        }
	        if (_show.amount && !_isSubmit.amount) {
	            _isOk = false;
	            if (_errorTips.amount === '' && this.state.data.amount === '') {
	                _errorTips.amount = '* 规格不能为空';
	            }
	        }
	        if (this.state.data.eaName.v === '') {
	            _isOk = false;
	            _errorTips.eaName = '* 所属能力不能为空';
	        }
	        if (this.state.data.feeTypes.v === '') {
	            _isOk = false;
	            _errorTips.feeTypes = '* 计费类型不能为空';
	        }
	        if (this.state.data.feeModes.v === '') {
	            _isOk = false;
	            _errorTips.feeModes = '* 计费方式不能为空';
	        }
	        if (_show.ladderPrice && this.state.data.ladderPrice.length < 2) {
	            _isOk = false;
	            _errorTips.ladderPrice = '* 阶梯计费详情不能为空';
	        } else {
	            _errorTips.ladderPrice = '';
	        }
	        if (_isOk) {
	            $.ajax({
	                url: productPackagePageData.eaPriceName.actionUrl,
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
	        var _feeModesList = [];
	
	        var _loop = function _loop(i) {
	            if (newData.eaName.v === productPackagePageData.feeModes.listRule[i].eaName) {
	                newData.feeModes.a.map(function (item) {
	                    if (productPackagePageData.feeModes.listRule[i].result.find(function (n) {
	                        return n === item.v;
	                    })) {
	                        _feeModesList.push(item);
	                    }
	                });
	                return 'break';
	            }
	        };
	
	        for (var i = 0; i < productPackagePageData.feeModes.listRule.length; i++) {
	            var _ret = _loop(i);
	
	            if (_ret === 'break') break;
	        }
	        var isChangeFeeModes = true;
	        if (_feeModesList.find(function (n) {
	            return n.v === newData.feeModes.v;
	        })) {
	            isChangeFeeModes = false;
	        }
	        if (isChangeFeeModes) {
	            newData.feeModes.v = _feeModesList[0].v;
	        }
	        var newShow = {
	            validTimeUnit: true,
	            productId: false,
	            amount: false,
	            price: false,
	            ladderPrice: false
	        };
	        for (var i = 0; i < productPackagePageData.productId.showRule.length; i++) {
	            if (newData.eaName.v === productPackagePageData.productId.showRule[i].eaName) {
	                newShow.productId = productPackagePageData.productId.showRule[i].result;
	                break;
	            }
	        }
	        for (var _i2 = 0; _i2 < productPackagePageData.amount.showRule.length; _i2++) {
	            if (newData.feeTypes.v === productPackagePageData.amount.showRule[_i2].feeTypes) {
	                newShow.amount = productPackagePageData.amount.showRule[_i2].result;
	                break;
	            }
	        }
	        for (var _i3 = 0; _i3 < productPackagePageData.price.showRule.length; _i3++) {
	            if (newData.feeTypes.v === productPackagePageData.price.showRule[_i3].feeTypes) {
	                newShow.price = productPackagePageData.price.showRule[_i3].result;
	                break;
	            }
	        }
	        for (var _i4 = 0; _i4 < productPackagePageData.ladderPrice.showRule.length; _i4++) {
	            if (newData.feeTypes.v === productPackagePageData.ladderPrice.showRule[_i4].feeTypes) {
	                newShow.ladderPrice = productPackagePageData.ladderPrice.showRule[_i4].result;
	                break;
	            }
	        }
	        var newUnit = {
	            amount: '',
	            price: '',
	            ladderPrice: ''
	        };
	        for (var _i5 = 0; _i5 < productPackagePageData.amount.unitRule.length; _i5++) {
	            if (newData.feeTypes.v === productPackagePageData.amount.unitRule[_i5].feeTypes && newData.feeModes.v === productPackagePageData.amount.unitRule[_i5].feeModes) {
	                newUnit.amount = productPackagePageData.amount.unitRule[_i5].result;
	                break;
	            }
	        }
	        for (var _i6 = 0; _i6 < productPackagePageData.price.unitRule.length; _i6++) {
	            if (newData.feeTypes.v === productPackagePageData.price.unitRule[_i6].feeTypes && newData.feeModes.v === productPackagePageData.price.unitRule[_i6].feeModes) {
	                newUnit.price = productPackagePageData.price.unitRule[_i6].result;
	                break;
	            }
	        }
	        for (var _i7 = 0; _i7 < productPackagePageData.ladderPrice.unitRule.length; _i7++) {
	            if (newData.feeTypes.v === productPackagePageData.ladderPrice.unitRule[_i7].feeTypes && newData.feeModes.v === productPackagePageData.ladderPrice.unitRule[_i7].feeModes) {
	                newUnit.ladderPrice = productPackagePageData.ladderPrice.unitRule[_i7].result;
	                break;
	            }
	        }
	        this.setState({ data: newData, feeModesList: _feeModesList, show: newShow, unit: newUnit, isUseRule: false });
	    };
	
	    ProductPackageAdd.prototype.componentWillMount = function componentWillMount() {
	        var _this2 = this;
	
	        this.rule(this.state.data);
	        var _isSubmit = _Object$assign({}, this.state.isSubmit);
	        var _isVisibleList = [].concat(_toConsumableArray(this.state.isVisibleList));
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
	        if (this.state.data.price != '') {
	            _isSubmit.price = true;
	        }
	        if (this.state.data.amount != '') {
	            _isSubmit.amount = true;
	        }
	        if (this.state.data.productId != '') {
	            _isSubmit.productId = true;
	        }
	        if (this.state.data.ladderPrice.length > 1) {
	            _isSubmit.ladderPrice = true;
	        }
	        this.setState({ isSubmit: _isSubmit, isVisibleList: _isVisibleList });
	    };
	
	    ProductPackageAdd.prototype.shouldComponentUpdate = function shouldComponentUpdate(newProps, newState) {
	        if (newState.isUseRule) {
	            this.rule(newState.data);
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
	        /*        if (prevState.isSubmit != this.state.isSubmit) {
	            if (this.state.isSubmit) {
	                $('#submit').removeClass('disabled');
	            } else {
	                $('#submit').addClass('disabled');
	            }
	        }*/
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
	
	    ProductPackageAdd.prototype.returnPriceValue = function returnPriceValue(_obj) {
	        var newData = _Object$assign({}, this.state.data);
	        var _errorTips = _Object$assign({}, this.state.errorTips);
	        var _isSubmit = _Object$assign({}, this.state.isSubmit);
	        if (_obj.state.v === '') {
	            newData.price = '';
	            _errorTips.price = '* 价格不能为空';
	            _isSubmit.price = false;
	        } else if (_obj.state.v * 1 < 0) {
	            newData.price = _obj.state.v * 1;
	            _errorTips.price = '* 价格不能为负';
	            _isSubmit.price = false;
	        } else {
	            newData.price = _obj.state.v * 1;
	            _errorTips.price = '';
	            _isSubmit.price = true;
	        }
	        this.setState({ data: newData, errorTips: _errorTips, isSubmit: _isSubmit });
	    };
	
	    ProductPackageAdd.prototype.returnAmountValue = function returnAmountValue(_obj) {
	        var newData = _Object$assign({}, this.state.data);
	        var _errorTips = _Object$assign({}, this.state.errorTips);
	        var _isSubmit = _Object$assign({}, this.state.isSubmit);
	        if (_obj.state.v === '') {
	            newData.amount = '';
	            _errorTips.amount = '* 规格不能为空';
	            _isSubmit.amount = false;
	        } else {
	            newData.amount = _obj.state.v;
	            _errorTips.amount = '';
	            _isSubmit.amount = true;
	        }
	        this.setState({ data: newData, errorTips: _errorTips, isSubmit: _isSubmit });
	    };
	
	    ProductPackageAdd.prototype.selectEaName = function selectEaName(_obj) {
	        var newData = _Object$assign({}, this.state.data);
	        if (newData.eaName.v !== _obj.state.v) {
	            newData.eaName.v = _obj.state.v;
	            this.setState({ data: newData, isUseRule: true });
	        }
	    };
	
	    ProductPackageAdd.prototype.selectFeeTypes = function selectFeeTypes(_obj) {
	        var newData = _Object$assign({}, this.state.data);
	        if (newData.feeTypes.v !== _obj.state.v) {
	            newData.feeTypes.v = _obj.state.v;
	            this.setState({ data: newData, isUseRule: true });
	        }
	    };
	
	    ProductPackageAdd.prototype.selectFeeModes = function selectFeeModes(_obj) {
	        var newData = _Object$assign({}, this.state.data);
	        if (newData.feeModes.v !== _obj.state.v) {
	            newData.feeModes.v = _obj.state.v;
	            this.setState({ data: newData, isUseRule: true });
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
	                    maxLength: productPackagePageData.eaPriceName.maxLength,
	                    placeholder: productPackagePageData.eaPriceName.placeholder,
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
	                    maxLength: productPackagePageData.productId.maxLength,
	                    placeholder: productPackagePageData.productId.placeholder,
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
	                    '\u8BA1\u8D39\u7C7B\u578B\uFF1A'
	                ),
	                React.createElement(UIDropDown, { className: 'inputBtn', v: this.state.data.feeTypes.v, a: this.state.data.feeTypes.a, returnValue: this.selectFeeTypes }),
	                React.createElement(
	                    'div',
	                    { className: 'errorTips' },
	                    this.state.errorTips.feeTypes
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'item fl' },
	                React.createElement(
	                    'span',
	                    null,
	                    '\u8BA1\u8D39\u65B9\u5F0F\uFF1A'
	                ),
	                React.createElement(UIDropDown, { className: 'inputBtn', v: this.state.data.feeModes.v, a: this.state.feeModesList, returnValue: this.selectFeeModes }),
	                React.createElement(
	                    'div',
	                    { className: 'errorTips' },
	                    this.state.errorTips.feeModes
	                )
	            ),
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
	                    maxLength: productPackagePageData.validTime.maxLength,
	                    placeholder: productPackagePageData.validTime.placeholder,
	                    onChange: this.handleChangeValidTime,
	                    onBlur: this.handleBlurValidTime
	                }),
	                this.state.show.validTimeUnit ? React.createElement(UIDropDown, { className: 'inputBtn small', v: this.state.data.validTime.unit.v, a: this.state.data.validTime.unit.a, returnValue: this.selectValidTimeUnit }) : '',
	                React.createElement(
	                    'div',
	                    { className: 'underTips' },
	                    productPackagePageData.validTime.underTips
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'errorTips' },
	                    this.state.errorTips.validTime
	                )
	            ),
	            this.state.show.price ? React.createElement(
	                'div',
	                { className: 'item fl' },
	                React.createElement(
	                    'span',
	                    null,
	                    '\u4EF7\u683C\uFF1A'
	                ),
	                React.createElement(UIInput, { type: 'money', className: 'inputBtn', maxValue: productPackagePageData.price.maxValue, maxLength: productPackagePageData.price.maxLength, placeholder: productPackagePageData.price.placeholder, v: typeof this.state.data.price === 'number' ? this.state.data.price.toFixed(2) : this.state.data.price, onBlur: this.returnPriceValue }),
	                React.createElement(
	                    'span',
	                    null,
	                    this.state.unit.price
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'errorTips' },
	                    this.state.errorTips.price
	                )
	            ) : '',
	            this.state.show.amount ? React.createElement(
	                'div',
	                { className: 'item fl' },
	                React.createElement(
	                    'span',
	                    null,
	                    '\u89C4\u683C\uFF1A'
	                ),
	                React.createElement(UIInput, { type: 'positiveInt', className: 'inputBtn', maxValue: productPackagePageData.amount.maxValue, maxLength: productPackagePageData.amount.maxLength, placeholder: productPackagePageData.amount.placeholder, v: this.state.data.amount, onBlur: this.returnAmountValue }),
	                React.createElement(
	                    'span',
	                    null,
	                    this.state.unit.amount
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'errorTips' },
	                    this.state.errorTips.amount
	                )
	            ) : '',
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
	                                    React.createElement(UIInput, { type: 'money', className: 'inputBtn small', maxValue: productPackagePageData.ladderPrice.price.maxValue, maxLength: productPackagePageData.ladderPrice.price.maxLength, placeholder: productPackagePageData.ladderPrice.price.placeholder, v: typeof item.price === 'number' ? item.price.toFixed(2) : item.price, onBlur: _this3.returnLadderPricePriceValue.bind(_this3, i) })
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    i < productPackagePageData.ladderPrice.maxItem ? React.createElement(
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
	                                    React.createElement(UIInput, { type: 'positiveInt', className: 'inputBtn small', maxValue: productPackagePageData.ladderPrice.amount.maxValue, maxLength: productPackagePageData.ladderPrice.amount.maxLength, placeholder: productPackagePageData.ladderPrice.amount.placeholder, v: item.amount, onBlur: _this3.returnLadderPriceAmountValue.bind(_this3, i) })
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    React.createElement(UIInput, { type: 'money', className: 'inputBtn small', maxValue: productPackagePageData.ladderPrice.price.maxValue, maxLength: productPackagePageData.ladderPrice.price.maxLength, placeholder: productPackagePageData.ladderPrice.price.placeholder, v: typeof item.price === 'number' ? item.price.toFixed(2) : item.price, onBlur: _this3.returnLadderPricePriceValue.bind(_this3, i) })
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
	                                React.createElement(UIInput, { type: 'positiveInt', className: 'inputBtn small', v: this.state.ladderPrice[0].amount, maxValue: productPackagePageData.ladderPrice.amount.maxValue, maxLength: productPackagePageData.ladderPrice.amount.maxLength, placeholder: productPackagePageData.ladderPrice.amount.placeholder, onBlur: this.returnLadderPriceAmountValueNew.bind(this, 0) })
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                React.createElement(UIInput, { type: 'money', className: 'inputBtn small', v: typeof this.state.ladderPrice[0].price === 'number' ? this.state.ladderPrice[0].price.toFixed(2) : this.state.ladderPrice[0].price, maxValue: productPackagePageData.ladderPrice.price.maxValue, maxLength: productPackagePageData.ladderPrice.price.maxLength, placeholder: productPackagePageData.ladderPrice.price.placeholder, onBlur: this.returnLadderPricePriceValueNew.bind(this, 0) })
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
	                                React.createElement(UIInput, { type: 'money', className: 'inputBtn small', v: typeof this.state.ladderPrice[1].price === 'number' ? this.state.ladderPrice[1].price.toFixed(2) : this.state.ladderPrice[1].price, maxValue: productPackagePageData.ladderPrice.price.maxValue, maxLength: productPackagePageData.ladderPrice.price.maxLength, placeholder: productPackagePageData.ladderPrice.price.placeholder, onBlur: this.returnLadderPricePriceValueNew.bind(this, 1) })
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
	            React.createElement(
	                'div',
	                { className: 'item fl all' },
	                React.createElement(
	                    'span',
	                    { className: 'fl' },
	                    '\u4F7F\u7528\u89C4\u5219\uFF1A'
	                ),
	                React.createElement('textarea', { className: 'fl all', maxLength: productPackagePageData.describe.maxLength, placeholder: productPackagePageData.describe.placeholder, onChange: this.handleChangeDescribe, onBlur: this.handleBlurDescribe, value: this.state.data.describe }),
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
	
	ReactDOM.render(React.createElement(ProductPackageAdd, null), document.getElementById('app'));

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _from = __webpack_require__(3);
	
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

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

	var core = __webpack_require__(13);
	var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
	module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};


/***/ }),

/***/ 422:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(251)['default'];
	
	var _Object$assign = __webpack_require__(58)['default'];
	
	var _classCallCheck = __webpack_require__(64)['default'];
	
	var _possibleConstructorReturn = __webpack_require__(65)['default'];
	
	var _inherits = __webpack_require__(87)['default'];
	
	var React = __webpack_require__(95);
	
	var _reactBootstrap = __webpack_require__(249);
	
	var Glyphicon = _reactBootstrap.Glyphicon;
	
	/**
	 * Created by hqer on 2017/5/17.
	 */
	/*import '../less/CheckBox.less'*/
	var CheckBox = function (_React$Component) {
	    _inherits(CheckBox, _React$Component);
	
	    function CheckBox(props) {
	        _classCallCheck(this, CheckBox);
	
	        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
	
	        _this.state = {
	            s: _this.props.s
	        };
	        _this.handleClick = _this.handleClick.bind(_this);
	        return _this;
	    }
	
	    CheckBox.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
	        if (newProps.s != this.state.s) {
	            this.setState({ s: newProps.s });
	        }
	    };
	
	    CheckBox.prototype.handleClick = function handleClick() {
	        if (typeof this.props.onClick === "function") {
	            this.props.onClick();
	        } else {
	            if (this.state.s) {
	                this.setState({ s: false });
	            } else {
	                this.setState({ s: true });
	            }
	        }
	    };
	
	    CheckBox.prototype.render = function render() {
	        var other = _Object$assign({}, this.props);
	        delete other.v;
	        delete other.s;
	        delete other.style;
	        return React.createElement(
	            'div',
	            { style: this.props.style, className: 'CheckBoxUI' },
	            React.createElement(
	                'button',
	                _extends({}, other, {
	                    type: 'button',
	                    className: this.props.className,
	                    value: this.state.s ? this.props.v : "",
	                    onClick: this.handleClick }),
	                this.state.s ? React.createElement(Glyphicon, { glyph: 'ok' }) : ""
	            )
	        );
	    };
	
	    return CheckBox;
	}(React.Component);
	
	CheckBox.propTypes = {
	    s: React.PropTypes.bool.isRequired,
	    v: React.PropTypes.string.isRequired
	};
	CheckBox.defaultProps = {
	    s: false,
	    v: ""
	
	};
	module.exports = CheckBox;

/***/ }),

/***/ 423:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(251)['default'];
	
	var _Object$assign = __webpack_require__(58)['default'];
	
	var _classCallCheck = __webpack_require__(64)['default'];
	
	var _possibleConstructorReturn = __webpack_require__(65)['default'];
	
	var _inherits = __webpack_require__(87)['default'];
	
	var React = __webpack_require__(95);
	
	var _reactBootstrap = __webpack_require__(249);
	
	var Glyphicon = _reactBootstrap.Glyphicon;
	
	/**
	 * Created by hqer on 2017/5/17.
	 */
	/* import '../less/RadioBtn.less'*/
	
	var RadioBtn = function (_React$Component) {
	    _inherits(RadioBtn, _React$Component);
	
	    function RadioBtn(props) {
	        _classCallCheck(this, RadioBtn);
	
	        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
	
	        _this.state = {
	            s: _this.props.s
	        };
	        _this.handleClick = _this.handleClick.bind(_this);
	        return _this;
	    }
	
	    RadioBtn.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
	        if (newProps.s != this.state.s) {
	            this.setState({ s: newProps.s });
	        }
	    };
	
	    RadioBtn.prototype.handleClick = function handleClick() {
	        if (typeof this.props.onClick === 'function') {
	            this.props.onClick();
	        } else {
	            if (this.state.s) {
	                this.setState({ s: false });
	            } else {
	                this.setState({ s: true });
	            }
	        }
	    };
	
	    RadioBtn.prototype.render = function render() {
	        var other = _Object$assign({}, this.props);
	        delete other.v;
	        delete other.s;
	        delete other.style;
	        return React.createElement(
	            'div',
	            { style: this.props.style, className: this.state.s ? 'RadioUI select' : 'RadioUI' },
	            React.createElement('button', _extends({}, other, {
	                type: 'button',
	                className: this.props.className,
	                value: this.state.s ? this.props.v : '',
	                onClick: this.handleClick }))
	        );
	    };
	
	    return RadioBtn;
	}(React.Component);
	
	RadioBtn.propTypes = {
	    s: React.PropTypes.bool.isRequired,
	    v: React.PropTypes.string.isRequired
	};
	RadioBtn.defaultProps = {
	    s: false,
	    v: ''
	
	};
	module.exports = RadioBtn;

/***/ }),

/***/ 424:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(251)['default'];
	
	var _Object$assign = __webpack_require__(58)['default'];
	
	var _classCallCheck = __webpack_require__(64)['default'];
	
	var _possibleConstructorReturn = __webpack_require__(65)['default'];
	
	var _inherits = __webpack_require__(87)['default'];
	
	var React = __webpack_require__(95);
	
	var Input = function (_React$Component) {
	    _inherits(Input, _React$Component);
	
	    function Input(props) {
	        _classCallCheck(this, Input);
	
	        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
	
	        _this.state = {
	            v: _this.props.v,
	            isReturn: false
	        };
	        _this.handleChange = _this.handleChange.bind(_this);
	        _this.handleBlur = _this.handleBlur.bind(_this);
	        _this.handleKeyUp = _this.handleKeyUp.bind(_this);
	        _this.handleFocus = _this.handleFocus.bind(_this);
	        _this._setPositiveInt = _this._setPositiveInt.bind(_this);
	        _this._setNaturalNum = _this._setNaturalNum.bind(_this);
	        _this._setMoney = _this._setMoney.bind(_this);
	        _this._setNum = _this._setNum.bind(_this);
	        return _this;
	    }
	
	    Input.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
	        if (newProps.v != this.state.v) {
	            this.setState({ v: newProps.v });
	        }
	    };
	
	    Input.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
	        if (this.state.isReturn && !prevState.isReturn && typeof this.props.onBlur === 'function') {
	            this.props.onBlur(this);
	            this.setState({ isReturn: false });
	        }
	    };
	
	    Input.prototype._setPositiveInt = function _setPositiveInt(_val) {
	        if (/^[1-9]\d*$/.test(_val)) {
	            this.setState({ v: _val * 1 });
	        }
	    };
	
	    Input.prototype._setNaturalNum = function _setNaturalNum(_val) {
	        if (/^\d*$/.test(_val)) {
	            this.setState({ v: _val * 1 });
	        }
	    };
	
	    Input.prototype._setMoney = function _setMoney(_val) {
	        if (/^(\-)?(\d)*(\.)?(\d{0,2})$/.test(_val)) {
	            var f = '';
	            var _v = _val;
	            if (_val.indexOf('-') == 0) {
	                f = _val.slice(0, 1);
	                _v = _val.substring(1);
	            }
	            var re = /\d{1,3}(?=(\d{3})+$)/g;
	            var n1 = _v.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
	                return s1.replace(re, '$&,') + s2;
	            });
	            this.setState({ v: f + n1 });
	        }
	    };
	
	    Input.prototype._setNum = function _setNum(_val) {
	        if (/^(\-)?(\d)*(\.)?\d*$/.test(_val)) {
	            this.setState({ v: _val });
	        }
	    };
	
	    Input.prototype.handleChange = function handleChange(event) {
	        var _eT = event.srcElement ? event.srcElement : event.target;
	        var _val = _eT.value;
	        if (_val === '') {
	            this.setState({ v: '' });
	        } else if (this.props.type === 'money') {
	            var _newVal = _val.toString().replace(/\,/g, '');
	            if (this.props.maxValue && _newVal * 1 > this.props.maxValue * 1) {
	                this._setMoney(this.props.maxValue.toString());
	            } else {
	                this._setMoney(_newVal);
	            }
	        } else if (this.props.type === 'positiveInt') {
	            if (this.props.maxValue && _val * 1 > this.props.maxValue * 1) {
	                this._setPositiveInt(this.props.maxValue.toString());
	            } else {
	                this._setPositiveInt(_val);
	            }
	        } else if (this.props.type === 'naturalNum') {
	            if (this.props.maxValue && _val * 1 > this.props.maxValue * 1) {
	                this._setNaturalNum(this.props.maxValue);
	            } else {
	                this._setNaturalNum(_val);
	            }
	        } else if (this.props.type === 'number') {
	            if (this.props.maxValue && _val * 1 > this.props.maxValue * 1) {
	                this._setNum(this.props.maxValue);
	            } else {
	                this._setNum(_val);
	            }
	        }
	        if (typeof this.props.onChange === 'function') {
	            this.props.onChange(this);
	        }
	    };
	
	    Input.prototype.handleBlur = function handleBlur(event) {
	        if (this.props.type === 'money') {
	            if (this.state.v) {
	                if (this.state.v === '-') {
	                    this.setState({ v: '', isReturn: true });
	                } else {
	                    var _newVal = '';
	                    if (typeof this.state.v === 'string') {
	                        _newVal = this.state.v.replace(/\,/g, '');
	                    } else {
	                        _newVal = this.state.v;
	                    }
	                    var _newV = parseFloat(_newVal).toFixed(2);
	                    this.setState({ v: _newV, isReturn: true });
	                }
	            } else {
	                if (typeof this.props.onBlur === 'function') {
	                    this.props.onBlur(this);
	                }
	            }
	        } else if (this.props.type === 'number') {
	            if (this.state.v === '-') {
	                this.setState({ v: '', isReturn: true });
	            } else {
	                if (typeof this.props.onBlur === 'function') {
	                    this.props.onBlur(this);
	                }
	            }
	        } else {
	            if (typeof this.props.onBlur === 'function') {
	                this.props.onBlur(this);
	            }
	        }
	    };
	
	    Input.prototype.handleKeyUp = function handleKeyUp(event) {
	        if (typeof this.props.onKeyUp === 'function') {
	            this.props.onKeyUp(this);
	        }
	    };
	
	    Input.prototype.handleFocus = function handleFocus(event) {
	        if (typeof this.props.onFocus === 'function') {
	            this.props.onFocus(this);
	        }
	    };
	
	    Input.prototype.render = function render() {
	        var other = _Object$assign({}, this.props);
	        delete other.type;
	        delete other.maxValue;
	        delete other.v;
	        return React.createElement('input', _extends({}, other, {
	            type: 'text',
	            value: this.state.v,
	            onKeyUp: this.handleKeyUp,
	            onBlur: this.handleBlur,
	            onFocus: this.handleFocus,
	            onChange: this.handleChange
	        }));
	    };
	
	    return Input;
	}(React.Component); /**
	                     * Created by hqer on 2016/12/21.
	                     */
	
	
	Input.propTypes = {
	    type: React.PropTypes.string.isRequired
	};
	Input.defaultProps = {
	    type: 'text',
	    className: '',
	    v: '',
	    maxValue: ''
	};
	module.exports = Input;

/***/ }),

/***/ 425:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = __webpack_require__(64)['default'];
	
	var _possibleConstructorReturn = __webpack_require__(65)['default'];
	
	var _inherits = __webpack_require__(87)['default'];
	
	var React = __webpack_require__(95);
	
	var $ = __webpack_require__(248);
	
	var _reactDom = __webpack_require__(247);
	
	var findDOMNode = _reactDom.findDOMNode;
	
	var _reactBootstrap = __webpack_require__(249);
	
	var Glyphicon = _reactBootstrap.Glyphicon;
	
	/**
	 * Created by hqer on 2017/5/16.
	 */
	/* import '../less/DropDown.less'*/
	var DropDown = function (_React$Component) {
	    _inherits(DropDown, _React$Component);
	
	    function DropDown(props) {
	        _classCallCheck(this, DropDown);
	
	        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
	
	        _this.state = {
	            v: _this.props.v,
	            isReturn: false
	        };
	        _this.selectItem = _this.selectItem.bind(_this);
	        _this._clickAway = _this._clickAway.bind(_this);
	        _this.toggle = _this.toggle.bind(_this);
	        return _this;
	    }
	
	    DropDown.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
	        if (newProps.v != this.state.v) {
	            this.setState({ v: newProps.v, isShowList: false });
	        }
	    };
	
	    DropDown.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
	        if (this.state.isReturn && !prevState.isReturn && typeof this.props.returnValue === 'function') {
	            this.setState({ isReturn: false });
	            this.props.returnValue(this);
	        }
	    };
	
	    DropDown.prototype.componentWillUnmount = function componentWillUnmount() {
	        $(document).off('click');
	    };
	
	    DropDown.prototype.selectItem = function selectItem(_v) {
	        this.setState({ isShowList: false, v: _v, isReturn: true });
	    };
	
	    DropDown.prototype._clickAway = function _clickAway() {
	        var _this2 = this;
	
	        $(document).off('click').on('click', function (event) {
	            var _el = findDOMNode(_this2);
	            if ($(_el).hasClass('showUl')) {
	                var _eventTarget = event.srcElement ? event.srcElement : event.target;
	                if (_eventTarget !== _el && $(_el).find(_eventTarget).length == 0) {
	                    _this2.setState({ isShowList: false });
	                }
	            }
	        });
	    };
	
	    DropDown.prototype.toggle = function toggle(event) {
	        var _el = findDOMNode(this);
	        $(_el).find('input').focus();
	        if (this.state.isShowList) {
	            this.setState({ isShowList: false });
	        } else {
	            this.setState({ isShowList: true });
	        }
	    };
	
	    DropDown.prototype.render = function render() {
	        var _this3 = this;
	
	        return React.createElement(
	            'div',
	            { className: this.state.isShowList ? 'DropDownUI showUl' : 'DropDownUI', onClick: this._clickAway },
	            React.createElement('input', {
	                type: 'text',
	                readOnly: true,
	                className: this.props.className,
	                placeholder: '\u8BF7\u9009\u62E9',
	                value: this.props.a.map(function (n, i) {
	                    return n.v === _this3.state.v ? n.t : '';
	                }).toString().replace(/\,/g, ''),
	                onClick: this.toggle
	            }),
	            React.createElement(
	                'div',
	                { className: this.state.isShowList ? 'icon top' : 'icon' },
	                React.createElement(Glyphicon, { glyph: 'chevron-down', onClick: this.toggle })
	            ),
	            this.state.isShowList ? React.createElement(
	                'div',
	                { className: 'DropDownListArea' },
	                React.createElement(
	                    'ul',
	                    { className: 'DropDownList' },
	                    this.props.a.map(function (n, i) {
	                        return React.createElement(
	                            'li',
	                            { key: i, onClick: _this3.selectItem.bind(_this3, n.v) },
	                            n.t
	                        );
	                    })
	                )
	            ) : ''
	        );
	    };
	
	    return DropDown;
	}(React.Component);
	
	DropDown.propTypes = {
	    a: React.PropTypes.array.isRequired
	};
	DropDown.defaultProps = {
	    className: '',
	    v: '',
	    a: []
	};
	module.exports = DropDown;

/***/ })

});