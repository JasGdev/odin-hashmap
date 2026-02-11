import { LinkedList } from "./LinkedList.js";

export class HashMap {
	constructor(loadFactor, capacity) {
		this.defaultCapacity = capacity;
		this.loadFactor = loadFactor;
		this.currentCapacity = capacity;
		this.bucketArray = new Array(capacity);
		this.currentItems = 0;
	}

	hash(key) {
		let hashCode = 0;
		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode =
				(primeNumber * hashCode + key.charCodeAt(i)) % this.currentCapacity;
		}
		return hashCode;
	}

	growHashMap() {
		const newHashMap = new HashMap(this.loadFactor, this.currentCapacity * 2);
		const allEntries = this.entries();

		while (allEntries.length > 0) {
			const currentEntry = allEntries.pop();
			const currentKey = currentEntry[0];
			const currentValue = currentEntry[1];
			newHashMap.set(currentKey, currentValue);
		}

		this.currentCapacity = newHashMap.currentCapacity;
		this.bucketArray = newHashMap.bucketArray;
	}

	set(key, value) {
		const index = this.hash(key);
		if (index < 0 || index >= this.bucketArray.length) {
			throw new Error("Trying to access index out of bounds");
		} 
		
		let bucket = this.bucketArray[index];
			
			
		if (bucket == undefined) {
			this.bucketArray[index] = new LinkedList();
			this.currentItems += 1;
			this.bucketArray[index].append(key, value);
		} else if (! bucket.containKey(key)) {
			this.currentItems += 1;
			this.bucketArray[index].append(key, value);
		} else if (bucket.containKey(key)) {
			this.bucketArray[index].updateKey(key, value);
		}
		if (this.currentItems > this.currentCapacity * this.loadFactor) {
			this.growHashMap();
		}
	}

	// takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null
	get(key) {
		const index = this.hash(key);
		if (index < 0 || index >= this.bucketArray.length) {
			throw new Error("Trying to access index out of bounds");
		} else if (this.bucketArray[index] == undefined) {
			return null;
		} else if (this.bucketArray[index].containKey(key)) {
			return this.bucketArray[index].valueAtKey(key);
		}
		return null
	}

	has(key) {
		const index = this.hash(key);
		if (index < 0 || index >= this.bucketArray.length) {
			throw new Error("Trying to access index out of bounds");
		} else if (this.bucketArray[index] == undefined) {
			return false;
		} else if (this.bucketArray[index].containKey(key)) {
			return true;
		}
	}

	remove(key) {
		if (!this.has(key)) {
			return false;
		} else {
			const index = this.hash(key);
			if (index < 0 || index >= this.bucketArray.length) {
				throw new Error("Trying to access index out of bounds");
			} else if (this.bucketArray[index].containKey(key)) {
				this.currentItems -= 1;
				this.bucketArray[index].removeAtKey(key);
				return true;
			}
		}
	}

	length() {
		return this.currentItems;
	}
	clear() {
		this.bucketArray = new Array(this.defaultCapacity);
		this.currentItems = 0;
		this.currentCapacity = this.defaultCapacity;
	}

	keys() {
		let keyArray = [];
		for (linkedList of this.bucketArray) {
			if (linkedList != undefined) {
				keyArray = keyArray.concat(linkedList.getKeyList());
			}
		}
		return keyArray;
	}

	values() {
		let valueArray = [];
		for (linkedList of this.bucketArray) {
			if (linkedList != undefined) {
				valueArray = valueArray.concat(linkedList.getValueList());
			}
		}
		return valueArray;
	}
	entries() {
		let entriesArray = [];
		for (linkedList of this.bucketArray) {
			if (linkedList != undefined) {
				entriesArray = entriesArray.concat(linkedList.getEntriesList());
			}
		}
		return entriesArray;
	}
}
