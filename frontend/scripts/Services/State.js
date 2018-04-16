import { observable } from 'mobx';
import Tracker from './Tracker';
import LocalStorage from "./LocalStorage";
import ServerStorage from "./ServerStorage";
import ServiceWorker from './ServiceWorker';

class State {
  @observable tvShows = [];
  @observable notificationStatus = "UNKNOWN";
  @observable isLoggedIn = false;
  @observable isSyncing = true;

  constructor() {
    this.localStorage = new LocalStorage("shows", {
      sortMethod: this.sortShows,
      uniqueOnly: true
    });
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
      console.log(this.localStorage.get());
      this.isSyncing = false;
      this.refreshShows();
      return;
    }
    this.isLoggedIn = true;
    this.tvShows = await this._merge(data.User.TvShows, this.localStorage.get());
    this.refreshShows();
    this.isSyncing = false;
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
    } else if (show.status === "Ended") {
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
      this.tvShows = this.localStorage.update(show.id, show);
    }
    return show;
  }

  // For each remote and local, verify in both remote and local.
  // Never delete, only add.
  async _merge(remote, local) {
    // Possible cases:
    // 1. User only used localStorage and then signed up. localStorage is ahead.
    // 2. User has account, but went offline. localStorage is ahead.
    // 3. User has shows on 2 devices, we need to sync them. Both ahead.
    // For each remote and local, verify in both remote and local.
    // Never delete, only add.
    if(remote.length !== local.length) {
      console.log("MERGE");
      for(let show of remote) {
        show = await Tracker.getShowById(show.id);
        show = await Tracker.getShowDetails(show);
        this.getAirDate(show);
        this.localStorage.add(show.id, show);
      }
      for(let show of local) {
        await this.serverStorage.addShow(show.id);
      }
    }
    return this.localStorage.get();
  }

  refreshShows() {
    this.tvShows.forEach(show => {
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

  // TODO: Sort by name and if ended as well
  sortShows(unsortedShows) {
    const TBA_DATE = new Date("01/01/3000");
    return unsortedShows.sort(function(a, b) {
      a = a.value.nextepisode
        ? new Date(a.value.nextepisode.airstamp)
        : TBA_DATE;
      b = b.value.nextepisode
        ? new Date(b.value.nextepisode.airstamp)
        : TBA_DATE;
      return a - b;
    });
  }
}

export default State;