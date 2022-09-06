// #region DATA
let bookCount = 0
let booksPerSec = 0
let booksPerClick = 1
const clickUpgrades = [
  {
    name: 'Bookstore Membership',
    price: 50,
    quantity: 0,
    increment: 2
  },
  {
    name: 'Personal Shopper',
    price: 500,
    quantity: 0,
    increment: 10
  },
  {
    name: "Daddy's Credit Card",
    price: 3000,
    quantity: 0,
    increment: 50
  },
]

const autoUpgrades = [
  {
    name: 'Book Share',
    price: 100,
    quantity: 0,
    booksPerInt: 5
  },
  {
    name: 'Subscribe and Save',
    price: 750,
    quantity: 0,
    booksPerInt: 15
  },
  {
    name: 'Manifest Books',
    price: 5000,
    quantity: 0,
    booksPerInt: 50
  },
  {
    name: 'Morellonomicon',
    price: 1000000000,
    quantity: 0,
    booksPerInt: 500
  },
]
let clickButton = document.getElementById('count')
let morello = autoUpgrades.find(upgrade => upgrade.name == 'Morellonomicon')
let manifest = autoUpgrades.find(upgrade => upgrade.name == 'Manifest Books')
// #endregion DATA

// #region INCREASE BOOKS FUNCTIONS
function getBooks() {
  bookCount += booksPerClick
  drawBooks()
}

function passiveBooks() {
  bookCount += booksPerSec
  drawBooks()
}
// #endregion

// #region SHOP FUNCTIONS
function buyClickMod(name) {
  let upgrade = clickUpgrades.find(click => click.name == name)
  if (bookCount >= upgrade.price) {
    upgrade.quantity++
    booksPerClick += upgrade.increment
    bookCount -= upgrade.price
    upgrade.price += Math.ceil((upgrade.price / 2))
    drawUpCosts()
    drawBooks()
    drawUpgrades()
  } else {
    alert('Need more books...')
  }
}

function buyAutoMod(name) {
  let upgrade = autoUpgrades.find(click => click.name == name)
  if (bookCount >= upgrade.price) {
    upgrade.quantity++
    booksPerSec += upgrade.booksPerInt
    bookCount -= upgrade.price
    upgrade.price += Math.ceil((upgrade.price / 2))
    drawUpCosts()
    drawBooks()
    drawUpgrades()
  } else {
    alert('Need more books...')
  }
  getMorellonomicon()
}

function getMorellonomicon() {
  if (booksPerSec > 666 && morello.quantity <= 0 && manifest.quantity > 0) {
    morello.quantity++
    alert('You have acquired the Morellonomicon... but at what cost?')
    drawMorello()
  }
}
// #endregion

// #region DRAW FUNCTIONS
function drawBooks() {
  clickButton.innerText = bookCount.toString()
  drawStats()
}

function drawUpgrades() {
  let upgrade = document.getElementById('upgrades')
  let template = ''

  clickUpgrades.forEach(mod => {
    if (mod.quantity > 0) {
      template += `
      <div class="col-4 text-center fs-4 py-1">
        <p class="mt-2 bg-dark text-light rounded">${mod.name} x${mod.quantity}</p>
      </div>`
    }
  })
  autoUpgrades.forEach(mod => {
    if (mod.quantity > 0 && mod.name !== 'Morellonomicon') {
      template += `
      <div class="col-4 text-center fs-4 py-1">
        <p class="mt-2 bg-dark text-light rounded">${mod.name} x${mod.quantity}</p>
      </div>`
    }
  })
  upgrade.innerHTML = template
}

function drawStats() {
  let perClick = document.getElementById('per-click')
  let perSec = document.getElementById('per-sec')

  perClick.innerText = booksPerClick.toString()
  perSec.innerText = booksPerSec.toString()
}

function drawMorello() {
  let targetBody = document.getElementById('font-change')
  let template = `<img src="Click-Morello.png" alt="Click Morello" onclick="getBooks()" class="morello-image img-fluid">`
  let bookTheme = document.getElementById('morello')
  bookTheme.innerHTML = template

  targetBody.classList.remove('font-good', 'yellow-bg')
  targetBody.classList.add('font-evil', 'evil-bg')
  document.getElementById('button-change').classList.remove('btn-warning', 'yellow-bg')
  document.getElementById('button-change').classList.add('btn-dark', 'px-3')
  document.getElementById('change-bg').classList.remove('bg-secondary')
  document.getElementById('change-bg').classList.add('evil-bg')
  document.getElementById('cards').classList.remove('yellow-bg')
  document.getElementById('cards').classList.add('evil-card-bg', 'fs-3')
  document.getElementById('cards-too').classList.remove('yellow-bg')
  document.getElementById('cards-too').classList.add('evil-card-bg', 'fs-3')
  document.getElementById('needs-more-evil').classList.remove('good-bg-img')
  document.getElementById('needs-more-evil').classList.add('evil-bg-img')
  fixLists()
}

function fixLists() {
  document.getElementById('pls-work').classList.remove('good-list')
  document.getElementById('pls-work').classList.add('bad-list')

  document.getElementById('pls-work1').classList.remove('good-list')
  document.getElementById('pls-work1').classList.add('bad-list')

  document.getElementById('pls-work2').classList.remove('good-list')
  document.getElementById('pls-work2').classList.add('bad-list')

  document.getElementById('pls-work3').classList.remove('good-list')
  document.getElementById('pls-work3').classList.add('bad-list')

  document.getElementById('pls-work4').classList.remove('good-list')
  document.getElementById('pls-work4').classList.add('bad-list')

  document.getElementById('pls-work5').classList.remove('good-list')
  document.getElementById('pls-work5').classList.add('bad-list')
}

function drawUpCosts() {
  document.getElementById('click-up').innerText = clickUpgrades[0].price.toString()
  document.getElementById('click-up1').innerText = clickUpgrades[1].price.toString()
  document.getElementById('click-up2').innerText = clickUpgrades[2].price.toString()
  document.getElementById('auto-up').innerText = autoUpgrades[0].price.toString()
  document.getElementById('auto-up1').innerText = autoUpgrades[1].price.toString()
  document.getElementById('auto-up2').innerText = autoUpgrades[2].price.toString()
}
// #endregion

drawUpCosts()
drawStats()
drawBooks()
setInterval(passiveBooks, 1000)