import FirebaseFunctions from '../firebase/firebaseHelper'
export default class User {
    constructor(name, houseRef) {
        this.name = name;
        this.houseRef = houseRef
        this.FirebaseHelper = new FirebaseFunctions();
    }

    getName = () => this.name;
    getHouse = () => this.FirebaseHelper.getHouse(this.houseRef);
}