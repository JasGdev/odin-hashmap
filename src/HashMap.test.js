import { HashMap } from "./HashMap.js";
import { LinkedList } from "./LinkedList.js";

let hashMap;

beforeEach(() => {
	hashMap = new HashMap(0.75, 16);
});

test("creating hashMap", () => {
	expect(hashMap.bucketArray).toEqual(new Array(16));
});

describe("set() implementation", () => {

	test("set 2 items no collision", () => {
        const key1 = 'Jason'
        const key2 = 'Charles'
		hashMap.set(key1, "22");
		let bucket = new LinkedList();
		bucket.append(key1, "22");
        expect(hashMap.hash(key1) === hashMap.hash(key2)).toBe(false);
		expect(hashMap.currentItems).toBe(1);
        hashMap.set(key2, "33");
        expect(hashMap.currentItems).toBe(2);
        expect(hashMap.hash(key2)).toBe(4);
        expect(hashMap.hash(key1)).toBe(11);
        expect(hashMap.bucketArray[4].toString()).toBe("( 33 ) -> null")
        expect(hashMap.bucketArray[11].toString()).toBe("( 22 ) -> null")
	});

    test("set 2 items with collision same key", () => {
        const key1 = 'Jason'
		hashMap.set(key1, "22");
        hashMap.set(key1, "33");
        expect(hashMap.currentItems).toBe(1);
        expect(hashMap.bucketArray[11].toString()).toBe("( 33 ) -> null")

	});

    test("set 2 items with collision different key", () => {
        const key1 = 'Jason'
        const key2 = 'nosaj'
        expect(hashMap.hash(key1) === hashMap.hash(key2)).toBe(true);
        hashMap.set(key1, "22");
        hashMap.set(key2, "33");
        expect(hashMap.currentItems).toBe(2);
        expect(hashMap.bucketArray[11].toString()).toBe("( 22 ) -> ( 33 ) -> null")
	});
});
