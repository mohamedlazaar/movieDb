import React from 'react';

function SearchBar(props) {
  return (
    <div className='flex flex-col w-full justify-center gap-10 items-center h-96'>
      {/* search title */}
        <h1 className='text-3xl md:text-5xl font-bold text-white'>Search Your Movie</h1>
        {/* search Input */}
      <input 
        value={props.searchMovie} 
        onChange={(event) => props.setSearch(event.target.value)} 
        placeholder='Search for movie' 
        className='border-2 py-3 px-6 w-full md:w-1/2 rounded-2xl border-black outline-none'
      />
    </div>
  );
}

export default SearchBar;
