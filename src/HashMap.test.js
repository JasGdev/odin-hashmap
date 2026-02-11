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
		const key1 = "Jason";
		const key2 = "Charles";
		hashMap.set(key1, "22");
		let bucket = new LinkedList();
		bucket.append(key1, "22");
		expect(hashMap.hash(key1) === hashMap.hash(key2)).toBe(false);
		expect(hashMap.currentItems).toBe(1);
		hashMap.set(key2, "33");
		expect(hashMap.currentItems).toBe(2);
		expect(hashMap.hash(key2)).toBe(4);
		expect(hashMap.hash(key1)).toBe(11);
		expect(hashMap.bucketArray[4].toString()).toBe("( 33 ) -> null");
		expect(hashMap.bucketArray[11].toString()).toBe("( 22 ) -> null");
	});

	test("set 2 items with collision same key", () => {
		const key1 = "Jason";
		hashMap.set(key1, "22");
		hashMap.set(key1, "33");
		expect(hashMap.currentItems).toBe(1);
		expect(hashMap.bucketArray[11].toString()).toBe("( 33 ) -> null");
	});

	test("set 2 items with collision different key", () => {
		const key1 = "Jason";
		const key2 = "nosaj";
		expect(hashMap.hash(key1) === hashMap.hash(key2)).toBe(true);
		hashMap.set(key1, "22");
		hashMap.set(key2, "33");
		expect(hashMap.currentItems).toBe(2);
		expect(hashMap.bucketArray[11].toString()).toBe("( 22 ) -> ( 33 ) -> null");
	});
});

describe("get(), has() implementation", () => {
	test("get on 2 items no collision", () => {
		const key1 = "Jason";
		const key2 = "Charles";
		hashMap.set(key1, "22");
		hashMap.set(key2, "33");
		expect(hashMap.bucketArray[4].toString()).toBe("( 33 ) -> null");
		expect(hashMap.bucketArray[11].toString()).toBe("( 22 ) -> null");

		expect(hashMap.get(key1)).toBe("22");
		expect(hashMap.get(key2)).toBe("33");
		expect(hashMap.get("Kas")).toBe(null);

		expect(hashMap.has(key1)).toBe(true);
		expect(hashMap.has(key2)).toBe(true);
		expect(hashMap.has("22")).toBe(false);
	});

	test("get on 2 items with collision different key", () => {
		const key1 = "Jason";
		const key2 = "nosaj";

		hashMap.set(key1, "22");
		hashMap.set(key2, "33");

		expect(hashMap.bucketArray[11].toString()).toBe("( 22 ) -> ( 33 ) -> null");
		expect(hashMap.get(key1)).toBe("22");
		expect(hashMap.get(key2)).toBe("33");
		expect(hashMap.get("aaaa")).toBe(null);

		expect(hashMap.has(key1)).toBe(true);
		expect(hashMap.has(key2)).toBe(true);
		expect(hashMap.has("22")).toBe(false);
	});
});

describe("remove() implementation", () => {
	test("remove on 2 items no collision", () => {
		const key1 = "Jason";
		const key2 = "Charles";
		hashMap.set(key1, "22");
		hashMap.set(key2, "33");
		expect(hashMap.bucketArray[4].toString()).toBe("( 33 ) -> null");
		expect(hashMap.bucketArray[11].toString()).toBe("( 22 ) -> null");

		expect(hashMap.remove(key1)).toBe(true);
		expect(hashMap.remove(key2)).toBe(true);
		expect(hashMap.bucketArray[11].toString()).toBe("null");
		expect(hashMap.bucketArray[4].toString()).toBe("null");
		expect(hashMap.remove(key2)).toBe(false);
	});
});

describe("length() implementation", () => {
	test("length on 2 items no collision", () => {
		const key1 = "Jason";
		const key2 = "Charles";
		expect(hashMap.length()).toBe(0);
		hashMap.set(key1, "22");
		expect(hashMap.length()).toBe(1);
		hashMap.set(key2, "33");
		expect(hashMap.length()).toBe(2);

		expect(hashMap.remove(key1)).toBe(true);
		expect(hashMap.length()).toBe(1);
		expect(hashMap.remove(key2)).toBe(true);
		expect(hashMap.length()).toBe(0);
	});
});

