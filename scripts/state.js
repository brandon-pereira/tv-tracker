import { observable } from 'mobx';
import Storage from './Services/Storage';
import Tracker from './Services/Tracker';

class State {
  @observable tvShows = [];

  constructor() {
    this.tvShows = Storage.getShows();
  }

  @observable addShow(showId) {
    return new Promise((resolve, reject) => {
      Tracker.getShowDetails(showId).then(show => {
        Storage.addShow(show);
        this.tvShows.push(show);
        resolve(show);
      }).catch(err => {
        reject(err);
      });
    });
  }
}

export default State;