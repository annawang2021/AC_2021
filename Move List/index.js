// 宣告變數
const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const MOVIES_PER_PAGE = 12
const paginator = document.querySelector('#paginator')

// axios將資料推到movies陣列中，並用renderMovieList函式渲染到前端
const movies = [] //電影總清單
axios.get(INDEX_URL).then((response) => {
    movies.push(...response.data.results) 
    renderPaginator (movies.length)
    renderMovieList(getMoviesByPage(1)) // 讓每一頁只顯示12部電影
  }).catch((err) => console.log(err))


//將api抓取到的資料寫入dataPanel
// const dataPanel = document.querySelector('#data-panel')
const cardDeck = document.querySelector('#card-deck')
function renderMovieList(data) {
    let rawHTML = ''
    data.forEach((item) => {
      rawHTML += `
        <div class="col-sm-3">
            <div class="mb-2">
                <div class="card">
                    <img src="${POSTER_URL + item.image}" class="card-img-top" alt="Movie Poster">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                    </div>
                    <div class="card-footer">
                      <small class="text-muted">
                        <button id="morebtn" class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${item.id}">More</button>
                        <button id="addbtn" class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
                      </small>
                    </div>
                </div>
            </div>
        </div>`
    })
    cardDeck.innerHTML = rawHTML
  }


  //將電影的細節資料寫入modal中
function showMovieModal(id) {
    const modalTitle = document.querySelector('#movie-modal-title')
    const modalImage = document.querySelector('#movie-modal-image')
    const modalDate = document.querySelector('#movie-modal-date')
    const modalDescription = document.querySelector('#movie-modal-description')
    axios.get(INDEX_URL + id).then((response) => {
      const data = response.data.results
      
      modalTitle.innerText = data.title
      modalDate.innerText = 'Release date: ' + data.release_date
      modalDescription.innerText = data.description
      modalImage.innerHTML = `<img src="${POSTER_URL + data.image}" alt="movie-poster" class="img-fluid">`
    })
}

 // 監聽 data panel, 加入"我的最愛+"的按鈕至監聽器中
 cardDeck.addEventListener('click', function onPanelClicked(event){ 
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(Number(event.target.dataset.id))
  }else if (event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
   

  }
})

//監聽分頁器的頁數哪一洩頁被點擊，進而渲染頁面
paginator.addEventListener('click', function onPaginatorClicked(event) {
  //如果被點擊的不是 a 標籤，結束
  if (event.target.tagName !== 'A') return
  
  //透過 dataset 取得被點擊的頁數
  const page = Number(event.target.dataset.page)
  //更新畫面
  renderMovieList(getMoviesByPage(page))
})



//將電影加入我的最愛Favorite頁面中
function addToFavorite(id){
  console.log(id)
  const list = JSON.parse(localStorage.getItem('favoriteMovies')) ||[] 
  const movie = movies.find (movie => movie.id === id)
  if (list.some( movie => movie.id === id)){
    return alert('此電影已經在收藏清單中！')
  }
  list.push(movie)
  localStorage.setItem('favoriteMovies', JSON.stringify(list)) 
}

// 使用 local storage 來建立一個清單，key 值是 'favoriteMovies'，而 value 則是使用者收藏的電影。
//取出資料localStorage.getItem() 
//存入資料localStorage.setItem() 
//JSON.parse()將 JSON 格式的字串轉回 JavaScript 原生物件。
//JSON.stringify()將資料轉為 JSON 格式的字串。




// search bar功能鍵立
//1. 取得search bar中，input標籤的值
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

searchForm.addEventListener('submit', function onSearchFormSubmitted(event)  {
  event.preventDefault() //避免頁面跳轉

  //取得搜尋關鍵字 //trim()頭尾空格去掉 //toLowerCase()轉成小寫，方便之後比對
  const keyword = searchInput.value.trim().toLowerCase() 
 
 //儲存符合篩選條件的項目
 let filteredMovies = []

  //錯誤處理：輸入無效字串
  if (!keyword.length) {
    return alert('請輸入有效字串！')
  }

   //條件篩選 //includes()會區分大寫小
   filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  )

   //錯誤處理：無符合條件的結果
   if (filteredMovies.length === 0) {
    return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的電影`)
  }
 
  //重新輸出至畫面
 renderMovieList(filteredMovies)
})


//分頁功能建立，一頁12部電影
function getMoviesByPage(page) {
  const startIndex = (page - 1) * MOVIES_PER_PAGE
  return movies.slice(startIndex, startIndex + MOVIES_PER_PAGE)
}

function renderPaginator(amount) {
  //計算總頁數
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)
  //製作 template 
  let rawHTML = ''
  
  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }
  //放回 HTML
  paginator.innerHTML = rawHTML
}
