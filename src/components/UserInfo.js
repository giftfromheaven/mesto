class UserInfo {
  constructor(name, work) {
    this._name = name;
    this._work = work;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      work: this._work.textContent,
    };

    return userInfo;
  }

  setUserInfo(name, work) {
    this._name.textContent = name;
    this._work.textContent = work;
  }
}

export default UserInfo;
