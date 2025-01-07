import filterButton from '../../../src/img/user/filterButton.png'
import './FilterButton.css';
import { useDispatch } from 'react-redux';
import { filterAndSortFormSlice } from '../../features/user/utility';

function FilterButton() {
    const dispatch = useDispatch();
    
    const onClickFilter = () => {
        dispatch(filterAndSortFormSlice.actions.toggle());
    }

    return (
        <>
            <button id="filterButton" onClick={onClickFilter}><img src={filterButton} alt='Filter'title='Filter'/></button>
        </>
    )
}

export default FilterButton;