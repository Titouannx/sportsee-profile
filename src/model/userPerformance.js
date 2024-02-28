export default class UserPerformance {
    constructor(data) {
      this._userId = data.userId;
      this._kind = data.kind;
      this._translations = {
        'cardio': 'Cardio',
        'energy': 'Energie',
        'endurance': 'Endurance',
        'strength': 'Force',
        'speed': 'Vitesse',
        'intensity': 'Intensité'
    };
    this._data = data.data.map(item => ({
      value: item.value,
      kind: this._translations[data.kind[item.kind]]
    }));
    }
  
    get userId() {
      return this._userId;
    }
  
    get kind() {
      return this._kind;
    }
  
    get data() {
      return this._data;
    }
  }
  