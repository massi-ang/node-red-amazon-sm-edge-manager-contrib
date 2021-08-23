// Copyright 2021 Amazon.com.
// SPDX-License-Identifier: MIT

const { node } = require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs-node');
const internal = require('stream');

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

	function TensorNode(n) {
		RED.nodes.createNode(this,n);

		node.on("input", function(msg) {
			var errorNotification = function (err) {
				node.status({fill:"red",shape:"ring",text:"error"});
				node.error("failed: " + err.toString(), msg);
				node.send([null, { err: err }]);
				return;
			}
			try {
				const tensor = new tf.tensor(msg.payload);
				switch (n.operation) {
					case "reshape": 
					const shape = n.args.split(',').map(x => Number.parseInt(x));
					t = tensor.reshape(shape);
					msg.payload = t;
					break;
					case "transpose":

				}
				node.send([msg,null]);
			} catch (err) {
				errorNotification(err);
			}
		});
	}
	RED.nodes.registerType("Tensor", TensorNode);
};