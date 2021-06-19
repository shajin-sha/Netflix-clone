import React, { useState } from 'react'
import "./search-movies.css"
import Movie from "./movieContent/MovieContent"

export default function SearchMovies() {
    const [InputSearch, setInputSearch] = useState("")


    


    return (
        <div>
            <div className="search-moviesDiv" >
                <input onChange={(e) => {
                    setInputSearch(e.target.value)
                }} placeholder="search" className="searchInput" type="text" />
            </div>



            <Movie InputSearch={InputSearch} ></Movie>
        </div>
    )
}
