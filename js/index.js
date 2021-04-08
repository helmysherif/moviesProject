const moviesRow = document.getElementById("moviesRow");
const paginations = document.getElementById("paginations");
const searchInput = document.getElementById("search");
const search2 = document.getElementById("search2");
let AllMovies = [];
let AllOfPages;
const imageSrc = "https://image.tmdb.org/t/p/w500/";
async function getAllMovies(type = "now_playing")
{
    let apiResponse = await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=101b15d060bd4055dbc2e20f259a12be&language=en-US&page=1`)
    let result = await apiResponse.json();
    AllMovies = result.results;
    allOfPages = result.total_pages;
    getAllPages();
    displayAllMovies(AllMovies);
}
getAllMovies();
displayAllMovies = (anyArray) => {
    let movie = ``;
    let movieImage;
    for (let i = 0; i < anyArray.length; i++) {
        if(anyArray[i].poster_path !== null)
        {
            movieImage = imageSrc + anyArray[i].poster_path;
        } else 
        {
            if(anyArray[i].backdrop_path !== null)
            {
                movieImage = imageSrc + anyArray[i].backdrop_path;
            } else {
                movieImage = "https://st.depositphotos.com/1987177/3470/v/600/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg"
            }
        }
        movie += `
         <div class="col-md-4 mb-5">
               <div class="movie position-relative">
                <img src="${movieImage}" class = "img-fluid w-100" alt="">
                <div class="overlay position-absolute">
                    <h2>${anyArray[i].title}</h2>
                    <p>${anyArray[i].overview}</p>
                    <h3>Vote Average: ${anyArray[i].vote_average}</h3>
                    <span>Release Date: ${anyArray[i].release_date}</span>
                </div>
               </div>
        </div>`
    }
    moviesRow.innerHTML = movie;
}
function getAllPages()
{
    let page = ``;
    for (let i = 1; i <= allOfPages; i++) {
        page += `
            <div class="page-item" onclick = "displayAllPages(${i})"><a class="page-link" href="#">${i}</a></div>
        `;
    }
    paginations.innerHTML = page;
}
async function displayAllPages(page)
{
    let newResult = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=101b15d060bd4055dbc2e20f259a12be&language=en-US&page=${page}`);
    let result = await newResult.json();
    AllMovies = result.results;
    displayAllMovies(AllMovies);
}
// search in array
searchInput.addEventListener('keyup' , () => {
    searchInArray(searchInput.value);
});
function searchInArray(term)
{
    let movie = ``;
    let movieImage;
    for (let i = 0; i < AllMovies.length; i++) {
        if(AllMovies[i].poster_path !== null)
        {
            movieImage = imageSrc + AllMovies[i].poster_path;
        } else 
        {
            if(AllMovies[i].backdrop_path !== null)
            {
                movieImage = imageSrc + AllMovies[i].backdrop_path;
            } else {
                movieImage = "https://st.depositphotos.com/1987177/3470/v/600/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg"
            }
        }
        if(AllMovies[i].title.toLowerCase().includes(term.toLowerCase()))
        {
            movie += `
             <div class="col-md-4 mb-5">
                   <div class="movie position-relative">
                    <img src="${movieImage}" class = "img-fluid w-100" alt="">
                    <div class="overlay position-absolute">
                        <h2>${AllMovies[i].title}</h2>
                        <p>${AllMovies[i].overview}</p>
                        <h3>Vote Average: ${AllMovies[i].vote_average}</h3>
                        <span>Release Date: ${AllMovies[i].release_date}</span>
                    </div>
                   </div>
            </div>`
        }
    }
    moviesRow.innerHTML = movie;
}
search2.addEventListener('keyup' , () => {
    searchInApi(search2.value);
});
async function searchInApi(term){
    if(term == '')
    {
        return;
    }
    let searchedMovies = [];
    let apiResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=101b15d060bd4055dbc2e20f259a12be&language=en-US&query=${term}&page=1&include_adult=false`);
    let result = await apiResponse.json();
    searchedMovies = result.results;
    displayAllMovies(searchedMovies);
}
let isOpen = true;
let menuItems = $("ul li");
$("#close").click(() => {
    let sideMenu = $("#sideMenu").outerWidth();
    let rightSide = $(".rightSide").outerWidth();
    let totalWidth = sideMenu - rightSide;
    if(isOpen)
    {
        $("#sideMenu").animate({left:0});
        for (let i = 0; i < menuItems.length; i++) {
            $(`.item${i}`).animate({paddingTop:"30px"} , i*50+1000);
        }
        $("#close").removeClass("fa-bars").addClass("fa-times");
        isOpen = false;
    } else {
        $("#sideMenu").animate({left:-totalWidth});
        $("ul li").animate({paddingTop:"500px"} , 1000);
        $("#close").removeClass("fa-times").addClass("fa-bars");
        isOpen = true;
    }
})
for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener("click" , () => {
        getAllMovies(menuItems[i].getAttribute("movieTitle"));
    })
}