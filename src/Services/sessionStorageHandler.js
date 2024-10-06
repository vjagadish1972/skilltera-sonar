const SessionStorageService = (function () {
    let _service;
    function _getService() {
        if (!_service) {
            _service = this;
            return _service;
        }
        return _service;
    }

    //To store token
    function _setToken(token) {
        let temp = JSON.stringify(token);
        sessionStorage.setItem("user_token", temp);
    }
    //To Access the stored token
    function _getAccessToken() {
        return JSON.parse(sessionStorage.getItem("user_token"));
    }
    function _clearToken() {
        sessionStorage.removeItem("user_token");
    }

    function _clear() {
        sessionStorage.clear();
    }

    return {
        getService: _getService,

        setToken: _setToken,
        getAccessToken: _getAccessToken,

        clearToken: _clearToken,
        clear: _clear,
    };
})();

export default SessionStorageService;
