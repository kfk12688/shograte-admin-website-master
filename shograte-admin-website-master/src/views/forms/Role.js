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

class Role extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          title: '',
          errors: {
            title: ''
          }
        };      

      }

    componentDidMount(){
        if(this.props.singleRole){

            const{title}= this.props.singleRole;

            this.setState({
              title:title
            });

            
            // this.setState({ dealersOverallTotal: total }, () => {
            //     console.log(this.state.dealersOverallTotal, 'dealersOverallTotal1');
            //   }); 
            
        }
    }


    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
      
        switch (name) {
          case 'category_name': 
            errors.title = 
              value.length < 0
                ? 'Title cannot empty!'
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
        const {title}=this.state;
        if(!title){
            if(!title){
                errors.title = 'Title cannot empty!';
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
            console.info('Valid Form')

            let formData={
              title:this.state.title
            }

            this.props.submitData(formData);
        }else{
            console.error('Invalid Form')
        }
    }

  render() {

    const {errors,title} = this.state;

    return (
      <>
        <Form onSubmit={this.handleSubmit} noValidate>
         <Row>
            <Col md="12">
              <FormGroup className={errors.title.length > 0 ? 'has-danger':''}>
                <Input
                  className={errors.title.length > 0 ? 'is-invalid':''}
                  placeholder="Title"
                  type="text"
                  name='title' onChange={this.handleChange}

                  value={title}
                  
                />
                {errors.title.length > 0 && 
                    <div className="text-muted text-left">
                        <span className='text-danger '>{errors.title}</span>
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

export default Role;