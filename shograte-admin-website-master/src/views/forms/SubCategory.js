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

class SubCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          category_id: '',
          sub_category_name: '',
          sub_category_description: '',
          selectedOption: '',
          errors: {
            sub_category_name: '',
            sub_category_description: '',
            category_id: ''
          }
        };
      

      }

    componentDidMount(){
        if(this.props.singleSubCategory){

          console.table(this.props.singleSubCategory)
            const{subcategory_name,subcategory_desc,category_id,category_name}= this.props.singleSubCategory;

            this.setState({
              sub_category_name:subcategory_name,
              sub_category_description:subcategory_desc,
              category_id:category_id
            });          

            let selected=this.props.categoriesList.find(x => x.value === category_id);
            console.log('cat selected',selected);
            this.setState({ selectedOption:selected });

       
        }
    }

    handleSelectChange = (selectedOption ) => {
      let errors = this.state.errors;

      if(selectedOption ){

        errors.category_id = '';
        
        this.setState({ category_id:selectedOption.value });
        this.setState({ selectedOption });

      }else{
        
        errors.category_id = 'Category required!';

        this.setState({ selectedOption:'' });
        this.setState({ category_id:'' });

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

          case 'category_id': 
          errors.category_id = 
          this.state.category_id.length < 0
              ? 'Category required!'
              : '';
          break;

        case 'sub_category_name': 
          errors.sub_category_name = 
            value.length < 0
              ? 'Sub Category Name cannot empty!'
              : '';
        break;
          
        case 'sub_category_description': 
          errors.sub_category_description = 
              value.length < 0
              ? 'Sub Category Description cannot empty!'
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

        const {sub_category_name,sub_category_description,category_id}=this.state;

        if(!sub_category_name || !sub_category_description || !category_id){

            if(!category_id){
                errors.category_id = 'Category required!';
            }

            if(!sub_category_name){
              errors.sub_category_name = 'Sub Category Name cannot be empty!';
          }

            if(!sub_category_description){
                errors.sub_category_description ='Sub Category Description cannot be empty!';
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
                category_id:this.state.category_id,
                subcategory_name:this.state.sub_category_name,
                subcategory_desc:this.state.sub_category_description
            }
            console.info('Valid Form',formData)

            this.props.submitData(formData);
        }else{
            console.error('Invalid Form')
        }
    }

  render() {

    const {errors,sub_category_name,sub_category_description,category_id,selectedOption} = this.state;

    return (
      <>
        <Form onSubmit={this.handleSubmit} noValidate>
         <Row>
            <Col md="12">
              <FormGroup className={errors.sub_category_name.length > 0 ? 'has-danger':''}>
                <Select
                  placeholder="Select Category"
                  name="category_id"
                  value={selectedOption}
                  options={this.props.categoriesList}
                  onChange={this.handleSelectChange}
                  isClearable={true}
                />
                
                {errors.category_id.length > 0 && 
                    <div className="text-muted text-left">
                        <span className='text-danger '>{errors.category_id}</span>
                    </div>
                }
              </FormGroup>
            </Col>


            <Col md="12">
              <FormGroup className={errors.sub_category_name.length > 0 ? 'has-danger':''}>
                <Input
                  className={errors.sub_category_name.length > 0 ? 'is-invalid':''}
                  placeholder="Sub Category name"
                  type="text"
                  name='sub_category_name' onChange={this.handleChange}

                  value={sub_category_name}
                  
                />
                {errors.sub_category_name.length > 0 && 
                    <div className="text-muted text-left">
                        <span className='text-danger '>{errors.sub_category_name}</span>
                    </div>
                }
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup className={errors.sub_category_description.length > 0 ? 'has-danger':''}>
                
                <Input
                  className={errors.sub_category_description.length > 0 ? 'is-invalid':''}
                  placeholder="Sub Category Description"
                  type="text"
                  name='sub_category_description' onChange={this.handleChange}
                  value={sub_category_description}
                />           

                {errors.sub_category_description.length > 0 && 
                    <div className="text-muted text-left">
                        <span className='text-danger '>{errors.sub_category_description}</span>
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

export default SubCategory;