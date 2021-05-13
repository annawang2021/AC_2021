//定義遊戲狀態: 控制遊戲的主要流程，可增加程式的可讀性與維護姓
const GAME_STATE = {
    FirstCardAwaits: "FirstCardAwaits",
    SecondCardAwaits: "SecondCardAwaits",
    CardsMatchFailed: "CardsMatchFailed",
    CardsMatched: "CardsMatched",
    GameFinished: "GameFinished",
  }

//宣告變數
const Symbols = [
    'https://image.flaticon.com/icons/svg/105/105223.svg', // 黑桃
    'https://image.flaticon.com/icons/svg/105/105220.svg', // 愛心
    'https://image.flaticon.com/icons/svg/105/105212.svg', // 方塊
    'https://image.flaticon.com/icons/svg/105/105219.svg' // 梅花
  ]


// 原本的寫法
// const view = {
//     displayCards: function displayCards() { ...  }
//   }

//view渲染前端
const view = {

    //牌的背面
    getCardElement (index) {
        return `<div class="card back" data-index = "${index}"></div>`
    },

    //牌的正面: 數字與花色
    getCardContent (index) {
        // 卡片上的數字
        const number = this.transformNumber((index % 13) + 1)
        // 卡片上的花色
        const symbol = Symbols[Math.floor(index / 13)]
        return `
            <p>${number}</p>
            <img src="${symbol}">
            <p>${number}</p>
        </div>
        `
    },

    transformNumber (number) {
        switch (number) {
            case 1: 
                return 'A'
            case 11: 
                return 'J'
            case 12: 
                return 'Q'
            case 13: 
                return 'K'
            default: 
                return number
        }
    },
    
    
    //牌桌上總牌數
    displayCards (indexes) {
        const rootElement = document.querySelector('#cards');
        rootElement.innerHTML =  indexes.map(index => this.getCardElement(index)).join("");
    },

    flipCards (...cards) {
        cards.map(card =>{
            //如果是背面，點擊後翻回正面
            if (card.classList.contains('back')){
                card.classList.remove('back')
                card.innerHTML = this.getCardContent(Number(card.dataset.index))
                return
            }else{//如果是正面，回傳背面
                card.classList.add('back')
                card.innerHTML = null
            }
        }) 
    },
    pairCards (...cards) {
        cards.map(card =>{
            card.classList.add("paired")
        })
        
    },
    renderScore(score){
        document.querySelector(".score").innerHTML = `Score: ${score}`;
    },
    renderTriedTimes(times) {
        document.querySelector(".tried").innerHTML = `You've tried: ${times} times`;
    },
    appendWrongAnimation(...cards) {
        cards.map(card =>{
            card.classList.add('wrong')
            card,addEventListener('animationend', event =>
                event.target.classList.remove('wrong'), {once: true}
                //{once: true}事件執行一次之後，就要卸載這個監聽器
            )
        })
    },
    showGameFinished () {
        const div = document.createElement('div')
        div.classList.add('completed')
        div.innerHTML = `
            <p>Complete!</p>
            <p>Score: ${model.score}</p>
            <p>You've tried: ${model.triedTimes} times</p>
        `
        const header = document.querySelector('#header')
        header.before(div)
    },
}


const utility = {
    getRandomNumberArray (count) {
        //生成0~51的牌組陣列
        const number = Array.from(Array(52).keys())
        // let index = number.length - 1 取出最後一項
        for (let index = number.length - 1; index > 0; index--){
            // console.log('index: '+ index)
            // let randomIndex = Math.floor(Math.random() * (index + 1))，找到一個隨機項目
            //Math.random() * max回傳一個隨機小數，max為隨機小數的最大值
            let randomIndex = Math.floor(Math.random() * (index+1))
            // console.log('randomIndex:' + randomIndex)
            // 解構賦值語法，交換陣列位置
            ;[number[index],number[randomIndex]] = [number[randomIndex],number[index]]
            // console.log(number)
        }
        
        return number
    }
}


// 處理資料: 翻開的牌組
const model = {

    //暫存翻開的卡牌
    revealedCards: [],

    //比較翻開的兩張牌是否一樣
    isRevealedCardsMatched() {
        return this.revealedCards[0].dataset.index % 13 === this.revealedCards[1].dataset.index % 13
    },

    score: 0,
    triedTimes: 0
}

// 由 controller 來推進遊戲狀態
const controller = {
    currentState: GAME_STATE.FirstCardAwaits, 
    generateCards () {
        view.displayCards(utility.getRandomNumberArray(52))
    },
    dispatchCardAction (card) {
        //如果卡片已經翻開了，不用做任何事直接return跳出
        if (!card.classList.contains('back')) {
            return
        }
        switch (this.currentState) {
            case GAME_STATE.FirstCardAwaits:
                view.flipCards(card)
                model.revealedCards.push(card)
                this.currentState = GAME_STATE.SecondCardAwaits
                break
            case GAME_STATE.SecondCardAwaits:
                view.renderTriedTimes(++model.triedTimes) 
                view.flipCards(card)
                model.revealedCards.push(card)
                //判斷是否配對成功
                if (model.isRevealedCardsMatched()) {//配對成功
                    view.renderScore(model.score += 10)
                    this.currentState = GAME_STATE.CardsMatched
                    view.pairCards(...model.revealedCards)
                    // view.pairCard(model.revealedCards[1])
                    model.revealedCards = []
                    if (model.score === 260) {
                        this.currentState = GAME_STATE.GameFinished
                        view.showGameFinished()  
                    }
                    this.currentState = GAME_STATE.FirstCardAwaits
                }else{//配對失敗
                    this.currentState = GAME_STATE.CardsMatchFailed
                    view.appendWrongAnimation(...model.revealedCards)
                    setTimeout(this. resetCards, 1000)//1000毫秒=1秒
                   
                }
                break
        }
    console.log('this.currentState', this.currentState)
    console.log('revealedCards', model.revealedCards.map(card => card.dataset.index))
    },
    resetCards () {
        view.flipCards(...model.revealedCards)
        model.revealedCards = []
        controller.currentState = GAME_STATE.FirstCardAwaits
    },

}
controller.generateCards()

//監聽: 每一張牌都綁上監聽器
//'.card'是一種node list不是array，所以只能用.forEach()迭代器，不能用.map()，因為map只能用在Array
document.querySelectorAll('.card').forEach(card => {
    // console.log(card) // <div class="card back" data-index="${}".....</div>
    card.addEventListener('click', event => {
        controller.dispatchCardAction(card)
        
    })
})
