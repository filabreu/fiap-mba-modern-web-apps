import api from "../Common/api";

const login = (data: any) => api.post("/storeProducts/login", data);

export default {
    login
};