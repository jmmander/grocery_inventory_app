import React, { useState, useRef }  from "react";
import './grocery_item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import Editable_Item from '../Editable-Item/editable-item'

function Grocery_Item(props) {

    const [editView, setEditView] = useState(false);

    //deletes item from database
    const handleDelete = () => {
        props.deleteItem(props.id);
    };

    //sets the editView to turn on or off editable 
    const changeView = (bool) => {
        setEditView(bool)
    }


    return (
            <>
                {editView || props.addItem ? 
            <Editable_Item name={props.name} quantity={props.quantity} location={props.location} taxable={props.taxable} status={props.status} id={props.id} key={props.id} deleteItem={handleDelete} updateItem={props.updateItem} refreshList={props.refreshList} editView={changeView} addItem={props.addItem}>
           </Editable_Item>
           :
            <tr>
                <td>
                    <button className="icon clickable" ><FontAwesomeIcon icon={faEdit} onClick={() => setEditView(true)}/></button>
                </td>
                <td className='id-container '>
                    {props.id}
                </td>
                <td className='name-container '>
                    {props.name}
                </td>
                <td className='quantity-container '>
                    {props.quantity}
                </td>
                <td className='location-container' >
                {props.location}
                </td>
                <td className='taxable-container '>
                <div className="icon">{props.taxable ? <FontAwesomeIcon icon={faCheckSquare} /> : <FontAwesomeIcon icon={faSquare}/>}</div>
                </td>
                <td className='status-container '>
                    {props.status} 
                </td>
                <td>
                    <button className="icon clickable" onClick={handleDelete}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </td>
            </tr> 
            }
            </>
         
    )
}

export default Grocery_Item