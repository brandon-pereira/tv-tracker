import { observable } from 'mobx';
import Tracker from './Tracker';
import LocalStorage from "./LocalStorage";
import ServerStorage from "./ServerStorage";
import ServiceWorker from './ServiceWorker';

class State {
  @observable tvShows = [];
  @observable notificationStatus = "UNKNOWN";
  @observable isLoggedIn = false;

  constructor() {
    this.localStorage = new LocalStorage("shows");
    this.serverStorage = new ServerStorage();

    this.init();
    this.getPushNotificationStatus();
  }

  /**
   * Method which loads remote user (if logged in)
   * and manages conflicts on shows.
   */
  async init() {
    let data = {};
    try {
      data = await this.serverStorage.init();
    } catch (err) {
      this.isLoggedIn = false;
      this.tvShows = this.localStorage.get();
      this.refreshShows();
      return;
    }
    this.isLoggedIn = true;
    this.tvShows = this.localStorage.get();
    this.refreshShows();
    // this.tvShows = this._merge(data.User.TvShows, this._getLocalStorageShows());
    return;
  }

  /**
   * Method to add a new show
   * @param {Int} show_id
   */
  async addShow(show_id) {
    const show = await Tracker.getShowDetails(show_id);
    this.getAirDate(show);
    await this.serverStorage.addShow(show.id);
    this.tvShows = this.localStorage.add(show.id, show);
  }

  /**
   * Method to delete a show
   * @param {Int} show_id
   */
  async deleteShow(show_id) {
    await this.serverStorage.removeShow(show_id);
    this.tvShows = this.localStorage.remove(show_id);
  }

  /**
   * Method to format next airdate message
   * @param {Object} show
   */
  async getAirDate(show) {
    if (show && show.nextepisode && show.nextepisode.airstamp) {
      show.isRefreshing = true;
      const moment = await import("moment");
      show.isRefreshing = false;
      show.prettyAirDate = moment(show.nextepisode.airstamp).fromNow();
      this.tvShows = this.localStorage.update(show.id, show);
    } else if(show.status === 'Ended') {
      show.prettyAirDate = "Ended";
    } else {
      show.prettyAirDate = "TBA";
    }
  }

  async refreshShow(show) {
    show.isRefreshing = true;
    this.tvShows = this.localStorage.update(show.id, show);
    try {
      show = await Tracker.getShowById(show.id);
      show = await Tracker.getShowDetails(show);
      this.getAirDate(show);
      this.tvShows = this.localStorage.update(show.id, show);
    } catch (err) {
      console.error(`Error refreshing show ${show.id}, got error: `, err);
      show.isRefreshing = false;
      this.tvShows = this.localStorage.update(show.id, show)
    }
    return show;
  }

  refreshShows() {
    this.tvShows.forEach(show => {
      console.log(show);
      this.refreshShow(show);
    });
    clearInterval(this.refresher);
    this.refresher = setInterval(() => {
      this.refreshShows();
    }, 30 * 60 * 60 * 1000);
  }

  getPushNotificationStatus() {
    this.notificationStatus = "UNKNOWN";
    ServiceWorker.subscribeToNotificationUpdates(status => {
      this.notificationStatus = status;
    });
  }

  sortShows(unsortedShows) {
    const TBA_DATE = new Date("01/01/3000");
    return unsortedShows.sort(function(a, b) {
      a = a.nextepisode ? new Date(a.nextepisode.airstamp) : TBA_DATE;
      b = b.nextepisode ? new Date(b.nextepisode.airstamp) : TBA_DATE;
      return a - b;
    });
  }
}

export default State;