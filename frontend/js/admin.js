const urlApi = 'http://localhost:4000/'

const userToken = localStorage.getItem('token');
const btnMenu = document.getElementById('btnMenu');
const titleBarInfo = document.getElementById('titleBarInfo');

const btnProjectManager = document.getElementById('projectManager');
const btnTagsManager = document.getElementById('tagsManager');

if (!userToken) {
    window.location.href = urlApi;
} else {
    const user = JSON.parse(localStorage.getItem('user'));

    titleBarInfo.innerHTML = `
    <div class="flex flex-col justify-center items-center">
            <div class="flex flex-col justify-center items-center">
                <h2 class="text-2xl font-bold text-[#D2D2D3]">Bienvenue ${user.login}</h2>
                <p class="text-xl font-light text-[#707173]">Vous êtes connecté en tant que ${user.site_right}</p>
            </div>
            <div class="flex flex-col justify-center items-center">
                <button id="btnLogout" class="mt-4 bg-secondary-onion text-white font-bold py-2 px-4 rounded">Se déconnecter</button>
            </div>
        </div>
        `;

    const btnLogout = document.getElementById('btnLogout');
    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = urlApi;
    });

    if (user.site_right === 'admin') {
        btnProjectManager.addEventListener('click', () => {
            projectManager();
        });
        btnTagsManager.addEventListener('click', () => {
            tagsManager();
        });
    }
}
async function getAllTags() {
    const response = await fetch( urlApi+'/tags', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        }
    });
    const data = await response.json();
    return data;
}
function projectManager() {
    const containerDiv = document.getElementById('containerActionForm');
    containerDiv.innerHTML = '';
    containerDiv.innerHTML = `
    <div>
        <div class="flex justify-around">
            <h2 class="text-2xl font-bold text-[#D2D2D3]">Gestion des projets</h2>
            <button id="btnAddProject" class="mt-4 bg-secondary-onion text-white font-bold py-2 px-4 rounded">Ajouter un projet</button>
        </div>
        <div id="containerProject"></div>
    </div>`;
    const btnAddProject = document.getElementById('btnAddProject');
    btnAddProject.addEventListener('click', () => {
        addProject();
    });
}

function addProject() {
    const modal = document.getElementById('containerModalAdmin');
    modal.innerHTML = '';
    modal.innerHTML = `
    <dialog id="modalAddProduct" class="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 rounded bg-[#181A1Dfc] border border-[#ac1de4] p-4">
        <div class="flex flex-col justify-center items-center">
        <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-[#D2D2D3]">Ajouter un projet</h2>
            <button id="btnCloseModal" class="bg-slate-600 text-white font-bold py-2 px-4 rounded">Fermer</button>
        </div>
            <form action="" method="post" id="addProjectForm" enctype="multipart/form-data">
                <div class="bg-[#2e3238] text-white border-2 border-[#707173] rounded flex flex-col">
                    <label for="name">Nom du projet</label>
                    <input type="text" name="name" id="name" class="bg-transparent">
                </div>
                <div class="bg-[#2e3238] text-white border-2 border-[#707173] rounded flex flex-col">
                    <label for="des">Description du projet</label>
                    <textarea name="description" id="description" cols="30" rows="10" class="bg-transparent"></textarea>
                </div>
                <div class="flex flex-wrap">
                    <div class="bg-[#2e3238] text-white border-2 border-[#707173] rounded flex flex-col">
                        <label for="github">Lien du repo</label>
                        <input type="text" name="github" id="github"  class="bg-transparent">
                    </div>
                    <div class="bg-[#2e3238] text-white border-2 border-[#707173] rounded flex flex-col">
                        <label for="link">Lien du projet</label>
                        <input type="text" name="website" id="website" class="bg-transparent">
                    </div>
                </div>
                <div>
                    <label for="img">Image du projet</label>
                    <input type="file" name="images" id="images" class="border-2 border-[#707173] rounded">
                </div>
                <div id="tagsFormAddProject" class="flex flex-wrap"></div>
                <button id="btnAddProjectForm" class="mt-4 bg-[#ac1de4] w-full text-white font-bold py-2 px-4 rounded">Ajouter</button>
            </form>
        </div>
    </dialog>`;
    const dialog = document.getElementById('modalAddProduct');
    dialog.setAttribute("open", "");
    const btnCloseModal = document.getElementById('btnCloseModal');
    btnCloseModal.addEventListener('click', () => {
        dialog.removeAttribute("open");
        modal.innerHTML = '';
    });
    const tagsFormAddProject = document.getElementById('tagsFormAddProject');
    tagsFormAddProject.innerHTML = '';
    getAllTags().then(data => {
        data.data.forEach(tag => {
            tagsFormAddProject.innerHTML += `
            <div class="flex justify-center items-center w-1/4">
                <input type="checkbox" name="tags" id="tag${tag.id}" value="${tag.id}">
                <label for="tag${tag.id}" class="text-xl font-bold text-[#D2D2D3]">${tag.name}</label>
            </div>`;
        });
    });

    const formAddProject = document.getElementById('addProjectForm');
    formAddProject.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const github = document.getElementById('github').value;
        const website = document.getElementById('website').value;
        const imagesInput = document.getElementById('images');
        const images = imagesInput.files[0];
        const tags = document.getElementsByName('tags');
        const tagsChecked = [];
        tags.forEach(tag => {
            if (tag.checked) {
                tagsChecked.push(tag.value);
            }
        });
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('github', github);
        formData.append('website', website);
        formData.append('images', images);
        formData.append('tags', JSON.stringify(tagsChecked));
        try {
            const response = await fetch(urlApi+'/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: formData,
            });
            const data = await response.json();
            if (data.success === 1) {
                dialog.removeAttribute("open");
                modal.innerHTML = '';
                projectManager();
            } else {
                console.log(data.message);
            }
        } catch (error) {
            if (error instanceof SyntaxError) {
                console.error('Invalid JSON:', error.message);
            } else {
                throw error;
            }
        }
    });
}


