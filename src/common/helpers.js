import {createAsyncThunk} from "@reduxjs/toolkit";


export const getSpecificState = createAsyncThunk('get-state-thunk', async ({slice = 'media', keys}, {getState}) => {
    const currentState = getState();
    const values = keys.map(key => currentState[slice][key]);
    return values;
});



