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
        let newNode = new Node(val);
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
}