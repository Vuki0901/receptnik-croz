import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
    recipes: []
}

const recipeSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        add(state, action) {
            const newRecipe = action.payload;
            newRecipe.fav = false;
            state.recipes.push(newRecipe);
        },
        delete(state, action) {
            console.log(action.payload)
            state.recipes = state.recipes.filter(el => el.naziv !== action.payload)
        },
        update(state, action) {
            state.recipes = action.payload;
        }
    }
})

const store = configureStore({
    reducer: recipeSlice.reducer
});

export const actions = recipeSlice.actions;

export default store;