import React, { VFC } from 'react';
// import styled from 'styled-components';

import { ReactJSONParser } from './reactComponentLib';

import './reactComponentLib/index.css';

// const StyledDiv = styled.div`
//   padding: 10px;
//   background-color: blue;
//   color: white;
// `;

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
      id: '1',
      blocks: [
        {
          type: 'div',
          data: {
            styles: {
              backgroundColor: 'green',
              width: '200px',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
            },
            id: '1.1',
            blocks: [
              {
                type: 'text',
                data: {
                  styles: {
                    color: 'yellow',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    padding: '10px',
                  },
                  id: '1.1.1',
                  value: 'Praise The Lord, Hallelujah!',
                },
              },
              {
                type: 'div',
                data: {
                  styles: {
                    backgroundColor: 'blue',
                    color: 'white',
                    padding: '10px',
                  },
                  id: '1.1.2',
                  blocks: [
                    {
                      type: 'text',
                      data: {
                        id: '1.1.1.1',
                        styles: { margin: '4px' },
                        value: '!!!!!',
                      },
                    },
                  ],
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
  <div className="w-8 h-8">
    <ReactJSONParser blocks={blocks} />
    {/* <TestComponent text="Styled Component from React library" />
    <StyledDiv>Example App styled component</StyledDiv> */}
  </div>
);
