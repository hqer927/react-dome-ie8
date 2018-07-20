/**
 * Created by hqer on 2017/11/24.
 */
const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const Table = require('react-bootstrap').Table;
const Glyphicon = require('react-bootstrap').Glyphicon;

const UICheckBox = require('../componentUI/js/CheckBox');
const UIRadioBtn = require('../componentUI/js/RadioBtn');
const UIInput = require('../componentUI/js/Input');
const UIDropDown = require('../componentUI/js/DropDown');

class ProductPackageAdd extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: this.props.data,
            isVisibleList:[{check:1,text:'是',value:1},{check:0,text:'否',value:0}],
            ladderPrice:[{amount: '',price: ''}, {amount:'', price: ''}],
            show:{
                validTimeUnit:true,
                productId:false,
                ladderPrice:this.props.data.isShowLadder ? true : false
            },
            unit:{
                ladderPrice:this.props.data.ladderUnit
            },
            errorTips:{
                eaPriceName:'',
                eaName:'',
                productId:'',
                eaTemplatePackage:'',
                validTime:'',
                eaTemplatePackageInfo:[
                    {
                        price:'',
                        amount:''
                    }
                ],
                userSource:'',
                userLevel:'',
                isVisible:'',
                describe:'',
                ladderPrice:''
            },
            isSubmit:{
                eaPriceName:false,
                validTime:false,
                userSource:false,
                userLevel:false,
                describe:false,
                productId:false,
                eaTemplatePackageInfo:[
                    {
                        price:false,
                        amount:false
                    }
                ]
            }
        };
        this.rule = this.rule.bind(this);
        this.handleChangeEaPriceName = this.handleChangeEaPriceName.bind(this);
        this.handleBlurEaPriceName = this.handleBlurEaPriceName.bind(this);
        this.handleChangeProductId = this.handleChangeProductId.bind(this);
        this.handleBlurProductIde =  this.handleBlurProductIde.bind(this);
        this.handleChangeValidTime = this.handleChangeValidTime.bind(this);
        this.handleBlurValidTime = this.handleBlurValidTime.bind(this);
        this.handleChangeDescribe = this.handleChangeDescribe.bind(this);
        this.returnPriceValue = this.returnPriceValue.bind(this);
        this.returnAmountValue = this.returnAmountValue.bind(this);
        this.handleBlurDescribe = this.handleBlurDescribe.bind(this);

        this.selectEaName = this.selectEaName.bind(this);
        this.selectEaTemplatePackage = this.selectEaTemplatePackage.bind(this);
        this.selectValidTimeUnit = this.selectValidTimeUnit.bind(this);
        this.ladderPriceAddItem = this.ladderPriceAddItem.bind(this);
        this.ladderPriceAddItemNew = this.ladderPriceAddItemNew.bind(this);

        this.submit = this.submit.bind(this);
    }
    submit () {
        const _errorTips = Object.assign({},this.state.errorTips);
        const _isSubmit = Object.assign({},this.state.isSubmit);
        const _show = Object.assign({},this.state.show);
        let _isOk = true;
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
            if (_errorTips.userSource === '' && !this.state.data.userSource.find((n) => (n.check === 1))) {
                _errorTips.userSource = '* 可见用户来源不能为空';
            }
        }
        if (!_isSubmit.userLevel) {
            _isOk = false;
            if (_errorTips.userLevel === '' && !this.state.data.userLevel.find((n) => (n.check === 1))) {
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
            _isSubmit.eaTemplatePackageInfo.map((item,i) => {
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
                url :  window.productPackagePageData.eaPriceName.actionUrl,
                data :  {
                    'eaPriceName' :this.state.data.eaPriceName,
                    'eaId':this.state.data.eaName.v,
                    'eaPriceId':this.state.data.eaPriceId
                },
                type : 'post',
                dataType : 'json',
                success : function (r) {
                    if (r.result == 'notConflict') {
                        $('#packageData').val(JSON.stringify(this.state.data));
                        $('#productPackage')[0].submit();
                    } else {
                        window.parent.global.setTips('systemTips',r.result);
                    }
                }.bind(this)
            });
        } else {
            this.setState({errorTips:_errorTips});
        }
    }
    rule (_data) {
        const newData = Object.assign({},_data);
        const newShow = Object.assign({},this.state.show);
        for (let i = 0;i < window.productPackagePageData.productId.showRule.length;i++) {
            if (newData.eaName.v === window.productPackagePageData.productId.showRule[i].eaName) {
                newShow.productId = window.productPackagePageData.productId.showRule[i].result;
                break;
            }
        }
        return {data:newData,show:newShow,isUseRule:false};
    }
    componentWillMount () {
        const newState = this.rule(this.state.data);
        const _isSubmit = Object.assign({},this.state.isSubmit);
        const _isVisibleList = [...this.state.isVisibleList];
        const _errorTips = Object.assign({},this.state.errorTips);
        _isVisibleList.map((item) => {
            if (item.value === this.state.data.isVisible) {
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
            this.state.data.eaTemplatePackageInfo.map((item) => {
                _isSubmit.eaTemplatePackageInfo.push({price:item.price != '' ? true : false, amount:item.amount != '' ? true : false});
                _errorTips.eaTemplatePackageInfo.push({price:'',amount:''});
            });
        }
        newState.errorTips = _errorTips;
        newState.isSubmit = _isSubmit;
        newState.isVisibleList = _isVisibleList;
        this.setState(newState);
    }
    shouldComponentUpdate (newProps, newState) {
        if (newState.isUseRule) {
            const _newState = this.rule(newState.data);
            this.setState(_newState);
            return false;
        } else {
            return true;
        }
    }
    componentDidUpdate (prevProps, prevState) {
        if (prevState.data != this.state.data) {
            $('#productPackage').val(JSON.stringify(this.state.data));
            const _mainHeight = $('.mainBox').outerHeight();
            if (window.parent.global.setDomHeight && _mainHeight) {
                window.parent.global.setDomHeight(_mainHeight,'mainFrame');
            }
        }
    }
    handleChangeEaPriceName (event) {
        const _eT = event.srcElement ? event.srcElement : event.target;
        const _val = _eT.value;
        const newData = Object.assign({},this.state.data);
        const _errorTips = Object.assign({},this.state.errorTips);
        if (_val === '') {
            newData.eaPriceName = '';
            _errorTips.eaPriceName = '* 能力套餐名称不能为空';
        } else if (/^[A-Za-z0-9\u4E00-\u9FFF()-.+]+$/.test(_val)) {
            newData.eaPriceName = _val;
            _errorTips.eaPriceName = '';
        }
        this.setState({data:newData,errorTips:_errorTips});
    }
    handleBlurEaPriceName () {
        const _errorTips = Object.assign({},this.state.errorTips);
        const _isSubmit = Object.assign({},this.state.isSubmit);
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
        this.setState({errorTips:_errorTips,isSubmit:_isSubmit});
    }
    handleChangeProductId (event) {
        const _eT = event.srcElement ? event.srcElement : event.target;
        const _val = _eT.value;
        const newData = Object.assign({},this.state.data);
        const _errorTips = Object.assign({},this.state.errorTips);
        if (_val === '') {
            newData.productId = '';
            _errorTips.productId = '* 产品ID不能为空';
        } else if (/^\d{1,10}$/.test(_val)) {
            newData.productId = _val;
            _errorTips.productId = '';
        }
        this.setState({data:newData,errorTips:_errorTips});
    }
    handleBlurProductIde () {
        const _errorTips = Object.assign({},this.state.errorTips);
        const _isSubmit = Object.assign({},this.state.isSubmit);
        if (this.state.data.productId === '') {
            _errorTips.productId = '* 产品ID不能为空';
            _isSubmit.productId = false;
        } else if (/^\d{1,10}$/.test(this.state.data.productId)) {
            _errorTips.productId = '';
            _isSubmit.productId = true;
        }
        this.setState({errorTips:_errorTips,isSubmit:_isSubmit});
    }
    handleChangeValidTime (event) {
        const _eT = event.srcElement ? event.srcElement : event.target;
        const _val = _eT.value;
        const newData = Object.assign({},this.state.data);
        const _errorTips = Object.assign({},this.state.errorTips);
        const newShow = Object.assign({},this.state.show);
        if (_val === '') {
            newData.validTime.value = '';
            _errorTips.validTime = '* 使用有效期不能为空';
            newShow.validTimeUnit = true;
            this.setState({data:newData,errorTips:_errorTips,show:newShow});
        } else if (_val === '永') {
            newData.validTime.value = '永';
            _errorTips.validTime = '* 使用有效期格式不正确';
            newShow.validTimeUnit = false;
            this.setState({data:newData,errorTips:_errorTips,show:newShow});
        } else if (/^[1-9]\d*$/.test(_val) || _val === '永久' || /^[a-zA-Z]*$/.test(_val)) {
            newData.validTime.value = _val;
            _errorTips.validTime = '';
            if (_val === '永久') {
                newShow.validTimeUnit = false;
            } else {
                newShow.validTimeUnit = true;
            }
            this.setState({data:newData,errorTips:_errorTips,show:newShow});
        }
    }
    handleBlurValidTime () {
        const _errorTips = Object.assign({},this.state.errorTips);
        const _isSubmit = Object.assign({},this.state.isSubmit);
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
        this.setState({errorTips:_errorTips,isSubmit:_isSubmit});
    }
    handleChangeDescribe (event) {
        const _eT = event.srcElement ? event.srcElement : event.target;
        const _val = _eT.value;
        const newData = Object.assign({},this.state.data);
        const _errorTips = Object.assign({},this.state.errorTips);
        if (_val === '') {
            newData.describe = '';
            _errorTips.describe = '* 使用规则不能为空';
        } else {
            newData.describe = _val;
            _errorTips.describe = '';
        }
        this.setState({data:newData,errorTips:_errorTips});
    }
    handleBlurDescribe () {
        const _errorTips = Object.assign({},this.state.errorTips);
        const _isSubmit = Object.assign({},this.state.isSubmit);
        if (this.state.data.describe === '') {
            _errorTips.describe = '* 使用规则不能为空';
            _isSubmit.describe = false;
        } else {
            _errorTips.describe = '';
            _isSubmit.describe = true;
        }
        this.setState({errorTips:_errorTips,isSubmit:_isSubmit});
    }
    returnAmountValue (_i,_obj) {
        const newData = Object.assign({},this.state.data);
        const _errorTips = Object.assign({},this.state.errorTips);
        const _isSubmit = Object.assign({},this.state.isSubmit);
        if (_obj.state.v === '') {
            newData.eaTemplatePackageInfo[_i].amount.num = _obj.state.v;
            _errorTips.eaTemplatePackageInfo[_i].amount = '* 规格不能为空！';
            _isSubmit.eaTemplatePackageInfo[_i].amount = false;
        } else {
            newData.eaTemplatePackageInfo[_i].amount.num = _obj.state.v * 1 ;
            _errorTips.eaTemplatePackageInfo[_i].amount = '';
            _isSubmit.eaTemplatePackageInfo[_i].amount = true;
        }
        this.setState({errorTips:_errorTips,isSubmit:_isSubmit,data:newData});
    }
    returnPriceValue (_i,_obj) {
        const newData = Object.assign({},this.state.data);
        const _errorTips = Object.assign({},this.state.errorTips);
        const _isSubmit = Object.assign({},this.state.isSubmit);
        if (_obj.state.v === '') {
            newData.eaTemplatePackageInfo[_i].price.num = _obj.state.v;
            _errorTips.eaTemplatePackageInfo[_i].price = '* 价格不能为空！';
            _isSubmit.eaTemplatePackageInfo[_i].price = false;
        } else {
            newData.eaTemplatePackageInfo[_i].price.num = _obj.state.v * 1;
            _errorTips.eaTemplatePackageInfo[_i].price = '';
            _isSubmit.eaTemplatePackageInfo[_i].price = true;
        }
        this.setState({errorTips:_errorTips,isSubmit:_isSubmit,data:newData});
    }

    selectEaName (_obj) {
        if (this.state.data.eaName.v !== _obj.state.v) {
            window.productPackagePageData.eaName.cache = _obj.state.v;
            $.ajax({
                url :  window.productPackagePageData.eaName.actionUrl,
                data :  {
                    'eaPriceName' :this.state.data.eaPriceName,
                    'eaId':_obj.state.v,
                    'eaPriceId':this.state.data.eaPriceId
                },
                type : 'post',
                dataType : 'json',
                success : function (r) {
                    const newData = Object.assign({},this.state.data);
                    const _errorTips = Object.assign({},this.state.errorTips);
                    if (r.resultCode === '200') {
                        newData.eaTemplatePackage = Object.assign({}, r.result);
                        newData.eaName.v = window.productPackagePageData.eaName.cache;
                    } else if (window.productPackagePageData.eaName.tipsCode[r.resultCode].showTips === 1) {
                        window.parent.global.setTips(window.productPackagePageData.eaName.tipsCode[r.resultCode].type,window.productPackagePageData.eaName.tipsCode[r.resultCode].text);
                    } else if (window.productPackagePageData.eaName.tipsCode[r.resultCode].showTips === 0) {
                        _errorTips.eaName = window.productPackagePageData.eaName.tipsCode[r.resultCode].text;
                    }
                    this.setState({data:newData,errorTips:_errorTips});
                }.bind(this)
            });
        }
    }
    selectEaTemplatePackage (_obj) {
        if (this.state.data.eaTemplatePackage.v !== _obj.state.v) {
            window.productPackagePageData.eaTemplatePackage.cache = _obj.state.v;
            $.ajax({
                url :  window.productPackagePageData.eaTemplatePackage.actionUrl,
                data :  {
                    'eaPriceName' :this.state.data.eaPriceName,
                    'eaId':this.state.data.eaName.v,
                    'eaPriceId':this.state.data.eaPriceId,
                    'eaTemplateId':_obj.state.v
                },
                type : 'post',
                dataType : 'json',
                success : function (r) {
                    const newData = Object.assign({},this.state.data);
                    const _errorTips = Object.assign({},this.state.errorTips);
                    const _show = Object.assign({},this.state.show);
                    const _unit = Object.assign({},this.state.unit);
                    if (r.resultCode === '200') {
                        newData.eaTemplatePackageInfo = Object.assign([], r.result.eaTemplatePackageInfo);
                        newData.ladderPrice = Object.assign([], r.result.ladderPrice);
                        newData.eaTemplatePackage.v = window.productPackagePageData.eaTemplatePackage.cache;
                        _show.ladderPrice = r.result.isShowLadder;
                        _unit.ladderPrice = r.result.ladderUnit;
                        _errorTips.eaTemplatePackageInfo = [];
                        for (let i = 0;i < r.result.eaTemplatePackageInfo.length;i++) {
                            _errorTips.eaTemplatePackageInfo.push({price:'',amount:''});
                        }
                    } else if (window.productPackagePageData.eaTemplatePackage.tipsCode[r.resultCode].showTips === 1) {
                        window.parent.global.setTips(window.productPackagePageData.eaTemplatePackage.tipsCode[r.resultCode].type,window.productPackagePageData.eaTemplatePackage.tipsCode[r.resultCode].text);
                    } else if (window.productPackagePageData.eaTemplatePackage.tipsCode[r.resultCode].showTips === 0) {
                        _errorTips.eaTemplatePackage = window.productPackagePageData.eaTemplatePackage.tipsCode[r.resultCode].text;
                    }
                    this.setState({data:newData,errorTips:_errorTips,show:_show,unit:_unit});
                }.bind(this)
            });
        }
    }
    selectValidTimeUnit (_obj) {
        const newData = Object.assign({},this.state.data);
        if (newData.validTime.unit.v !== _obj.state.v) {
            newData.validTime.unit.v = _obj.state.v;
            this.setState({data:newData});
        }
    }
    checkUserSource (_i) {
        const newData = Object.assign({},this.state.data);
        const _errorTips = Object.assign({},this.state.errorTips);
        const _isSubmit = Object.assign({},this.state.isSubmit);
        if (newData.userSource[_i].check === 0) {
            newData.userSource[_i].check = 1;
        } else {
            newData.userSource[_i].check = 0;
        }
        let isErrorTips = true;
        for (let i = 0;i < newData.userSource.length;i++) {
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
        this.setState({data:newData,errorTips:_errorTips,isSubmit:_isSubmit});
    }
    checkUserLevel (_i) {
        const newData = Object.assign({},this.state.data);
        const _errorTips = Object.assign({},this.state.errorTips);
        const _isSubmit = Object.assign({},this.state.isSubmit);
        if (newData.userLevel[_i].check === 0) {
            newData.userLevel[_i].check = 1;
        } else {
            newData.userLevel[_i].check = 0;
        }
        let isErrorTips = true;
        for (let i = 0;i < newData.userLevel.length;i++) {
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
        this.setState({data:newData,errorTips:_errorTips,isSubmit:_isSubmit});
    }
    checkRadioItem (_i) {
        const newData = Object.assign({},this.state.data);
        this.state.isVisibleList.map((item,i) => {
            if (_i === i) {
                item.check = 1;
                newData.isVisible = item.value;
            } else {
                item.check = 0;
            }
        });
        this.setState({data:newData});
    }
    returnLadderPriceAmountValue (_i,_obj) {
        const newData = Object.assign({},this.state.data);
        if (_obj.state.v !== '' && !(_i > 0 && _obj.state.v < newData.ladderPrice[_i - 1].amount)) {
            newData.ladderPrice[_i].amount = _obj.state.v * 1;
        }
        if (newData.ladderPrice.length - 1 > _i && newData.ladderPrice[_i + 1].amount <= _obj.state.v) {
            for (let i = _i + 1;i < newData.ladderPrice.length;i++) {
                if (newData.ladderPrice[i - 1].price * 100 > 1) {
                    newData.ladderPrice[i].amount = newData.ladderPrice[i - 1].amount + 1;
                    newData.ladderPrice[i].price = Math.round(newData.ladderPrice[i - 1].price * 100 - 1) / 100;
                } else {
                    newData.ladderPrice.splice(i,1);
                }
            }
        }
        this.setState({data:newData});
    }
    returnLadderPricePriceValue (_i,_obj) {
        const newData = Object.assign({},this.state.data);
        if (_obj.state.v !== '' && !(_i === 0 && _obj.state.v * 1 < 0.02) && !(_i > 0 && _obj.state.v > newData.ladderPrice[_i - 1].price)) {
            newData.ladderPrice[_i].price =  _obj.state.v * 1;
        }
        if (newData.ladderPrice.length - 1 > _i && newData.ladderPrice[_i + 1].price * 1 >= _obj.state.v * 1) {
            for (let i = _i + 1;i < newData.ladderPrice.length;i++) {
                if (newData.ladderPrice[i - 1].price * 100 > 1) {
                    newData.ladderPrice[i].amount = newData.ladderPrice[i - 1].amount + 1;
                    newData.ladderPrice[i].price = Math.round(newData.ladderPrice[i - 1].price * 100 - 1) / 100;
                } else {
                    const length = newData.ladderPrice.length - i;
                    newData.ladderPrice.splice(i,length);
                }
            }
        }
        this.setState({data:newData});
    }
    ladderPriceAddItem () {
        const newData = Object.assign({},this.state.data);
        const newItem = {amount:newData.ladderPrice[newData.ladderPrice.length - 1].amount + 1,price:Math.round(newData.ladderPrice[newData.ladderPrice.length - 1].price * 100 - 1) / 100};
        if (newItem.price > 0) {
            newData.ladderPrice.push(newItem);
            this.setState({data:newData});
        }
    }
    ladderPriceDelItem (_i) {
        const newData = Object.assign({},this.state.data);
        if (_i === newData.ladderPrice.length - 1) {
            newData.ladderPrice.splice(_i,1);
            newData.ladderPrice[newData.ladderPrice.length - 1].amount = newData.ladderPrice[newData.ladderPrice.length - 2].amount + 1;
        }
        this.setState({data:newData});
    }
    returnLadderPriceAmountValueNew (_i,_obj) {
        const _errorTips = Object.assign({},this.state.errorTips);
        const newData = Object.assign({},this.state.data);
        const newLadderPrice = [...this.state.ladderPrice];
        if (_obj.state.v !== '') {
            newLadderPrice[_i].amount = _obj.state.v * 1;
            newLadderPrice[_i + 1].amount = _obj.state.v + 1;
        }
        let isLadderPrice = true;
        newLadderPrice.map((item) => {
            if (item.amount === '' || item.price === '') {
                isLadderPrice = false;
            }
        });
        if (isLadderPrice) {
            newData.ladderPrice =  [...newLadderPrice];
            _errorTips.ladderPrice = '';
        }
        this.setState({ladderPrice:newLadderPrice,data:newData,errorTips:_errorTips});
    }
    returnLadderPricePriceValueNew (_i,_obj) {
        const _errorTips = Object.assign({},this.state.errorTips);
        const newData = Object.assign({},this.state.data);
        const newLadderPrice = [...this.state.ladderPrice];
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
        let isLadderPrice = true;
        newLadderPrice.map((item) => {
            if (item.amount === '' || item.price === '') {
                isLadderPrice = false;
            }
        });
        if (isLadderPrice) {
            newData.ladderPrice =  [...newLadderPrice];
            _errorTips.ladderPrice = '';
        }
        this.setState({ladderPrice:newLadderPrice,data:newData,errorTips:_errorTips});
    }
    ladderPriceAddItemNew () {
        const _errorTips = Object.assign({},this.state.errorTips);
        const newLadderPrice = [...this.state.ladderPrice];
        let isLadderPrice = true;
        newLadderPrice.map((item) => {
            if (item.amount === '' || item.price === '') {
                isLadderPrice = false;
            }
        });
        if (!isLadderPrice) {
            _errorTips.ladderPrice = '* 阶梯计费详情不能为空';
        }
        this.setState({errorTips:_errorTips});
    }
    render () {
        return (
            <div className='productPackageArea'>
                {
                    this.state.data.type ? (
                        <div className='item fl'>
                            能力套餐ID：{this.state.data.eaPriceId}
                        </div>
                    ) : ''
                }
                <div className='item fl'>
                    <span>能力套餐名称：</span>
                    <input
                        type='text'
                        className='inputBtn long'
                        value={this.state.data.eaPriceName}
                        maxLength={window.productPackagePageData.eaPriceName.maxLength}
                        placeholder={window.productPackagePageData.eaPriceName.placeholder}
                        onChange={this.handleChangeEaPriceName}
                        onBlur={this.handleBlurEaPriceName}
                    />
                    <div className='errorTips'>{this.state.errorTips.eaPriceName}</div>
                </div>
                <div className='item fl'>
                    <span>所属能力：</span>
                    <UIDropDown className='inputBtn' v={this.state.data.eaName.v} a={this.state.data.eaName.a} returnValue={this.selectEaName}/>
                    <div className='errorTips'>{this.state.errorTips.eaName}</div>
                </div>
                <div className='item fl'>
                    <span>能力套餐模板：</span>
                    <UIDropDown className='inputBtn' v={this.state.data.eaTemplatePackage.v} a={this.state.data.eaTemplatePackage.a} returnValue={this.selectEaTemplatePackage}/>
                    <div className='errorTips'>{this.state.errorTips.eaTemplatePackage}</div>
                </div>
                {
                    this.state.data.eaTemplatePackageInfo.length ? (
                        <div className='item fl all'>
                            <Table hover responsive bordered className='eaTemplatePackageInfo fl all'>
                                <thead>
                                    <tr>
                                        <th><div className='th0'>计费点名称</div></th>
                                        <th><div className='th1'>计费类型</div></th>
                                        <th><div className='th2'>计费方式</div></th>
                                        <th><div className='th3'>规格</div></th>
                                        <th><div className='th4'>价格</div></th>
                                    </tr>
                                </thead>
                                {
                                    this.state.data.eaTemplatePackageInfo.length ? (
                                        <tbody>
                                            {
                                                this.state.data.eaTemplatePackageInfo.map((item,i) => (
                                                    <tr key={i}>
                                                        <td><div className='th0'>{item.pointTypeName}</div></td>
                                                        <td><div className='th1'>{item.feeType}</div></td>
                                                        <td><div className='th0'>{item.feeMode}</div></td>
                                                        <td>
                                                            {
                                                                item.amount.type === 1 ? (
                                                                    <div className='th3'>
                                                                        <UIInput type='positiveInt' className='inputBtn small' maxValue={window.productPackagePageData.amount.maxValue} maxLength={window.productPackagePageData.amount.maxLength} placeholder={window.productPackagePageData.amount.placeholder} v={item.amount.num} onBlur={this.returnAmountValue.bind(this,i)}/>
                                                                        <span>{item.amount.unit}</span>
                                                                        <div className='errorTips'>{this.state.errorTips.eaTemplatePackageInfo[i].amount}</div>
                                                                    </div>
                                                                ) : (
                                                                    item.amount.type === 0 ? (
                                                                        <div className='th3'>
                                                                            <span>{item.amount.num + item.amount.unit}</span>
                                                                        </div>

                                                                    ) : (
                                                                        <div className='th3'>
                                                                            <span>--</span>
                                                                        </div>
                                                                    )
                                                                )
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.price.type === 1 ? (
                                                                    <div className='th4'>
                                                                        <UIInput type='money' className='inputBtn small' maxValue={window.productPackagePageData.price.maxValue} maxLength={window.productPackagePageData.price.maxLength} placeholder={window.productPackagePageData.price.placeholder} v={typeof item.price.num === 'number' ? item.price.num.toFixed(2) : item.price.num} onBlur={this.returnPriceValue.bind(this,i)}/>
                                                                        <span>{item.price.unit}</span>
                                                                        <div className='errorTips'>{this.state.errorTips.eaTemplatePackageInfo[i].price}</div>
                                                                    </div>
                                                                ) : (
                                                                    item.price.type === 0 ? (
                                                                        <div className='th4'>
                                                                            <span>{item.price.num + item.price.unit}</span>
                                                                        </div>

                                                                    ) : (
                                                                        <div className='th4'>
                                                                            <span>--</span>
                                                                        </div>
                                                                    )
                                                                )
                                                            }
                                                        </td>
                                                    </tr>
                                                ),this)
                                            }
                                        </tbody>
                                    ) : ''
                                }
                            </Table>
                        </div>
                    ) : ''
                }
                {
                    this.state.show.ladderPrice ? (
                        <div className='item fl all'>
                            <span className='fl'>阶梯计费详情：</span><div className='errorTips ladderPrice'>{this.state.errorTips.ladderPrice}</div>
                            <Table hover responsive bordered className='ladderPriceList fl all'>
                                <thead>
                                    <tr>
                                        <th><div className='th0'>计费数量</div></th>
                                        <th><div className='th1'>单价（{this.state.unit.ladderPrice}）</div></th>
                                        <th><div className='th2'>操作</div></th>
                                    </tr>
                                </thead>
                                {
                                    this.state.data.ladderPrice.length > 1 ? (
                                        <tbody>
                                            {
                                                this.state.data.ladderPrice.map((item,i) => (
                                                    i === this.state.data.ladderPrice.length - 1 ? (
                                                        <tr key={i}>
                                                            <td>
                                                                <span>{item.amount} 以上 </span>
                                                            </td>
                                                            <td>
                                                                <UIInput type='money' className='inputBtn small' maxValue={window.productPackagePageData.ladderPrice.price.maxValue} maxLength={window.productPackagePageData.ladderPrice.price.maxLength} placeholder={window.productPackagePageData.ladderPrice.price.placeholder} v={typeof item.price === 'number' ? item.price.toFixed(2) : item.price} onBlur={this.returnLadderPricePriceValue.bind(this,i)}/>
                                                            </td>
                                                            <td>
                                                                {
                                                                    i < window.productPackagePageData.ladderPrice.maxItem ? (
                                                                        <div className='th2'>
                                                                            {
                                                                                i > 1 ? (
                                                                                    <Glyphicon glyph='remove' onClick={this.ladderPriceDelItem.bind(this,i)}/>
                                                                                ) : ''
                                                                            }
                                                                            <Glyphicon glyph='plus' onClick={this.ladderPriceAddItem}/>
                                                                        </div>
                                                                    ) : (
                                                                        <div className='th2'>
                                                                            <Glyphicon glyph='remove' onClick={this.ladderPriceDelItem.bind(this,i)}/>
                                                                        </div>
                                                                    )
                                                                }
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        <tr key={i}>
                                                            <td>
                                                                {
                                                                    i === 0 ? (
                                                                        <span>0 至 </span>
                                                                    ) : (
                                                                        <span>{this.state.data.ladderPrice[i - 1].amount + 1} 至 </span>
                                                                    )
                                                                }
                                                                <UIInput type='positiveInt' className='inputBtn small' maxValue={window.productPackagePageData.ladderPrice.amount.maxValue} maxLength={window.productPackagePageData.ladderPrice.amount.maxLength} placeholder={window.productPackagePageData.ladderPrice.amount.placeholder} v={item.amount} onBlur={this.returnLadderPriceAmountValue.bind(this,i)}/>
                                                            </td>
                                                            <td>
                                                                <UIInput type='money' className='inputBtn small' maxValue={window.productPackagePageData.ladderPrice.price.maxValue} maxLength={window.productPackagePageData.ladderPrice.price.maxLength} placeholder={window.productPackagePageData.ladderPrice.price.placeholder} v={typeof item.price === 'number' ? item.price.toFixed(2) : item.price} onBlur={this.returnLadderPricePriceValue.bind(this,i)}/>
                                                            </td>
                                                            <td>
                                                                <div className='th2'></div>
                                                            </td>
                                                        </tr>
                                                    )
                                                ),this)
                                            }
                                        </tbody>
                                    ) : (
                                        <tbody>
                                            <tr key={0}>
                                                <td>
                                                    <span>0 至 </span>
                                                    <UIInput type='positiveInt' className='inputBtn small' v={this.state.ladderPrice[0].amount} maxValue={window.productPackagePageData.ladderPrice.amount.maxValue} maxLength={window.productPackagePageData.ladderPrice.amount.maxLength} placeholder={window.productPackagePageData.ladderPrice.amount.placeholder} onBlur={this.returnLadderPriceAmountValueNew.bind(this,0)}/>
                                                </td>
                                                <td>
                                                    <UIInput type='money' className='inputBtn small' v={typeof this.state.ladderPrice[0].price === 'number' ? this.state.ladderPrice[0].price.toFixed(2) : this.state.ladderPrice[0].price} maxValue={window.productPackagePageData.ladderPrice.price.maxValue} maxLength={window.productPackagePageData.ladderPrice.price.maxLength} placeholder={window.productPackagePageData.ladderPrice.price.placeholder} onBlur={this.returnLadderPricePriceValueNew.bind(this,0)}/>
                                                </td>
                                                <td>
                                                    <div className='th2'></div>
                                                </td>
                                            </tr>
                                            <tr key={1}>
                                                <td>
                                                    <span>{this.state.ladderPrice[0].amount === '' ? 'xxx' : this.state.ladderPrice[0].amount + 1} 以上 </span>
                                                </td>
                                                <td>
                                                    <UIInput type='money' className='inputBtn small' v={typeof this.state.ladderPrice[1].price === 'number' ? this.state.ladderPrice[1].price.toFixed(2) : this.state.ladderPrice[1].price} maxValue={window.productPackagePageData.ladderPrice.price.maxValue} maxLength={window.productPackagePageData.ladderPrice.price.maxLength} placeholder={window.productPackagePageData.ladderPrice.price.placeholder} onBlur={this.returnLadderPricePriceValueNew.bind(this,1)}/>
                                                </td>
                                                <td>
                                                    <div className='th2'>
                                                        <Glyphicon glyph='plus' onClick={this.ladderPriceAddItemNew}/>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                }
                            </Table>
                        </div>
                    ) : ''
                }
                {this.state.show.productId ? (
                    <div className='item fl'>
                        <span>产品ID：</span>
                        <input
                            type='text'
                            className='inputBtn'
                            value={this.state.data.productId}
                            maxLength={window.productPackagePageData.productId.maxLength}
                            placeholder={window.productPackagePageData.productId.placeholder}
                            onChange={this.handleChangeProductId}
                            onBlur={this.handleBlurProductIde}
                        />
                        <div className='errorTips'>{this.state.errorTips.productId}</div>
                    </div>
                ) : ''}
                <div className='item fl'>
                    <span>使用有效期：</span>
                    <input
                        type='text'
                        className='inputBtn small'
                        value={this.state.data.validTime.value}
                        maxLength={window.productPackagePageData.validTime.maxLength}
                        placeholder={window.productPackagePageData.validTime.placeholder}
                        onChange={this.handleChangeValidTime}
                        onBlur={this.handleBlurValidTime}
                    />
                    {this.state.show.validTimeUnit ? (
                        <UIDropDown className='inputBtn small' v={this.state.data.validTime.unit.v} a={this.state.data.validTime.unit.a} returnValue={this.selectValidTimeUnit}/>
                    ) : ''}
                    <div className='underTips'>{window.productPackagePageData.validTime.underTips}</div>
                    <div className='errorTips'>{this.state.errorTips.validTime}</div>
                </div>
                <div className='item fl all'>
                    <span className='fl'>可见用户来源：</span>
                    <ul>
                        {
                            this.state.data.userSource.map((item,i) => (
                                <li key={i} className='fl'>
                                    <UICheckBox s={item.check ? true : false} v={item.text} onClick={this.checkUserSource.bind(this,i)}/>
                                    <span>{item.text}</span>
                                </li>
                            ))
                        }
                    </ul>
                    <div className='errorTips'>{this.state.errorTips.userSource}</div>
                </div>
                <div className='item fl all'>
                    <span className='fl'>可见用户等级：</span>
                    <ul>
                        {
                            this.state.data.userLevel.map((item,i) => (
                                <li key={i} className='fl'>
                                    <UICheckBox s={item.check ? true : false} v={item.text} onClick={this.checkUserLevel.bind(this,i)}/>
                                    <span>{item.text}</span>
                                </li>
                            ))
                        }
                    </ul>
                    <div className='errorTips'>{this.state.errorTips.userLevel}</div>
                </div>
                <div className='item fl all'>
                    <span className='fl'>门户是否可见：</span>
                    <ul className='fl'>
                        {
                            this.state.isVisibleList.map((item,i) => (
                                <li key={i} className='fl'>
                                    <UIRadioBtn s={item.check === 1 ? true : false} onClick={this.checkRadioItem.bind(this,i)}/>
                                    <span>{item.text}</span>
                                </li>
                            ))
                        }
                    </ul>
                    <div className='errorTips'>{this.state.errorTips.isVisible}</div>
                </div>
                <div className='item fl all'>
                    <span className='fl'>使用规则：</span>
                    <textarea className='fl all' maxLength={window.productPackagePageData.describe.maxLength} placeholder={window.productPackagePageData.describe.placeholder} onChange={this.handleChangeDescribe} onBlur={this.handleBlurDescribe} value={this.state.data.describe}></textarea>
                    <div className='errorTips'>{this.state.errorTips.describe}</div>
                </div>
                <div className='item fl all'>
                    <div className='greenBtn fl' onClick={this.submit}>{this.state.data.type ? '修改' : '新增'}</div>
                </div>
            </div>
        );
    }
}

ReactDOM.render((<ProductPackageAdd data={JSON.parse($('#packageData').val())}/>),document.getElementById('app'));
