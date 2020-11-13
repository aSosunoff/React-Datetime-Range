import React, { useCallback, useEffect, useRef, useState } from "react";
import { getBounding } from "../utils/getBounding";
import { useEventListener } from "../hooks/useEventListener";
import Animation from "../components/Animation";

export const withAnimation = (WrapperComponent) => {
  const WithAnimation = ({ target, ...props }) => {
    const rangepicker = useRef();

    const [bounding, setBounding] = useState({
      top: 0,
      left: 0,
    });

    useEffect(() => {
      setBounding(getBounding(target, rangepicker.current));
    }, [target]);

    const handleDocumentClick = useCallback(
      (event) => {
        let conditionMain =
          rangepicker.current &&
          !rangepicker.current.contains(event.target) &&
          props.isOpen;

        if (conditionMain && target) {
          conditionMain = conditionMain && !target.contains(event.target);
        }

        return conditionMain && props.onClose();
      },
      [props, target]
    );

    useEventListener("pointerdown", handleDocumentClick);

    const RenderComponent = useCallback(
      (style) => (
        <WrapperComponent ref={rangepicker} {...props} style={style} />
      ),
      [props]
    );

    return (
      <Animation inProp={props.isOpen} top={bounding.top} left={bounding.left}>
        {RenderComponent}
      </Animation>
    );
  };

  return WithAnimation;
};
