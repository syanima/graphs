var ld = require('lodash');

var graphs = {};

graphs.UndirectedGraph = function(){
	this.UndirectedGraph = {};
};

graphs.DirectedGraph = function(){
	this.DirectedGraph = {};
};

graphs.UndirectedGraph.prototype = {
	addVertex : function(vertex){
		this.UndirectedGraph[vertex] = [];
	},
	addEdge : function(from,to){

		this.UndirectedGraph[from].push(to);
		this.UndirectedGraph[to].push(from);
	},
	hasEdgeBetween : function(from,to){
		return (ld.indexOf(this.UndirectedGraph[from],to) != -1);
	},
	order : function(){
		return Object.keys(this.UndirectedGraph).length;
	},
	size : function(){
		var count = 0;
		ld.forIn(this.UndirectedGraph,function(value,key){
			value.length != 0 ? count++ : count ;
		});
		return Math.ceil(count/2);
	}
};

graphs.DirectedGraph.prototype = {
	addVertex : function(vertex){
		this.DirectedGraph[vertex] = [];
	},
	addEdge : function(from,to){
		this.DirectedGraph[from] = this.DirectedGraph[from] || [];
		this.DirectedGraph[from].push(to);
	},
	hasEdgeBetween : function(from,to){
		return (ld.indexOf(this.DirectedGraph[from],to) != -1);
	},
	order : function(){
		return Object.keys(this.DirectedGraph).length;
	},
	size : function(){
		var count = 0;
		ld.forIn(this.DirectedGraph,function(value,key){
			value.length != 0 ? count++ : count ;
		});
		return Math.ceil(count);
	}
};

module.exports = graphs;
