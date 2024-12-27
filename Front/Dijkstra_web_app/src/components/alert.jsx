import { useState } from "react";
import Alert from 'react-bootstrap/Alert';
const AlertComponent = (props) => {


    return (
    
           <Alert  style={{height:50}} variant="warning"  dismissible>
              {props.error}
             
            </Alert>
        
    );
  
}

export default AlertComponent