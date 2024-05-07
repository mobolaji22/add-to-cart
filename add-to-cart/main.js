const cartBtn = document.querySelectorAll(".cartbtn");
const cart = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const cartIcon = document.getElementsByClassName("icon-cart")[0];
const body = document.querySelector("body");
const closeBtn = document.getElementById("close");
const store = document.getElementById("store");
let cartCount = document.querySelector(".icon-cart span");
const checkout = document.getElementById("checkout");

// product list created
const products = [
  {
    name: "Missy",
    image: "/add-to-cart/img/nftavatar8.jpeg",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
    quo.`,
    price: 15,
  },
  {
    name: "Bored Ape",
    image: "/add-to-cart/img/nftavatar1.jpeg",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
    quo.`,
    price: 30,
  },
  {
    name: "Jungle Ape",
    image: "/add-to-cart/img/nftavatar2.jpeg",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
    quo.`,
    price: 20,
  },
  {
    name: "Lina Win",
    image: "/add-to-cart/img/nftavatar3.jpeg",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
    quo.`,
    price: 12,
  },
  {
    name: "Ocean Maiden",
    image: "/add-to-cart/img/nftavatar4.jpeg",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
    quo.`,
    price: 10,
  },
  {
    name: "Victor",
    image: "/add-to-cart/img/nftavatar5.jpeg",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
    quo.`,
    price: 25,
  },
  {
    name: "Skater",
    image: "/add-to-cart/img/nftavatar6.jpeg",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
    quo.`,
    price: 8,
  },
  {
    name: "Bored Dude",
    image: "/add-to-cart/img/nftavatar7.jpeg",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
    quo.`,
    price: 22,
  },
];
let cartarr = [];

// cart icon opens cart and closes
cartIcon.addEventListener("click", function () {
  body.classList.toggle("showCart");
});
closeBtn.addEventListener("click", function () {
  body.classList.remove("showCart");
});

// display products from list to store
function storeItems() {
  if (products.length > 0) {
    products.forEach((product) => {
      const div = document.createElement("div");
      div.classList.add("product");
      div.innerHTML = `
            <img src="${product.image}"/>
            <h3 class="name">${product.name}</h3>
            <p class="description">${product.description}</p>
            <span>$<p class="price">${product.price}</p></span>
        <button class="cartbtn">Add to Cart<img
        src="/add-to-cart/img/add_shopping_cart_FILL0_wght400_GRAD0_opsz24.svg"
        alt=""
      /></button>
        `;
      document.getElementById("store").appendChild(div);
    });
  }
  // get cart from local storage
  if (localStorage.getItem("cart")) {
    cartarr = JSON.parse(localStorage.getItem("cart"));
    displayCart();
    cartCount.textContent = cartarr.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }
}
storeItems();

store.addEventListener("click", (event) => {
  if (event.target.classList.contains("cartbtn")) {
    const product = event.target.parentElement;
    const name = product.querySelector(".name").textContent;
    const price = product.querySelector(".price").textContent;
    const image = product.querySelector("img").src;
    const cartItem = {
      name: name,
      price: price,
      image: image,
      quantity: 1,
    };

    const existingItem = cartarr.find((item) => item.name === cartItem.name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartarr.push(cartItem);
    }

    // Update the cart count display
    cartCount.textContent = cartarr.reduce(
      (total, item) => total + item.quantity,
      0
    );

    // Save the cart to localStorage
    saveCart();

    displayCart();
  }
});

