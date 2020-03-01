/**
 * @typedef {Object} Color
 * @property {String} foreground
 * @property {String} background
 */

/**
 * @typedef {Object} CalendarOptions
 * @property {String} id
 * @property {String} timezone
 * @property {String} summary
 * @property {Boolean} hidden
 * @property {Color} color
 */

class Calendar {
    /**
     * Creates an instance of Calendar.
     * 
     * @param {CalendarOptions} options
     * @memberof Calendar
     */
    constructor(options) {
        this.id = options.id;
        this.timezone = options.timezone;
        this.summary = options.summary;
        this.hidden = options.hidden
        this.color = options.color;
    }
}

export default Calendar;
