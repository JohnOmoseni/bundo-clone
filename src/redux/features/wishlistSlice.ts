import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type WishListProps = {
	items: any[];
};

const initialState: WishListProps = {
	items: [],
};

const wishlistSlice = createSlice({
	name: "wishlist",
	initialState,
	reducers: {
		setWishlist: (state, action) => {
			state.items = action.payload;
		},

		toggleWishlistItem: (state, action: PayloadAction<string>) => {
			const propertyId = action.payload;

			if (state.items.includes(propertyId)) {
				state.items = state.items.filter((id) => id !== propertyId);
			} else {
				state.items.push(propertyId);
			}
		},
	},
});

export const { setWishlist, toggleWishlistItem } = wishlistSlice.actions;

export default wishlistSlice.reducer;
