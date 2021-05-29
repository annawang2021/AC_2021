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
        <div class="col-sm-3">
            <div class="mb-2">
                <div class="card text-center">
                    <img src="${item.avatar}" class="card-img-top" alt="Person Poster">
                    <div class="card-body">
                        <h6 class="card-title">${item.name} ${item.surname}</h6>
                        <button class="btn btn-primary btn-show-details" data-toggle="modal" data-target="#person-modal" data-id="${item.id}">Detail</button>
                    </div>
                </div>
            </div>
        </div>`

    })
    dataPanel.innerHTML = rawHTML
}

// 監聽 data panel
dataPanel.addEventListener('click',function onPanelClicked(event){ 
    if (event.target.matches('.btn-show-details')) {
        const id = event.target.dataset.id;
        showDetails(Number(id)); //格視為字串，若要轉換成數值可以用Number()
    }
  })

 //將個人的細節資料寫入modal中
 function  showDetails(id) {
    const modalName = document.querySelector('#person-modal-name')
    const modalImage = document.querySelector('#person-modal-image')
    const modalAge = document.querySelector('#person-modal-age')
    const modalRegion = document.querySelector('#person-modal-region')
    const modalEmail = document.querySelector('#person-modal-email')

    axios.get(POSTER_URL + id).then((response) => {
      const data = response.data
      console.log(response.data)
      
      modalName.innerText = `${data.name} ${data.surname}`
      modalAge.innerText = 'Age: ' + data.age
      modalRegion.innerText = 'Region: ' + data.region
      modalEmail.innerText = 'Email:' + data.email
      modalImage.innerHTML = `<img src="${data.avatar}" alt="person-poster" class="img-fluid">`
    })
}
