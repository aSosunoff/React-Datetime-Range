import { useMemo } from "react";
import { getDateSplit } from "../utils/dateHalper";

export default function useDateSplit(date) {
  const dateDto = useMemo(() => getDateSplit(date), [date]);

  return {
    ...dateDto,
  };
}
