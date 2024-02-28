export default class user {
    constructor(data) {
      this._id = data.id;
      this._userInfos = data.userInfos;
      this._todayScore = data.todayScore || data.score;
      this._keyData = data.keyData;
    }
  
    get id() {
      return this._id;
    }
  
    get firstName() {
      return this._userInfos.firstName;
    }
  
    get lastName() {
      return this._userInfos.lastName;
    }
  
    get age() {
      return this._userInfos.age;
    }
  
    get todayScore() {
      return this._todayScore;
    }
  
    get calorieCount() {
      return this._keyData.calorieCount.toLocaleString("en-US");
    }
  
    get proteinCount() {
      return this._keyData.proteinCount.toLocaleString("en-US");
    }
  
    get carbohydrateCount() {
      return this._keyData.carbohydrateCount.toLocaleString("en-US");
    }
  
    get lipidCount() {
      return this._keyData.lipidCount.toLocaleString("en-US");
    }
  }
  