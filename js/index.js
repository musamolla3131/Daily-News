
const loadCatagory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    Catagory(data.data.news_category);
}


// catagory load function
const Catagory = (datas) => { 
    const catagory = document.getElementById('navbarNavAltMarkup');
    catagory.innerHTML = '';
    datas.forEach(data => {
        const ul = document.createElement('ul');
        ul.classList.add('navbar-nav');
        ul.innerHTML = `
        <a onclick="detailCatagory(this.id)" id="${data.category_id }" class="nav-link px-0" href="#">${ data.category_name }</a>`
        
        catagory.appendChild(ul);
    })
}

// detail catagory function
const detailCatagory = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    const className = document.getElementById(id);
    className.classList.add('active');
    const header = document.getElementsByTagName('header');
    displayNews(data.data);
}

// News Detals function
const newsDetals = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data[0]);

    const modal_title = document.getElementById('modal_title');
    const modal_body = document.getElementById('modal_body');
    modal_title.innerText = data.data[0].title;
    modal_body.innerHTML = `<div class="card p-0">
            <div class="card-body">
            <img src="${data.data[0].image_url}" class="card-img-bottom" alt="...">
                <p class="card-text">${data.data[0].details}</p>
                <p class="card-text"><small class="text-muted">Last updated ${data.data[0].author.published_date}</small></p>
            </div>
        </div>`;
    
}
    
const displayNews = (news) => {
    const newsDiv = document.getElementById('news');
    newsDiv.innerHTML = '';
    news.forEach(news => {
        
        const details = news.details;
        const detail = details.slice(0, 200);
        newsDiv.innerHTML += ` <div class="card mb-5 p-2 container-lg">
                                    <div class="row g-0">
                                        <div class="col-md-3">
                                            <img src="${ news.thumbnail_url }" class="img-fluid rounded-start" alt="...">
                                        </div>
                                        <div class="col-md-9">
                                            <div class="card-body">
                                                <h5 class="card-title mt-2">${ news.title }  </h5>
                                                <p class="card-text my-4">${detail}...</p>
                                                <div class="d-flex gap-4 align-items-center justify-content-between">
                                                
                                                
                                                    <!-- user start -->
                                                    <div class="d-flex align-items-center gap-3 ">
                                                        <img src="${ news.author.img }" class="rounded-circle img-fluid "
                                                            style="max-width: 50px;" alt="player-1">
                                                        <div>
                                                            <h6 class="m-0">${ news.author.name }</h6>
                                                            <p class="m-0">${ news.author.published_date }</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <!-- user end -->
                                                
                                                
                                                    <!-- user views start -->
                                                    <div class="d-flex align-items-center gap-3 ">
                                                        <i class="fa-regular fa-eye"></i>
                                                        <p class="m-0  fw-semibold">${ news.total_view }</p>
                                                    </div>
                                                    <!-- user views end -->
                                                    

                                                    <!-- user rating start -->
                                                    <div class="d-flex align-items-center gap-3 ">
                                                        <i class="fa-solid fa-star"></i>
                                                        <i class="fa-solid fa-star"></i>
                                                        <i class="fa-solid fa-star"></i>
                                                        <i class="fa-regular fa-star-half-stroke"></i>
                                                        <i class="fa-regular fa-star"></i>
                                                        <p class="mb-0">${news.rating.number}</p>
                                                    </div>
                                                    <!-- user rating end -->
                                                
                                                

                                                    <!-- Button trigger modal -->

                                                    <button onclick="newsDetals('${news._id}')" type="button" class="btn text-primary fw-bold px-5 fs-6" data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal">
                                                        <i class="fa-solid fa-arrow-right"></i>
                                                    </button>

                                                    <!-- Modal -->
                                                    <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                                        aria-hidden="true">
                                                        <div class="modal-fullscreen modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h5 id="modal_title" class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                                        aria-label="Close"></button>
                                                                </div>
                                                                <div id="modal_body" class="modal-body">
                                                                    ...
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-secondary"
                                                                        data-bs-dismiss="modal">Close</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>` 

    })
    }







loadCatagory();
// detailCatagory("08");