import React,{useRef,useEffect,useState}from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TableComponent from '../components/table';
import AlertComponent from '../components/alert';
import PathTable from '../components/pathsTable';
import axios from "axios";
import * as d3 from 'd3'
const Visualizer = () => {
  const svgRef = useRef();
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [node_names,setNodeNames] = useState([]);
  const[node, setNode] = useState()
  const[startNode,setStartNode] = useState("");
  const[endNode,setEndNode] = useState("");
  const [edge, setEdge] = useState({source:"",target:"",weight:"",color:"#000"});
  const [error, setError] = useState(false);
  const[ErrorMessage, setErrorMessage] = useState()
  const [path, setPath] = useState([])
  const [paths, setPaths] = useState([])

  
  const addNode = () => {
 
    if(node){    
      if(node_names.includes(node)){
        setErrorMessage("Node already exists");
        setError(!error);
        console.log(error)
        return;
      }
  
      setNodeNames([...node_names,node])
      setNodes([...nodes, { id: node,color:'#000'}]);
      
   }
    
else{
  setErrorMessage("Please enter a node name")
  setError(!error);
  console.log(error)}
  
}
const deleteLink=()=>{
  if(edge.source && edge.target && node_names.includes(edge.source)&&node_names.includes(edge.target)){
    const updatedEdge=links.filter(link => link.source.id !== edge.source || link.target.id !== edge.target )
    
    console.log(links)
    setLinks(updatedEdge)
    console.log(edge)
}
else{
  setErrorMessage("Can't delete nonexistent link")
  setError(!error);
}}
const addLink = () => {
  if (edge.source && edge.target && edge.weight && edge.source!=edge.target ) {
     if(edge.weight <=0){
      setErrorMessage("Weight must be greater than zero");
      setError(!error);
      return
    }
    if (node_names.includes(edge.source) && node_names.includes(edge.target)) {
      for (let i = 0; i < links.length; i++){
        if (links[i].source.id === edge.source && links[i].target.id === edge.target) {
          setErrorMessage("Edge already exists");
          setError(!error)
          return;
        }
        
      }
     
   

      setLinks([...links, {source:edge.source, target:edge.target,weight:edge.weight,color:edge.color}])
      
      
    }
    
 
    else {
      setErrorMessage("nodes dont exist");
      setError(!error);
    } 
    
  }
  else{
   setErrorMessage("invalid edge")
   setError(!error);
  }
}


   
const handleDelete = (id) => {

  
  const updatedLinks = links.filter((link) => link.source.id != node_names[id] && link.target.id != node_names[id]); 
  const updatedNodes = node_names.filter((_, index) => index !== id);
  const updatedNodesArray = nodes.filter((_, index) => index!== id);
  
  setLinks(updatedLinks); 
  
  setNodes(updatedNodesArray)
  setNodeNames(updatedNodes); 
};

const  Visualize=async()=>{
  
  const request={nodes:node_names,edges:{},start_node:startNode,end_node:endNode}
    for (let i=0; i<node_names.length; i++){
      request.edges[node_names[i]]=links.map((link)=>{if(link.source.id===node_names[i]){return [parseFloat(link.weight),link.target.id]}return })
      request.edges[node_names[i]]=request.edges[node_names[i]].filter(edge=> edge)
      
    }

   const response=await axios.post("http://127.0.0.1:8000/api/graph/",request, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  if(response.status === 200){
    
    if(response.data.error ){
      setErrorMessage(response.data.error)
      setError(!error)
    }  
    
    
    if (Array.isArray(response.data["shortest path"])) {
      const updatedLinks = links.map((link) => {
        for (let i = 0; i < response.data["shortest path"].length - 1; i++) {
          if (
            link.source.id === response.data["shortest path"][i] &&
            link.target.id === response.data["shortest path"][i + 1]
          ) {
            return { ...link, color: "green" };
          }
        }
        return {...link,color:"#000"};
      });
    
      setLinks(updatedLinks);

    }else{
    alert(response.data["shortest path"])
   }  
   const newPaths = [];
   
   for (const i of Object.keys(response.data["path"])) {
   
     if (response.data["path"][i][1]) {
       newPaths.push({ node: i, distance: response.data["path"][i][0], parent: response.data["path"][i][1] });
     } else {
       newPaths.push({ node: i, distance: response.data["path"][i][0], parent: null});
     }
   }
   
   setPaths(newPaths);
   
  } 
  
} 

  useEffect(() => {
    const width = 1250;
    const height = 600;
    
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);
      
      const markerDefs=svg.append("defs");
      links.forEach((link) => {
        markerDefs
          .append("marker")
          .attr("id", `arrowhead-${link.color.replace("#", "")}`) // Use unique IDs for each color
          .attr("viewBox", "-0 -5 10 10")
          .attr("refX", 35) // Adjust based on your setup
          .attr("refY", 0)
          .attr("orient", "auto")
          .attr("markerWidth", 6)
          .attr("markerHeight", 6)
          .attr("xoverflow", "visible")
          .append("svg:path")
          .attr("d", "M 0,-5 L 10,0 L 0,5") // Arrowhead path
          .attr("fill", link.color) // Match marker color with link color
          .style("stroke", "none");
      });
      
      
    
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3.forceLink(links).id((d) => d.id).distance(250)
      )
      .force('charge', d3.forceManyBody().strength(-20))
      .force('center', d3.forceCenter(width / 2, height / 2));

    
      const link = svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", (d) =>d.color)
      .attr("stroke-width", 2)
      .attr("marker-end", (d) => `url(#arrowhead-${d.color.replace("#", "")})`);
  

    
    const linkLabels = svg
    .selectAll(".link-weight")
    .data(links)
    .enter()
    .append("text")
    .attr("class", "link-weight")
    .text((d)=>d.weight)
    .attr("font-size", "20px")
    .attr("font-weight", "bold")
    .attr("fill", "#000");
    
    const node = svg
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', (d)=>{if(d.id.length>=6){return d.id.length*5.83}return 32})
      .attr("stroke-width",3)
      .attr('stroke', (d)=>d.color)
      .attr('fill', "white")
      .call(
        d3
          .drag()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

   
    const labels = svg
      .selectAll('.label')
      .data(nodes)
      .enter()
      .append('text')
      .attr('class', 'label')
      .text((d) => d.id)
      .attr('font-size', '19px')
      .attr('dy', 4)
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'middle')
      .attr('fill', (d)=>d.color)
      

   
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);
        
        
        link.each(function(d) {
          const isBidirectional =
            links.some(
              (link) =>
                (link.source.id === d.target.id && link.target.id === d.source.id) ||
                (link.source.id === d.source.id && link.target.id === d.target.id)
            );
    
          if (isBidirectional) {
            const offset = 12; 
    
            const dx = d.target.x - d.source.x;
            const dy = d.target.y - d.source.y;
    
            
            const length = Math.sqrt(dx * dx + dy * dy);
    
            
            const unitX = dx / length;
            const unitY = dy / length;
    
            
            const perpX = -unitY;
            const perpY = unitX;
    
            
            d3.select(this)
              .attr('x1', d.source.x + perpX * offset)
              .attr('y1', d.source.y + perpY * offset)
              .attr('x2', d.target.x + perpX * offset)
              .attr('y2', d.target.y + perpY * offset);
          }
        });
      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
     
      labels.attr('x', (d) => d.x).attr('y', (d) => d.y);
      linkLabels
    .attr("x", (d) => {
      const dx = d.target.x - d.source.x;
      const dy = d.target.y - d.source.y;
      const length = Math.sqrt(dx * dx + dy * dy);

      // Normalize the vector
      const unitX = dx / length;
      const unitY = dy / length;

      // Perpendicular vector
      const perpX = -unitY;
      const perpY = unitX;

      // Check if it's a bidirectional link
      const isBidirectional = links.some(
        (link) =>
          link.source.id === d.target.id && link.target.id === d.source.id
      );

      // Apply offset for bidirectional links
      const offset = isBidirectional ? 10 : 0;

      return ((d.source.x + d.target.x) / 2) + perpX * offset;
    })
    .attr("y", (d) => {
      const dx = d.target.x - d.source.x;
      const dy = d.target.y - d.source.y;
      const length = Math.sqrt(dx * dx + dy * dy);

      // Normalize the vector
      const unitX = dx / length;
      const unitY = dy / length;

      // Perpendicular vector
      const perpX = -unitY;
      const perpY = unitX;

      // Check if it's a bidirectional link
      const isBidirectional = links.some(
        (link) =>
          link.source.id === d.target.id && link.target.id === d.source.id
      );

      // Apply offset for bidirectional links
      const offset = isBidirectional ? 10 : 0;

      return ((d.source.y + d.target.y) / 2) + perpY * offset;
    });
    });
  }, [nodes,links]); 

  return (
    <div style={styles.container}>
    <div style={styles.panel}>
      <h2 style={styles.title}>Create your graph</h2>
     
       <InputGroup className="mb-3">
        <Form.Control
        
        style={{width:500}}
          placeholder="Node name"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(event) => setNode(event.target.value)}
          
        />
        <Button style={{marginTop:10,borderRadius:5}} variant="outline-secondary" id="button-addon2" onClick={addNode}>
          Add node
        </Button> 

        
        
      </InputGroup>
   
      <InputGroup className="mb-3" >
        <Form.Control 
        style={{width:117,marginRight:5}}
          placeholder="Source Node"
        
          onChange={(event) => setEdge({source:event.target.value,target:edge.target,weight:edge.weight,color:edge.color})}
          
        />
        <Form.Control
        style={{width:100,marginRight:5}}
          placeholder="Target Node"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(event) => setEdge({source:edge.source,target:event.target.value,weight:edge.weight,color:edge.color})}
          
        />
         <Form.Control
        style={{width:100,marginRight:5}}
        
          placeholder="Weight"
          type="number"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(event) => setEdge({source:edge.source,target:edge.target,weight:event.target.value,color:edge.color})}
          
        />
        <Button style={{marginTop:10,borderRadius:5}} variant="outline-secondary" id="button-addon2" onClick={addLink}>
          Add Link
        </Button>
        <Button style={{marginTop:10,borderRadius:5,marginLeft:10}} variant="outline-danger" id="button-addon2" onClick={deleteLink}>
          Delete Link
        </Button>
      </InputGroup>
      
      <TableComponent nodes={node_names} onDelete={handleDelete}></TableComponent>
      <Button variant="outline-danger" style={{width:150,marginTop:25}} id="button-addon2" onClick={()=>(setNodes([],setLinks([]),setNodeNames([]),setStartNode(''),setEndNode(""),setPaths([])))}>
          Reset 
        </Button>
        <div style={{marginTop:20}}> {error  &&(<AlertComponent error={ErrorMessage} ></AlertComponent>)}</div>
        
    </div>
    <div style={styles.canvas}>
      <h2 style={styles.title}>Graph Visualization</h2>
      <div style={styles.graphArea}>
      
     
      <svg ref={svgRef} ></svg> 
     
      </div>
      <div  style={{ display: "flex", 
      paddingTop: "20px",
      alignItems: "flex-start", 
      gap: "250px", 
      }} >
    <div className='div1' style={{
      position: "relative",
      zIndex: 0, // Lower layer
     
    }}>
      { node_names.length ?(<>
    
    <h3 style={{fontSize:20}}>Select start node</h3>
    <Form.Select onChange={(event) => {
const selectedNodeId = event.target.value;


const updatedNodes = nodes.map((node) => {
  if (node.id === selectedNodeId) {
    return { ...node, color: "green" };
  } else if (node.color === "green") {
    return { ...node, color: "#000" };
  }
  return node;
});


const updatedLinks = links.map((link) => ({
  ...link,
  source: typeof link.source === "object" && link.source.id
    ? updatedNodes.find((n) => n.id === link.source.id)
    : link.source,
  target: typeof link.target === "object" && link.target.id
    ? updatedNodes.find((n) => n.id === link.target.id)
    : link.target,
    color:"#000"
}));
setStartNode(event.target.value);
setNodes(updatedNodes);
setLinks(updatedLinks);



}}
      style={{width:150,marginTop:20}} aria-label="Default select example">
  
    <option >Start Node</option>
{node_names.map((node)=><option value={node}>{node}</option>)}
</Form.Select>
<h3 style={{fontSize:20,marginTop:25}}>Select end node</h3>
<Form.Select onChange={(event) => {
const selectedNodeId = event.target.value;
 

const updatedNodes = nodes.map((node) => {
  if (node.id === selectedNodeId) {
    return { ...node, color: "red" };
  } else if (node.color === "red") {
    return { ...node, color: "#000" };
  }
  return node;
});


const updatedLinks = links.map((link) => ({
  ...link,
  source: typeof link.source === "object" && link.source.id
    ? updatedNodes.find((n) => n.id === link.source.id)
    : link.source,
  target: typeof link.target === "object" && link.target.id
    ? updatedNodes.find((n) => n.id === link.target.id)
    : link.target,
    color:"#000"
}));
setEndNode(event.target.value);
setNodes(updatedNodes);
setLinks(updatedLinks);


}} style={{width:150,marginTop:20
}} aria-label="Default select example" >
    <option >End Node</option>
{node_names.map((node)=><option value={node}>{node}</option>)}
</Form.Select> <Button variant="outline-secondary" style={{width:150,marginTop:25}} id="button-addon2" onClick={Visualize}>
      Start
      
    </Button>  </>):null}
    </div>
     {node_names.length >0 &&(<div  style={{
       
        backgroundColor: "white",
        padding: 5,
        border: "1px solid #ccc",
        borderRadius: 5,
     
      }} className="div">
          <PathTable startNode={startNode} endNode={endNode} results={paths}></PathTable></div>)}
        
      </div>
  
      
       
    </div>
   
  </div>
  )
}
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: '20px',
    minHeight: '100vh',
    backgroundColor: '#f4f6f9',
  },
  
  panel: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  
  title: {
    marginBottom: '20px',
    color: '#2c3e50',
  },
  
  canvas: {
    position:"relative",
    height:"auto",
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: "left",
    marginLeft:30
  },
  
  graphArea: {
    border: '1px dashed #ccc',
    borderRadius: '8px',
    width: '100%',
    height: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  
  placeholder: {
    color: '#7f8c8d',
    fontSize: '1.2rem',
  },
  
};
export default Visualizer