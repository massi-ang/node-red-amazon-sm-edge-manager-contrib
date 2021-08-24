// Copyright 2021 Amazon.com.
// SPDX-License-Identifier: MIT

const TYPES = {
	'Uint8': Uint8Array,
	'Uint16': Uint16Array,
	'Uint32': Uint32Array,
	'Uint64': BigUint64Array,
	'Int8': Int8Array,
	'Int16': Int16Array,
	'Int32': Int32Array,
	'Int64': BigInt64Array,
	'Float32': Float32Array,
	'Float64': Float64Array,
}

module.exports = function(RED) {
	"use strict";

	function ArrayConverterNode(n) {
		RED.nodes.createNode(this,n);
		const node = this;
		const type = TYPES[n.dataType];
		if (type === undefined) {
			node.status({fill:"red",shape:"ring",text:"error"});
			node.error(`Type error: ${n.dataType} is not supported`);
			return;
		}

		node.on("input", function(msg) {
			var errorNotification = function (err) {
				node.status({fill:"red",shape:"ring",text:"error"});
				node.error("failed: " + err.toString(), msg);
				node.send([null, { err: err }]);
				return;
			}
			try {
				const c = msg.payload.slice(0); // Creates a copy of the underlying buffer
				const x = new type(c.buffer);
				msg.payload = x;
				node.send([msg, null]);
			} catch (err) {
				errorNotification(err);
			}
		});
	}
	RED.nodes.registerType("array converter", ArrayConverterNode);
};