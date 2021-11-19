import { makeAutoObservable, runInAction } from "mobx";

export default class ActivityStore {
    activities = [];
    activity = {};

    constructor() {
        makeAutoObservable(this);
    }

    setActivities = value => {
        runInAction(() => {
            this.activities = value;
        })
    }

    setActivity = value => {
        runInAction(() => {
            this.activity = value;
        })
    }
}
