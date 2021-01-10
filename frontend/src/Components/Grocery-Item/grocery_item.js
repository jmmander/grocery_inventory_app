import React, { useState, useRef }  from "react";
import './grocery_item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import useOutsideClick from '../../Utils/useOutsideClick';

function Grocery_Item(props) {
    
    const ref = useRef();

    const [updatedItem, setUpdatedItem] = useState(props); 

    const [editView, setEditView] = useState(false);

    //deletes item from database
    const handleDelete = () => {
        props.deleteItem(props.id);
    };

    //updates state object values as input fields are changed
    const handleChange = (e) => {
        const changedElement = e.target;
        const name = changedElement.name;
        const value = changedElement.value.trim();
        setUpdatedItem({...updatedItem, [name]: value }); 
    };

    //checks then saves inputted data from edit/add
    const handleSave = () => {
        if (validateInputs()){
            if (props.addItem) {
                props.addItem(updatedItem);
            }
            else {
                props.updateItem(updatedItem);
            }
            setEditView(false);
        }
    };

    //detects key presses and saves or cancels edits depending on key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleSave();
        }
        if (e.key === 'Escape') {
            props.refreshList();
            setEditView(false);
        }
        };

    //checks that input values are valid
    const validateInputs = () => {
        let valid = true;
        if (updatedItem.name.length == 0 || updatedItem.name.length > 120) {
            valid = false;
            alert("Name must have between 1 and 120 characters");
        }
        if (updatedItem.quantity < 0 || updatedItem.quantity == "" ) {
            valid = false;
            alert("Quantity must be number greater than 0");
        }
        return valid 
    };

    //detects click outside of editing item and saves
    useOutsideClick(ref, () => {
        handleSave()
      });


    return (
            <>
                {editView || props.addItem ? 
            <tr className="editable" ref={ref}>
                <td>
                    <button className="icon" ><FontAwesomeIcon icon={faEdit} /></button>
                </td>
                <td className='id-container '>
                    {props.id}
                </td>
                <td className='name-container '>
                    <input type="text" name="name" maxLength="120" defaultValue={updatedItem.name} onChange={handleChange} required  onKeyDown={handleKeyDown}/>
                </td>
                <td className='quantity-container '>
                    <input type="number" name="quantity" defaultValue={updatedItem.quantity} min="0" onChange={handleChange} required  onKeyDown={handleKeyDown}/>
                </td>
                <td className='location-container' >
                    <select name="location" defaultValue={updatedItem.location} onChange={handleChange}  onKeyDown={handleKeyDown}>
                        <option value="Pantry">Pantry</option>
                        <option value="Fridge">Fridge</option>
                        <option value="Freezer">Freezer</option>
                    </select>
                </td>
                <td className='taxable-container' >
                    <select type="select" name='taxable' onChange={handleChange} defaultValue={updatedItem.taxable} onKeyDown={handleKeyDown}>
                        <option value="true">Taxable</option>
                        <option value="false">Non-taxable</option>
                    </select>
                </td>
                <td className='status-container '>
                    <select name="status" onChange={handleChange} defaultValue={updatedItem.status}  onKeyDown={handleKeyDown}>
                        <option value="Full">Full price</option>
                        <option value="Sale">Sale</option>
                    </select>
                </td>
                <td>
                    <button className="icon clickable" onClick={handleSave}><FontAwesomeIcon icon={faCheckSquare} /></button>
                </td>
            </tr> 
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