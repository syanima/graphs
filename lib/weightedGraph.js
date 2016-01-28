var graphs = {};

graphs.WeightedGraph = function(){
	this.weightedGraph = {};
	this.edges = [];
};

graphs.Edge = function(nameOfEdge,from,to,weight){
	this.weight = weight;
	this.to = to;
	this.from = from;
	this.edge = nameOfEdge;
};

graphs.WeightedGraph.prototype = {
	addVertex : function(vertex){
		this.weightedGraph[vertex] = [];
	},
	addEdge : function(edge){
		this.weightedGraph[edge.from].push(edge);
		this.weightedGraph[edge.to].push(edge);
		this.edges.push(edge);
	},
	dijkstrAlgorithm : function(source){
		var allVertices = Object.keys(this.weightedGraph);
		var allEdges = this.edges;
		var parent = {};
		var distance = {};
		allVertices.forEach(function(vertex){
			distance[vertex] = Infinity;
			parent[vertex] = undefined;
		});
		distance[source] = 0;
		parent[source] = {vertex :source,connectedEdge:{}};
		var count = allVertices.length;
		for(var i=0;i<=count;i++){
			if(!allEdges.length) break;
			var minimumDistanceVertex = allVertices.reduce(function(v1,v2){
				return distance[v1] < distance[v2] ? v1:v2;
			});
		var adjEdges = this.weightedGraph[minimumDistanceVertex].filter(function(adjEdge){
			return allEdges.indexOf(adjEdge) != -1;
		});
		adjEdges.forEach(function(adjEdge){
			var adjVertex = (adjEdge.to==source) ? adjEdge.from : adjEdge.to;
			var compFormat = (distance [minimumDistanceVertex] + adjEdge.weight);
			if(distance[adjVertex] > compFormat){
				distance[adjVertex] = compFormat;
				parent[adjVertex] = {vertex :minimumDistanceVertex,connectedEdge:adjEdge};
			}
			allEdges.splice(allEdges.indexOf(adjEdge),1);
		})
			allVertices.splice(allVertices.indexOf(minimumDistanceVertex),1);
		}
		return {distance:distance,parent:parent};
	},
	shortestPath : function (from,to){
		var parent = this.dijkstrAlgorithm(from).parent;
		var last = parent[to];
		var path = [last.connectedEdge];
		while(last.vertex != from){
			last = parent[parent[to].vertex];
			path.push(last.connectedEdge);
		}
		return path.reverse();
	}
}

module.exports = graphs;


