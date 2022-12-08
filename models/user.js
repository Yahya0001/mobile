class User {
    constructor(id, name, age, phoneNumber, state, email, password, rate = 0) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.state = state;
        this.email = email;
        this.password = password;
        this.rate = rate;
    }
}

module.exports = User;