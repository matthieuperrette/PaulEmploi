var btn_connexion = document.getElementById("btn_connexion");
var btn_inscription= document.getElementById("btn_inscription");


//btn_connexion.addEventListener('click', toggleForms);
//btn_inscription.addEventListener('click', toggleForms);

function toggleForms() {
    var form_connexion = document.getElementById("form_connexion");
    var form_inscription = document.getElementById("form_inscription");

    if(form_connexion.classList.contains('d-none')){
        form_connexion.classList.remove('d-none');
        form_inscription.classList.add('d-none');
    }
    else{
        form_inscription.classList.remove('d-none');
        form_connexion.classList.add('d-none');
    }

}





