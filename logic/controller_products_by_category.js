import { productsRepository } from "../repository/product_repo.js"



const divCategory = document.querySelector('#div-category');
const agarrarURL = new URL( window.location )
const category = agarrarURL.searchParams.get("category")

productsRepository.getProductsByCategory(category)
  .then((products) => {


       const items = document.createElement("div");
       items.classList.add("items")

      const categoryGroup = document.createElement("div");
      categoryGroup.classList.add("category-group")
      const categoryTite = createCategoryTitle(category);
      categoryGroup.appendChild (  categoryTite );

      products.forEach(produ => {
        console.log(produ.name)
        const item = createItem(produ.name,produ.price,produ.url,produ.id)
        items.appendChild(item)
      });

      divCategory.appendChild(categoryGroup);
      divCategory.appendChild(items);



  });




function createItem(nombre, price, url,id) {
  const divItem = document.createElement("div");
  divItem.classList.add("item")
  const content = `
    <img src=${url} alt="">
                    <h6>${nombre}</h6>
                    <h5>$ ${price}</h6>
                    <a href="../page/detail.html?id=${id}">Ver Producto</a>
    `;
  divItem.innerHTML = content;

  return divItem;
}

function createCategoryTitle(name,category) {
  const headerDiv = document.createElement("div");
  headerDiv.classList.add("header-category");
  const containt =
    `
  <h4 class="title-category">${name}</h4>
  <a href="../page/products.html?category=${category}"> ver Todo <img src="ressource/arrow.svg" alt=""></a>
`
headerDiv.innerHTML = containt;
return headerDiv;
}