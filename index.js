const burgerURL = "http://localhost:3000/burgers"
const burgerMenu = document.querySelector('#burger-menu')
burgerMenu.addEventListener('click', handleAddToOrder)
const myOrders = document.querySelector('#order-list')
const burgerForm = document.querySelector('#custom-burger')
burgerForm.addEventListener("submit", handleCreateBurger)

document.addEventListener("DOMContentLoaded", () => {
  displayAllBurgers()
})


function getAllBurgers() {
  return fetch(burgerURL)
    .then(resp => resp.json())
}

function getOneBurger(burgerId) {
  return fetch(`${burgerURL}/${burgerId}`)
    .then(resp => resp.json())
    .then(burger => myOrders.innerHTML += createBurgerLi(burger))
}

function postNewBurger(burgerData) {
  fetch(burgerURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(burgerData)
  })
    .then(resp => resp.json())
    .then(burger => burgerMenu.innerHTML += createBurgerCard(burger))
}

function displayAllBurgers() {
  getAllBurgers()
    .then(burgers => burgers.forEach(burger => burgerMenu.innerHTML += createBurgerCard(burger)))
}

function createBurgerCard(burger) {
  return `
  <div class="burger">
    <h3 class="burger_title">${burger.name}</h3>
      <img src=${burger.image}>
      <p class="burger_description">
        ${burger.description}
      </p>
      <button class="button" data-id=${burger.id}>Add to Order</button>
  </div>
  `
}

function createBurgerLi(burger) {
  return `
    <li>${burger.name}</li>
  `
}

function handleAddToOrder(event) {
  if(event.target.className === "button") {
    const burgerId = event.target.dataset.id
    const myBurger = getOneBurger(burgerId)
  }
}

function handleCreateBurger(event) {
  event.preventDefault()

  const burgerName = document.querySelector('input[name="name"]').value
  const burgerDesc = document.querySelector('input[name="description"]').value
  const burgerImg = document.querySelector('input[name="url"]').value

  const burgerData = {
    name: burgerName,
    description: burgerDesc,
    image: burgerImg
  }

  postNewBurger(burgerData)
} 
