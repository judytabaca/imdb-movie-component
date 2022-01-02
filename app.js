console.log('here')
import MovieComponent from "./movie_component.js";
// const apiUrl = 'https://im/db-api.com/en/API/MostPopularMovies/k_kzy0r6s5'
const apiUrl = 'data.json'
const body = document.body
const moviesSection = document.querySelector('.movies-section')

const getData = async () => {
    const response = await fetch(apiUrl);
    if(response.status !== 200){
        throw new Error('could not get the data')
    }
    const data = await response.json();
    return data
}

const makeTopMovies = () => {
    getData()
        .then((data) => {
            console.log(data)
            for(let i = 0; i < 10; i++) {
                const rank = data.items[i].rank
                const title = data.items[i].title
                const poster = data.items[i].image
                const rating = data.items[i].imDbRating
                const year = data.items[i].year
                moviesSection.appendChild(new MovieComponent(rank, title, poster, rating, year));
            }
        })
        .catch(err => console.log(err))
}

makeTopMovies()
