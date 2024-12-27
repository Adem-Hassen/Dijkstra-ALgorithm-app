from Models.models import PriorityQueue


def Dijsktra(graph,start,end):
    previous={v:None for v in graph.adjacency_list.keys()}
    visited={v:False for v in graph.adjacency_list.keys()}
    distances={v:float('inf') for v in graph.adjacency_list.keys()}
    distances[start]=0
    pq=PriorityQueue()
    
    pq.add_task(0,start)
    path=[]
    while pq:
        removed_disatnce,removed=pq.pop_task()
   
        visited[removed]=True
        for edge in graph.adjacency_list[removed]:

            if visited[edge.node]:
                continue
            new_distance=removed_disatnce+edge.weight
            if new_distance<distances[edge.node]:
                distances[edge.node]=new_distance
                previous[edge.node]=removed
                pq.add_task(new_distance,edge.node)
              
    paths={v.value:(distances[v],previous[v].value if previous[v] else None)for v in distances.keys()}
    
    for i in paths.keys():
        if paths[i]==(float('inf'),None):
            paths[i]=("infinity",None)
    path_to_end=[]
    found=False
    for i in paths.keys():
        if i==end.value and paths[i]!=("infinity",None):
            found=True
            path_to_end.append(i)
            node=paths[i][1]
            while node:
                path_to_end.append(node)
                node=paths[node][1]
            break
    if not found:
        path_to_end=f'There is no path from {start.value} to {end.value}'
    return paths,path_to_end
