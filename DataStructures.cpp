/*
 * C++ Data Structures
 * James Mernin
 */

#include <iostream>

// Singly Linked Lists
class SinglyLinkedList {
    struct SingleNode {
        int data;
        struct SingleNode *next;
    };
    struct SingleNode* head = NULL;
    void insert(int new_data) {
        struct SingleNode* new_node = (struct SingleNode*) malloc(sizeof(struct SingleNode));
        new_node->data = new_data;
        new_node->next = head;
        head = new_node;
    }
    void display() {
        struct SingleNode* ptr;
        ptr = head;
        while (ptr != NULL) {
            std::cout<< ptr->data <<" ";
            ptr = ptr->next;
        }
    }
};

class DoublyLinkedList {
    // A doubly linked list node
    struct DoubleNode {
        int data;
        struct DoubleNode* next;
        struct DoubleNode* prev;
    };
    
    //inserts node at the front of the list
    void insert_front(struct DoubleNode** head, int new_data) {
    //allocate memory for New node
    struct DoubleNode* newNode = new DoubleNode;
    
    //assign data to new node
    newNode->data = new_data;
    
    //new node is head and previous is null, since we are adding at the front
    newNode->next = (*head);
    newNode->prev = NULL;
    
    //previous of head is new node
    if ((*head) != NULL)
    (*head)->prev = newNode;
    
    //head points to new node
    (*head) = newNode;
    }
    /* Given a node as prev_node, insert a new node after the given node */
    void insert_After(struct DoubleNode* prev_node, int new_data)
    {
    //check if prev node is null
    if (prev_node == NULL) {
    std::cout << "Previous node is required , it cannot be NULL";
    return;
    }
    //allocate memory for new node
    struct DoubleNode* newNode = new DoubleNode;
    
    //assign data to new node
    newNode->data = new_data;
    
    //set next of newnode to next of prev node
    newNode->next = prev_node->next;
    
    //set next of prev node to newnode
    prev_node->next = newNode;
    
    //now set prev of newnode to prev node
    newNode->prev = prev_node;
    
    //set prev of new node's next to newnode
    if (newNode->next != NULL)
    newNode->next->prev = newNode;
    }
    
    //insert a new node at the end of the list
    void insert_end(struct DoubleNode** head, int new_data)
    {
    //allocate memory for node
    struct DoubleNode* newNode = new DoubleNode;
    
    struct DoubleNode* last = *head; //set last node value to head
    
    //set data for new node
    newNode->data = new_data;
    
    //new node is the last node , so set next of new node to null
    newNode->next = NULL;
    
    //check if list is empty, if yes make new node the head of list
    if (*head == NULL) {
    newNode->prev = NULL;
    *head = newNode;
        return;
    }
    
    //otherwise traverse the list to go to last node
    while (last->next != NULL)
    last = last->next;
    
    //set next of last to new node
    last->next = newNode;
    
    //set last to prev of new node
    newNode->prev = last;
    return;
    }
    
    // This function prints contents of linked list starting from the given node
    void displayList(struct DoubleNode* node) {
    struct DoubleNode* last;
    
    while (node != NULL) {
            std::cout << node->data<<"<==>";
            last = node;
            node = node->next;
    }
    if (node == NULL)
            std::cout << "NULL";
    }
};