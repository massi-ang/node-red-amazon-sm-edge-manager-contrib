// Copyright 2021 Amazon.com.
// SPDX-License-Identifier: MIT

const messages = require('./lib/agent_pb');
const client = require('./lib/agent_client');

module.exports = function(RED) {
	"use strict";

	function SMEdgeManagerUnLoadModelNode(n) {
		RED.nodes.createNode(this,n);

		node.model = RED.nodes.getNode(n.model);

        if (node.model === undefined) {
			node.modelName = n.modelName;
        } else {
			node.modelName = node.model.modelName;
		}
		node.on("input", function(msg) {
            var req = new messages.UnLoadModelRequest();
            req.setName(msg.modelName || node.modelName);

            client.unLoadModel(req, function(err, response) {
                if (err) {
				    node.status({fill:"red",shape:"ring",text:"error"});
                    node.error(err.toString(), msg);
                    node.send([null, { err: err }]);
    				return;
				} 
                node.status({});
				msg.modelName = msg.modelName || node.modelName;
				node.send([msg,null]);
            })
		});
	}
	RED.nodes.registerType("unload", SMEdgeManagerUnLoadModelNode);
};