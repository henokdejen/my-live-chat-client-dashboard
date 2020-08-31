import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { conversationsRequested, allOnlineVisitorsRequested } from '../../store/actions';


const InitialLoader = ({ loadInitialData }) => {
    useEffect(() => {
        loadInitialData()
        // setTimeout(() => {setIndex(1)}, 3000)
    }, [])
    return (
        <div className="initialLoader">
            Loading....
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    loadInitialData: () => {
        dispatch({ type: 'LOAD_INITIAL_DATA_REQUESTED' })
    }
});

export default connect(null, mapDispatchToProps)(InitialLoader);
