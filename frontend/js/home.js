// Import
import { loginRegisterForm } from './function/loginRegister.js';

const btnLogin = document.getElementById('btnLogin');

if (btnLogin) {
    loginRegisterForm(btnLogin);
}
//console.log(localStorage.getItem('user'));
const userToken = localStorage.getItem('token');

if (userToken) {
    const btnMenu = document.getElementById('btnMenu');
    btnMenu.classList.remove('hidden');
} else {
    btnMenu.innerHTML = '';
}