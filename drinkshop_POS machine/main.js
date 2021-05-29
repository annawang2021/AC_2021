function Drink (name, sugar, ice) {
    this.name = name
    this.sugar = sugar
    this.ice = ice
}

//Drink.price()
Drink.prototype.price = function () {
    switch (this.name){
        case 'Black Tea':
        case 'Oolong Tea':
        case 'Baozong Tea':
        case 'Green Tea':
        return 30

        case 'Bubble Milk Tea':
        case 'Lemon Green Tea':
        return 50

        case 'Black Tea Latte':
        case 'Matcha Latte':
        return 55

        default:
        alert('No this drink')
    }
}

//create an object to include functions indside
const alphaPos = new AlphaPos()


//面板左區待結帳區
const orderLists = document.querySelector('[data-order-lists]')
orderLists.addEventListener('click', function(event) {
    let isDeleteButton = event.target.matches('[data-alpha-pos="delete-drink"]')
    if (!isDeleteButton) {return}
    //移除帶結帳區的品項
    alphaPos.deleteDrink(event.target.parentElement.parentElement.parentElement)
})

//計算總價格
const checkoutButton = document.querySelector('[data-alpha-pos="checkout"]')
checkoutButton.addEventListener ('click', function () {
    // 1. 計算訂單總金額
    alert(`Total amount of drinks：$${alphaPos.checkout()}`)
    // 2. 清空訂單
    alphaPos.clearOrder(orderLists)
})

//選出add按鈕
const addDrinkButton = document.querySelector('[data-alpha-pos="add-drink"]')

//add按鈕綁定監聽器
addDrinkButton.addEventListener ('click', function () {
    
    // 1. 取得店員選擇的飲料品項、甜度和冰塊
        const drinkName = alphaPos.getCheckedValue('drink')
        const ice = alphaPos.getCheckedValue('ice')
        const sugar = alphaPos.getCheckedValue('sugar')
        console.log(`${drinkName}, ${ice}, ${sugar}`)
        
    
    // 2. 如果沒有選擇飲料品項，跳出提示
    if (!drinkName) {
        alert('Please choose at least one item.')
        return
    }
    
    // 3. 建立飲料實例，並取得飲料價格
    const drink = new Drink(drinkName, sugar, ice)
    console.log(drink)
    console.log(drink.price())
    
    // 4. 將飲料實例產生成左側訂單區的畫面
    alphaPos.addDrink(drink)
})



// Constructor function for Alpha Pos System
function AlphaPos () {}

//function AlphaPos () 取得input name = 'drink/ ice/ sugar
AlphaPos.prototype.getCheckedValue = function (inputName) {
    let selectedOption = ''
    document.querySelectorAll (`[name="${inputName}"]`).forEach ( function (item) {
        if (item.checked) {
            selectedOption = item.value
        }
    })
    return selectedOption
}


//function AlphaPos () 新增訂單的Card樣板
AlphaPos.prototype.addDrink = function (drink) {
    //Card樣板
    let orderListsCard = `
    <div class="card mb-3">
    <div class="card-body pt-3 pr-3">
      <div class="text-right">
        <span data-alpha-pos="delete-drink">×</span>
      </div>
      <h6 class="card-title mb-1">${drink.name}</h6>
      <div class="card-text">${drink.ice}</div>
      <div class="card-text">${drink.sugar}</div>
    </div>
    <div class="card-footer text-right py-2">
      <div class="card-text text-muted">$ <span data-drink-price>${drink.price()}</span></div>
    </div>
  </div>
    `

    // 新增的飲料訂單放在 orderLists HTML 元素內 (after) 最上面 (begin) 的位置
    orderLists.insertAdjacentHTML('afterbegin', orderListsCard)
}

//function AlphaPos () 移除帶結帳區的品項
AlphaPos.prototype.deleteDrink = function (target) {
    target.remove()
}

//function AlphaPos ()結帳金額計算
AlphaPos.prototype.checkout = function () {
    let totalAmount = 0
    document.querySelectorAll('[data-drink-price]').forEach(function(drink) {
        totalAmount += Number(drink.textContent)
    })
    return totalAmount
}


//function AlphaPos () 清空結帳區
AlphaPos.prototype.clearOrder = function (target) {
  target.querySelectorAll('.card').forEach(function(card) {
    card.remove()
  })
}
