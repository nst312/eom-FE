import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';


export const getAllRatings = createAsyncThunk(
    'ratingApp/newRating/getAllRating',
    async () => {
        const response = await axios.get('/api/users/dashboard');
        const data = await response.data;

      data.forEach((num, index) => {
        console.log("index", index);
        if (index === 0){
          data[index].medal = "assets/images/trophy/gold.png"
        }else if(index === 1){
          data[index].medal = "assets/images/trophy/silver.png"
        }else if (index === 2){
          data[index].medal = "assets/images/trophy/bronze.png"
        }else{
          data[index].medal = ""
        }
      });

        return data;
    }
);

const ratingAdapter = createEntityAdapter({});

export const { selectAll: selectRating, selectById: selectOrderById } =
    ratingAdapter.getSelectors((state) => state.ratingApp.dashboard);

const dashboardSlice = createSlice({
    name: 'ratingApp/newRating',
    initialState: ratingAdapter.getInitialState({
        searchText: '',
    }),
    reducers: {},
    extraReducers: {
        [getAllRatings.fulfilled]: ratingAdapter.setAll,
    },
});

export default dashboardSlice.reducer;
