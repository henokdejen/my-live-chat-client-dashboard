import React, { useState } from 'react';

import './ConversationSearch.scss';

const ConversationSearch = ({ conversations }) => {
    let searchInput = null;
    const [searchValue, setSearchValue] = useState('')

    if (conversations && conversations.length > 0) {
        searchInput = <input
            value={searchValue}
            onChange={e => { setSearchValue(e.target.value) }}
            type="text"
            placeholder="Search" />;
    }

    return (
        <div id="search-container">
            {searchInput}
        </div>
    );
}

export default ConversationSearch;