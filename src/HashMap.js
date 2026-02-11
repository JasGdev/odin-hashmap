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
		const index = hash(key);
		if (index < 0 || index >= buckets.length) {
			throw new Error("Trying to access index out of bounds");
		}
		// add key value pair to bucket using its hash(key) to determine index
		if (this.bucketArray[index] == undefined) {
			this.currentItems += 1;
			this.bucketArray[index] = new Node();

		}

		// if in that bucket the key already exists update the value of the key

		// if bucket has items, but the key is not in bucket utilize linked list to add to the bucket

		// need to grow buckets to double capacity when hash map reachs loadFactor

		// create new one that is double its size and copy all existing nodes over to the new array, hashing their keys again
		// else if (this.currentItems > this.growthLimit){	}
	}

	get(key) {}
	hash(key) {}
	remove(key) {}
	length() {}
	clear() {}
	keys() {}
	values() {}
	entries() {}
}

let hm = new HashMap(0.75, 16);


console.log(hm.bucketArray);
