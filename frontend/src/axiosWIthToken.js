import axios from 'axios';


//get topken from sesison storage
let token=sessionStorage.getItem('token');

console.log(token)
export const axiosWithToken=axios.create({
    headers:{ Authorization:`Bearer ${token}`}
})

