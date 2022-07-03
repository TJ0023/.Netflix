import React, {useState, useEffect} from 'react'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';    
import {updateDoc, doc, onSnapshot} from 'firebase/firestore'
import { AiOutlineClose } from 'react-icons/ai';

const SavedShows = () => {
    const [movies, setMovies] = useState([]);
    const {user} = UserAuth();

    //Moves the slider by 500 pixels in specified direction 
   // Row ID serves to make each slider a unique slider of its own and won't 
   // Scroll other rows by 500 pixels when clicked.
    const slideLeft = () => {
        const slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = () => {
        const slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
          setMovies(doc.data()?.savedShows);
        });
      }, [user?.email]);

      //used for referring to the savedshows database for deleting catalogue
    const movieRef = doc(db, 'users', `${user?.email}`)

    const deleteShow = async (passedID) => {
        try {
            const result = movies.filter((item)=> item.id !== passedID)
            await updateDoc(movieRef, {
                savedShows: result,
            })
        } catch (error) {
            console.log(error)
        }
    }

    
  return (
    <>
    <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
    <div className='relative flex items-center group'>
      <MdChevronLeft 
      onClick={slideLeft} 
      className='bg-white rounded-full left-0 absolute opacity-20 hover:opacity-90 cursor-pointer z-10 hidden group-hover:block'
      size={40} />
      <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
          {movies.map((item, id) => (
               <div  key={id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
               <img 
               className='w-full h-auto block'
               src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
               alt={item?.title} />
           <div className='transition ease duration-200 absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white hover:ease-in-out'>
          
          <p className=' white-space-normal text-[10px] md:text-xs font-bold flex justify-center items-center h-full text-center break-normal flex-wrap'>
              {item?.title}
          </p>
          <p onClick={()=> deleteShow(item.id)} className='absolute text-gray-300 top-4 right-4'>
            <AiOutlineClose />
          </p>
             </div>
           </div>
          ))}
      </div>
      <MdChevronRight 
      onClick={slideRight} 
      className='bg-white rounded-full right-0 absolute opacity-20 hover:opacity-90 cursor-pointer z-10 hidden group-hover:block'
      size={40} />
    </div>
  </>
  )
}

export default SavedShows
