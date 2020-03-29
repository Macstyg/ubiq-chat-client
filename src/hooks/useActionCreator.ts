import { useDispatch } from "react-redux";
import { useCallback } from "react";

const useActionCreator = <T extends (...args: any[]) => any>(
  actionCreator: T
) => {
  const dispatch = useDispatch();
  const wrappedActionCreator = useCallback(
    ((...args: any[]) => dispatch(actionCreator(...args))) as T,
    [actionCreator, dispatch]
  );
  return wrappedActionCreator;
};

export default useActionCreator;
