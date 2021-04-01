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