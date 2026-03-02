export type ListState<T> = {
  items: T[];
}

type SetItemsAction<T> = {
  type: "SET_ITEMS";
  items: T[];
};

type ListAction<T> = SetItemsAction<T>;

export function listReducer<T>(state: ListState<T>, action: ListAction<T>): ListState<T> {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.items };
    default:
      return state;
  }
}
