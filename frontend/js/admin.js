const urlApi = 'http://localhost:4000'

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
    </div>`;

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
async function projectManager() {
    const containerDiv = document.getElementById('containerActionForm');
    containerDiv.innerHTML = '';
    containerDiv.innerHTML = `
    <div>
        <div class="flex justify-around items-center">
            <h2 class="text-2xl font-bold text-[#D2D2D3]">Gestion des projets</h2>
            <button id="btnAddProject" class="bg-secondary-onion text-white font-bold py-2 px-4 rounded-[10px] border border-whiter">Ajouter un projet</button>
        </div>
        <div id="containerProject"></div>
    </div>`;
    try {
        let response = await fetch(urlApi + '/projects');
        let data = await response.json();
        const containerProject = document.getElementById('containerProject');
        containerProject.innerHTML = '';
        for (let project of data.data) {
            containerProject.innerHTML += `
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold text-[#D2D2D3]">${project.name}</h2>
                <button id="btnEditProject" class="bg-secondary-onion text-white font-bold py-2 px-4 rounded-[10px] border border-whiter">Editer</button>
                <button id="btnDeleteProject" class="bg-secondary-onion text-white font-bold py-2 px-4 rounded-[10px] border border-whiter">Supprimer</button>
            </div>`;
        }
    } catch (error) {
        console.log(error);
    }
    const btnAddProject = document.getElementById('btnAddProject');
    btnAddProject.addEventListener('click', () => {
        addProject();
    });
}

function addProject() {
    const modal = document.getElementById('containerModalAdmin');
    modal.innerHTML = '';
    modal.innerHTML = `
    <dialog id="modalAddProduct" class="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 rounded bg-[#181A1Dfc] border border-[#ac1de4] p-4 w-[70%] h-[70%] xl:w-1/2 xl:h-1/2">
        <div class="flex flex-col justify-between h-full">
        <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-[#D2D2D3]">Ajouter un projet</h2>
            <button id="btnCloseModal" class="bg-slate-600 text-white font-bold p-1 rounded">
                <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z" fill="currentcolor" fill-rule="evenodd"></path></svg>
            </button>
        </div>
            <form action="" method="post" id="addProjectForm" enctype="multipart/form-data" class="flex flex-col justify-between w-full h-full pt-4">
                <div class="form__div">
                    <input type="text" name="name" id="name" class="form__input" placeholder="">
                    <label for="name" class="form__label">Nom du projet</label>
                </div>
                <div class="form__div">
                    <textarea name="description" id="description" cols="30" rows="10" class="form__input h-[4rem]" placeholder=""></textarea>
                    <label for="des" class="form__label">Description du projet</label>
                </div>
                <div class="flex flex-wrap justify-between">
                    <div class="form__div w-[48%]">
                        <input type="text" name="github" id="github" class="form__input" placeholder="">
                        <label for="github" class="form__label">Lien du repo</label>
                    </div>
                    <div class="form__div w-[48%]">
                        <input type="text" name="website" id="website" class="form__input" placeholder="">
                        <label for="link" class="form__label">Lien du projet</label>
                    </div>
                </div>
                <div class="form__div">
                    <input type="file" name="images" id="images" class="form__input" accept="image/*">
                    <label for="images" class="form__label">Image du projet</label>
                </div>
                <div id="tagsFormAddProject" class="flex flex-wrap"></div>
                <div id="errorsDisplay" class="text-red-500"></div>
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
        const errorsDisplay = document.getElementById('errorsDisplay');
        const Name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const github = document.getElementById('github').value;
        const website = document.getElementById('website').value;
        // Images
        const imagesValue = document.getElementById('images').files[0];
        const tags = document.querySelectorAll('input[name="tags"]');
        const tagsChecked = [];
        tags.forEach(tag => {
            if (tag.checked) {
                tagsChecked.push(parseInt(tag.value));
            }
        });

        const form = new FormData();
        form.append('name', name);
        form.append('description', description);
        form.append('github', github);
        form.append('website', website);
        form.append('images', imagesValue);
        const tagsJSON = JSON.stringify(tagsChecked);
        form.append('tags', tagsJSON);

        console.log(form);
        const formJson = JSON.stringify(Object.fromEntries(form));
        console.log(formJson);

            try {
                const response = await fetch(urlApi + '/projects/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    },
                    body: new FormData(formAddProject),
                });
                const data = await response.json();
                if (data.success === 1) {
                    dialog.removeAttribute("open");
                    modal.innerHTML = '';
                    projectManager();
                } else {
                    errorsDisplay.innerHTML = data.message;
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