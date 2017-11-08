import {combineReducers} from 'redux';

/*reducers*/
import currencyReducer from './currencyReducer';
import dateReducer from './dateReducer';
import dataReducer from './dataReducer';
import selectCurrencReducer from './selectCurrencReducer';

export default function createReducer() {
    return combineReducers({
        date: dateReducer,
        currency: currencyReducer,
        //data: dataReducer,
        selected: selectCurrencReducer,

    });
}
