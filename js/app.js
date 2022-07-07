import { getProducts, getProduct } from "./firebase.js";

const cart = [

]

let total = 0;

const checkout = document.querySelector(".checkout");

const clear = document.querySelector(".clear");

const emptyCart = () => { 

  total = 0;

  document.querySelector(`.visualTotal`).textContent = total;

  cart.length = 0;

  document.querySelector(".innerCart").innerHTML = "";
}

checkout.addEventListener("click", emptyCart);

clear.addEventListener("click", emptyCart)

const renderCart = async () => {

  const innerCart = document.querySelector(".innerCart");

    innerCart.innerHTML = ``;

    cart.forEach((product) =>  { 

    const card = document.createElement("div");

    card.className = "card mb-3";

    card.innerHTML = `

    .<div class="card mb-3" style="max-width: 540px;">

      <div class="row g-0">

        <div class="col-md-4">

          <img src="${product.data().img}" class="img-fluid rounded-start" alt="${product.data().name}">

        </div>

        <div class="col-md-8">

          <div class="card-body">

            <h5 class="card-title">"${product.data().name}"</h5>

            <p class="card-text">"${product.data().price}"</p>

          </div>

        </div>

      </div>

    </div>

    `;

    innerCart.append(card);

  });

};

const updateTotal = (price) => {

  const visualTotal = document.querySelector(`.visualTotal`);
 
  total += price;

  visualTotal.textContent = total;

}

const checkCart = (id) => cart.some(product => product.id === id);


const addToCart = async (e) => {

  const productId = e.target.id

  if(checkCart(productId)) {
    return false;
  }
  else {
    
    const productToCart = await getProduct(productId);

    updateTotal(productToCart.data().price)

    cart.push(productToCart);

    renderCart();

  }


}

const addEvent = () => {

  const buyBtns =document.querySelectorAll(".buyBtn");

  buyBtns.forEach(btn => btn.addEventListener("click", addToCart));

}

async function renderCards(productsArr) {

  const Products = await productsArr;

  const cards = document.querySelector(".cards");

  Products.forEach (product => {

    const card = document.createElement("div");

    card.className = "card ";
    card.innerHTML = `

    <img src=${product.data().img} class="card-img-top productImg" alt=${product.data().name}>
    <div class="card-body">
      <h5 class="card-title">${product.data().name}</h5>
      <p class="card-text text-success">${product.data().price}</p>
      <a href="#" class="btn btn-dark buyBtn" id=${product.id}>Buy</a>
    </div>
    
    `;

    cards.append(card);
  });

  addEvent();

}

renderCards(getProducts());



