var graphs = {};

graphs.WeightedGraph = function(){
	this.WeightedGraph = {};
};

graphs.Edge = function(nameOfEdge,from,to,weight){
	this.weight = weight;
	this.to = to;
	this.from = from;
	this.edge = nameOfEdge;
};

graphs.WeightedGraph.prototype = {
	addVertex : function(vertex){
		this.WeightedGraph[vertex] = this.WeightedGraph[vertex]|| [];
	},
	addEdge : function(edge){
		this.WeightedGraph[edge.from].push(edge);
	},
	shortestPath :function(from,to,path){
    var path = path||[];
    var edges = this.WeightedGraph[from];
    var edgeNeeded = edges.reduce(function(previousEdge,currentEdge){
      return (currentEdge.weight<=previousEdge.weight)?currentEdge:previousEdge;
    },edges[0]);
    path.push(edgeNeeded);
    if(edgeNeeded.to==to)
      return path;
    return this.shortestPath(edgeNeeded.to,to,path);
  	}
}



module.exports = graphs;