import { createSelectorHook } from 'react-redux';
import { ApplicationState } from '../store';

export const appSelector = createSelectorHook<ApplicationState>();
