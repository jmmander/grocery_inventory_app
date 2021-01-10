import React, { useState, useEffect }  from "react";
import Grocery_Item from '../Grocery-Item/grocery_item';
import { Row, Col,Table, Button} from 'react-bootstrap';
import './grocery_viewer.css';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';


function Grocery_Viewer() {
    
    const [itemList, setItemList] = useState([]);
    const [addNew, setAddNew] = useState(false)
    const [error, setError] = useState("")

    //pulls latest data from DB and refreshes itemlist
    const refreshList = () => {
        axios.get("http://127.0.0.1:8000/api/grocery_items/")
             .then(response => {setItemList(response.data);})
             .catch(err => setError("Unable to access inventory data. " + err))
      };

    //adds new item to DB and resets view
    const addItem = itemData => {
                                axios.post("http://127.0.0.1:8000/api/grocery_items/", itemData)
                                    .then(response => {
                                        if (response.status === 201)
                                            {setAddNew(false);
                                            refreshList();
                                            setError("");
                                        } else {
                                            setError("Something unexpected happened. Error code: " + response.status + response.statusText);
                                            refreshList();
                                        }})
                                    .catch(err => {
                                        setError("Unable to add item. " + err);
                                        refreshList();})
                                    }


    //gets item data from DB on first load
    useEffect(() => refreshList(), [])

    //deletes item from inventory
    const deleteItem = (id) => {
        axios.delete(`http://localhost:8000/api/grocery_items/${id}`)
            .then(response => {
                if (response.status === 204){
                    refreshList();
                    setError("");
                } else {
                    setError("Something unexpected happened. Error code: " + response.status + response.statusText);
                    refreshList();
                }})
                .catch(err => {
                    setError("Unable to delete item. " + err);
                    refreshList();})
    }

    //updates item in inventory
    const updateItem = (item) => {
        axios.put(`http://localhost:8000/api/grocery_items/${item.id}/`, item)
             .then(response => { if
                (response.status === 200) {
                    refreshList();  
                    setError("");   
            } else {
                setError("Something unexpected happened. Error code: " + response.status + response.statusText);
                refreshList();
            }})
            .catch(err => {
                setError("Unable to update item. " + err);
                refreshList();})
    }

 
    return ( 
        <div>
            <Row className="grocery-header ">
                <Col className="error">{error}</Col>
                <Col><Button className="addButton float-right" onClick={() => setAddNew(true)}> Add Item <FontAwesomeIcon className="plus" icon={faPlusSquare} /></Button></Col>
            </Row>
            <Table bordered hover size="sm" className='item-viewer' >
                <thead className='headings'>
                    <tr>
                    <th></th>
                    <th> ID </th>
                    <th> Name </th>
                    <th> Quantity </th>
                    <th> Location </th>
                    <th> Taxable </th>
                    <th> Status </th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                {addNew && 
                <Grocery_Item name="" quantity="0" location="Pantry" taxable="false" status="Full" addItem={addItem}></Grocery_Item>
                }    
                {itemList.map(item => {
                    return <Grocery_Item name={item.name} quantity={item.quantity} location={item.location} taxable={item.taxable} status={item.status} id={item.id} key={item.id} deleteItem={deleteItem} updateItem={updateItem} refreshList={refreshList}></Grocery_Item>
                })}
                </tbody>
            </Table>
        </div>
        
        
    )
}

export default Grocery_Viewer