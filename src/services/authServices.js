import http from "./httpService";
import jwtDecode from "jwt-decode"
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";


export async function login(email, password){
   const {data: jwt} = await http.post(apiEndpoint , {email, password})
   localStorage.setItem('token', jwt)
}

export function logout(){
   return localStorage.removeItem('token')
}

export function loginWiithJwt() {
   
}

export function getCurrentUser(){
   
   try {
      const jwt = localStorage.getItem("token")
      return jwtDecode(jwt)
    } catch (error) {
       return null
    }

}

