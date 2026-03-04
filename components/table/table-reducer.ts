export type TableState<T> = {
  items: T[];
};

type SetItemsAction<T> = {
  type: "SET_ITEMS";
  items: T[];
};

type TableAction<T> = SetItemsAction<T>;

export function tableReducer<T>(state: TableState<T>, action: TableAction<T>): TableState<T> {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.items };
    default:
      return state;
  }
}
