// Création d'un tableau contenant la liste des véhicules (le même que celui dans le tableau json)
// const cars = [
//     {
//         id: 1,
//         brand: "Peugeot 208",
//         type: "Diesel",
//         doors: "5",
//         GPS: "Yes",
//         autoradio: "Yes",
//         forfaitPerKm: "0,5",
//         price: 999,
//         agency: "Paris",
//         url: "./img/c4173f1e-8ffc-486f-b94b-96be0f338f66.png"
//     },
//     {
//         id: 2,
//         brand: "Ford Focus",
//         type: "Diesel",
//         doors: "5",
//         GPS: "Yes",
//         autoradio: "Yes",
//         forfaitPerKm: "0,5",
//         price: 999,
//         agency: "",
//         url:"./img/09bca341-66df-4300-8276-490865325617.png"
//     },
//     {
//         id: 3,
//         brand: "Audi A1",
//         type: "Diesel",
//         doors: "5",
//         GPS: "Yes",
//         autoradio: "Yes",
//         forfaitPerKm: "0,55",
//         price: 1100,
//         agency: "Paris",
//         url:"./img/2a39b392-6dc9-478c-8c6a-990c150176fd.png"
//     },
//     {
//         id: 4,
//         brand: "Opel Mokka",
//         type: "Diesel",
//         doors: "5",
//         GPS: "Yes",
//         autoradio: "Yes",
//         forfaitPerKm: "0,4",
//         price: 1150,
//         agency: "Paris",
//         url:"./img/02c31279-46a9-4ff4-bf8a-242f86c26496.png"
//     }
// ]

let cars 

async function recupCars() {
    const response = await fetch("./cars.json")
    cars = await response.json()
    cars = cars.cars


// Récupération de la division html dans laquelle on va afficher nos véhicules
let cartes = document.getElementById("cards")
// Création d'un indice pour le caroussel qui sera fonctionnel sur smartphones et tablettes
let n = 0
// Fonction qui va gérer l'affichage d'une carte sur tablette et mobile
function carCardMobile(car){
    cartes.innerHTML=`
                <div class="d-flex carte">
                    <div class="img d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16" id="-">
                            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                        </svg>
                        <img src=${car.url} alt="Photo de la ${car.brand}" class="photo"/>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16" id="+">
                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                        </svg>
                    </div>
                    <div class="d-flex justify-content-center align-items-center col-3">
                        <button class="valider col-12">Réserver et payer</button>
                    </div>
                </div>
            `
            // Evenenement sur les fleches pour faire défiler les cartes
                // Récupération du bouton issu du innerHTML avec son id
                const btnNext = document.getElementById("+")
                // Evenement sur le bouton récupéré
                btnNext.addEventListener("click", e=>{
                    e.preventDefault()
                    // On incrémente l'indice créé auparavant pour se "placer" sur le bon item dans cars
                    n++
                    // Si on est au dernier élément du tableau, oon repart du début du tableau (si on ne le fait pas aucune voiture ne correspondra à cette valeur de n)
                    if (n==cars.length) {n = 0}
                    // On relance la fonction avec la nouvelle valeur de n
                    carCardMobile(cars[n])
                })

                // Même chose dans la logique que le bouton "+"
                const btnPrevious = document.getElementById("-")
                btnPrevious.addEventListener("click", e=>{
                    e.preventDefault()
                    if (n==0) {n = cars.length}
                    n--
                    carCardMobile(cars[n])
                })
}
// Fonction qui va gérer l'affichage de toutes les cartes du tableau (sur écran large)
function carList(elements){
    elements.forEach(el=>{
    cartes.innerHTML+=`
    <div class="d-flex carte">
    <div class="img d-flex align-items-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
    </svg>
    <img src=${el.url} alt="Photo de la ${el.brand}" class="photo"/>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
    </svg>
    </div>
    <div class="d-flex flex-column pt-3">
    <h4 class="car">${el.brand}</h4>
    <div class="desc">
    <p>${el.type}, ${el.doors} portes,${(el.GPS==="Yes")? ` GPS,`:``} ${(el.autoradio==="Yes")? ` Autoradio,`:``} Forfait 1000km (${el.forfaitPerKm}/km supplémentaire),</br>
    ${el.price} € ${(el.agency==="")? ``:` - Agence de ${el.agency}`}</p>
    </div>
    <button class="valider col-5">Réserver et payer</button>
    </div>
    </div>
    `
    })
}

// Appel de la fonction selon le medium employé
if (window.matchMedia("(max-width: 992px)").matches){
    carCardMobile(cars[n])
    }
    else {
    carList(cars)
    }

// Evenement sur le changement de la taille de l'écran afin de modifier le comportement de l'affichage de cartes (différent sur grnad écran de la tablette ou smartphone)
    // Cet évènement n'est utile que pour tester le responsive, d'un côté utilisateur ce dernier ne va pas certainement pas changer sa taille d'écran en cours de navigation
window.addEventListener("resize",(e)=>{
    // Remise à vide de la section d'affichage des cartes
    cartes.innerHTML = ""
    if (window.matchMedia("(max-width: 992px)").matches){
    carCardMobile(cars[n])
    }
    else {
    carList(cars)
    }
})

// Changement de l'affichage selon la valeur du selecteur choisie par l'utilisateur
    // Récupération du sélecteur
    const croissant = document.getElementById("croissant")
    // Evènement qui se déclenche lors du changement de valeur (nouvelle selection dans le menu déroulant par l'utilisateur)
    croissant.addEventListener("change",()=>{
        // Condition si il sélectionne prix décroissant
        if (croissant.value === "décroissant") {            
            cars.sort(function (a,b) {
            return b.price - a.price
            })
        }            
        // Condition si il sélectionne prix décroissant
        if (croissant.value === "croissant") {
            // On modifie cars pour le trier par ordre croissant de prix en utilisant sa propriété "price"
            cars.sort(function (a,b) {
            return a.price - b.price
            })
        }
        
        // On remplace le contenu HTML de la div contenant les cartes par un contenu vide afin de ne pas avoir les cartes que l'on avait déjà avant
        cartes.innerHTML = ""
        // On relance la fonction qui affiche les cartes selon le medium sur lequel on est
        if (window.matchMedia("(max-width: 992px)").matches){
            n = 0
            carCardMobile(cars[n])
        }
        else {
            carList(cars)
        }
    })

// Ajout d'un évènement sur le click sur le burger afin d'ouvrir le menu     
const burger = document.getElementById("burger")
const menu = document.getElementById("menu")
menu.style.display = "none"
    burger.addEventListener("click",(e)=>{
        (menu.style.display === "none")? menu.style.display = "block" :  menu.style.display = "none"
    })
}

recupCars()



