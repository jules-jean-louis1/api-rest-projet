// Import
import { loginRegisterForm } from './function/loginRegister.js';

const btnLogin = document.getElementById('btnLogin');

if (btnLogin) {
    loginRegisterForm(btnLogin);
}
console.log(localStorage.getItem('user'));
console.log(localStorage.getItem('token'));