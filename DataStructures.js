/*
 * JavaScript Data Structures
 * James Mernin
 */

// Singly Linked Lists
class SingleNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(val) { // push a new node to the tail of the list and return the list
        let newNode = new SingleNode(val);
        if(!this.head) { // linked list is empty
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    pop() { // pop a node off of the tail of the list and return it
        if (!this.head) return undefined;
        let current = this.head;
        let newTail = current;
        while(current.next) {
            newTail = current;
            current = current.next;
        }
        this.tail = newTail;
        this.tail.next = null;
        this.length--;
        return current;
    }
    unshift(val) { // add a node at the head of the list and return the list
        let newNode = new SingleNode(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }
    shift() { // delete the node at the head of the list and return it
        if (!this.head) return undefined;
        let currentHead = this.head;
        this.head = currentHead.next;
        this.length--;
        if (this.length === 0) {
            this.tail = null;
        }
        return currentHead;
    }
    get(index) { // return the node at the index provided
        if (index < 0 || index >= this.length) return null; // special case when index is out of bounds
        let counter = 0;
        let current = this.head;
        while (counter !== index) {
            current = current.next;
            counter++;
        }
        return current;
    }
    set(index, val) { // change the value of the node at the given index, return whether it succeeded
        let foundNode = this.get(index);
        if (foundNode) {
            foundNode.val = val;
            return true;
        }
        return false;
    }
    insert(index, val) { // insert the value at the node with the given index, return whether it succeeded
        if (index < 0 || index > this.length) return false; // index is out of bounds
        if (index === 0) return !!this.unshift(val); // unshift does the job
        if (index === this.length) return !!this.push(val); // push does the job, !! returns boolean
        let newNode = new SingleNode(val);
        let prev = this.get(index - 1);
        let temp = prev.next;
        prev.next = newNode;
        newNode.next = temp;
        this.length++;
        return true;
    }
    remove(index) { // remove the node at the given index, return that node
        if (index < 0 || index >= this.length) return undefined; // index out of bounds
        if (index === 0) return this.shift(); // shift does the job
        if (index === this.length - 1) return this.pop(); // pop does the job
        let prev = this.get(index - 1);
        let removed = prev.next;
        prev.next = removed.next;
        this.length--;
        return removed;
    }
}