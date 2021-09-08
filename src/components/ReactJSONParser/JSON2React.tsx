import React, { useState } from "react";

import '../../styles/tailwind.css'
import styled from "styled-components";
import { ConnectDropTarget, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useDrag, useDrop } from "react-dnd";

function selectBackgroundColor(isActive: boolean, canDrop: boolean) {
  if (isActive) {
    return "darkgreen";
  } else if (canDrop) {
    return "darkkhaki";
  } else {
    return "lightblue";
  }
}

const DropZone: React.FunctionComponent = () => {
  const DivStyled = styled.div({
    marginTop: "20px",
    width: 300,
    height: 300,
    background: "lightblue",
    textAlign: "center",
    fontSize: "1rem",
    lineHeight: "normal",
  });

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: "div",
      drop: () => ({
        name: "drop-zone-1",
      }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    []
  );
  const isActive = canDrop && isOver;
  const backgroundColor = selectBackgroundColor(isActive, canDrop);

  return (
    <DivStyled ref={drop} style={{ backgroundColor }}>
      {isActive ? "Release to drop" : "Drag a box here"}
    </DivStyled>
  );
};

const Div: React.FunctionComponent<{
  styles: any;
  blocks: Array<any>;
  id: string;
}> = ({ styles, blocks, id }) => {
  const [blockId] = useState<number>(Date.now());

  const [{ opacity, isDragging }, drag] = useDrag(
    () => ({
      type: "div",
      item: { blockId, id, styles, blocks },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        const targetIds = monitor.getTargetIds();
        console.group("useDrag :: onDragEnd");
        console.log("item :: :>> ", item, monitor);
        console.log("targetIds :: :>> ", targetIds);
        console.log("dropResult :: :>> ", dropResult);
        console.groupEnd();
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
        isDragging: monitor.isDragging(),
      }),
    }),
    [blocks]
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "div",
      drop: (item, monitor) => {
        console.log("useDrop :: onDrop :: item :>> ", id, item, monitor);
        return item;
      },
      collect: (monitor): { isOver: boolean } => ({
        isOver: monitor.isOver(),
      }),
    }),
    [blocks]
  );

  console.log("isOver ::  :>> ", isOver);

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

  let border = styles.border;

  if (isOver) {
    border = "#def636 thin solid";
  }
  // else if (canDrop) {
  //   border = "#36daf6 thin dashed";
  // }

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

export const JSON2React: React.FunctionComponent<IJSON2ReactProps> = ({
  blocks,
}) => {
  //   console.log("blocks :>> ", blocks);
  return (
    <>
      {blocks.map((block, idx) => {
        const BlockComponent = Registry[block.type];
        // console.log('BlockComponent :>> ', BlockComponent, block.data);
        return <BlockComponent key={idx} {...block.data} />;
      })}
    </>
  );
};

const JsonComponentRenderer: React.FunctionComponent<{
  blocks: Array<any>;
}> = ({ blocks }) => {
  console.log("JsonComponentRenderer :>> ", blocks);
  return (
    <DndProvider backend={HTML5Backend}>
      <JSON2React blocks={blocks} />
      <DropZone />
    </DndProvider>
  );
};

export default JsonComponentRenderer;
