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
  
  getAirDate(show) {
    if(show && show.nextepisode && show.nextepisode.airstamp) {
      show.isRefreshing = true;
      import('moment').then(moment => {
        show.isRefreshing = false;
        show.prettyAirDate = moment(show.nextepisode.airstamp).fromNow();
        this.updateShow(show);
      });
    } else {
      show.prettyAirDate = 'TBA';
    }
  }
  
  updateShow(newShow) {
    this.tvShows = this.tvShows.map(currentShow => {
      if(currentShow.id === newShow.id) {
        return newShow;
      }
      return currentShow;
    });
    this.tvShows = Storage.setShows(this.tvShows);
    
  }
  
  refreshShow(show) {
    return new Promise((resolve, reject) => {
      show.isRefreshing = true;
      this.updateShow(show);
      // TODO: Below doesn't actually refresh next episode metadata
      Tracker.getShowById(show.id)
        .then(show => {
          Tracker.getShowDetails(show).then(show => {
            this.getAirDate(show);
            this.updateShow(show);
            resolve(show);
        }).catch(err => {
          reject(err);
        });
      });
    });
  }
  
  refreshShows() {
    this.tvShows.forEach((show) => {
      this.refreshShow(show);
    });
    clearInterval(this.refresher);
    this.refresher = setInterval(() => {
      this.refreshShows();
    }, 30 * 60 * 60 * 1000)
  }
}

export default State;