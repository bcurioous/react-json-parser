import React from "react";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useDrag, useDrop } from "react-dnd";

const Div: React.FunctionComponent<{ styles: any; blocks: Array<any> }> = ({
  styles,
  blocks,
}) => {
  const [{ opacity, isDragging }, drag] = useDrag(
    () => ({
      type: "div",
      item: { id: Math.random() },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ["div"],
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  function onDrop(...args: any) {
    console.log("onDrop :>> ", args, blocks, styles);
  }

  const mergeRefs = (...refs: any) => {
    const filteredRefs = refs.filter(Boolean);
    if (!filteredRefs.length) return null;
    if (filteredRefs.length === 0) return filteredRefs[0];
    return (inst: any) => {
      for (const ref of filteredRefs) {
        if (typeof ref === "function") {
          ref(inst);
        } else if (ref) {
          ref.current = inst;
        }
      }
    };
  };

  const isActive = isOver && canDrop;

  let border = styles.border;
  
  if (isActive) {
    border = "#def636 thin solid";
  } else if (canDrop) {
    border = "#36daf6 thin dashed";
  }

  const DivStyled = styled.div({ ...styles, border });

  return (
    <DivStyled ref={mergeRefs(drag, drop)}>
      <JSON2React blocks={blocks} />
    </DivStyled>
  );
};
const Paragraph: React.FunctionComponent<{ styles: any; value: string }> = ({
  styles,
  value,
}) => {
  const PStyled = styled.p(styles);
  return <PStyled>{value}</PStyled>;
};

const Registry: any = {
  div: Div,
  text: Paragraph,
};

interface IJSON2ReactProps {
  blocks: Array<any>;
}

const JSON2React: React.FunctionComponent<IJSON2ReactProps> = ({ blocks }) => {
  //   console.log("blocks :>> ", blocks);
  return (
    <DndProvider backend={HTML5Backend}>
      {blocks.map((block, idx) => {
        const BlockComponent = Registry[block.type];
        // console.log('BlockComponent :>> ', BlockComponent, block.data);
        return <BlockComponent key={idx} {...block.data} />;
      })}
    </DndProvider>
  );
};

export default JSON2React;
