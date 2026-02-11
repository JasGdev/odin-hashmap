import { LinkedList } from "./LinkedList.js";
import { Node } from "./Node.js";

let list;

beforeEach(() => {
	list = new LinkedList();
});

test("creating Linked list", () => {
	expect(list.headNode).toEqual(null);
});

describe("append() implementation", () => {
	test("adding to Linked List x2", () => {
		list.append("key1", 5);
		list.append("key2", 7);

		const testNode2 = new Node("key2", 7);
		const testNode1 = new Node("key1", 5, testNode2);
		expect(list.headNode).toEqual(testNode1);
		expect(list.headNode.nextNode).toEqual(testNode2);
	});

	test("adding to Linked List x3", () => {
		list.append("key1", 5);
		list.append("key2", 7);
		list.append("key3", 9);

		const testNode3 = new Node("key3", 9);
		const testNode2 = new Node("key2", 7, testNode3);
		const testNode1 = new Node("key1", 5, testNode2);
		expect(list.headNode).toEqual(testNode1);
		expect(list.headNode.nextNode).toEqual(testNode2);
	});
});

describe("containKey() implementation", () => {
	test("containKey on a Linked List size 2", () => {
		list.append("key1", 5);
		list.append("key2", 7);

		expect(list.containKey("key1")).toBe(true);
		expect(list.containKey("key3")).toBe(false);
	});
});

describe("updateKey() implementation", () => {
	test("updateKey() on a Linked List size 2", () => {
		list.append("key1", 5);
		list.append("key2", 7);

		const testNode2 = new Node("key2", 7);
		const testNode1 = new Node("key1", 5, testNode2);

		expect(list.headNode).toEqual(testNode1);
		expect(list.headNode.nextNode).toEqual(testNode2);

        list.updateKey('key1', 10)
        expect(list.headNode.key).toEqual('key1');
        expect(list.headNode.value).toEqual(10);

        expect(() => {
			list.updateKey('key3', 10);
		}).toThrow(new Error("The key is not in the bucket!"));

        list.updateKey('key2', 1)
        expect(list.headNode.nextNode.key).toEqual('key2');
        expect(list.headNode.nextNode.value).toEqual(1);



	});
});

describe("valueAtKey() implementation", () => {
	test("valueAtKey() on a Linked List size 2", () => {
		list.append("key1", 5);
		list.append("key2", 7);

        expect(list.valueAtKey("key1")).toEqual(5);
        expect(list.valueAtKey("key2")).toEqual(7);

		list.updateKey('key2', 1)
		expect(list.valueAtKey("key2")).toEqual(1);
	});
});

describe("findIndexKey() implementation", () => {
	test("findIndexKey() on a Linked List size 3", () => {
		list.append("key1", 5);
		list.append("key2", 7);
		list.append("key3", 7);

		expect(list.findIndexKey("key3")).toEqual(2);
		expect(list.findIndexKey("key2")).toEqual(1);
		expect(list.findIndexKey("key1")).toEqual(0);
	});
});

describe("removeAtKey() implementation", () => {
	test("removeAtKey() on a Linked List size 3", () => {
		list.append("key1", 1);
		list.append("key2", 2);
		list.append("key3", 3);
		
		expect(list.toString()).toEqual( "( 1 ) -> ( 2 ) -> ( 3 ) -> null");
		list.removeAtKey("key3")
		expect(list.toString()).toEqual( "( 1 ) -> ( 2 ) -> null");
	});
});