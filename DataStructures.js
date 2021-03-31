/*
 * JavaScript Data Structures
 * James Mernin
 */

// Singly Linked Lists
class SingleNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(value) { // push a new node to the tail of the list and return the list
        let newNode = new SingleNode(value);
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
        let temp = this.head;
        let newTail = temp;
        while(temp.next) {
            newTail = temp;
            temp = temp.next;
        }
        this.tail = newTail;
        this.tail.next = null;
        this.length--;
        return temp;
    }
    unshift(value) { // add a node at the head of the list and return the list
        let newNode = new SingleNode(value);
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
        let temp = this.head;
        this.head = temp.next;
        this.length--;
        if (this.length === 0) {
            this.tail = null;
        }
        return temp;
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
    set(index, value) { // change the value of the node at the given index, return whether it succeeded
        let foundNode = this.get(index);
        if (foundNode) {
            foundNode.value = value;
            return true;
        }
        return false;
    }
    insert(index, value) { // insert the value at the node with the given index, return whether it succeeded
        if (index < 0 || index > this.length) return false; // index is out of bounds
        if (index === 0) return !!this.unshift(value); // unshift does the job
        if (index === this.length) return !!this.push(value); // push does the job, !! returns boolean
        let newNode = new SingleNode(value);
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
        let removedNode = prev.next;
        prev.next = removedNode.next;
        this.length--;
        return removedNode;
    }
    reverse() { // reverse the direction of the list and return that list
        if (!this.head) return null;
        let node = this.head;
        this.head = this.tail;
        this.tail = node;
        let next;
        let prev = null;
        for (let i = 0; i < this.length; i++) {
            next = node.next;
            node.next = prev;
            prev = node;
            node = next;
        }
        return this;
    }
}

// Doubly Linked List
class DoubleNode {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(value) { // push a new node to the tail of the list and return the list
        let newNode = new DoubleNode(value);
        if (!this.head) { // special case when list is empty
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    pop() { // pop a node off of the tail of the list and return it
        if(!this.head) return undefined; // special case when list is empty
        let poppedNode = this.tail;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = poppedNode.prev;
            this.tail.next = null;
            poppedNode.prev = null;
        }
        this.length--;
        return poppedNode;
    }
    unshift(value) { // add a node at the head of the list and return the list
        let newNode = new DoubleNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }
    shift() { // delete the node at the head of the list and return it
        if (!this.head) return undefined;
        let oldHead = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = oldHead.next;
            this.head.prev = null;
            oldHead.next = null;
        }
        this.length--;
        return oldHead;
    }
    get(index) { // return the node at the index provided
        if (index < 0 || index >= this.length) return null;
        let count, current;
        if (index <= this.length / 2) {
            count = 0;
            current = this.head;
            while (count !== index) {
                current = current.next;
                count++;
            }
        } else {
            count = this.length - 1;
            current = this.tail;
            while (count !== index) {
                current = current.prev;
                count--;
            }
        }
        return current;
    }
    set(index, value) { // change the value of the node at the given index, return whether it succeeded
        let foundNode = this.get(index);
        if (foundNode) {
            foundNode.value = value;
            return true;
        }
        return false;
    }
    insert(index, value) { // insert the value at the node with the given index, return whether it succeeded
        if (index < 0 || index > this.length) return false;
        if (index === 0) return !!this.unshift(value);
        if (index === this.length) return !!this.push(value);
        let newNode = new DoubleNode(value);
        let beforeNode = this.get(index - 1);
        let afterNode = beforeNode.next;
        beforeNode.next = newNode, newNode.prev = beforeNode; // link on both sides
        newNode.next = afterNode, afterNode.prev = newNode; // link on both sides
        this.length++;
        return true;
    }
    remove(index) { // remove the node at the given index, return that node
        if (index < 0 || index >= this.length) return undefined;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();
        let removedNode = this.get(index);
        let beforeNode = removedNode.prev;
        let afterNode = removedNode.next;
        beforeNode.next = afterNode;
        afterNode.prev = beforeNode;
        removedNode.prev = null, removedNode.next = null; // clear out links
        this.length--;
        return removedNode;
    }
    reverse() { // reverse the direction of the list and return that list
        if (!this.head) return null;
        let node = this.head;
        this.head = this.tail;
        this.tail = node;
        while (node) {
            let hold = node.next;
            node.next = node.prev;
            node.prev = hold;
            node = node.prev;
        }
        return this;
    }
}

// Stack
class StackNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    push(value) { // add new node to top of stack and return the new length
        let newNode = new StackNode(value);
        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            let temp = this.first;
            this.first = newNode;
            this.first.next = temp;
        }
        return ++this.size;
    }
    pop() { // remove last item added to stack, return that item
        if (!this.first) return null;
        let temp = this.first;
        if (this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    }
}

