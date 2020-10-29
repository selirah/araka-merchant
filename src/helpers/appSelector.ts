import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { ApplicationState } from '../store';

export const appSelector: TypedUseSelectorHook<ApplicationState> = useSelector;
