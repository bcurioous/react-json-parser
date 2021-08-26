import React from 'react';
import styled from 'styled-components';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var Wrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 10px;\n  color: red;\n"], ["\n  padding: 10px;\n  color: red;\n"])));
var TestComponent = function (_a) {
    var text = _a.text;
    return (React.createElement(Wrapper, null, text));
};
var templateObject_1;

var Div = function (_a) {
    var styles = _a.styles, blocks = _a.blocks;
    return (React.createElement("div", { style: styles },
        React.createElement(JSON2React, { blocks: blocks })));
};
var Paragraph = function (_a) {
    var styles = _a.styles, value = _a.value;
    // console.log('p :: styles :>> ', styles, value);
    return React.createElement("p", { style: styles }, value);
};
var Registry = {
    div: Div,
    text: Paragraph,
};
var JSON2React = function (_a) {
    var blocks = _a.blocks;
    //   console.log("blocks :>> ", blocks);
    return (React.createElement(React.Fragment, null, blocks.map(function (block, idx) {
        var BlockComponent = Registry[block.type];
        // console.log('BlockComponent :>> ', BlockComponent, block.data);
        return React.createElement(BlockComponent, __assign({ key: idx }, block.data));
    })));
};

export { JSON2React as ReactJSONParser, TestComponent };
