/**
 * @typedef {Object} TaskOptions
 * @property {String} id
 * @property {String} title
 * @property {Boolean} completed
 * @property {Date} [due]
 */

class Task {
    /**
     * Creates an instance of Task.
     * 
     * @param {TaskOptions} options
     * @memberof Task
     */
    constructor(options) {
        this.id = options.id;
        this.title = options.title;
        this.completed = options.completed;
        this.due = options.due;

        /**
         * @type {Task[]}
         */
        this.childs =  [];
    }

    addChild(task) {
        this.childs.push(task);
    }
}

export default Task;
