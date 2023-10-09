function createDialog()
{
    const containerForm = document.querySelector('#containerFormLoginRegister');
    const dialog = document.createElement("dialog");
    dialog.setAttribute("id", "dialog");
    dialog.setAttribute("class", "w-[28.25rem] h-[64%] bg-[#17191c] border border-[#a770ff] rounded-[14px] shadow-lg z-50");
    dialog.innerHTML = '';

    const divBottom = document.createElement("div");
    divBottom.setAttribute("id", "divBottom");
    divBottom.setAttribute("class", "w-full flex items-center justify-center bg-[#17191c] border- border-[#a770ff] text-white rounded-b-[14px] fixed");

    const Div = document.createElement("div");
    Div.setAttribute("id", "DivModifyText");
    Div.setAttribute("class", "py-3 px-4 w-full flex items-center justify-between bg-[#17191c] border-b-[1px] border-b-[#a8b3cf33] text-white font-semibold text-lg rounded-t-[14px]");
    const Para = document.createElement("p")
    Para.setAttribute("id", "ParaModifyText");
    Para.textContent = "Se connecter";

    const buttonClose = document.createElement("button");
    buttonClose.innerHTML = `
            <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z" fill="currentcolor" fill-rule="evenodd"></path></svg>
        `;
    buttonClose.setAttribute("id", "buttonClose");
    buttonClose.setAttribute("type", "button");
    buttonClose.setAttribute("class", "font-bold cursor-pointer select-none focus-outline justify-center flex z-1 rounded-[12px] hover:bg-[#a8b3cf1f]");

    const Divflex1 = document.createElement("div");
    Divflex1.setAttribute("class", "flex flex-1");

    const containerDiv = document.createElement("div");
    containerDiv.setAttribute("id", "containerDiv");
    containerDiv.setAttribute("class", "flex justify-center w-full h-[85%]");

    dialog.appendChild(Div);
    Div.appendChild(Para);
    Div.appendChild(buttonClose);
    dialog.appendChild(containerDiv);
    dialog.appendChild(Divflex1);
    dialog.appendChild(divBottom);
    containerForm.appendChild(dialog);
}

/* Reset Error Message */
export function resetError(selector) {
    const small = document.getElementById(selector);
    small.innerHTML = '';
}



/* Function to Register Login */
export async function loginRegisterForm(btnLogin)
{
    const containerForm = document.querySelector('#containerFormLoginRegister');
    const dialogModal_Overlay = document.querySelector('#dialogModal_Overlay');
    containerForm.innerHTML = '';
    createDialog();

    const dialog = document.querySelector('#dialog');
    const containerDiv = document.querySelector('#containerDiv');
    btnLogin.addEventListener('click', async () => {
        dialog.setAttribute("open", "");
        const buttonLogin = document.querySelector('#buttonLogin');
        const ParaModifyText = document.getElementById("ParaModifyText");
        const TextchangeLogin = document.getElementById("TextchangeLogin");
        dialogModal_Overlay.classList.add('bg-overlay-quaternary-onion');
        /* Récupere le formulaire de connexion */
        async function Login() {
            containerDiv.innerHTML = '';
            containerDiv.innerHTML = `
            <form action="" method="post" id="login-form" class="bg-[#17191c] h-full max-h-[80%] mobileL:h-[40rem] mobileL:max-h-[calc(100vh-5rem)] w-[26.25rem] px-4 py-5 flex flex-col justify-between">
                <div>
                    <div>
                        <div class="form_control flex relative rounded-14 flex-row items-center bg-[#a8b3cf14] h-12 px-4 overflow-hidden border-2 border-[#000] rounded cursor-text">
                            <input type="text" name="email" id="email" placeholder="Nom d'utilisateur / Email" class="bg-transparent text-grey-100 focus:outline-none w-full">
                        </div>
                        <small id="errorEmail"></small>
                    </div>
                </div>
                <div>
                    <div>
                        <div class="form_control flex relative rounded-14 flex-row items-center bg-[#a8b3cf14] h-12 px-4 overflow-hidden border-2 border-[#000] rounded cursor-text">
                            <input type="password" name="password" id="password" placeholder="Mot de passe" class="bg-transparent text-grey-100 focus:outline-none w-full">
                        </div>
                        <small id="errorPassword"></small>
                    </div>
                </div>
                <div id="containerMessageProfil" class="h-[55px] w-full">
                    <div id="errorDisplay" class="w-full"></div>
                </div>
                <div id="containerSubmit" class="w-full">
                    <button type="submit" name="submit" id="submit" class="p-2 rounded bg-[#ac1de4] border-[#ac1de4]  hover:drop-shadow-[0_20px_20px_rgba(172,29,228,0.30)] font-semibold text-white w-full">Connexion</button>
                </div>
            </form>`;

            dialog.classList.add('h-[50%]');
            // Animation Label
            const inputEmail = document.querySelector('#email');
            const inputPassword = document.querySelector('#password');
            const formLogin = document.querySelector('#login-form');
            formLogin.addEventListener('submit', async (e) => {
                e.preventDefault();

                const email = inputEmail.value;
                const password = inputPassword.value;
                const errorDisplay = document.querySelector('#errorDisplay');

            try {
                const response = await fetch('http://localhost:4000/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Spécifiez le type de contenu JSON.
                    },
                    body: JSON.stringify({ email, password }),
                    });
                const result = await response.json();

                if (result.success === 1) {
                    console.log(result);
                    const token = result.token;
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(result.result));

                    errorDisplay.innerHTML = '';
                    errorDisplay.innerHTML = `
                    <p class="text-green-500">Vous êtes connecté</p>
                    `;
                    setTimeout(() => {
                    window.location.reload();
                    }, 1000);
                } else {
                    errorDisplay.innerHTML = '';
                    errorDisplay.innerHTML = `
                    <p class="text-red-500">Email ou mot de passe incorrect.</p>
                    `;
                }
            } catch (error) {
                console.error('Erreur lors de la requête de connexion:', error);
            }
            });
        }
        
        /* Change le formulaire en fonction du bouton cliqué */
        Login();
        
        const buttonClose = document.querySelector('#buttonClose');
        buttonClose.addEventListener('click', () => {
            dialog.close();
            dialogModal_Overlay.classList.remove('bg-overlay-quaternary-onion');
        });
    });
}
