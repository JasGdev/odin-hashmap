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
		list.append('key1', 5);
		list.append('key2', 7);

		const testNode2 = new Node('key2', 7);
		const testNode1 = new Node('key1', 5, testNode2);
		expect(list.headNode).toEqual(testNode1);
		expect(list.headNode.nextNode).toEqual(testNode2);
	});

	test("adding to Linked List x3", () => {
		list.append('key1', 5);
		list.append('key2', 7);
        list.append('key3', 9);

        const testNode3 = new Node('key3', 9);
		const testNode2 = new Node('key2', 7, testNode3);
		const testNode1 = new Node('key1', 5, testNode2);
		expect(list.headNode).toEqual(testNode1);
		expect(list.headNode.nextNode).toEqual(testNode2);
	});
});
