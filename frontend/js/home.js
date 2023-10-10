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
    btnMenu.innerHTML = '<a href="admin.html"><i class="fa-solid fa-gear fa-2x text-[#D2D2D3] hover:text-[#a770ff]"></i></a>';
    btnMenu.classList.remove('hidden');
} else {
    btnMenu.innerHTML = '';
}