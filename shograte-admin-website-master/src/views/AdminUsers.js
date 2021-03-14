
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

import AdminUser from './forms/AdminUser'

const AdminUsers = (props) => {

  const [copiedText, setCopiedText] = useState();
  const [activePage, setActivePage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [formModal, setFormModal] = useState(false);
  const [formResponse, setFormResponse] = useState(false);
  const [singleUser, setSingleUser] = useState({});
  const [notificationModal, setNotificationModal] = useState(false);


  const [rolesList, setRolesList] = useState([]);

  useEffect(() => {
    //make api call to get catgories
    getData();    
    
  }, [activePage]);


  const toggleModal = () => {
    setSingleUser({});
    setFormResponse({});
    setFormModal(!formModal)    
  };

  const toggleNotificationModal = () => {
    setNotificationModal(!notificationModal)  
  };

  const getData=()=>{
      api.common('adminusers/listAll?page='+currentPage).getAll().then(({ data }) => {
        if(data.success == true){
          setUsers(data.data);
          setPaginationData(data.pagination);
        }

      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.status);

          if(error.response.status == 401){
            props.history.push('/auth/login?login=failed');
          }
        }
      });

      //load catories list
      api.common('roles/list?size=10000').getAll().then(({ data }) => {
        if(data.success == true){

          let rolesData=data.data;
          let rolesTmp=[];
          if(rolesData.length > 0){  
            rolesData.forEach(element => {
              rolesTmp.push({
                label:element.title,
                value:element._id,
              })
            });

          }

          setRolesList(rolesTmp);

          console.log('roles',rolesList);
        }
      })


  }


  const getSingleData=(id)=>{
    api.common('adminusers/list/'+id).getOne().then(({ data }) => {
      console.log('value',data);

      if(data.success == true){
        setSingleUser(data.data);
        setFormModal(!formModal)  
      }

    })

}


  const deleteSingleData=(id)=>{

    if (window.confirm("Are you sure do you want to delete the user?")) {

      api.common('adminusers/delete/'+id).getOne().then(({ data }) => {  

        setFormResponse(data);
  
        if(data.success == true){
          setNotificationModal(!notificationModal) 
          getData();
        }
  
      })
    }
    
  }


  const submitData=(formData)=>{    

    let url='adminusers/register';
    if(Object.keys(singleUser).length > 0){
      url='adminusers/list/'+singleUser._id;
    }
   
    console.log('url',url);

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


  const handleSelected=(page)=>{

    setActivePage(page);
    setCurrentPage(page-1);
    getData();
      console.log('page',page);
  }

  //change user to active and inactive
  const changeStatus=(id,value)=>{ 
    
    let confirmDialog =window.confirm('Are you sure , you want to change the status.');

    if(!confirmDialog){
      return null;
    }
    let url='adminusers/changeStatus/'+id;
    console.log('url',url);
    let formData={
      is_active:!value
    }

    api.common(url).update(formData).then(({ data }) => {        
      setFormResponse(data);
      if(data.success == true){           
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


  const renderTableTr=(data)=>{

    if(data.length == 0){
        return(
          <>
            <tr aria-colspan="3">
                <th scope="col">No Records.</th>
            </tr>
          </>
        )
    }else{

      let currentPageIndex=paginationData.limit;
      let newIndex=currentPageIndex*currentPage;

      return data.map((data, index) => {
        const { username, email,role_name,is_active,_id } = data //destructuring

        return (
           <tr key={index}>
              <td>{parseInt(newIndex)+parseInt(index)+1}</td>
              <td>{username}</td>
              <td>{email}</td>
              <td>{role_name}</td>
              <td>
                  {is_active &&
                    <Badge color="" className="badge-dot mr-4">
                    <i className="bg-success" />
                    Active
                  </Badge>
                  }

                  {!is_active &&
                    <Badge color="" className="badge-dot mr-4">
                    <i className="bg-danger" />
                    Inactive
                  </Badge>
                  }
                  

              </td>
              <td className="text-center">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => getSingleData(_id)}
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => changeStatus(_id,is_active)}
                          >
                           Set {is_active ?"Inactive":"Active"}
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
           </tr>
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
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Users List</h3>
                  </div>

                  <Col className="text-right" xs="4">
                    <Button
                      color="info"
                      href="#pablo"
                      onClick={(e) => toggleModal()}
                      size="sm"
                    >
                      Add New
                    </Button>
                  </Col>
                  
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">SNo</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>    

                  {/* check categories empty */}

                  {renderTableTr(users)}
                  
                </tbody>

                </Table>


                {
                  Object.keys(paginationData).length >0 && 
                  
                  <>  
                      <nav className="pagination justify-content-center pt-3" aria-label="pagination">
                        <Pagination
                          activePage={activePage}
                          itemsCountPerPage={paginationData.limit}
                          totalItemsCount={paginationData.totalDocs}
                          pageRangeDisplayed={paginationData.limit}
                          onChange={handleSelected}
                          itemClass={'page-item'}
                          linkClass={'page-link'}
                        />
                      </nav>
                  </>

                }            

              
            </Card>
          </Col>
           </Row>


           {/* modal */}
            
           <Modal
              className="modal-dialog-centered"
              size="md"
              isOpen={formModal}
              toggle={() => toggleModal()}
            >
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-transparent">
                    <div className="text-muted text-center mt-2 mb-3">
                      <small>
                        {
                          Object.keys(singleUser).length > 0?'Edit ':'Add new '
                        }
                        User</small>
                    </div>
                      
                    {
                      formResponse.success ==false && 
                        <UncontrolledAlert color="warning" fade={false}>
                        
                        <span className="alert-inner--text">
                          Could not save!
                        </span>
                      </UncontrolledAlert>
                    }
                    

                  </CardHeader>
                  <CardBody className="px-lg-5">                   
                      {/* load category form data */}
                      <AdminUser submitData={submitData} singleUser={singleUser} rolesList={rolesList} />
                  </CardBody>
                </Card>
              </div>
            </Modal>
            {/* end of modal */}

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

export default AdminUsers;
