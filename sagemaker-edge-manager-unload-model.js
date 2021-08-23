// Copyright 2021 Amazon.com.
// SPDX-License-Identifier: MIT

const messages = require('./lib/agent_pb');
const client = require('./lib/agent_client');

module.exports = function(RED) {
	"use strict";

	function SMEdgeManagerUnLoadModelNode(n) {
		RED.nodes.createNode(this,n);
		node.on("input", function(msg) {
			var sendMsg = function (err, data) {
				if (err) {
				    node.status({fill:"red",shape:"ring",text:"error"});
                    node.error("failed: " + err.toString(), msg);
                    node.send([null, { err: err }]);
    				return;
				} 
                msg.payload = data;
                node.status({});
				node.send([msg,null]);
			};
            var req = new messages.UnLoadModelRequest();
            
            req.setName(msg.name || n.name);

            client.unLoadModel(req, function(err, response) {
                sendMsg(err, response);
            })
		});
	}
	RED.nodes.registerType("SME Manager UnLoad Model", SMEdgeManagerUnLoadModelNode);
};