import React from "react";

// reactstrap components
import {
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Button
} from "reactstrap";

import Select from 'react-select';

class AdminUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          role: '',
          username: '',
          email: '',
          password: '',
          selectedOption: '',
          errors: {
            username: '',
            email: '',
            role: '',
            password: ''
          }
        };
      

      }

    componentDidMount(){

      console.table(this.props)

        if(this.props.singleUser){
          console.table(this.props.singleUser)
            const{role,username,email}= this.props.singleUser;
            this.setState({
              role,
              username,
              email
            });          

            let selected=this.props.rolesList.find(x => x.value === role);
            console.log('role selected',selected);
            this.setState({ selectedOption:selected });
       
        }
    }

    handleSelectChange = (selectedOption ) => {
      let errors = this.state.errors;

      if(selectedOption ){

        errors.role = '';
        
        this.setState({ role:selectedOption.value });
        this.setState({ selectedOption });

      }else{
        
        errors.role = 'Role required!';

        this.setState({ selectedOption:'' });
        this.setState({ role:'' });

      }

      this.setState({errors}, ()=> {
        console.log(errors)
      })
      
      console.log(`Option selected:`, selectedOption);
      console.log(`state:`, this.state);
    }


    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
      
        switch (name) {

          case 'role': 
          errors.role = 
          this.state.role.length < 0
              ? 'Role required!'
              : '';
          break;

        case 'username': 
          errors.username = 
            value.length < 0
              ? 'User Name cannot empty!'
              : '';
        break;
          
        case 'email': 
          errors.email = 
              value.length < 0
              ? 'Email cannot empty!'
              : '';
        break;

        case 'password': 
        errors.password = 
            value.length < 0
            ? 'Password cannot empty!'
            : '';
        break;
            
        default:
        break;
        }
      
        this.setState({errors, [name]: value}, ()=> {
            console.log(errors)
        })
      }

    validateForms=()=>{

        let errors = this.state.errors;

        const {role,username,email,password}=this.state;

        if(!role || !username || !email || !password){

            if(!role){
                errors.role = 'Role required!';
            }

            if(!username){
              errors.username = 'User Name cannot be empty!';
            }

            if(!email){
                errors.email ='Email cannot be empty!';
            }

            if(!password){
              errors.password ='Password cannot be empty!';
            }            

            this.setState({errors})
        }

    }

    validateForm = (errors) => {
        this.validateForms()
        let valid = true;
        Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    handleSubmit = (event) => {
        this.validateForms()
        event.preventDefault();
        if(this.validateForm(this.state.errors)) {
            

            let formData={
                role:this.state.role,
                username:this.state.username,
                email:this.state.email,
                password:this.state.password
            }
            console.info('Valid Form',formData)

            this.props.submitData(formData);
        }else{
            console.error('Invalid Form')
        }
    }

  render() {

    const {errors,role,username,email,selectedOption,password} = this.state;

    return (
      <>
        <Form onSubmit={this.handleSubmit} noValidate>
         <Row>
            <Col md="12">
              <FormGroup className={errors.role.length > 0 ? 'has-danger':''}>
                <Select
                  placeholder="Select Role"
                  name="role"
                  value={selectedOption}
                  options={this.props.rolesList}
                  onChange={this.handleSelectChange}
                  isClearable={true}
                />
                
                {errors.role.length > 0 && 
                    <div className="text-muted text-left">
                        <span className='text-danger '>{errors.role}</span>
                    </div>
                }
              </FormGroup>
            </Col>


            <Col md="12">
              <FormGroup className={errors.username.length > 0 ? 'has-danger':''}>
                <Input
                  className={errors.username.length > 0 ? 'is-invalid':''}
                  placeholder="User name"
                  type="text"
                  name='username' onChange={this.handleChange}
                  value={username}                  
                />

                {errors.username.length > 0 && 
                    <div className="text-muted text-left">
                        <span className='text-danger '>{errors.username}</span>
                    </div>
                }
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup className={errors.email.length > 0 ? 'has-danger':''}>
                
                <Input
                  className={errors.email.length > 0 ? 'is-invalid':''}
                  placeholder="Email"
                  type="email"
                  name='email' 
                  onChange={this.handleChange}
                  value={email}
                />           

                {errors.email.length > 0 && 
                    <div className="text-muted text-left">
                        <span className='text-danger '>{errors.email}</span>
                    </div>
                }


              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup className={errors.password.length > 0 ? 'has-danger':''}>
                
                <Input
                  className={errors.password.length > 0 ? 'is-invalid':''}
                  placeholder="Password"
                  type="password"
                  name='password' 
                  onChange={this.handleChange}
                  value={password}
                />           

                {errors.password.length > 0 && 
                    <div className="text-muted text-left">
                        <span className='text-danger '>{errors.password}</span>
                    </div>
                }

              </FormGroup>
            </Col>
          </Row>

        <div className="text-center">
            <Button
            className="my-4"
            color="primary"
            type="submit"
            >
                Submit
            </Button>
        </div>

        </Form>
      </>
    );
  }
}

export default AdminUser;