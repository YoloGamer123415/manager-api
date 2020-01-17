/**
 * @typedef {Object} AppointmentTime
 * @property {Date} start
 * @property {Date} end
 */

/**
 * @typedef {Object} AppointmentColor
 * @property {String} foreground
 * @property {String} background
 */

/**
 * @typedef {Object} AppointmentOptions
 * @property {String} id
 * @property {String} title
 * @property {String} [description]
 * @property {String} [location]
 * @property {Array<AppointmentColor>} color
 * @property {AppointmentTime} time
 */

/**
 * idk what to state here :)
 *
 * @class Appointment
 */
class Appointment {
    /**
     * Creates an instance of Appointment.
     * 
     * @param {AppointmentOptions} options
     * @memberof Appointment
     */
    constructor(options) {
        this.id = options.id
        this.title = options.title
        this.description = options.description
        this.location = options.location
        this.color = options.color
        this.time = options.time
    }
}

export default Appointment
