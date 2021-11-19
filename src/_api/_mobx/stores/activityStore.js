import { makeAutoObservable, runInAction } from "mobx";

export default class ActivityStore {
    activities = [];

    constructor() {
        makeAutoObservable(this);
    }

    setActivities = value => {
        runInAction(() => {
            this.activities = value;
        })
    }
}
