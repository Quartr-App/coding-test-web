export type NavbarState<T> = {
  items: T[];
  currentPathname: string | null;
};

type SetItemsAction<T> = {
  type: "SET_ITEMS";
  items: T[];
};

type SetCurrentPathnameAction = {
  type: "SET_CURRENT_PATHNAME";
  pathname: string | null;
};

type NavbarAction<T> = SetItemsAction<T> | SetCurrentPathnameAction;

export function navbarReducer<T>(state: NavbarState<T>, action: NavbarAction<T>): NavbarState<T> {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.items };
    case "SET_CURRENT_PATHNAME":
      return { ...state, currentPathname: action.pathname };
    default:
      return state;
  }
}
