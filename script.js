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

// Fonction pour charger les produits depuis produits.json
async function chargerProduits() {
    try {
        const response = await fetch('produits.json'); // Charge le fichier JSON
        const produits = await response.json(); // Convertit en objet JS

        let produitsHTML = "";
        produits.forEach(produit => {
            produitsHTML += `
                <div class="produit">
                    <div class="images">
                        ${produit.images.map(image => `<img src="${image}" alt="${produit.nom}">`).join('')}
                    </div>
                    <h3>${produit.nom}</h3>
                    <p>${produit.description}</p>
                    <span class="prix">${produit.prix}</span>
                    <a href="${produit.lien}" target="_blank" class="button">Acheter</a>
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