async function tagsManager() {
    const containerDiv = document.getElementById('containerActionForm');
    containerDiv.innerHTML = '';
    containerDiv.innerHTML = `
    <div>
        <div class="flex justify-around">
            <h2 class="text-2xl font-bold text-[#D2D2D3]">Gestion des tags</h2>
            <button id="btnAddTag" class="mt-4 bg-secondary-onion text-white font-bold py-2 px-4 rounded">Ajouter un tag</button>
        </div>
        <div id="containerTag"></div>
    </div>`;

    const containerTag = document.getElementById('containerTag');
    containerTag.innerHTML = '';
    try {
        const response = await fetch(urlApi + '/tags', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        const data = await response.json();
        if (data.success === 1) {
            data.data.forEach(tag => {
                containerTag.innerHTML += `
                <div class="flex justify-between items-center">
                    <div>
                        <p class="text-xl font-bold text-[#D2D2D3]">${tag.name}</p>
                    </div>
                    <div>
                        <button id="btnUpdateTag${tag.id}" class="mt-4 bg-secondary-onion text-white font-bold py-2 px-4 rounded">Modifier</button>
                        <button id="btnDeleteTag${tag.id}" class="mt-4 bg-secondary-onion text-white font-bold py-2 px-4 rounded">Supprimer</button>
                    </div>
                </div>`;
                const btnUpdateTag = document.getElementById(`btnUpdateTag${tag.id}`);
                btnUpdateTag.addEventListener('click', () => {
                    updateTag(tag.id);
                });
                const btnDeleteTag = document.getElementById(`btnDeleteTag${tag.id}`);
                btnDeleteTag.addEventListener('click', () => {
                    deleteTag(tag.id);
                });
            });
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log(error);
    }
    const btnAddTag = document.getElementById('btnAddTag');
    btnAddTag.addEventListener('click', () => {
        addTag();
    });
}

function addTag() {
    const modal = document.getElementById('containerModalAdmin');
    modal.innerHTML = '';
    modal.innerHTML = `
    <dialog id="modalAddProduct" class="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 rounded bg-[#181A1Dfc] p-4">
        <div class="flex flex-col justify-center items-center">
        <div class="flex justify-between">
            <h2 class="text-2xl font-bold text-[#D2D2D3]">Ajouter un tag</h2>
            <button id="btnCloseModal" class="mt-4 bg-secondary-onion text-white font-bold py-2 px-4 rounded">Fermer</button>
        </div>
            <form action="" method="post" id="addTagForm">
                <div>
                    <label for="name">Nom du tag</label>
                    <input type="text" name="name" id="name" class="border-2 border-[#707173] rounded">
                </div>
                <button id="btnAddTagForm" class="mt-4 bg-secondary-onion text-white font-bold py-2 px-4 rounded">Ajouter</button>
            </form>
        </div>
    </dialog>`;
    const dialog = document.getElementById('modalAddProduct');
    dialog.setAttribute("open", "");
    const btnCloseModal = document.getElementById('btnCloseModal');
    btnCloseModal.addEventListener('click', () => {
        dialog.removeAttribute("open");
        modal.innerHTML = '';
    });
    const formAddTag = document.getElementById('addTagForm');
    formAddTag.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        try {
            const response = await fetch( urlApi + '/tags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({ name }),
            });
            const data = await response.json();
            if (data.success === 1) {
                dialog.removeAttribute("open");
                modal.innerHTML = '';
                tagsManager();
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    });
}

async function updateTag(id) {
    try {
        const response = await fetch(`${urlApi}/tags/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
        });
        const data = await response.json();
        if (data.success === 1) {
            console.log(data.message);
            tagsManager();
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log(error);
    }
}

async function deleteTag(id) {
    try {
        const response = await fetch(`${urlApi}/tags/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
        });
        const data = await response.json();
        if (data.success === 1) {
            console.log(data.message);
            tagsManager();
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log(error);
    }
}