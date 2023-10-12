// Import
import { loginRegisterForm } from './function/loginRegister.js';

const btnLogin = document.getElementById('btnLogin');
const urlApi = 'http://localhost:4000';

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

const btnDisplayFilter = document.getElementById('btnDisplayFilter');

btnDisplayFilter.addEventListener('click', (e) =>{
    e.preventDefault();
    document.getElementById('displayFilter').classList.toggle('hidden');
})

async function getTags() {
    const response = await fetch(urlApi+'/tags');
    const data = await response.json();
    return data;
}
async function displayTags() {
    const selectTags = document.getElementById('tags');
    const data = await getTags(); // Appel de la fonction pour obtenir les données

    // Itérer sur les données et ajouter chaque option
    data.data.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag.id;
        option.textContent = tag.name;
        selectTags.appendChild(option);
    });
}

displayTags();
async function displayProjects() {
    const formProjects = document.getElementById('formFilterProjects');
    let intel = new FormData(formProjects);
    console.log(intel);
    let response = await fetch(urlApi+'/projects/display', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: intel
    });
    let data = await response.json();
    console.log(data);
}

async function filterProject() {

    const nameAuto = document.getElementById('name');
    nameAuto.addEventListener('keyup', (e) => {
        displayProjects();
    })

    const tags = document.getElementById('tags');
    tags.addEventListener('change', (e) => {
        displayProjects();
    });

    const date = document.getElementById('date');
    date.addEventListener('change', (e) => {
        displayProjects();
    });

    displayProjects();
}

filterProject();