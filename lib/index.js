"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports["default"] = function () {
	var counter = 0,
	    buffer = [],
	    indexBuffer = [];

	return {
		add: function add(value) {
			var freeIndex = indexBuffer.pop();
			if (freeIndex === undefined) {
				freeIndex = counter++;
			}
			buffer[freeIndex] = value;

			return function () {
				buffer[freeIndex] = undefined;
				indexBuffer.unshift(freeIndex);
			};
		},
		buffer: buffer
	};
};

module.exports = exports["default"];