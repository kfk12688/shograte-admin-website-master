import React , { useState,useEffect } from "react";
// reactstrap components
import {
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
} from "reactstrap";

import { useFormik } from 'formik';
import * as yup from 'yup';


const validationSchema = yup.object({

  store_title: yup
  .string('Enter your store title')
  .required('Store title is required'),

  store_name: yup
  .string('Enter your store name')
  .required('Store name is required'),

  address: yup
  .string('Enter address')
  .required('Address  is required'),

  country: yup
  .string('Enter country')
  .required('country  is required'),

  state: yup
  .string('Enter state')
  .required('state  is required'),

  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
    
  phone: yup
  .string('Enter your phone')
  .min(10, 'Phone should be of minimum 10 characters length')
  .required('Phone is required'),
});


const Setting =(props)=>{

  const { singleSetting } = props; 

  const formik = useFormik({
    initialValues: {
      email:singleSetting.email ? singleSetting.email : "",
      phone: singleSetting.phone ? singleSetting.phone : "",
      store_title: singleSetting.store_title ? singleSetting.store_title : "",
      store_name: singleSetting.store_name ? singleSetting.store_name : "",
      address: singleSetting.address ? singleSetting.address : "",
      country: singleSetting.country ? singleSetting.country : "",
      state: singleSetting.state ? singleSetting.state : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      //pass data to props

      props.submitData(values);

    },
  });
  
  return(  

    <>

      {/* <PageHeader /> */}

      <Container className="mt--7" fluid>

      <Form onSubmit={formik.handleSubmit} >
        <Row>
         <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Setting</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      type="submit"
                      size="sm"
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                
                  <h6 className="heading-small text-muted mb-4">
                    Basic information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-store_title"
                          >
                            Store Title
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-store_title"
                            placeholder="Store Title"
                            type="text"
                            name="store_title"
                            value={formik.values.store_title}
                            onChange={formik.handleChange}
                          />

                        {formik.errors.store_title &&
                          <div className="text-muted text-left">
                          <span className='text-danger '>{formik.errors.store_title}</span>
                          </div>
                        }



                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-store_name"
                          >
                           Store Title
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-store_name"
                            placeholder=" Store Title"
                            type="text"
                            name="store_name"
                            value={formik.values.store_name}
                            onChange={formik.handleChange}
                          />

                          {formik.errors.store_name &&
                            <div className="text-muted text-left">
                            <span className='text-danger '>{formik.errors.store_name}</span>
                            </div>
                          }
                          
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="Email"
                            type="text"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                          />

                          {formik.errors.email &&
                            <div className="text-muted text-left">
                            <span className='text-danger '>{formik.errors.email}</span>
                            </div>
                          }


                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-phone"
                          >
                            Phone
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-phone"
                            placeholder="Phone"
                            type="number"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.phone &&
                            <div className="text-muted text-left">
                            <span className='text-danger '>{formik.errors.phone}</span>
                            </div>
                          }
                        </FormGroup>
                      </Col>
                    </Row>


                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            placeholder="Address"
                            type="textarea"
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                          />

                          {formik.errors.address &&
                            <div className="text-muted text-left">
                            <span className='text-danger '>{formik.errors.address}</span>
                            </div>
                          }


                        </FormGroup>
                      </Col>
                      
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-country"
                            placeholder="Country"
                            type="text"
                            name="country"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                          />

                          {formik.errors.country &&
                            <div className="text-muted text-left">
                              <span className='text-danger '>{formik.errors.country}</span>
                            </div>
                          }

                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-state"
                          >
                           State
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-state"
                            placeholder="State"
                            type="text"
                            name="state"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.state &&
                            <div className="text-muted text-left">
                              <span className='text-danger '>{formik.errors.state}</span>
                            </div>
                          }
                        </FormGroup>
                      </Col>
                    </Row>
                  
                  </div>
                  <hr className="my-4" />
                 {/* Description */}

               
              </CardBody>
            </Card>
          </Col>
        </Row>

        </Form>
      </Container>
   

      </>

  )



}

export default Setting;