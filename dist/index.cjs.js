'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styled = require('styled-components');
var reactDnd = require('react-dnd');
var reactDndHtml5Backend = require('react-dnd-html5-backend');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

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

var Wrapper = styled__default['default'].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 10px;\n  color: red;\n"], ["\n  padding: 10px;\n  color: red;\n"])));
var TestComponent = function (_a) {
    var text = _a.text;
    return (React__default['default'].createElement(Wrapper, null, text));
};
var templateObject_1;

var Div = function (_a) {
    var styles = _a.styles, blocks = _a.blocks;
    var _b = reactDnd.useDrag(function () { return ({
        type: "div",
        item: { id: Math.random() },
        collect: function (monitor) { return ({
            opacity: monitor.isDragging() ? 0.4 : 1,
            isDragging: monitor.isDragging(),
        }); },
    }); }, []), _c = _b[0], opacity = _c.opacity, isDragging = _c.isDragging, drag = _b[1];
    var _d = reactDnd.useDrop({
        accept: ["div"],
        drop: onDrop,
        collect: function (monitor) { return ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }); },
    }), _e = _d[0], isOver = _e.isOver, canDrop = _e.canDrop, drop = _d[1];
    function onDrop() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("onDrop :>> ", args, blocks, styles);
    }
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
    var isActive = isOver && canDrop;
    var border = styles.border;
    if (isActive) {
        border = "#def636 thin solid";
    }
    else if (canDrop) {
        border = "#36daf6 thin dashed";
    }
    var DivStyled = styled__default['default'].div(__assign(__assign({}, styles), { border: border }));
    return (React__default['default'].createElement(DivStyled, { ref: mergeRefs(drag, drop) },
        React__default['default'].createElement(JSON2React, { blocks: blocks })));
};
var Paragraph = function (_a) {
    var styles = _a.styles, value = _a.value;
    var PStyled = styled__default['default'].p(styles);
    return React__default['default'].createElement(PStyled, null, value);
};
var Registry = {
    div: Div,
    text: Paragraph,
};
var JSON2React = function (_a) {
    var blocks = _a.blocks;
    //   console.log("blocks :>> ", blocks);
    return (React__default['default'].createElement(reactDnd.DndProvider, { backend: reactDndHtml5Backend.HTML5Backend }, blocks.map(function (block, idx) {
        var BlockComponent = Registry[block.type];
        // console.log('BlockComponent :>> ', BlockComponent, block.data);
        return React__default['default'].createElement(BlockComponent, __assign({ key: idx }, block.data));
    })));
};

exports.ReactJSONParser = JSON2React;
exports.TestComponent = TestComponent;
