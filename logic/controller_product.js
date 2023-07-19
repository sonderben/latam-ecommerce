import { productsRepository } from "../repository/product_repo.js"

//const divItems = document.querySelector('#div-items')
const divCategory = document.querySelector('#div-category');
const loginButton = document.querySelector('#login');
const addProductModal = document.querySelector(".add-product-modal");
const closeModalAddProduct = document.querySelector('img[close="add product"]');
const formAddProduct = document.querySelector("#form-add-product");

const urlImg = document.querySelector('input[inp="url-img"]');
const category = document.querySelector('input[inp="cat"]');
const name = document.querySelector('input[inp="name"]');
const price = document.querySelector('input[inp="price"]');
const description = document.querySelector('textarea[inp="desc"]');

let idProductToEdit = null;





closeModalAddProduct.addEventListener("click" ,()=> {
  addProductModal.style.display= "none";
    clearForm();
    idProductToEdit = null;
} );

window.onclick = function(event) {
  if (event.target == addProductModal) {
    addProductModal.style.display = "none";
      idProductToEdit = null;
      clearForm();
  }
}

 productsRepository.getCurrentUser()
    .then(currentUser=>{
      if(currentUser.isLogin){
        loginButton.innerHTML = "Log out"

        if (currentUser.isAdmin){
          getAllProductsAdmin();
        }
        else {
          getAllProductsByCategory();
        }


      }else {
        getAllProductsByCategory();
      }
    }).catch(error=>{

 });





function getAllProductsByCategory(){
  productsRepository.getAllProductsByCategory()
      .then((productsMap) => {

        for (let key of productsMap.keys()) {
          const products = productsMap.get(key);


          const items = document.createElement("div");
          items.classList.add("items")

          const categoryGroup = document.createElement("div");
          categoryGroup.classList.add("category-group")
          const categoryTite = createCategoryTitle(key,products[0].category);
          categoryGroup.appendChild (  categoryTite );

          products.forEach(produ => {
            //console.log(produ.name)
            const item = createItem(produ.name,produ.price,produ.url,produ.id)
            items.appendChild(item)
          });

          divCategory.appendChild(categoryGroup);
          divCategory.appendChild(items);

        }

      });
}

function getAllProductsAdmin(){
  productsRepository.getAllProductsAdmin()
      .then((products) => {

          const items = document.createElement("div");
          items.classList.add("items")
        items.style.flexWrap = "wrap"

          const categoryGroup = document.createElement("div");
          categoryGroup.classList.add("category-group")
          const categoryTitleAdmin = createCategoryTitleAdmin();
          categoryGroup.appendChild (  categoryTitleAdmin );

          products.forEach(produ => {
            //console.log(produ.name)
            const item = createItemAdmin(produ.name,produ.price,produ.url,produ.id)
            items.appendChild(item)
          });

          divCategory.appendChild(categoryGroup);
          divCategory.appendChild(items);



      });
}




function createItem(nombre, price, url,id) {
  const divItem = document.createElement("div");
  divItem.classList.add("item")
  const content = `
    <img src=${url} alt="product">
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
  <h4 class="title-category">${name.charAt(0).toUpperCase() + name.slice(1)}</h4>
  <a href="../page/products.html?category=${category}"> ver Todo <img src="ressource/arrow.svg" alt=""></a>
`
headerDiv.innerHTML = containt;
return headerDiv;
}

function createCategoryTitleAdmin() {
  const headerDiv = document.createElement("div");
  headerDiv.classList.add("header-category");
  const containt =
      `
  <h4 class="title-category">Todos los productos</h4>
  <button style="margin-left: 2px" id="add-products"> Agregar producto </button>
`
  headerDiv.innerHTML = containt;
  const btn = headerDiv.querySelector("#add-products")
  btn.style.cssText = " color: var(--preto-branco, #FFF); background: #2A7AE4; padding: 2px 10px; margin-bottom:2px";

  btn.addEventListener("click",()=>{
    addProductModal.style.display = "block"
  })

  return headerDiv;
}

function createItemAdmin(nombre, price, url,id) {
  const divItem = document.createElement("div");
  divItem.classList.add("item")
  const content = `
    <div class="delete-edit" >
                                <button del="${id}"  id="${id}"><img src="ressource/delete.svg" alt="delete"></button>
                                <button edit="${id}" ><img src="ressource/edit.svg" alt="edit"></button>
                            </div>
                            <img src=${url} alt="product">
                             <h6>${nombre}</h6>
                    <h5>$ ${price}</h6>
                    <a href="../page/detail.html?id=${id}">Ver Producto</a>
    `;
  divItem.innerHTML = content;

  const deleteButton = divItem.querySelector("button[del='" + id + "']");
  const editButton = divItem.querySelector("button[edit='" + id + "']");


  deleteButton.addEventListener("click",()=>{
    productsRepository.deleteProducts(id);
  });

  editButton.addEventListener("click",()=>{
    addProductModal.style.display = "block";
    fillFormForEdit(id);
      idProductToEdit = id;
  });

  return divItem;
}


formAddProduct.addEventListener("submit",(event)=>{
  event.preventDefault();
  if (idProductToEdit != null){ //edit
    console.log("edit products")
    productsRepository.updateProducts(idProductToEdit,urlImg.value,category.value,name.value,price.value,description.value)

  }else { //add
    console.log("add products")
    productsRepository.addProducts(urlImg.value,category.value,name.value,price.value,description.value)
  }
  clearForm();
  idProductToEdit = null;

})

function clearForm(){
  urlImg.value = "";
  category.value="";
  name.value = "";
  price.value = "";
  description.value = "";
}

function fillFormForEdit(id){

  productsRepository.getProductById(id)
      .then(product =>{
        const p = product[0];
        console.log(product)
//category
        urlImg.value = p.url;
        category.value = p.category;
        name.value = p.name;
        price.value = p.price;
        description.value = p.description;


      }).catch(error=>console.log(error));



}