// Queue
class QueueNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    enqueue(value) { // add to tail of linked list
        let newNode = new Node(value);
        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }
        return ++this.size;
    }
    dequeue() { // remove from head of linked list
        if (!this.first) return null;
        let temp = this.first;
        if (this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    }
}

// Binary Search Tree
class BSTNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }
    insert(value) {
        let newNode = new BSTNode(value);
        if (!this.root) {
            this.root = newNode;
            return this;
        }
        let current = this.root;
        while (true) {
            if (value === current.value) return undefined;
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }
    find(value) {
        if (!this.root) return undefined;
        let current = this.root;
        let found = false;
        while (current && !found) {
            if (value < current.value) current = current.left;
            else if (value > current.value) current = current.right;
            else return current;
        }
        return undefined;
    }
    contains(value) {
        return this.find(value) !== undefined;
    }
    bfs() { // breadth first search
        let node = this.root;
        let data = new Queue;
        let visited = new Queue;
        visited.enqueue(node);
        while(visited.length) { // because an empty queue is falsy
            node = visited.dequeue();
            data.enqueue(node);
            if (node.left) visited.enqueue(node.left);
            if (node.right) visited.enqueue(node.right);
        }
        return data;
    }
    dfsPreOrder() { // depth first search, pre-order
        let data = new Queue;
        function traverse(node) {
            data.enqueue(node);
            node.left && traverse(node.left); // short-circuit version of conditional
            node.right && traverse(node.right);
        }
        traverse(this.root);
        return data;
    }
    dfsPostOrder() { // depth first search, post-order
        let data = new Queue;
        function traverse(node) {
            node.left && traverse(node.left);
            node.right && traverse(node.right);
            data.enqueue(node);
        }
        traverse(this.root);
        return data;
    }
    dfsInOrder() { // depth first search, in-order
        let data = new Queue;
        function traverse(node) {
            node.left && traverse(node.left);
            data.enqueue(node);
            node.right && traverse(node.right);
        }
        traverse(this.root);
        return data;
    }
}

// Heaps
class MaxBinaryHeap {
    constructor() {
        this.values = [];
    }
    insert(element) {
        this.values.push(element);
        this.bubbleUp();
    }
    bubbleUp() {
        let index = this.values.length - 1;
        const element = this.values[index];
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.values[parentIndex];
            if (element <= parent) break;
            this.values[parentIndex] = element;
            this.values[index] = parent;
            index = parentIndex;
        }
    }
    remove() {
        const max = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.bubbleDown();
        }
        return max;
    }
    bubbleDown() {
        let i = 0;
        const element = this.values[0];
        const length = this.values.length;
        while(true) {
            let l = 2 * i + 1;
            let r = l + 1;
            let left, right;
            let swap = null;
            if (l < length) {
                left = this.values[l];
                if (left > element) {
                    swap = l;
                }
            }
            if (r < length) {
                right = this.values[r];
                if (
                    (swap === null && right > element) ||
                    (swap !== null && right > left)
                ) {
                    swap = r;
                }
            }
            if (swap === null) break;
            this.values[i] = this.values[swap];
            this.values[swap] = element;
            i = swap;
        }
    }
}

class MinBinaryHeap {
    constructor() {
        this.values = [];
    }
    insert(element) {
        this.values.push(element);
        this.bubbleUp();
    }
    bubbleUp() {
        let index = this.values.length - 1;
        const element = this.values[index];
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.values[parentIndex];
            if (element >= parent) break;
            this.values[parentIndex] = element;
            this.values[index] = parent;
            index = parentIndex;
        }
    }
    remove() {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.bubbleDown();
        }
        return min;
    }
    bubbleDown() {
        let i = 0;
        const element = this.values[0];
        const length = this.values.length;
        while(true) {
            let l = 2 * i + 1;
            let r = l + 1;
            let left, right;
            let swap = null;
            if (l < length) {
                left = this.values[l];
                if (left < element) {
                    swap = l;
                }
            }
            if (r < length) {
                right = this.values[r];
                if (
                    (swap === null && right < element) ||
                    (swap !== null && right < left)
                ) {
                    swap = r;
                }
            }
            if (swap === null) break;
            this.values[i] = this.values[swap];
            this.values[swap] = element;
            i = swap;
        }
    }
}

