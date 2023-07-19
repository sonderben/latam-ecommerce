

function getAllProductsByCategory (){
    
    return fetch("http://localhost:3000/products")
        .then((response) => {
            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            return response.json();
        })
        .then((data) => {


            var result = data.reduce((x, y) => {

                (x[y.category] = x[y.category] || []).push(y);

                return x;

            }, {});
            const map1 = new Map(Object.entries(result));
            

            

            return map1;
            
        })
        .catch((error) => {
            console.error("An error occurred:", error);
            return new Map(); // Return an empty Map in case of an error
          });
        
}

function getAllProductsAdmin(){
    return fetch("http://localhost:3000/products")
        .then((response) => {
            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            return response.json();
        });
}

function getProductsByCategory(category) {
    return fetch("http://localhost:3000/products?category="+category)
        .then((response) => {
            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            return response.json();
        })

        .catch((error) => {
            console.error("An error occurred:", error);
        });
}

function getProductById(id) {
    return fetch("http://localhost:3000/products?id="+id)
        .then((response) => {
            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            return response.json();
        })

        .catch((error) => {
            console.error("An error occurred:", error);
        });
}

function getCurrentUser(){
    return fetch("http://localhost:3000/user")
        .then(response=>{
            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            return response.json();
        })


}

const deleteProducts = (id) => {
    return fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
    });
};

const addProducts = (url,category,name,price,description) => {

    const id = new Date().getTime();
    return fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, url, id,description })
    });
};

const updateProducts = ( id,url,category,name,price,description) => {
    return fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url,category,name,price,description }),
    })
        .then((respuesta) => respuesta)
        .catch((err) => console.log(err));
};

export const productsRepository = {
    getAllProductsByCategory,
    getProductsByCategory,
    getProductById,
    getCurrentUser,
    getAllProductsAdmin,
    deleteProducts,
    addProducts,
    updateProducts
};


//////////////








  const getDetailCliente = (id) => {
    return fetch(`http://localhost:3000/perfil/${id}`).then((respuesta) =>
      respuesta.json()
    );
  };
