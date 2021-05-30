// 宣告變數
const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users'
const POSTER_URL = BASE_URL + '/api/v1/users/'

//axios with Index API
const people = []
axios.get(INDEX_URL).then((response) => {
    people.push(...response.data.results) 
    renderPeopleList(people)

  }).catch((err) => console.log(err))

//將api抓取到的資料寫入dataPanel
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
                        <button class="btn btn btn-light" id="heart_btn" id="heart_btn"><i class="fas fa-heart fa-lg" id="heart_icon" data-id="${item.id}"></i></button>
                    </div>
                </div>
            </div>
        </div>`

    })
    dataPanel.innerHTML = rawHTML
}


// 監聽 data panel
dataPanel.addEventListener('click', function onPanelClicked (event){ 
    if (event.target.matches('.btn-show-details')) {
        const id = event.target.dataset.id;
        showDetails(id); 
    }else if (event.target.matches('#show-details')){ //點擊大頭照跳出介紹細節
        const newId = event.target.dataset.id;
        showDetails(newId);
    }else if (event.target.matches('#heart_icon')) {//點擊愛心 加入收藏頁
        const heart_icon_id = Number(event.target.dataset.id)
        addToFavorite(heart_icon_id )
      }
    
  })

 //將個人的細節資料寫入modal中
 function  showDetails(id) {
    const modalName = document.querySelector('#person-modal-name')
    const modalImage = document.querySelector('#person-modal-image')
    const modalAge = document.querySelector('#person-modal-age')
    const modalRegion = document.querySelector('#person-modal-region')
    const modalEmail = document.querySelector('#person-modal-email')
    const modalStarSign = document.querySelector ('#person-modal-starSign')
    const modalHeartIcon = document.querySelector('#modal_heart_icon')

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
        modalHeartIcon.setAttribute('data-id', `${id}`)
    })

  
    
}

//personModal heartbtn function
const personModal = document.querySelector('#person-modal')
personModal.addEventListener('click', function modalHeartBtn (event) {
    // console.log (event.target)
    if (event.target.matches('#modal_heart_icon')) {
        addToFavorite(Number(event.target.dataset.id))
        
    }
})


//加入我的最愛到local storage
function addToFavorite(id){
    console.log(id)
    const list = JSON.parse(localStorage.getItem('favorite')) ||[] 
    const individual = people.find (i => i.id === id)
    if (list.some( i => i.id === id)){
      return alert('Already added!')
    }
    list.push(individual)
    localStorage.setItem('favorite', JSON.stringify(list)) 
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
