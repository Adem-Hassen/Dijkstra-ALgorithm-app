import Table from 'react-bootstrap/Table';
import CloseButton from 'react-bootstrap/CloseButton';



function TableComponent(props) {
    const handleDelete = (id) => {
        props.onDelete(id);
      };
  
  return (
    <Table striped bordered hover style={{maxWidth:300,marginRight:110,justifyContent:"left"}}>
      <thead>
        <tr>
          <th>Node n°</th>
          <th style={{maxWidth:145}}>Node Name</th>
         
        </tr>
      </thead>
      <tbody>
        {props.nodes && (props.nodes.map((node,id) =>(<><tr>
            <td key={id}>{id+1}</td>
        <td>{node}</td><td><CloseButton onClick={()=>handleDelete(id)}></CloseButton></td>
        </tr></>)))}
      </tbody>
    </Table>
  );
}

export default TableComponent;