//display to cart;
function displayCart() {
  cartItems.innerHTML = "";
  cartarr.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
        <div class="image">
          <img src="${item.image}"/>
        </div>
        <div class="name">${item.name}</div>
        <div class="quantityPrice">$${item.price * item.quantity}</div>
        <div class="quantity">
          <span class="minus">-</span>
          <span>${item.quantity}</span>
          <span class="plus">+</span>
        </div>
      `;
    cartItems.appendChild(div);
    calculateTotal();
  });

  cartItems.addEventListener("click", (event) => {
    const itemDiv = event.target.closest(".cart-item");
    const itemName = itemDiv.querySelector(".name").textContent;
    const item = cartarr.find((i) => i.name === itemName);

    if (event.target.classList.contains("plus")) {
      item.quantity++;
    } else if (event.target.classList.contains("minus")) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cartarr.splice(cartarr.indexOf(item), 1);
        itemDiv.remove();
      }
    }
    const quantityElement = itemDiv.querySelector(".quantity");
    quantityElement.textContent = item.quantity;

    // Update the cart display and localStorage after quantity change
    displayCart();
    calculateTotal();
    cartCount.textContent = cartarr.reduce(
      (total, item) => total + item.quantity,
      0
    );
    saveCart();
  });
}

//calculate and display total price

function calculateTotal() {
  const total = cartarr.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  document.querySelector(".totalPrice").textContent = `$${total}`;
}

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cartarr));
};
checkout.addEventListener("click", () => {
  window.location.assign("checkout.html");
});

// // add items to cart
// store.addEventListener("click", (event) => {
//   if (event.target.classList.contains("cartbtn")) {
//     const product = event.target.parentElement;
//     const name = product.querySelector(".name").textContent;
//     const price = product.querySelector(".price").textContent;
//     const image = product.querySelector("img");
//     // console.log(name);
//     // console.log(price);
//     // console.log(image);
//     const cartItem = {
//       name: name,
//       price: price,
//       image: image,
//       quantity: 1,
//     };
//     cartarr.push(cartItem);
//     cartarr.reduce((acc, cur) => {
//       if (cur.name === cartItem.name) {
//         cur.quantity++;
//         return;
//       } else if (cur.quantity > 1) {
//          return cartrr.filter((value, index, array) => array.indexOf(value) === index);
//       } else {
//         return acc;
//       }
//     });
//     console.log(cartarr);
//     cartCount.textContent = cartarr.length;
//     cartItems.innerHTML = "";
//     localStorage.setItem("cart", JSON.stringify(cartarr));
//     displayCart();
//   }
// });

// display items in cart
// function displayCart() {
//   cartarr.forEach((item) => {
//     const div = document.createElement("div");
//     div.classList.add("cart-item");
//     div.innerHTML = `
//         <div class="image">
//             <img src="${item.image.src}"/>
//           </div>
//           <div class="name">${item.name}</div>
//           <div class="totalPrice">${item.price}</div>
//           <div class="quantity">
//             <span class="minus"><</span>
//             <span>${item.quantity}</span>
//             <span class="plus">></span>
//           </div>
//         </div>
//         `;
//     cartItems.appendChild(div);
//     cartItems.addEventListener("click", (event) => {
//       if (event.target.classList.contains("plus")) {
//         item.quantity++;
//       } else if (event.target.classList.contains("minus")) {
//         if (item.quantity > 1) {
//           item.quantity--;
//         } else {
//           cartarr.splice(cartarr.indexOf(item), 1);
//           cartCount.textContent = cartarr.length;
//           localStorage.setItem("cart", JSON.stringify(cartarr));
//         }
//       }
//     });
//   });
// }
// Update the cart display when the quantity is changed
//   cartItems.addEventListener("click", (event) => {
//     const itemDiv = event.target.closest(".cart-item");
//     const itemName = itemDiv.querySelector(".name").textContent;
//     const item = cartarr.find((i) => i.name === itemName);

//     if (event.target.classList.contains("plus")) {
//       item.quantity++;
//       console.log(item);
//     } else if (event.target.classList.contains("minus")) {
//       if (item.quantity > 1) {
//         item.quantity--;
//       } else {
//         cartarr.splice(cartarr.indexOf(item), 1);
//       }
//     }

// const loadCart = () => {
//     cartarr = JSON.parse(localStorage.getItem("cart")) || [];
//     displayCart();
// }
