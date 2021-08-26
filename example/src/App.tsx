import React, { VFC } from 'react';
import styled from 'styled-components';

import { TestComponent, ReactJSONParser } from './reactComponentLib';

const StyledDiv = styled.div`
  padding: 10px;
  background-color: blue;
  color: white;
`;

const blocks = [
  {
    type: 'div',
    data: {
      styles: {
        backgroundColor: 'red',
        width: '300px',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      },
      blocks: [
        {
          type: 'div',
          data: {
            styles: {
              backgroundColor: 'green',
              width: '200px',
              height: '200px',
              display: 'flex',
              alignItems: 'center'
            },
            blocks: [
              {
                type: 'text',
                data: {
                  styles: {
                    color: 'yellow',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    padding: '10px'
                  },
                  value: 'Praise The Lord, Hallelujah!',
                },
              },
            ],
          },
        },
      ],
    },
  },
];

export const App: VFC = () => (
  <div>
    <ReactJSONParser blocks={blocks} />
    {/* <TestComponent text="Styled Component from React library" />
    <StyledDiv>Example App styled component</StyledDiv> */}
  </div>
);
