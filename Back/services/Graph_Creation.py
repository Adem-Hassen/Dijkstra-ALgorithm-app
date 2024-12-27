from Models.models import Node,Edge,Graph



def create_adjenancy_list(edges,nodes):
    edges_objects=dict()
    nodes_object=[]
    for value in nodes:
        nodes_object.append(Node(value))
    for node in nodes_object:
        paths=edges[node.value]
        if len(paths)==0:
            edges_objects[node]=[]
            continue
        for i in range(len(paths)):
            found=False
            for edge_node in nodes_object:
                if edge_node.value==paths[i][1]:
                    found=True
                    if paths[i][0]<0:
                        return 'Edges weigth cannot be negative'
                    
                    paths[i] = Edge(paths[i][0],edge_node)
                    break
            if not found:
                return "Could not find edge in graph"
                
                    
        edges_objects[node]=paths

    return edges_objects

def create_graph(adjenancy_list):
    return Graph(adjenancy_list)


