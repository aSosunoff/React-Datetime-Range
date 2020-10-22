import React, { useCallback, useEffect, useRef, useState } from "react";
import Animation from "./components/Animation";
import useAddListener from "./hooks/useAddListener";
import { getBounding } from "./utils/getBounding";
import RangePicker from "./components/RangePicker";

export default ({ target, ...props }) => {
  const rangepicker = useRef();

  const [bounding, setBounding] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    setBounding(getBounding(target, rangepicker.current));
  }, [target]);

  const _handleDocumentClick = useCallback(
    (event) =>
      rangepicker.current &&
      !rangepicker.current.contains(event.target) &&
      props.isOpen &&
      !target.contains(event.target) &&
      props.onClose(),
    [props, target]
  );

  useAddListener("pointerdown", _handleDocumentClick, props.isOpen);

  const RangePickerComponent = useCallback(
    (style) => <RangePicker ref={rangepicker} {...props} style={style} />,
    [props]
  );

  return (
    <Animation inProp={props.isOpen} top={bounding.top} left={bounding.left}>
      {RangePickerComponent}
    </Animation>
  );
};
