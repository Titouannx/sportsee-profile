export default class UserAverageSession {
    constructor(data) {
      this._userId = data.userId;
      this._sessions = data.sessions.map(session => ({
        day: session.day,
        sessionLength: session.sessionLength
      }));
    }
  
    get userId() {
      return this._userId;
    }
  
    get sessions() {
      return this._sessions;
    }
  }
  