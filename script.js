// Animation de scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// FAQ : Afficher/Masquer les réponses
document.querySelectorAll('.faq-item h3').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});

function toggleMenu() {
    document.querySelector(".menu").classList.toggle("active");
}

const CLE_API_CJ = "d0ae46cd92e64b81ad0b5b88aaeadcec"; // Ta clé API

async function chargerProduits() {
    try {
        const response = await fetch('https://developers.cjdropshipping.com/api/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CLE_API_CJ}`
            }
        });

        const produits = await response.json();

        let produitsHTML = "";
        produits.forEach(produit => {
            produitsHTML += `
                <div class="produit">
                    <img src="${produit.image}" alt="${produit.nom}">
                    <h3>${produit.nom}</h3>
                    <p>${produit.description}</p>
                    <span class="prix">${produit.prix} €</span>
                    <a href="#" onclick="passerCommande('${produit.id}')" class="button">Acheter</a>
                </div>
            `;
        });

        document.getElementById("produits-container").innerHTML = produitsHTML;
    } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
    }
}

// Charger les produits quand la page boutique s'affiche
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("produits-container")) {
        chargerProduits();
    }
});

async function passerCommande(produitId) {
    try {
        const response = await fetch('https://developers.cjdropshipping.com/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CLE_API_CJ}`
            },
            body: JSON.stringify({
                produit_id: produitId,
                client: {
                    nom: "Nom du client",  // À remplacer par les vrais champs client
                    adresse: "Adresse de livraison",
                    email: "email@client.com"
                }
            })
        });

        const data = await response.json();
        console.log("Commande passée :", data);
        alert("Votre commande a bien été prise en compte !");
    } catch (error) {
        console.error("Erreur lors de la commande :", error);
        alert("Erreur lors de la commande, veuillez réessayer.");
    }
}