from fastapi import APIRouter
from services.Graph_Creation import create_adjenancy_list,create_graph
from services.Shortest_path import Dijsktra
from Models.models import Graph_request
import json





graph_api = APIRouter(prefix="/api/graph",  tags=["Graph"])


@graph_api.post("/")
async def create_nodes_and_edges(graph:Graph_request):
    nodes=graph.nodes
    edges=graph.edges
    start=graph.start_node
    end=graph.end_node
   
    if not nodes or not edges :

        return {"error": "No nodes or edges provided."}
    
    if not start or not end:
        return {"error": "No start or end node provided."}
    adjenancy_list=create_adjenancy_list(edges,nodes)
    if isinstance(adjenancy_list,str):
        return {"error":adjenancy_list}
    graph_final=create_graph(adjenancy_list)
    start_node=""
    end_node=""
    for i in graph_final.adjacency_list.keys():
        if i.value==start:
            start_node=i    
        elif i.value==end:
            end_node=i
        else:
            continue
    
    if not start_node or not end_node :
        return {"error": "Start or end node not found in the graph."}

    path,path_to_end=Dijsktra(graph_final,start_node,end_node)
    
    return {"path":path,"shortest path":path_to_end[::-1] if isinstance(path_to_end,list) else path_to_end}
                      


