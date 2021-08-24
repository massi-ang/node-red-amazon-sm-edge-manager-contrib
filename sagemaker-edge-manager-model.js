// Copyright 2021 Amazon.com.
// SPDX-License-Identifier: MIT

module.exports = function(RED) {
	"use strict";

	function SMEdgeManagerModelNode(n) {
		RED.nodes.createNode(this,n);
        this.modelName = n.modelName;
        this.modelUri = n.modelUri;
		this.name = n.name;
	}
	RED.nodes.registerType("model", SMEdgeManagerModelNode);
};