class PriorityNode {
    constructor(value, priority) {
        this.value = value;
        this.priority = priority;
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(value, priority) {
        let newNode = new PriorityNode(value, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }
    bubbleUp() {
        let index = this.values.length - 1;
        const element = this.values[index];
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.values[parentIndex];
            if (element.priority >= parent.priority) break;
            this.values[parentIndex] = element;
            this.values[index] = parent;
            index = parentIndex;
        }
    }
    dequeue() {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.bubbleDown();
        }
        return min;
    }
    bubbleDown() {
        let i = 0;
        const element = this.values[0];
        const length = this.values.length;
        while(true) {
            let l = 2 * i + 1;
            let r = l + 1;
            let left, right;
            let swap = null;
            if (l < length) {
                left = this.values[l];
                if (left.priority < element.priority) {
                    swap = l;
                }
            }
            if (r < length) {
                right = this.values[r];
                if (
                    (swap === null && right.priority < element.priority) ||
                    (swap !== null && right.priority < left.priority)
                ) {
                    swap = r;
                }
            }
            if (swap === null) break;
            this.values[i] = this.values[swap];
            this.values[swap] = element;
            i = swap;
        }
    }
}

// Hashing
class HashTable {
    constructor(size=53) {
        this.keyMap = new Array(size);
    }

    _hash(key) {
        const ALPHAMOD = 96;
        let WEIRD_PRIME = 31;
        let total = 0;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let char = key[i];
            let value = char.charCodeAt(0) - ALPHAMOD;
            total = (total * WEIRD_PRIME + value) % this.keyMap.length;
        }
        return total;
    }
    set(key, value) {
        let index = this._hash(key);
        if (!this.keyMap[index]) {
            this.keyMap[index] = [];
        }
        this.keyMap[index].push([key, value]);
        return;
    }
    get(key) {
        let index = this._hash(key);
        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    return this.keyMap[index][i][1];
                }
            }
        }
        return undefined;
    }
    keys() {
        let keysArray = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!keysArray.includes(this.keyMap[i][j][0])) {
                        keysArray.push(this.keyMap[i][j][0]);
                    }
                }
            }
        }
        return keysArray;
    }
    values() {
        let valuesArray = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!valuesArray.includes(this.keyMap[i][j][1])) {
                        valuesArray.push(this.keyMap[i][j][1]);
                    }
                }
            }
        }
        return valuesArray;
    }
}

// Graphs
class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
        return;
    }
    removeVertex(vertex) {
        while(this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex];
        return;
    }
    addEdge(v1, v2) {
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
        return;
    }
    removeEdge(v1, v2) {
        this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
        this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
        return;
    }
    dfsRecursive(start) {
        const result = [];
        const visited = {};
        const adjacencyList = this.adjacencyList;
        (function dfsHelper(vertex) {
            if(!vertex) return null;
            visited[vertex] = true;
            result.push(vertex);
            adjacencyList[vertex].forEach(neighbor => {
                if(!visited[neighbor]) {
                    return dfsHelper(neighbor);
                }
            })
        })(start);
        return result;
    }
    dfsIterative(start) {
        const stack = new Stack;
        stack.push(start);
        const result = [];
        const visited = {};
        visited[start] = true;
        let currentVertex;
        while(stack.size) {
            currentVertex = stack.pop();
            result.push(currentVertex);
            this.adjacencyList[currentVertex].forEach(neighbor => {
                if(!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            });
        }
        return result;
    }
    bfs(start) {
        let queue = new Queue;
        queue.enqueue(start);
        const result = [];
        const visited = {};
        visited[start] = true;
        let currentVertex;
        while(queue.size) {
            currentVertex = queue.dequeue();
            result.push(currentVertex);
            this.adjacencyList[current].forEach(neighbor => {
                if(!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.enqueue(neighbor);
                }
            });
        }
        return result;
    }
}

// Weighted Graph (Dijkstra's Algorithm)
class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
        return;
    }
    addEdge(v1, v2, w) {
        this.adjacencyList[v1].push({node: v2, weight: w});
        this.adjacencyList[v2].push({node: v1, weight: w});
        return;
    }
    dijkstra(start, finish) { // calculate shortest path
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let smallest;
        let path = [];
        // build initial state
        for (let vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }
        // as long as there are places to visit
        while (nodes.values.length) {
            smallest = nodes.dequeue.value;
            if (smallest === finish) {
                // finish
                while(previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            if (smallest || distances[smallest] !== Infinity) {
                for(let neighbor in this.adjacencyList[smallest]) {
                    let nextNode = this.adjacencyList[smallest][neighbor];
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;
                    if (candidate < distances[nextNeighbor]){
                        distances[nextNeighbor] = candidate;
                        previous[nextNeighbor] = smallest;
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }
        return path.concat(smallest).reverse();
    }
}

class SimplePriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(value, priority) {
        this.values.push({value, priority});
        this.sort();
        return;
    }
    dequeue() {
        return this.values.shift();
    }
    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
        return;
    }
}