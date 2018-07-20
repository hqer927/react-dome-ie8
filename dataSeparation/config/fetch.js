/**
 * Created by hqer on 2017/11/8.
 */
module.exports = {
    set (_url,_data) {
        function checkStatus (response) {
            if (response.status >= 200 && response.status < 300) {
                return response;
            } else {
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        }
        function parseJSON (response) {
            window.GLOBAL.token = response.headers.get('token');
            if (response && response.sessionOut) {
                window.GLOBAL.isLogin = 0;
            }
            return response.json();
        }
        /* 用于不跨越，token放在header中*/
        /*        let myHeaders = new Headers();
        myHeaders.append('token', GLOBAL.token);
        _data.headers = myHeaders;
        _data.credentials = "same-origin";*/
        /* 用于跨域，token放在body中*/
        /*        let dataBody = Object.assign({token: GLOBAL.token},JSON.parse(_data.body));
        _data.body = JSON.stringify(dataBody);*/
        const req = new Request(_url,_data);
        return fetch(req)
            .then(checkStatus)
            .then(parseJSON);
    }
};
