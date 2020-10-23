import React, { useCallback, useEffect, useRef, useState } from "react";
import { getBounding } from "../utils/getBounding";
import useAddListener from "../hooks/useAddListener";
import Animation from "../components/Animation";

const withAnimation = (Component) => ({ target, ...props }) => {
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

  useAddListener("pointerdown", _handleDocumentClick);

  const WrapperComponent = useCallback(
    (style) => <Component ref={rangepicker} {...props} style={style} />,
    [props]
  );

  return (
    <Animation inProp={props.isOpen} top={bounding.top} left={bounding.left}>
      {WrapperComponent}
    </Animation>
  );
};

export default withAnimation;
