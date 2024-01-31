
const socket =  io();
// Swal.fire(
//     {
//         title: '',
//         text: '',
//         icon:'success'
//     }
// )

socket.on("updateProducts", (updatedProducts) => {
  console.log(updatedProducts)
    updateProductList(updatedProducts);
});

// Evento para agregar producto
document.getElementById("addProductBtn").addEventListener("click", () => {
  const productName = document.getElementById("productName").value;
  const productPrice = document.getElementById("productPrice").value;
  if (productName.trim() !== "" && productPrice.trim() !== "") { 
      socket.emit("addProduct", {
        name: productName,
        price: productPrice,
      });
      // Limpiar los campos después de agregar el producto
      document.getElementById("productName").value = "";
      document.getElementById("productPrice").value = "";
  } else {
    alert("Por favor, ingrese un nombre y un precio para el producto.");
  }
});

// Evento para eliminar producto
document.addEventListener("click", (event) => {
  console.log("boton")
  console.log(event)
  if (event.target.classList.contains("delete-btn")) {
    const productId = event.target.getAttribute("data-product-id");
    console.log(productId)
    socket.emit("deleteProduct",{ productId});
  }
});

function updateProductList(products) {
  console.log(producsts)
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach((product) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${product.pid} - ${product.name} - $${product.price}`;

    // Agregar botón de eliminar con el id del producto
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Eliminar";
    deleteButton.setAttribute("data-product-id", product.pid);

    listItem.appendChild(deleteButton);
    productList.appendChild(listItem);
  });
}
