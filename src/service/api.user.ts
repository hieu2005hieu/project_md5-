import publicAxios from "../components/Heatder/config/publicAxios"

export default {
    register: async (data:any) => {
        return await publicAxios.post("User", data)
    },
    login: async (data:any) => {
        return await publicAxios.post("User", data)
    },
    checkEmail: async (email:any) => {
        return await publicAxios.get(`User?email=${email}`)
    },
    checkLogin: async (email:any, password:any) => {
        return await publicAxios.get(`User?email=${email}&password=${password}`)
    },
}
