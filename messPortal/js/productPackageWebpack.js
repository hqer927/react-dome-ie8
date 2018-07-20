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
            data: JSON.parse($('#packageData').val()),
            isUseRule:false,
            feeModesList:[],
            isVisibleList:[{check:1,text:'是',value:1},{check:0,text:'否',value:0}],
            ladderPrice:[{amount: '',price: ''}, {amount:'', price: ''}],
            show:{
                validTimeUnit:true,
                productId:false,
                amount:false,
                price:false,
                ladderPrice:false
            },
            unit:{
                amount:'',
                price:'',
                ladderPrice:''
            },
            errorTips:{
                eaPriceName:'',
                eaName:'',
                productId:'',
                feeTypes:'',
                feeModes:'',
                validTime:'',
                price:'',
                amount:'',
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
                amount:false,
                price:false
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
        this.selectFeeTypes = this.selectFeeTypes.bind(this);
        this.selectFeeModes = this.selectFeeModes.bind(this);
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
                url :  productPackagePageData.eaPriceName.actionUrl,
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
        const _feeModesList = [];
        for (let i = 0;i < productPackagePageData.feeModes.listRule.length;i++) {
            if (newData.eaName.v === productPackagePageData.feeModes.listRule[i].eaName) {
                newData.feeModes.a.map((item) => {
                    if (productPackagePageData.feeModes.listRule[i].result.find((n) => (n === item.v))) {
                        _feeModesList.push(item);
                    }
                });
                break;
            }
        }
        let isChangeFeeModes = true;
        if (_feeModesList.find((n) => (n.v === newData.feeModes.v))) {
            isChangeFeeModes = false;
        }
        if (isChangeFeeModes) {
            newData.feeModes.v = _feeModesList[0].v;
        }
        const newShow = {
            validTimeUnit:true,
            productId:false,
            amount:false,
            price:false,
            ladderPrice:false
        };
        for (let i = 0;i < productPackagePageData.productId.showRule.length;i++) {
            if (newData.eaName.v === productPackagePageData.productId.showRule[i].eaName) {
                newShow.productId = productPackagePageData.productId.showRule[i].result;
                break;
            }
        }
        for (let i = 0;i < productPackagePageData.amount.showRule.length;i++) {
            if (newData.feeTypes.v === productPackagePageData.amount.showRule[i].feeTypes) {
                newShow.amount = productPackagePageData.amount.showRule[i].result;
                break;
            }
        }
        for (let i = 0;i < productPackagePageData.price.showRule.length;i++) {
            if (newData.feeTypes.v === productPackagePageData.price.showRule[i].feeTypes) {
                newShow.price = productPackagePageData.price.showRule[i].result;
                break;
            }
        }
        for (let i = 0;i < productPackagePageData.ladderPrice.showRule.length;i++) {
            if (newData.feeTypes.v === productPackagePageData.ladderPrice.showRule[i].feeTypes) {
                newShow.ladderPrice = productPackagePageData.ladderPrice.showRule[i].result;
                break;
            }
        }
        const newUnit = {
            amount:'',
            price:'',
            ladderPrice:''
        };
        for (let i = 0;i < productPackagePageData.amount.unitRule.length;i++) {
            if (newData.feeTypes.v === productPackagePageData.amount.unitRule[i].feeTypes && newData.feeModes.v === productPackagePageData.amount.unitRule[i].feeModes) {
                newUnit.amount = productPackagePageData.amount.unitRule[i].result;
                break;
            }
        }
        for (let i = 0;i < productPackagePageData.price.unitRule.length;i++) {
            if (newData.feeTypes.v === productPackagePageData.price.unitRule[i].feeTypes && newData.feeModes.v === productPackagePageData.price.unitRule[i].feeModes) {
                newUnit.price = productPackagePageData.price.unitRule[i].result;
                break;
            }
        }
        for (let i = 0;i < productPackagePageData.ladderPrice.unitRule.length;i++) {
            if (newData.feeTypes.v === productPackagePageData.ladderPrice.unitRule[i].feeTypes && newData.feeModes.v === productPackagePageData.ladderPrice.unitRule[i].feeModes) {
                newUnit.ladderPrice = productPackagePageData.ladderPrice.unitRule[i].result;
                break;
            }
        }
        this.setState({data:newData,feeModesList:_feeModesList,show:newShow,unit:newUnit,isUseRule:false});
    }
    componentWillMount () {
        this.rule(this.state.data);
        const _isSubmit = Object.assign({},this.state.isSubmit);
        const _isVisibleList = [...this.state.isVisibleList];
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
        this.setState({isSubmit:_isSubmit,isVisibleList:_isVisibleList});
    }
    shouldComponentUpdate (newProps, newState) {
        if (newState.isUseRule) {
            this.rule(newState.data);
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
        /*        if (prevState.isSubmit != this.state.isSubmit) {
            if (this.state.isSubmit) {
                $('#submit').removeClass('disabled');
            } else {
                $('#submit').addClass('disabled');
            }
        }*/
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
    returnPriceValue (_obj) {
        const newData = Object.assign({},this.state.data);
        const _errorTips = Object.assign({},this.state.errorTips);
        const _isSubmit = Object.assign({},this.state.isSubmit);
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
        this.setState({data:newData,errorTips:_errorTips,isSubmit:_isSubmit});
    }
    returnAmountValue (_obj) {
        const newData = Object.assign({},this.state.data);
        const _errorTips = Object.assign({},this.state.errorTips);
        const _isSubmit = Object.assign({},this.state.isSubmit);
        if (_obj.state.v === '') {
            newData.amount = '';
            _errorTips.amount = '* 规格不能为空';
            _isSubmit.amount = false;
        } else {
            newData.amount = _obj.state.v;
            _errorTips.amount = '';
            _isSubmit.amount = true;
        }
        this.setState({data:newData,errorTips:_errorTips,isSubmit:_isSubmit});
    }

    selectEaName (_obj) {
        const newData = Object.assign({},this.state.data);
        if (newData.eaName.v !== _obj.state.v) {
            newData.eaName.v = _obj.state.v;
            this.setState({data:newData,isUseRule:true});
        }
    }
    selectFeeTypes (_obj) {
        const newData = Object.assign({},this.state.data);
        if (newData.feeTypes.v !== _obj.state.v) {
            newData.feeTypes.v = _obj.state.v;
            this.setState({data:newData,isUseRule:true});
        }
    }
    selectFeeModes (_obj) {
        const newData = Object.assign({},this.state.data);
        if (newData.feeModes.v !== _obj.state.v) {
            newData.feeModes.v = _obj.state.v;
            this.setState({data:newData,isUseRule:true});
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
                        maxLength={productPackagePageData.eaPriceName.maxLength}
                        placeholder={productPackagePageData.eaPriceName.placeholder}
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
                {this.state.show.productId ? (
                    <div className='item fl'>
                        <span>产品ID：</span>
                        <input
                            type='text'
                            className='inputBtn'
                            value={this.state.data.productId}
                            maxLength={productPackagePageData.productId.maxLength}
                            placeholder={productPackagePageData.productId.placeholder}
                            onChange={this.handleChangeProductId}
                            onBlur={this.handleBlurProductIde}
                        />
                        <div className='errorTips'>{this.state.errorTips.productId}</div>
                    </div>
                ) : ''}
                <div className='item fl'>
                    <span>计费类型：</span>
                    <UIDropDown className='inputBtn' v={this.state.data.feeTypes.v} a={this.state.data.feeTypes.a} returnValue={this.selectFeeTypes}/>
                    <div className='errorTips'>{this.state.errorTips.feeTypes}</div>
                </div>
                <div className='item fl'>
                    <span>计费方式：</span>
                    <UIDropDown className='inputBtn' v={this.state.data.feeModes.v} a={this.state.feeModesList} returnValue={this.selectFeeModes}/>
                    <div className='errorTips'>{this.state.errorTips.feeModes}</div>
                </div>
                <div className='item fl'>
                    <span>使用有效期：</span>
                    <input
                        type='text'
                        className='inputBtn small'
                        value={this.state.data.validTime.value}
                        maxLength={productPackagePageData.validTime.maxLength}
                        placeholder={productPackagePageData.validTime.placeholder}
                        onChange={this.handleChangeValidTime}
                        onBlur={this.handleBlurValidTime}
                    />
                    {this.state.show.validTimeUnit ? (
                        <UIDropDown className='inputBtn small' v={this.state.data.validTime.unit.v} a={this.state.data.validTime.unit.a} returnValue={this.selectValidTimeUnit}/>
                    ) : ''}
                    <div className='underTips'>{productPackagePageData.validTime.underTips}</div>
                    <div className='errorTips'>{this.state.errorTips.validTime}</div>
                </div>
                {this.state.show.price ? (
                    <div className='item fl'>
                        <span>价格：</span>
                        <UIInput type='money' className='inputBtn' maxValue={productPackagePageData.price.maxValue} maxLength={productPackagePageData.price.maxLength} placeholder={productPackagePageData.price.placeholder} v={typeof this.state.data.price === 'number' ? this.state.data.price.toFixed(2) : this.state.data.price} onBlur={this.returnPriceValue}/>
                        <span>{this.state.unit.price}</span>
                        <div className='errorTips'>{this.state.errorTips.price}</div>
                    </div>
                ) : ''}
                {this.state.show.amount ? (
                    <div className='item fl'>
                        <span>规格：</span>
                        <UIInput type='positiveInt' className='inputBtn' maxValue={productPackagePageData.amount.maxValue} maxLength={productPackagePageData.amount.maxLength} placeholder={productPackagePageData.amount.placeholder} v={this.state.data.amount} onBlur={this.returnAmountValue}/>
                        <span>{this.state.unit.amount}</span>
                        <div className='errorTips'>{this.state.errorTips.amount}</div>
                    </div>
                ) : ''}
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
                                                                <UIInput type='money' className='inputBtn small' maxValue={productPackagePageData.ladderPrice.price.maxValue} maxLength={productPackagePageData.ladderPrice.price.maxLength} placeholder={productPackagePageData.ladderPrice.price.placeholder} v={typeof item.price === 'number' ? item.price.toFixed(2) : item.price} onBlur={this.returnLadderPricePriceValue.bind(this,i)}/>
                                                            </td>
                                                            <td>
                                                                {
                                                                    i < productPackagePageData.ladderPrice.maxItem ? (
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
                                                                <UIInput type='positiveInt' className='inputBtn small' maxValue={productPackagePageData.ladderPrice.amount.maxValue} maxLength={productPackagePageData.ladderPrice.amount.maxLength} placeholder={productPackagePageData.ladderPrice.amount.placeholder} v={item.amount} onBlur={this.returnLadderPriceAmountValue.bind(this,i)}/>
                                                            </td>
                                                            <td>
                                                                <UIInput type='money' className='inputBtn small' maxValue={productPackagePageData.ladderPrice.price.maxValue} maxLength={productPackagePageData.ladderPrice.price.maxLength} placeholder={productPackagePageData.ladderPrice.price.placeholder} v={typeof item.price === 'number' ? item.price.toFixed(2) : item.price} onBlur={this.returnLadderPricePriceValue.bind(this,i)}/>
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
                                                    <UIInput type='positiveInt' className='inputBtn small' v={this.state.ladderPrice[0].amount} maxValue={productPackagePageData.ladderPrice.amount.maxValue} maxLength={productPackagePageData.ladderPrice.amount.maxLength} placeholder={productPackagePageData.ladderPrice.amount.placeholder} onBlur={this.returnLadderPriceAmountValueNew.bind(this,0)}/>
                                                </td>
                                                <td>
                                                    <UIInput type='money' className='inputBtn small' v={typeof this.state.ladderPrice[0].price === 'number' ? this.state.ladderPrice[0].price.toFixed(2) : this.state.ladderPrice[0].price} maxValue={productPackagePageData.ladderPrice.price.maxValue} maxLength={productPackagePageData.ladderPrice.price.maxLength} placeholder={productPackagePageData.ladderPrice.price.placeholder} onBlur={this.returnLadderPricePriceValueNew.bind(this,0)}/>
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
                                                    <UIInput type='money' className='inputBtn small' v={typeof this.state.ladderPrice[1].price === 'number' ? this.state.ladderPrice[1].price.toFixed(2) : this.state.ladderPrice[1].price} maxValue={productPackagePageData.ladderPrice.price.maxValue} maxLength={productPackagePageData.ladderPrice.price.maxLength} placeholder={productPackagePageData.ladderPrice.price.placeholder} onBlur={this.returnLadderPricePriceValueNew.bind(this,1)}/>
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
                <div className='item fl all'>
                    <span className='fl'>使用规则：</span>
                    <textarea className='fl all' maxLength={productPackagePageData.describe.maxLength} placeholder={productPackagePageData.describe.placeholder} onChange={this.handleChangeDescribe} onBlur={this.handleBlurDescribe} value={this.state.data.describe}></textarea>
                    <div className='errorTips'>{this.state.errorTips.describe}</div>
                </div>
                <div className='item fl all'>
                    <div className='greenBtn fl' onClick={this.submit}>{this.state.data.type ? '修改' : '新增'}</div>
                </div>
            </div>
        );
    }
}

ReactDOM.render((<ProductPackageAdd/>),document.getElementById('app'));
