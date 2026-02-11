import { LinkedList } from "./LinkedList.js";

export class HashMap {
	constructor(loadFactor, capacity) {
		this.loadFactor = loadFactor;
		this.capacity = capacity;
		this.bucketArray = new Array(capacity);
		this.growthLimit = this.loadFactor * this.capacity;
		this.currentItems = 0;
	}

	hash(key) {
		let hashCode = 0;
		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
		}
		return hashCode;
	}

	set(key, value) {
		const index = this.hash(key);
		if (index < 0 || index >= this.bucketArray.length) {
			throw new Error("Trying to access index out of bounds");
		}
		if (
			this.bucketArray[index] == undefined ||
			!this.bucketArray[index].containKey(key)
		) {
			this.currentItems += 1;
			if (this.bucketArray[index] == undefined) {
				this.bucketArray[index] = new LinkedList();
			}

			this.bucketArray[index].append(key, value);
		} else if (this.bucketArray[index].containKey(key)) {
			this.bucketArray[index].updateKey(key, value);
		}

		// need to grow buckets to double capacity when hash map reachs loadFactor

		// create new one that is double its size and copy all existing nodes over to the new array, hashing their keys again
		// else if (this.currentItems > this.growthLimit){	}
	}

	// takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null
	get(key) {
		for (const linkedList of this.bucketArray) {
			if (linkedList != undefined) {
				if (linkedList.containKey(key)) {
					return linkedList.valueAtKey(key);
				}
			}
		}

		return null;
	}

	has(key) {}
	remove(key) {}
	length() {}
	clear() {}
	keys() {}
	values() {}
	entries() {}
}

// const hashMap = new HashMap(0.75, 16);
// // console.log(hashMap.hash('Jason'))
// console.log(hashMap.hash('Charles'))
