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
    const containerProjets = document.getElementById('containerProjetsDiv');
    const fd = new FormData(formProjects);
    const url = new URLSearchParams(fd).toString();
    
    try {
        const response = await fetch(urlApi+'/projects/display', {
            method: 'POST',
            body: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const data = await response.json();
        containerProjets.innerHTML = '';
        for (let elements of data.data) {
            containerProjets.innerHTML += `
            <div id="project" class="bg-[#181A1D] hover:bg-[#202124] rounded-lg ease-in duration-300 lg:w-1/4 lg:mt-5 lg:ml-5">
                <div id="imgContainer" class="">
                    <img src="../elements/images/projects/${elements.images}" alt="${elements.name}" class="object-cover object-center rounded-t-lg">
                </div>
                <div id="titleProject" class="flex flex-col items-center py-3">
                    <h2>
                        <span class="text-[#D2D2D3] font-semibold">
                            ${elements.name}
                        </span>
                    </h2>
                    <p>
                        <span class="text-[#707173]">
                            Router + MVC
                        </span>
                    </p>
                </div>
                <div id="linkProject" class="flex justify-center mb-2 space-x-2 text-[#707173]">
                    <a href="${elements.website}" class="bg-[#27282B] px-2 rounded hover:text-[#217CE5] flex space-x-2 items-center">
                        <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 pointer-events-none"><path d="M13.2 4.096a3.743 3.743 0 015.148-.137l.144.137 1.412 1.412a3.743 3.743 0 01.137 5.148l-.137.144-4.023 4.023a3.743 3.743 0 01-5.148.137l-.144-.137-.706-.706a.749.749 0 01.982-1.125l.076.067.706.705c.84.84 2.181.876 3.063.105l.113-.105 4.022-4.022c.84-.84.876-2.181.105-3.064l-.105-.112-1.411-1.411a2.246 2.246 0 00-3.063-.105l-.113.105L13.2 6.213a.749.749 0 01-1.126-.982l.067-.076L13.2 4.096zM8.119 9.177a3.743 3.743 0 015.148-.137l.144.137.706.706a.749.749 0 01-.982 1.125l-.076-.067-.706-.705a2.246 2.246 0 00-3.063-.105l-.113.105-4.022 4.022a2.246 2.246 0 00-.105 3.064l.105.112 1.411 1.411c.84.84 2.181.876 3.063.105l.113-.105 1.058-1.058a.749.749 0 011.126.982l-.067.076-1.059 1.059a3.743 3.743 0 01-5.148.137l-.144-.137-1.412-1.412a3.743 3.743 0 01-.137-5.148l.137-.144L8.12 9.177z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                        Projet
                    </a>
                    <a href="${elements.github}" class="bg-[#27282B] px-2 rounded hover:text-[#a770ff]">
                        <i class="fa-brands fa-github"></i>
                        Github
                    </a>
                </div>
            </div>`;
        }
        console.log(data);
    } catch (error) {
        console.error('Une erreur s\'est produite : ', error);
    }
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