const produits = [
  {
      "nom": "Sécateur de Jardin",
      "description": "Un sécateur robuste pour tailler vos plantes.",
      "prix": "12.99€",
      "images": ["secateur1.jpg", "secateur2.jpg"],
      "lien": "https://www.temu.com/produit"
  },
  {
      "nom": "Gants de Jardinage",
      "description": "Des gants résistants pour protéger vos mains.",
      "prix": "8.99€",
      "images": ["gants1.jpg", "gants2.jpg"],
      "lien": "https://www.temu.com/produit"
  }
];

document.addEventListener("DOMContentLoaded", function() {
  let boutiqueContainer = document.getElementById('produits-container');
  produits.forEach(produit => {
      let produitHTML = `
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
      boutiqueContainer.innerHTML += produitHTML;
  });
});