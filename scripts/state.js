import { observable } from 'mobx';
import Storage from './Services/Storage';
import Tracker from './Services/Tracker';

class State {
  @observable tvShows = [];

  constructor() {
    this.tvShows = Storage.getShows();
    this.refreshShows();
  }

  addShow(showId) {
    return new Promise((resolve, reject) => {
      Tracker.getShowDetails(showId).then(show => {
        this.tvShows = Storage.addShow(show);
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
  
  updateShow(newShow) {
    this.tvShows = this.tvShows.map(currentShow => {
      if(currentShow.id === newShow.id) {
        return newShow;
      }
      return currentShow;
    })
  }
  
  refreshShow(show) {
    return new Promise((resolve, reject) => {
      show.isRefreshing = true;
      this.updateShow(show);
      // TODO: Below doesn't actually refresh next episode metadata
      Tracker.getShowDetails(show).then(show => {
        show.isRefreshing = false;
        this.updateShow(show);
        resolve(show);
      }).catch(err => {
        reject(err);
      });
    });
  }
  
  refreshShows() {
    clearInterval(this.refresher);
    this.refresher = setInterval(() => {
      this.tvShows.forEach((show) => {
        this.refreshShow(show);
      });
    }, 30 * 60 * 60 * 1000)
  }
}

export default State;