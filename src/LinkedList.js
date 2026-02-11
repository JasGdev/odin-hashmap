import { Node } from "./Node.js";

export class LinkedList {
	constructor(headNode = null) {
		this.headNode = headNode;
	}

	append(key, val) {
		if (this.headNode == null) {
			this.headNode = new Node(key, val);
		} else {
			let currentNode = this.headNode;
			while (currentNode.nextNode !== null) {
				currentNode = currentNode.nextNode;
			}

			currentNode.nextNode = new Node(key, val);
		}
	}

	prepend(key, val) {
		let prevheadNode = this.headNode;
		this.headNode = new Node(key, val, prevheadNode);
	}

	// Added implementation for use in HashMap
	containKey(k) {
		if (this.headNode == null) {
			return false;
		} else {
			let currentNode = this.headNode;
			while (currentNode.nextNode !== null) {
				if (currentNode.key == k) {
					return true;
				}
				currentNode = currentNode.nextNode;
			}
			if (currentNode.key == k) {
				return true;
			}
			return false;
		}
	}

	updateKey(keyToUpdate, valueToUpdate) {
		if (this.containKey(keyToUpdate) == false) {
			throw new Error("The key is not in the bucket!");
		}
		let currentNode = this.headNode;
		while (currentNode.key != keyToUpdate) {
			currentNode = currentNode.nextNode;
		}
		currentNode.value = valueToUpdate;
	}

	// return value of node at index (undefined if list empty)
	valueAtKey(keyToFind) {
		if (this.containKey(keyToFind) == false) {
			throw new Error("The key is not in the bucket!");
		} else {
			let currentNode = this.headNode;
			while (currentNode.key != keyToFind) {
				currentNode = currentNode.nextNode;
			}
			return currentNode.value;
		}
	}

	// base LinkedList methods
	size() {
		let size = 0;
		if (this.headNode == null) {
			return size;
		}
		let currentNode = this.headNode;
		while (currentNode.nextNode !== null) {
			currentNode = currentNode.nextNode;
			size += 1;
		}
		size += 1;
		return size;
	}

	head() {
		if (this.headNode == null) {
			return undefined;
		} else {
			return this.headNode.value;
		}
	}

	tail() {
		if (this.headNode == null) {
			return undefined;
		} else {
			let currentNode = this.headNode;
			while (currentNode.nextNode !== null) {
				currentNode = currentNode.nextNode;
			}
			return currentNode.value;
		}
	}

	// return value of node at index (undefined if list empty)
	at(index) {
		if (this.headNode == null) {
			return undefined;
		} else if (index < 0 || index >= this.size()) {
			throw new RangeError("Out of range of linked list!");
		} else {
			let currentIndex = 0;
			let currentNode = this.headNode;
			while (currentIndex != index) {
				currentNode = currentNode.nextNode;
				currentIndex += 1;
			}
			return currentNode.value;
		}
	}

	// remove the headNode node from list and return value (undefined if list empty)
	pop() {
		if (this.headNode == null) {
			return undefined;
		} else {
			const newHead = this.headNode.nextNode;
			const returnValue = this.headNode.value;
			this.headNode = newHead;
			return returnValue;
		}
	}

	// return true if the value is in list, false else
	containValue(val) {
		if (this.headNode == null) {
			return false;
		} else {
			let currentNode = this.headNode;
			while (currentNode.nextNode !== null) {
				if (currentNode.value == val) {
					return true;
				}
				currentNode = currentNode.nextNode;
			}
			if (currentNode.value == val) {
				return true;
			}
			return false;
		}
	}

	// return index of first node containing the value, if not found return -1
	findIndexValue(val) {
		if (this.headNode == null) {
			return -1;
		} else {
			let currentIndex = 0;
			let currentNode = this.headNode;
			while (currentNode.nextNode !== null) {
				if (currentNode.value == val) {
					return currentIndex;
				}
				currentIndex += 1;
				currentNode = currentNode.nextNode;
			}
			if (currentNode.value == val) {
				return currentIndex;
			}
			return -1;
		}
	}

	// represent linked list objects as  strings
	// '( value ) -> ( value ) -> ( value ) -> null'
	toString() {
		if (this.headNode == null) {
			return "null";
		} else {
			let currentOutput = "";
			currentOutput = currentOutput.concat(`( ${this.headNode.value} )`);
			let currentNode = this.headNode;
			while (currentNode.nextNode !== null) {
				currentNode = currentNode.nextNode;
				currentOutput = currentOutput.concat(` -> ( ${currentNode.value} )`);
			}
			currentOutput = currentOutput.concat(` -> null`);
			return currentOutput;
		}
	}

	// insert new nodes with the given values at the given index (if index out of bounds throw RangeError)
	insertAt(index, ...values) {
		if (index < 0 || index > this.size()) {
			throw new RangeError("Out of range of linked list!");
		} else if (index == 0) {
			const reversedNewNodesList = [...values].reverse();
			for (const val of reversedNewNodesList) {
				this.prepend(val);
			}
		} else if (index === this.size()) {
			for (const val of values) {
				this.append(val);
			}
		} else {
			// iterate to index
			// store index-1 node and index node
			// make index-1 node nextNode = null
			// append through value of values
			// when appending last value set its nextNode to index node

			let currentIndex = 0;
			let currentNode = this.headNode;
			while (currentIndex != index - 1) {
				currentNode = currentNode.nextNode;
				currentIndex += 1;
			}
			const indexPrevNode = currentNode;
			const indexNode = currentNode.nextNode;
			const lastVal = values.pop();
			indexPrevNode.nextNode = null;
			for (const val of values) {
				this.append(val);
			}
			while (currentNode.nextNode !== null) {
				currentNode = currentNode.nextNode;
			}
			currentNode.nextNode = new Node(lastVal, indexNode);
		}
	}

	// remove node at given index (if index out of bounds throw RangeError)
	removeAt(index) {
		if (index < 0 || index >= this.size() || this.headNode == null) {
			throw new RangeError("Out of range of linked list!");
		} else if (index == 0) {
			this.pop();
			return;
		} else {
			let currentIndex = 0;
			let currentNode = this.headNode;
			while (currentIndex != index - 1) {
				currentNode = currentNode.nextNode;
				currentIndex += 1;
			}
			const prevIndexNode = currentNode;
			const followingIndexNode = currentNode.nextNode.nextNode;
			prevIndexNode.nextNode = followingIndexNode;
		}
	}
}
