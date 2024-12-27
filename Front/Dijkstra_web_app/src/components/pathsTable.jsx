import React from "react";
import Table from "react-bootstrap/Table";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./PathTable.css"; 

const PathTable = ({ results, startNode, endNode }) => {
  return (
    <div style={{width:350}}  className="table-container">
  
      <Table striped bordered hover>
        <thead>
          <tr>

            <th>Node</th>
            <th>Distance</th>
            <th>Parent</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => {
            
            const rowClass =
              result.node === startNode
                ? "start-node"
                : result.node === endNode
                ? "end-node"
                : "";

            return (
              <tr key={index} className={rowClass}>
                
                <td>{result.node}</td>
                <td>{result.distance}</td>
                <td>{result.parent || "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default PathTable;
