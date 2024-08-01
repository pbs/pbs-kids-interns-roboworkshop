export class gameMath {

    // static keyword allows functions to be used without instantiating class
    // it asserts that the functions act the same across all instantions

    static calculateDistance(object1, object2) {
        return Math.sqrt(Math.pow(object1.x - object2.x, 2) + Math.pow(object1.y - object2.y, 2));
    }

    static collision(object1, object2) {
        return (object1.x + object1.width > object2.x) && (object1.x < object2.x + object2.width)
            && (object1.y + object1.height > object2.y) && (object1.y < object2.y + object2.height);
    }

}
