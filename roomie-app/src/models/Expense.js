export default class Expense {
    constructor(amount, splitters, reoccuring, due) {
        this.amount = amount;
        this.splitters = splitters;
        this.reoccuring = reoccuring;
        this.due = due;
    }
}