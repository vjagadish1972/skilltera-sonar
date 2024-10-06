const LocalStorageService = (function () {
    let _service;
    function _getService() {
        if (!_service) {
            _service = this;
            return _service;
        }
        return _service;
    }

    //To store token
    function _setPermissions(data) {
        let tempPerms = JSON.stringify(data);
        localStorage.setItem("permissions", tempPerms);
    }
    //To Access the stored token
    function _getPermissions() {
        return JSON.parse(localStorage.getItem("permissions"));
    }

    function _clear() {
        localStorage.clear();
        sessionStorage.clear();
    }

    return {
        getService: _getService,

        setPermissions: _setPermissions,
        getPermissions: _getPermissions,

        clear: _clear,
    };
})();

export default LocalStorageService;
