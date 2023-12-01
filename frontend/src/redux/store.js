import { createStore, combineReducers, applyMiddleware } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'


const reducers = combineReducers({

})

const middleware = [thunk]

const store = createStore(
    reducers, 
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store