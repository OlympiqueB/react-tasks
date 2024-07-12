import { Action, ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

const store = configureStore({
	reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type StoreType = typeof store;
export type AppDispatch = StoreType['dispatch'];
export type ThunkAction<R, S, E, A extends Action> = (
	dispatch: ThunkDispatch<S, E, A>,
	getState: () => S,
	extraArgument: E
) => R;
