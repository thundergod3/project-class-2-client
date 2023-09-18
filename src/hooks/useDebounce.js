/* eslint-disable react-hooks/exhaustive-deps */

import _debouunce from "lodash/debounce";
import { useCallback } from "react";

export default function useDebounce(cb, ms) {
  return useCallback(_debouunce(cb, ms), []);
}
