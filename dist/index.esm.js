import React, { useState } from 'react';
import styled from 'styled-components';
import { DndProvider, useDrop, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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

function selectBackgroundColor(isActive, canDrop) {
    if (isActive) {
        return "darkgreen";
    }
    else if (canDrop) {
        return "darkkhaki";
    }
    else {
        return "lightblue";
    }
}
var DropZone = function () {
    var DivStyled = styled.div({
        marginTop: "20px",
        width: 300,
        height: 300,
        background: "lightblue",
        textAlign: "center",
        fontSize: "1rem",
        lineHeight: "normal",
    });
    var _a = useDrop(function () { return ({
        accept: "div",
        drop: function () { return ({
            name: "drop-zone-1",
        }); },
        collect: function (monitor) { return ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }); },
    }); }, []), _b = _a[0], canDrop = _b.canDrop, isOver = _b.isOver, drop = _a[1];
    var isActive = canDrop && isOver;
    var backgroundColor = selectBackgroundColor(isActive, canDrop);
    return (React.createElement(DivStyled, { ref: drop, style: { backgroundColor: backgroundColor } }, isActive ? "Release to drop" : "Drag a box here"));
};
var Div = function (_a) {
    var styles = _a.styles, blocks = _a.blocks, id = _a.id;
    var blockId = useState(Date.now())[0];
    var _b = useDrag(function () { return ({
        type: "div",
        item: { blockId: blockId, id: id, styles: styles, blocks: blocks },
        end: function (item, monitor) {
            var dropResult = monitor.getDropResult();
            var targetIds = monitor.getTargetIds();
            console.group("useDrag :: onDragEnd");
            console.log("item :: :>> ", item, monitor);
            console.log("targetIds :: :>> ", targetIds);
            console.log("dropResult :: :>> ", dropResult);
            console.groupEnd();
        },
        collect: function (monitor) { return ({
            opacity: monitor.isDragging() ? 0.4 : 1,
            isDragging: monitor.isDragging(),
        }); },
    }); }, [blocks]), _c = _b[0], opacity = _c.opacity, isDragging = _c.isDragging, drag = _b[1];
    var _d = useDrop(function () { return ({
        accept: "div",
        drop: function (item, monitor) {
            console.log("useDrop :: onDrop :: item :>> ", id, item, monitor);
            return item;
        },
        collect: function (monitor) { return ({
            isOver: monitor.isOver(),
        }); },
    }); }, [blocks]), isOver = _d[0].isOver, drop = _d[1];
    console.log("isOver ::  :>> ", isOver);
    var mergeRefs = function () {
        var refs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            refs[_i] = arguments[_i];
        }
        var filteredRefs = refs.filter(Boolean);
        if (!filteredRefs.length)
            return null;
        if (filteredRefs.length === 0)
            return filteredRefs[0];
        return function (inst) {
            for (var _i = 0, filteredRefs_1 = filteredRefs; _i < filteredRefs_1.length; _i++) {
                var ref = filteredRefs_1[_i];
                if (typeof ref === "function") {
                    ref(inst);
                }
                else if (ref) {
                    ref.current = inst;
                }
            }
        };
    };
    var border = styles.border;
    if (isOver) {
        border = "#def636 thin solid";
    }
    // else if (canDrop) {
    //   border = "#36daf6 thin dashed";
    // }
    var DivStyled = styled.div(__assign(__assign({}, styles), { border: border }));
    return (React.createElement(DivStyled, { ref: mergeRefs(drag, drop) },
        React.createElement(JSON2React, { blocks: blocks })));
};
var Paragraph = function (_a) {
    var styles = _a.styles, value = _a.value;
    var PStyled = styled.p(styles);
    return React.createElement(PStyled, null, value);
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
var JsonComponentRenderer = function (_a) {
    var blocks = _a.blocks;
    console.log("JsonComponentRenderer :>> ", blocks);
    return (React.createElement(DndProvider, { backend: HTML5Backend },
        React.createElement(JSON2React, { blocks: blocks }),
        React.createElement(DropZone, null)));
};

export { JsonComponentRenderer as ReactJSONParser, TestComponent };
