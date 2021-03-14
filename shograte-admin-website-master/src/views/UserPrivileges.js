
import React, { useState,useEffect } from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Table,
  Media,
  Badge,
  Progress,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  UncontrolledAlert 
} from "reactstrap";
// core components
import PageHeader from "components/Headers/PageHeader.js";

import Pagination from "react-js-pagination";


import api from '../services/api';

import Vendor from './forms/vendor'

const UserPrivileges = (props) => {

  const [copiedText, setCopiedText] = useState();
  const [role, setRole] = useState('');
  const [menus, setMenus] = useState([]);
  const [checkbox, setCheckbox] = useState([]);
  const [userMenus, setUserMenus] = useState([]);
  const [formModal, setFormModal] = useState(false);
  const [formResponse, setFormResponse] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);


  useEffect(() => {

    //get passed role id

    console.log('props',props);
    
    setRole(props.match.params.id)
    //make api call to get catgories
    getData();    
    
  }, [role]);

  const checkSelected=(menuID)=>{
   return checkbox.indexOf(menuID) > -1
  }


  const handleChange=(menuID)=>{


    if(checkSelected(menuID)){
      //remove item from array

      let values = checkbox.filter(item => item !== menuID)
      setCheckbox(values);
    }else{
      //add item to array
      setCheckbox(checkbox => [...checkbox,menuID]);
    }


    
    console.log('checkbox selected',checkbox)

     
   }

  const toggleModal = () => {
    setFormResponse({});
    setFormModal(!formModal)    
  };

  const toggleNotificationModal = () => {
    setNotificationModal(!notificationModal)  
  };

  const getData=()=>{
      api.common('usermenus/listByRole/'+props.match.params.id).getAll().then(({ data }) => {
        if(data.success == true){
          setMenus(data.data.menus)
          setUserMenus(data.data.user_menus)

          let userSelected=[];
          data.data.user_menus.map((item, index) => {
            userSelected.push(item.menu_id);
          });

          console.log('userSelected',userSelected);

          setCheckbox(userSelected);
          
        }

      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.status);

          if(error.response.status == 401){
            props.history.push('/auth/login?login=failed');
          }
        }
      });
  }



  const submitData=(e)=>{    
    e.preventDefault();
    let url='usermenus/update/'+props.match.params.id;
    

    console.log('checkbox',checkbox);

    let formData={
      "menu_id":checkbox
    }

    api.common(url).update(formData).then(({ data }) => {  
      
      setFormResponse(data);
      if(data.success == true){  
        setFormModal(!formModal)          
        setNotificationModal(!notificationModal)
        getData();  
      }
      console.log('formResponse',formResponse);

    }).catch((error)=>{
      setFormResponse({
        success:false,
        msg:"Error occured!"
      });
      console.log('error',error);
    })
    
  }

  const renderMenus=(data)=>{

    if(data.length == 0){
        return(
          <>
            <tr aria-colspan="3">
                <th scope="col">No Records.</th>
            </tr>
          </>
        )
    }else{

      return data.map((data, index) => {
        const { name,_id } = data //destructuring
        return (
          <div className="">
            <input
            
            id={"customCheck_"+_id}
            type="checkbox"
            value={_id}
            name={name}
            checked={checkSelected(_id)}
            onChange={ (e)=>{handleChange(_id)}}
            />
            <label className="" htmlFor="customCheck2">
            {name}
            </label>
        </div>
        )
     })
    }

  }

  return (
    <>
      <PageHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow" style={{minHeight:300}}>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Menus List</h3>
                  </div>                 
                  
                </Row>
              </CardHeader>

              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form" onSubmit={submitData} noValidate>

                    {renderMenus(menus)}

                    <div className="text-center">
                      <Button className="my-4" color="primary" type="submit">
                      Update
                      </Button>
                    </div>


                </Form>

              </CardBody>
              


            
              
            </Card>
          </Col>
        </Row>

            {/* success modal */}

            <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-danger"
              isOpen={notificationModal}
              toggle={() => toggleNotificationModal()}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                  Success
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => toggleNotificationModal()}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="py-3 text-center">
                  <i className="ni ni-bell-55 ni-3x" />
                  <h4 className="heading mt-4">
                    {formResponse.msg}
                  </h4>
                  
                </div>
              </div>
              <div className="modal-footer">               

                <Button
                  className="ml-auto btn-white"
                  color="default"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => toggleNotificationModal()}
                >
                  Close
                </Button>
                
              </div>
            </Modal>

            {/* success modal */}


           
     
  </Container>
    </>
  );
};

export default UserPrivileges;
