import React, { PureComponent } from "react";
import { Flipped, spring } from "react-flip-toolkit";

const onElementAppear = (el, index) =>
  spring({
    onUpdate: val => {
      el.style.opacity = val;
    },
    delay: index * 50
  });

const onExit = type => (el, index, removeElement) => {
  spring({
    config: { overshootClamping: true },
    onUpdate: val => {
      el.style.transform = `scale${type === "grid" ? "X" : "Y"}(${1 - val})`;
    },
    delay: index * 50,
    onComplete: removeElement
  });

  return () => {
    el.style.opacity = "";
    removeElement();
  };
};

const onGridExit = onExit("grid");
const onListExit = onExit("list");

const Card=(props)=> {
  const shouldFlip =(prev, current) => {
    if (prev.type !== current.type) {
      return true;
    }
    return false;
  };
  
    const { id, title, type, stagger, addToFilteredIds } = props;
    const flipId = `item-${id}`;
    return (
      <Flipped
        flipId={flipId}
        onAppear={onElementAppear}
        onExit={type === "grid" ? onGridExit : onListExit}
        key={flipId}
        stagger={stagger}
        shouldInvert={shouldFlip}
      >
        <li className="fm-item">
          <Flipped inverseFlipId={flipId}>
            <div>
              <Flipped
                flipId={`${flipId}-content`}
                translate
                shouldFlip={shouldFlip}
                delayUntil={flipId}
              >
                <div>
                  <h3>{title}</h3>
                  <p>{title}</p>
                </div>
              </Flipped>

              <Flipped
                flipId={`${flipId}-button`}
                shouldFlip={shouldFlip}
                delayUntil={flipId}
              >
                <button
                  className="fm-remove"
                  onClick={() => addToFilteredIds(id)}
                >
                  &times;
                </button>
              </Flipped>
            </div>
          </Flipped>
        </li>
      </Flipped>
    );
  }


export default Card;
