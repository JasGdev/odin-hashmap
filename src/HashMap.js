export class HashMap {
	constructor(loadFactor, capacity) {
		this.loadFactor = loadFactor;
		this.capacity = capacity;
	}

	hash(key) {
		let hashCode = 0;
		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i))%this.capacity;
		}

		return hashCode;
	}

    set(key, value){
        
    }
}

let hm = new HashMap(0.75, 16)
console.log(hm.hash('whatagods'))
console.log(hm.hash('jason'))
console.log(hm.hash('whajasondtagods'))
console.log(hm.hash('jasonA'))
console.log(hm.hash('Ajsaon'))