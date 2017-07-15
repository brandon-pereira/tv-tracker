import { observable } from 'mobx';
import Storage from './Services/Storage';
import Tracker from './Services/Tracker';

class State {
  @observable tvShows = [];

  constructor() {
    this.tvShows = Storage.getShows();
  }

  addShow(showId) {
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
  
  deleteShow(showId) {
    const shows = this.tvShows;
    shows.forEach((show, i) => {
      if(show.id === showId) {
        shows.splice(i, 1);
        Storage.setShows(shows); // we shouldn't need to sort again?
        return true;
      }
    });
    return false;
  }
}

export default State;