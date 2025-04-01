import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type StateProp = {
	openMenu: boolean;
	screenSize: number;
	isNetwork: boolean;
	query: string;
	globalProducts: any[];
	searchResults: any[];
};

const initialAppState: StateProp = {
	openMenu: false,
	screenSize: 0,
	isNetwork: true,
	query: "",
	globalProducts: [],
	searchResults: [],
};

const appSlice = createSlice({
	name: "app",
	initialState: initialAppState,
	reducers: {
		setOpenMenu: (state, action: PayloadAction<boolean>) => {
			state.openMenu = action.payload;
		},
		setScreenSize: (state, action: PayloadAction<number>) => {
			state.screenSize = action.payload;
		},
		setNetwork: (state, { payload }) => {
			state.isNetwork = payload;
		},
		setSearchQuery: (state, { payload }) => {
			state.query = payload;
		},
		setSearchResults: (state, { payload }) => {
			state.searchResults = payload;
		},
		setGlobalProducts: (state, { payload }) => {
			state.globalProducts = payload;
		},
	},
});

export default appSlice.reducer;
export const {
	setScreenSize,
	setOpenMenu,
	setNetwork,
	setSearchQuery,
	setGlobalProducts,
	setSearchResults,
} = appSlice.actions;
