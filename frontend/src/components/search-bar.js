import React from 'react';
import { FaSearch } from "react-icons/fa";
import { useSearchContext } from '../context/searchContext';
import { useNavigate } from 'react-router-dom';
const SearchBar = () => {

    const { setSearchInput } = useSearchContext();
    const navigate = useNavigate();

    const handleSearchInput = (event) => {
        setSearchInput(event.target.value);
        // console.log(searchInput);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        const searchQuery = event.target.elements[0].value; // Get the search input value
        navigate(`/jobs?skill=${searchQuery}`); // Navigate to the jobs page with the search query
    };

    return (
        <form onSubmit={handleSubmit} className='w-full mt-4 flex justify-center'>
            <div className='relative w-[60%] '>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearchInput}
                    className="w-[100%] px-4 py-3 bg-tertiary text-center rounded-full outline-none text-secondary "
                />
                <FaSearch className='absolute text-secondary top-[50%] translate-y-[-50%] left-3' />
            </div>
        </form>
    );
};

export default SearchBar;