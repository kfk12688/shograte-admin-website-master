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
import Setting from './forms/Setting'

const Settings = (props) => {

  const [copiedText, setCopiedText] = useState();
  const [settings, setSettings] = useState([]);
  const [formModal, setFormModal] = useState(false);
  const [formResponse, setFormResponse] = useState(false);
  const [singleSetting, setSingleSetting] = useState({});
  const [notificationModal, setNotificationModal] = useState(false);


  useEffect(() => {
    //make api call to get catgories
    getData();    
    
  }, []);


  const toggleModal = () => {
    setSingleSetting({});
    setFormResponse({});
    setFormModal(!formModal)    
  };

  const toggleNotificationModal = () => {
    setNotificationModal(!notificationModal)  
  };

  const getData=()=>{

      api.common('settings/list').getAll().then(({ data }) => {
        console.log('data',data);
        if(data.success == true){
          setSettings(data.data);
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


  const getSingleData=(id)=>{

    api.common('settings/list').getOne().then(({ data }) => {

      console.log('value',data);
      if(data.success == true){
        setSingleSetting(data.data[0]);
        setFormModal(!formModal)  
      }

    })

}


const submitData=(formData)=>{    

  let url='settings/list';
  if(Object.keys(singleSetting).length > 0){
    url='settings/list/'+singleSetting._id;
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


      return data.map((data, index) => {
        const { store_title, store_name,address,email,phone,country,state,_id } = data //destructuring
        return (
           <tr key={index}>
              <td>1</td>
              <td>{store_title}</td>
              <td>{store_name}</td>
              <td>{address}</td>
              <td>{email}</td>
              <td>{phone}</td>
              <td>{country}</td>
              <td>{state}</td>
              <td className="text-center">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href={null}
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>

                            <DropdownItem
                              href={null}
                              onClick={(e) => getSingleData(_id)}
                            >
                              Edit
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
            <Card className="shadow" style={{minHeight:300}}>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Setting</h3>
                  </div>                 
                  
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">SNo</th>
                    <th scope="col">S.Title</th>
                    <th scope="col">S.Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Country</th>
                    <th scope="col">State</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>    

                  {/* check categories empty */}

                    {renderTableTr(settings)}
                  
                </tbody>

              </Table>
              
            </Card>
          </Col>
        </Row>


           {/* modal */}
            
           <Modal
              className="modal-dialog-centered"
              size="xl"
              isOpen={formModal}
              toggle={() => toggleModal()}
            >
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0" >
                  <CardHeader className="bg-transparent">
                    <div className="text-muted text-center mt-2 mb-3">
                      <small>                       
                        Edit Product</small>
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
                      <Setting submitData={submitData} singleSetting={singleSetting} />
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

export default Settings;
