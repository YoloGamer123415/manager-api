import Google from "..";
import Tasklist from "./Tasklist";
import { google } from "googleapis";
import Task from "./Task";

/**
 * Parse the tasks returned by the Google api into a format we can use on the website.
 *
 * @param {import('googleapis').tasks_v1.Schema$Task[]} tasks
 * @returns {Task[]}
 */
function parseTasks(tasks) {
    /**
     * @type {Map<String, Task>}
     */
    let taskMap = new Map();
    /**
     * @type {import('googleapis').tasks_v1.Schema$Task[]}
     */
    let buffer = [];

    tasks.forEach(task => {
        if (task.parent && !taskMap.has(task.parent) ) {
            buffer.push(task);
        } else
        if (task.parent && taskMap.has(task.parent) ) {
            taskMap.get(task.parent).addChild( new Task(task) );
        } else {
            taskMap.set(task.id, new Task(task) );
        }
    });

    buffer.forEach(task => {
        if ( !taskMap.has(task.parent) )
            throw new Error(`taskMap has no task with id "${task.parent}"`);

        taskMap.get(task.parent).addChild( new Task(task) );
    });


    return [ ...taskMap.values() ];
}

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
     * @returns {Promise<Tasklist[]>}
     * @memberof Tasks
     */
    getAllTasklists(nextPageToken = null) {
        return new Promise((resolve, reject) => {
            this.tasks.tasklists.list({
                maxResults: 100,
                pageToken: nextPageToken
            }).then(t => t.data)
                .then(async res => {
                    let lists = [];

                    res.items.forEach(task => {
                        lists.push( new Tasklist(task) );
                    });

                    if (res.nextPageToken) {
                        resolve([ ...lists, ...await this.getAllTasklists(res.nextPageToken) ]);
                    } else {
                        resolve(lists);
                    }
                })
                .catch(reject);
        });
    }

    getAllTasks(id, nextPageToken = null) {
        return new Promise((resolve, reject) => {
            this.tasks.tasks.list({
                tasklist: id,
                maxResults: 100,
                pageToken: nextPageToken
            }).then(t => t.data)
                .then(async res => {
                    let tasks = parseTasks(res.items);

                    if (res.nextPageToken) {
                        resolve([ ...tasks, ...await this.getAllTasks(id, res.nextPageToken) ]);
                    } else {
                        resolve(tasks);
                    }
                })
                .catch(reject);
        });
    }
}

export default Tasks;
