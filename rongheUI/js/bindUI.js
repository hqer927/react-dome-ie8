/**
 * Created by hqer on 2017/3/28.
 */
const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const UIItemInputList = require('../componentUI/js/ItemInputList');
const UIDropDown = require('../componentUI/js/DropDown');
const UISearchInput = require('../componentUI/js/SearchInput');
const UISearchBtnInput = require('../componentUI/js/SearchBtnInput');
const UISearchBtnInput1 = require('../componentUI/js/SearchBtnInput1');
const UIInput = require('../componentUI/js/Input');
const UIDropDownInput = require('../componentUI/js/DropDownInput');

window.UI = {
    inputUI:[],
    pullDownUI:[],
    pullDownInputUI:[],
    highChartsUI:[],
    searchInputUI:[],
    searchBtnInputUI:[],
    searchBtnInput1UI:[],
    itemInputUI:[]
};
if (typeof  window.Fun === 'undefined') {
    window.Fun = {};
}
if ($('.inputUI_tab')[0]) {
    $('.inputUI_tab').each(function (_i) {
        const inputUIData = JSON.parse($(this).html());
        if ($(this).attr('Even-key-change') && window.Fun[$(this).attr('Even-key-change')]) {
            inputUIData[window.Fun[$(this).attr('Even-key-change')].key] = window.Fun[$(this).attr('Even-key-change')].fun;
        }
        if ($(this).attr('Even-key-blur') && window.Fun[$(this).attr('Even-key-blur')]) {
            inputUIData[window.Fun[$(this).attr('Even-key-blur')].key] = window.Fun[$(this).attr('Even-key-blur')].fun;
        }
        if ($(this).attr('Even-key-keyUp') && window.Fun[$(this).attr('Even-key-keyUp')]) {
            inputUIData[window.Fun[$(this).attr('Even-key-keyUp')].key] = window.Fun[$(this).attr('Even-key-keyUp')].fun;
        }
        if ($(this).attr('Even-key-focus') && window.Fun[$(this).attr('Even-key-focus')]) {
            inputUIData[window.Fun[$(this).attr('Even-key-focus')].key] = window.Fun[$(this).attr('Even-key-focus')].fun;
        }
        window.UI.inputUI[_i] = ReactDOM.render((<UIInput {...inputUIData}/>),this);
        $(this).show();
    });
}
if ($('.pullDownUI_tab')[0]) {
    $('.pullDownUI_tab').each(function (_i) {
        const pullDownUIData = JSON.parse($(this).html());
        if ($(this).attr('Fun-key') && window.Fun[$(this).attr('Fun-key')]) {
            pullDownUIData[window.Fun[$(this).attr('Fun-key')].key] = window.Fun[$(this).attr('Fun-key')].fun;
        }
        window.UI.pullDownUI[_i] = ReactDOM.render((<UIDropDown {...pullDownUIData}/>),this);
        $(this).show();
    });
}
if ($('.pullDownInputUI_tab')[0]) {
    $('.pullDownInputUI_tab').each(function (_i) {
        const pullDownInputUIData = JSON.parse($(this).html());
        if ($(this).attr('Fun-key') && window.Fun[$(this).attr('Fun-key')]) {
            pullDownInputUIData[window.Fun[$(this).attr('Fun-key')].key] = window.Fun[$(this).attr('Fun-key')].fun;
        }
        window.UI.pullDownInputUI[_i] = ReactDOM.render((<UIDropDownInput {...pullDownInputUIData}/>),this);
        $(this).show();
    });
}
if ($('.searchInputUI_tab')[0]) {
    $('.searchInputUI_tab').each(function (_i) {
        const searchInputUIData = JSON.parse($(this).html());
        if ($(this).attr('Fun-key') && window.Fun[$(this).attr('Fun-key')]) {
            searchInputUIData[window.Fun[$(this).attr('Fun-key')].key] = window.Fun[$(this).attr('Fun-key')].fun;
        }
        window.UI.searchInputUI[_i] = ReactDOM.render((<UISearchInput {...searchInputUIData}/>),this);
        $(this).show();
    });
}
if ($('.searchBtnInputUI_tab')[0]) {
    $('.searchBtnInputUI_tab').each(function (_i) {
        const searchBtnInputUIData = JSON.parse($(this).html());
        if ($(this).attr('Fun-key') && window.Fun[$(this).attr('Fun-key')]) {
            searchBtnInputUIData[window.Fun[$(this).attr('Fun-key')].key] = window.Fun[$(this).attr('Fun-key')].fun;
        }
        if ($(this).attr('Btn-key') && window.Fun[$(this).attr('Btn-key')]) {
            searchBtnInputUIData[window.Fun[$(this).attr('Btn-key')].key] = window.Fun[$(this).attr('Btn-key')].fun;
        }
        window.UI.searchBtnInputUI[_i] = ReactDOM.render((<UISearchBtnInput {...searchBtnInputUIData}/>),this);
        $(this).show();
    });
}
if ($('.searchBtnInput1UI_tab')[0]) {
    $('.searchBtnInput1UI_tab').each(function (_i) {
        const searchBtnInput1UIData = JSON.parse($(this).html());
        if ($(this).attr('Fun-key') && window.Fun[$(this).attr('Fun-key')]) {
            searchBtnInput1UIData[window.Fun[$(this).attr('Fun-key')].key] = window.Fun[$(this).attr('Fun-key')].fun;
        }
        if ($(this).attr('Btn-key') && window.Fun[$(this).attr('Btn-key')]) {
            searchBtnInput1UIData[window.Fun[$(this).attr('Btn-key')].key] = window.Fun[$(this).attr('Btn-key')].fun;
        }
        window.UI.searchBtnInput1UI[_i] = ReactDOM.render((<UISearchBtnInput1 {...searchBtnInput1UIData}/>),this);
        $(this).show();
    });
}

 const setHeight = function () {
    window.parent.global.setDomHeight($('.mainBox').outerHeight(),'mainFrame');
};
if ($('.itemInputUI_tab')[0]) {
    $('.itemInputUI_tab').each(function (_i) {
        const itemInputUIData = JSON.parse($(this).html());
        window.UI.itemInputUI[_i] = ReactDOM.render((<UIItemInputList {...itemInputUIData} callBackFun={setHeight}/>),this);
        $(this).show();
    });
}
