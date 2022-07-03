import axios from 'axios'
import React, { useEffect, useState } from 'react'
import requests from '../Request'

const Main = () => {
    const [movies, setMovies] = useState([])
// This makes sure that the resulting thumbnail is random everytime the page is refreshed
    const movie = movies[Math.floor(Math.random() * movies.length)]


    // This use effect makes sure that the API request isn't frequent and is only done once per page access or refresh
    useEffect(() => {
        axios.get(requests.requestPopular).then ((response) => {
            setMovies(response.data.results)
        })
    }, [])

    //If text is too long, it'll be replaced with ... to avoid text from covering the screen too much
    // So you insert the object or whatever text property you have inside this function and set the text string limit...
    const truncateString = (str, num) => {
        if(str?.length > num) {
            return str.slice(0, num) + '...'
        } else {
            return str;
        }
    };

    // this was just to find if the API was working or responsive console.log(movie)
//Tailwind CSS is amazing. I can't believe this isn't used more 😍
  return (
    <div className='w-full h-[550px] text-white'>
        <div className='w-full h-full'>
            <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'></div>
            <img className='w-full h-full object-cover'src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title}  />
            <div className='absolute w-full top-[20%] p-4 md:p-8'>
                <h1 className='text-3xl md:text-5xl font-bold'>{movie?.title}</h1>
                <div className='my-4'></div>
            <div>
                <button className='transition duration-200 border bg-gray-300 text-black border-gray-300 py-2 px-5 hover:bg-red-700 hover:text-white hover:border-red-800'>PLAY</button>
                <button className='transition duration-200 border  text-white  border-gray-300 py-2 px-5 ml-4 hover:bg-white hover:text-black'>WATCH LATER</button>
            </div>
                <p className='text-gray-400 text-sm'>Released: {movie?.release_date}</p>
                <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
                    {truncateString(movie?.overview, 150)}
                    </p>
            </div>
      
        </div>
    </div>
  )
}

export default Main
