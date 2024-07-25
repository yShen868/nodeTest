class Motion {
    _user;
    _password;
    _fakeIpAddr;
    _logStr;
    _isPhone;
    constructor(user, password) {
        this._user = user;
        this._password = password;
    }


    get fakeIpAddr() {
        return this._fakeIpAddr;
    }

    set fakeIpAddr(value) {
        this._fakeIpAddr = value;
    }

    get logStr() {
        return this._logStr;
    }

    set logStr(value) {
        this._logStr = value;
    }

    get isPhone() {
        return this._isPhone;
    }

    set isPhone(value) {
        this._isPhone = value;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }
}

module.exports = Motion;