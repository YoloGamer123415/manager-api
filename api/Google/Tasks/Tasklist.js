/**
 * @typedef {Object} TasklistOptions
 * @property {String} id
 * @property {String} title
 * @property {Date} updated
 */

class Tasklist {
    /**
     * Creates an instance of Tasklist.
     * 
     * @param {TasklistOptions} options
     * @memberof Tasklist
     */
    constructor(options) {
        this.id = options.id;
        this.title = options.title;
        this.updated = options.updated;
    }
}

export default Tasklist
