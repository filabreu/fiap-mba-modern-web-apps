import api from "../Common/api";

const login = (data: any) => api.post("/authPersons/login", data);

export default {
    login
};