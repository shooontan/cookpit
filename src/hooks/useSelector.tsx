import { PreactContext } from 'preact';
import { useContext } from 'preact/hooks';

export function createSelectorHook<T>(
  context: PreactContext<T>
): <State extends T, Selected = unknown>(
  selector: (state: State) => Selected
) => Selected {
  const getContext = () => useContext(context);
  return function useSelector<UState = T, USelected = unknown>(
    selector: (state: UState) => USelected
  ) {
    let selectedState: USelected;
    const store = getContext();
    selectedState = selector(store as unknown as UState);
    return selectedState;
  };
}
