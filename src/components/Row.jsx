import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Movie from './Movie'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'
//basically the row that displays the list of movies for each genre/category etc.
const Row = ({title, fetchURL, rowID}) => {

    const [movies, setMovies] = useState([])
    //like feature
    const [like, setLike] = useState(false)

    useEffect( ()=> {
        axios.get(fetchURL).then((response) => {
            setMovies(response.data.results)
    })       
    },[fetchURL])

   // console.log(movies)

   //Moves the slider by 500 pixels in specified direction 
   // Row ID serves to make each slider a unique slider of its own and won't 
   // Scroll other rows by 500 pixels when clicked.
    const slideLeft = () => {
        const slider = document.getElementById('slider' + rowID);
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = () => {
        const slider = document.getElementById('slider' + rowID);
        slider.scrollLeft = slider.scrollLeft + 500;
    };


  return (
    <>
      <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
      <div className='relative flex items-center group'>
        <MdChevronLeft 
        onClick={slideLeft} 
        className='bg-white rounded-full left-0 absolute opacity-20 hover:opacity-90 cursor-pointer z-50 hidden group-hover:block'
        size={40} />
        <div id={'slider' + rowID} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
            {movies.map((item, id) => (
                <Movie key={id} item={item} />
            ))}
        </div>
        <MdChevronRight 
        onClick={slideRight} 
        className='bg-white rounded-full right-0 absolute opacity-20 hover:opacity-90 cursor-pointer z-50 hidden group-hover:block'
        size={40} />
      </div>
    </>
  )
}

export default Row
