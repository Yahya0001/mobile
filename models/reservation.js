class Reservation {
    constructor(id, start_date, end_date, customer_id, housekeeper_id, type, state) {
        this.id = id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.customer_id = customer_id;
        this.state = state;
        this.housekeeper_id = housekeeper_id;
        this.type = type;
    }
}

module.exports = Reservation;