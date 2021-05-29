// 宣告變數
const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users'
const POSTER_URL = BASE_URL + '/api/v1/users/'


//總清單，改為從localStorage拿到資料
const favoriteList = JSON.parse(localStorage.getItem('favorite')) 

//將localStorage拿到資料,寫入dataPanel
const dataPanel = document.querySelector('#data-panel')
function renderPeopleList(data) {
    let rawHTML = ''
    data.forEach((item) => {
          rawHTML += `
        <div class="col-3 text-center">
            <div class="mb-2">
                <div class="card">
                    <a href="#person-modal" data-toggle="modal" data-target="#person-modal">
                        <img src="${item.avatar}" class="card-img-top rounded-circle" alt="Person Poster" data-id="${item.id}" id="show-details">
                    </a>
                    <div class="card-body" id ="card-body">
                        <h6 class="card-title mx-auto">${item.name} ${item.surname}</h6>
                        <button class="btn btn-outline-danger" id = "btn-remove-favorite" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            </div>
        </div>`
  
    })
    dataPanel.innerHTML = rawHTML
}

// 監聽 data panel, 加入"我的最愛+"的按鈕至監聽器中
dataPanel.addEventListener('click', function onPanelClicked(event){ 
    if (event.target.matches('#show-details')) {
        showDetails(Number(event.target.dataset.id))
        return
    }else if (event.target.matches('#btn-remove-favorite'))
        console.log(event.target.dataset.id)
        removeFromFavorite(Number(event.target.dataset.id))
})



//將個人的細節資料寫入modal中
function  showDetails(id) {
    
    const modalName = document.querySelector('#person-modal-name')
    const modalImage = document.querySelector('#person-modal-image')
    const modalAge = document.querySelector('#person-modal-age')
    const modalRegion = document.querySelector('#person-modal-region')
    const modalEmail = document.querySelector('#person-modal-email')
    const modalStarSign = document.querySelector ('#person-modal-starSign')

    axios.get(POSTER_URL + id).then((response) => {
        const data = response.data
      
        // star sign
        let splitBirthday = data.birthday.split("-")
        let birthday = []
        let birthdayMonth 
        let birthdayDate
        splitBirthday.forEach(item=>{
            birthday.push(Number(item))
            birthdayMonth = birthday [1]
            birthdayDate = birthday [2]
            star_sign (birthdayMonth, birthdayDate)
        })
        
        modalStarSign.innerText =`Star Sign: ` + star_sign (birthdayMonth, birthdayDate)
        modalName.innerText = `${data.name} ${data.surname}`
        modalAge.innerText = 'Age: ' + data.age
        modalRegion.innerText = 'Region: ' + data.region
        modalEmail.innerText = 'Email: ' + data.email
        modalImage.innerHTML = `<img src="${data.avatar}" alt="person-poster" class="rounded-circle mx-auto">`
    })
}

//呼叫函式執行從localStorage抓取到的資料，渲染到頁面中
renderPeopleList(favoriteList)


// 將電影從我的最愛移除
function removeFromFavorite (id) {
    console.log("removeFromFavorite: "+ id)
    
    if (!favoriteList) return //一旦收藏清單是空的，或傳入的 id 在收藏清單中不存在，就結束這個函式。

    //透過 id 找到要刪除電影的 index
    const favoriteListIndex = favoriteList.findIndex ((item) => item.id === id)
    if (favoriteListIndex === -1 ) return

     //刪除該筆電影
     favoriteList.splice(favoriteListIndex,1)

    //存回 local storage
    localStorage.setItem('favorite', JSON.stringify(favoriteList))

     //更新頁面
     renderPeopleList(favoriteList)

}

//判斷星座
function star_sign (month, date){
    if (month==3 && date<=31){
        return ("Aries")
    }else if (month==4 && date<=19){
        return ("Aries")
    }else if (month==4 && date<=30){
        return ("Taurus")
    }else if (month==5 && date<=20){
        return ("Taurus")
    }else if (month==5 && date<=31){
        return ("Gemini")
    }else if (month==6 && date<=31){
        return ("Gemini")
    }else if (month==6 && date<=30){
        return ("Cancer")
    }else if (month==7 && date<=22){
        return ("Cancer")
    }else if (month==7 && date<=31){
        return ("Leo")
    }else if (month==8 && date<=22){
        return ("Leo")
    }else if (month==8 && date<=31){
        return ("Virgo")
    }else if (month==9 && date<=22){
        return ("Virgo")
    }else if (month==9 && date<=31){
        return ("Libra")
    }else if (month==10 && date<=23){
        return ("Libra")
    }else if (month==10 && date<=31){
        return ("Scorpio")
    }else if (month==11 && date<=21){
        return ("Scorpio")
    }else if (month==11 && date<=30){
        return ("Sagittarius")
    }else if (month==12 && date<=20){
        return ("Sagittarius")
    }else if (month==12 && date<=31){
        return ("Capricorn")
    }else if (month==1 && date<=20){
        return ("Capricorn")
    }else if (month==1 && date<=31){
        return ("Aquarius")
    }else if (month==2 && date<=19){
        return ("Aquarius")
    }else if (month==2 && date<=29){
        return ("Pisces")
    }else if (month==3 && date<=20){
        return ("Pisces")
    }
}
