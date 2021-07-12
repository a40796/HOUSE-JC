import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
    return (

        <div className="search">
            <div className="log"><FontAwesomeIcon className="faSearch"  icon={faSearch} />
            </div>
            <input type="text" placeholder="search the house jc"/>
        </div>
    )
}

export default Search
