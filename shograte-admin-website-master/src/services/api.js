import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8081/api/';

export default {  

  getToken(){
    //check for token and append
    let tokenVal=localStorage.getItem('token')
    console.log('cookie',tokenVal);

    if(tokenVal){
    axios.defaults.headers.common['Authorization'] = `Bearer ${tokenVal}` 
    }
  },

  common(url) {
    //update token each request
    this.getToken();
    
    return {
      getOne: () => axios.get(`${url}`),
      getAll: () => axios.get(url),
      update: (toUpdate) =>  axios.post(url,toUpdate),
      create: (toCreate) =>  axios.post(url,toCreate),
      delete: ({ id }) =>  axios.delete(`${url}/${id}`),
      forget_password: (toUpdate) =>  axios.post(url,toUpdate),
      verify_code: (toUpdate) =>  axios.post(url,toUpdate),
      update_password: (toUpdate) => axios.post(url,toUpdate),
      login: (toUpdate) => axios.post(url,toUpdate),
    }
  }
}