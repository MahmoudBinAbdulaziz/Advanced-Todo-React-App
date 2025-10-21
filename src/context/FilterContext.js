import { createContext } from "react";
const initialFilters = {
  status: 'all',
  priority: 'all',
  difficulty: 'all',
};
export const FilterContext = createContext(initialFilters);

// export default FilterContext;