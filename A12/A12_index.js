// 宣告變數
const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const movies = [] //電影總清單
let filteredMovies = []
const MOVIES_PER_PAGE = 12

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const paginator = document.querySelector('#paginator')
const btn_bars = document.querySelector ('#btn-fa-bars')
const btn_th = document.querySelector ('#btn-fa-th')
const search_container = document.querySelector ('#search_container')

//初始渲染
axios.get(INDEX_URL).then((response) => {
    movies.push(...response.data.results) 
    renderPaginator (movies.length)
    renderMovieList(getMoviesByPage(1))
  }).catch((err) => console.log(err))


//將api抓取到的資料寫入dataPanel: Card樣式
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
                        <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${item.id}">More</button>
                        <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
                    </div>
                </div>
            </div>
        </div>`
    })
    dataPanel.innerHTML = rawHTML
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


// 監聽: search bar功能鍵立
searchForm.addEventListener('submit', function onSearchFormSubmitted(event)  {
  event.preventDefault() 
  const keyword = searchInput.value.trim().toLowerCase() 

  if (!keyword.length) {
    return alert('請輸入有效字串！')
  }
   filteredMovies = movies.filter((movie) =>
   movie.title.toLowerCase().includes(keyword)
  )

   if (filteredMovies.length === 0) {
    return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的電影`)
  }
  renderPaginator(filteredMovies.length)
  renderMovieList(getMoviesByPage(1))
})


 // 監聽: data panel, 加入"我的最愛+"的按鈕至監聽器中
 dataPanel.addEventListener('click', function onPanelClicked(event){ 
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(Number(event.target.dataset.id))
  }else if (event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
  }
})

//監聽: 頁碼器的頁數哪一頁被點擊，進而渲染頁面
paginator.addEventListener('click', function onPaginatorClicked(event) {
  if (event.target.tagName !== 'A') return
  const page = Number(event.target.dataset.page)
  renderMovieList(getMoviesByPage(page))
})

//監聽: 版面切換
search_container.addEventListener('click', function viewModel(event) {
    if (event.target.matches('#btn-fa-bars')) { //list mode
      renderPaginator(movies.length)  
      render_list_view (getMoviesByPage(1))   
    }else if (event.target.matches('#btn-fa-th')){ // card mode
      renderPaginator(movies.length) 
      renderMovieList(getMoviesByPage(1))
    }
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


//頁碼器功能建立，一頁12部電影
function getMoviesByPage(page) {
  const data = filteredMovies.length ? filteredMovies : movies
  console.log(filteredMovies)
  const startIndex = (page - 1) * MOVIES_PER_PAGE
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE)
}



//製作頁碼器按鈕
function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)
  let rawHTML = ''
  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }
  paginator.innerHTML = rawHTML
}

//切換list mode功能
function render_list_view(movies) {
    let rawTable = `
        <table class="table table-hover" id="tableView">
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Buttons</th>
                </tr>
            </thead>
            <tbody id= 'tbody'></tbody>
        </table>`
    dataPanel.innerHTML = rawTable
    
    const tbody = document.querySelector('#tbody')
    let insert_tbody = ''
    movies.forEach((movie) => {
        insert_tbody += `
            <tr>
                <td>${movie.title}</td>
                    <td>
                        <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${movie.id}">More</button>
                        <button class="btn btn-info btn-add-favorite" data-id="${movie.id}">+</button>
                    </td>
            </tr>`
    })
    tbody.innerHTML=insert_tbody

}