describe("clear() implementation", () => {
	test("length on 2 items no collision", () => {
		const key1 = "Jason";
		const key2 = "Charles";
		expect(hashMap.length()).toBe(0);
		hashMap.set(key1, "22");
		expect(hashMap.length()).toBe(1);
		hashMap.set(key2, "33");
		expect(hashMap.length()).toBe(2);

		let newHashMap = new HashMap(0.75, 16);

		hashMap.clear();

		expect(hashMap.currentItems == newHashMap.currentItems).toEqual(true);
		expect(hashMap.bucketArray.every((bucket) => bucket == null)).toEqual(true);
		expect(hashMap.bucketArray.length == hashMap.defaultCapacity).toEqual(true);
		expect(hashMap.currentCapacity == newHashMap.currentCapacity).toEqual(true);
		expect(hashMap.defaultCapacity == newHashMap.defaultCapacity).toEqual(true);
	});
});

describe("keys(), values(), entries() implementation", () => {
	test("keys(), values(), entries() on a hashmap size 3 no collision", () => {
		hashMap.set("one", "1");
		hashMap.set("two", "2");
		hashMap.set("three", "3");

		expect(hashMap.hash("one")).toBe(6);
		expect(hashMap.hash("two")).toBe(12);
		expect(hashMap.hash("three")).toBe(14);

		expect(hashMap.keys()).toEqual(["one", "two", "three"]);
		expect(hashMap.values()).toEqual(["1", "2", "3"]);
		expect(hashMap.entries()).toEqual([
			["one", "1"],
			["two", "2"],
			["three", "3"],
		]);
	});
});

describe("growHashMap() implementation", () => {
	test("growHashMap()", () => {
		hashMap.set("apple", "red");
		hashMap.set("banana", "yellow");
		hashMap.set("carrot", "orange");
		hashMap.set("dog", "brown");
		hashMap.set("elephant", "gray");
		hashMap.set("frog", "green");
		hashMap.set("grape", "purple");
		hashMap.set("hat", "black");
		hashMap.set("ice cream", "white");
		hashMap.set("jacket", "blue");
		hashMap.set("kite", "pink");
		hashMap.set("lion", "golden");
		expect(hashMap.length()).toBe(12);
		expect(hashMap.currentCapacity).toBe(16);
		hashMap.set("kite", "gold");
		hashMap.set("lion", "black");
		expect(hashMap.length()).toBe(12);
		expect(hashMap.currentCapacity).toBe(16);
		hashMap.set("moon", "silver");
		expect(hashMap.length()).toBe(13);
		expect(hashMap.currentCapacity).toBe(32);
	});

	test("all entries accessible after grow", () => {
		hashMap.set("apple", "red");
		hashMap.set("banana", "yellow");
		hashMap.set("carrot", "orange");
		hashMap.set("dog", "brown");
		hashMap.set("elephant", "gray");
		hashMap.set("frog", "green");
		hashMap.set("grape", "purple");
		hashMap.set("hat", "black");
		hashMap.set("ice cream", "white");
		hashMap.set("jacket", "blue");
		hashMap.set("kite", "pink");
		hashMap.set("lion", "golden");

		hashMap.set("moon", "silver"); // triggers grow

		expect(hashMap.get("apple")).toBe("red");
		expect(hashMap.get("banana")).toBe("yellow");
		expect(hashMap.get("moon")).toBe("silver");
		expect(hashMap.get("lion")).toBe("golden");
	});

	test("collision still works after grow", () => {
		hashMap.set("Jason", "22");
		hashMap.set("nosaj", "33"); // collision

		hashMap.set("apple", "red");
		hashMap.set("banana", "yellow");
		hashMap.set("carrot", "orange");
		hashMap.set("dog", "brown");
		hashMap.set("elephant", "gray");
		hashMap.set("frog", "green");
		hashMap.set("grape", "purple");
		hashMap.set("hat", "black");
		hashMap.set("ice cream", "white");
		hashMap.set("jacket", "blue");
		hashMap.set("kite", "pink");

		hashMap.set("moon", "silver"); // grow

		expect(hashMap.get("Jason")).toBe("22");
		expect(hashMap.get("nosaj")).toBe("33");
	});
});
