import { AxiosRequestHeaders } from "axios";
import api from "../Common/api";

const getPersons = (prodID:string) => api.get("/persons/getPersons/" + prodID);
const getPersonsPost = (data:any) => api.post("/persons/getPersons", data);
const getAllPersons = (data:string) => api.get("/persons/?"+data);
const addUser = (data: any) => api.put("/storeProducts/signup",data);
const login = (data: any) => api.post("/storeProducts/login",data);
const addProduct = (data: any) => api.get("/storeProducts/",data);
const getProduct = (data: any, config?:AxiosRequestHeaders) => api.get("/storeProducts/"+data,config);


 export default{
    getPersons,
    getPersonsPost,
    getAllPersons,
    addUser,
    login,
    addProduct,
    getProduct,
};