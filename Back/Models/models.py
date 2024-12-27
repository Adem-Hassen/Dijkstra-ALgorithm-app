from heapq import heappop,heappush
import itertools
from pydantic import BaseModel



class Graph_request(BaseModel):
    nodes:list=[]
    edges:dict={}
    start_node: str
    end_node: str



class Graph:
    def __init__(self,adjenancy_list):
        self.adjacency_list=adjenancy_list



    
class Node:
    def __init__(self,value):
        self.value = value
  

 



class Edge:
    def __init__(self,weight,node:Node):
        self.weight = weight
        self.node = node

        
    
class PriorityQueue:
    def __init__(self):
        self.pq = []                         
        self.entry_finder = {}               
        self.counter = itertools.count()                                      
    def __len__(self):
        return len(self.pq)

    def add_task(self,priority, task):
        'Add a new task or update the priority of an existing task'
        if task in self.entry_finder:
            self.UpdatePriority(priority, task)
            return self
        count = next(self.counter)
        entry = [priority, count, task]
        self.entry_finder[task] = entry
        heappush(self.pq, entry)
    def UpdatePriority(self,priority,task):
        entry=self.entry_finder[task]
        count = next(self.counter)
        entry[0],entry[1]=priority,task

    def pop_task(self):
        'Remove and return the lowest priority task. Raise KeyError if empty.'
        while self.pq:
            priority, count, task = heappop(self.pq)
            del self.entry_finder[task] 
            return priority,task
        raise KeyError('pop from an empty priority queue')
    



