import { configureStore } from "@reduxjs/toolkit";
import VendorsReducer from "../reducers/vendor/slice";
import ServicesReducer from "../reducers/services/slice";
import ProvidersReducer from "../reducers/providers/slice";
import ExperiencesReducer from "../reducers/experiences/slice";
import OptionReducer from "../reducers/options/slice";
import VariationReducer from "../reducers/variations/slice";
export const store = configureStore({
  reducer: {
    vendors: VendorsReducer,
    services: ServicesReducer,
    providers: ProvidersReducer,
    experiences: ExperiencesReducer,
    options: OptionReducer,
    variations: VariationReducer,
  },
});
