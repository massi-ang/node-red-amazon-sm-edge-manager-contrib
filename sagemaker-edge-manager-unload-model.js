// Copyright 2021 Amazon.com.
// SPDX-License-Identifier: MIT

const messages = require('./lib/agent_pb');
const client = require('./lib/agent_client');

module.exports = function(RED) {
	"use strict";

	function SMEdgeManagerUnLoadModelNode(n) {
		RED.nodes.createNode(this,n);
		node.on("input", function(msg) {
            var req = new messages.UnLoadModelRequest();
            req.setName(msg.model || n.modelName);

            client.unLoadModel(req, function(err, response) {
                if (err) {
				    node.status({fill:"red",shape:"ring",text:"error"});
                    node.error(err.toString(), msg);
                    node.send([null, { err: err }]);
    				return;
				} 
                node.status({});
				msg.model = msg.model || n.modelName;
				node.send([msg,null]);
            })
		});
	}
	RED.nodes.registerType("SME Manager UnLoad Model", SMEdgeManagerUnLoadModelNode);
};