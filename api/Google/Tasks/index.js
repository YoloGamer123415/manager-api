import Google from "..";
import { google } from "googleapis";

class Tasks extends Google {
    constructor() {
        super();

        this.tasks = google.tasks({
            version: 'v1',
            auth: this.oAuth2Client
        });
    }

    /**
     * Get all the tasks.
     *
     * @param {String?} [nextPageToken=null]
     * @returns {Promise<import('googleapis').tasks_v1.Schema$TaskList[]>}
     * @memberof Tasks
     */
    getAllTasks(nextPageToken = null) {
        return new Promise((resolve, reject) => {
            this.tasks.tasklists.list({
                maxResults: 100,
                pageToken: nextPageToken
            }).then(t => t.data)
                .then(async res => {
                    if (res.nextPageToken) {
                        resolve([ ...res.items, ...await this.getAllTasks(res.nextPageToken) ]);
                    } else {
                        resolve(res.items);
                    }
                })
                .catch(reject);
        });
    }
}

export default Tasks;
