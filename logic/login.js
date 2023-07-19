
const btnGoTOLogin = document.querySelector("#login");
const loginModal = document.querySelector(".login-modal");
const closeModal = document.querySelector('img[alt="close login"]');
const form = document.querySelector("form");

const intputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");

const statut = document.querySelector("#statut")
statut.style = "color:red; padding-top:10px"



btnGoTOLogin.addEventListener("click" ,()=>{
        loginModal.style =  "display: flex;" ;
});

closeModal.addEventListener("click" ,()=>{
    loginModal.style =  "display: none;" ;
});

window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
  }

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    //alert("alert")

    fetch("http://localhost:3000/user")
    .then(response => {
        if(!response.ok){
            throw new Error("erro in login.js: "+response.status);
        }
        return response.json();
    })
    .then( user=> {
        const email = user.email;
        const password = user.password;

        if( formIsValid() ){
            if(email != intputEmail.value || password != inputPassword.value){
                statut.innerHTML = "el conrreo o la contraseña esta mal";
            }else{
                statut.innerHTML = "Perfecto";
            }
        }
    }).catch(error =>console.error("error in login.js: ",error));
})


function formIsValid(){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let warn = ""; 
    let isValid = true;
    statut.innerHTML = warn;
  if(inputPassword.value.trim().length  < 6){
    warn = "*Contraseña debe tener 6 caracteres minimo </br>";
    isValid = false;
  }
  isValid = false;
  if( !emailRegex.test(intputEmail.value.trim()) ){
    warn += "*Correo no es valido </br>";
  }
  statut.innerHTML = warn;
  return isValid
}