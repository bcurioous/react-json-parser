import React from "react";

const Div: React.FunctionComponent<{ styles: any; blocks: Array<any> }> = ({
  styles,
  blocks,
}) => {
  return (
    <div style={styles}>
      <JSON2React blocks={blocks} />
    </div>
  );
};

const Paragraph: React.FunctionComponent<{ styles: any; value: string }> = ({
  styles,
  value,
}) => {
  // console.log('p :: styles :>> ', styles, value);
  return <p style={styles}>{value}</p>;
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
    <>
      {blocks.map((block, idx) => {
        const BlockComponent = Registry[block.type];
        // console.log('BlockComponent :>> ', BlockComponent, block.data);
        return <BlockComponent key={idx} {...block.data} />;
      })}
    </>
  );
};

export default JSON2React;
