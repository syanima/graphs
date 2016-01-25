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
	},
	pathBetween : function(from,to,visiting){
    var visiting = visiting || [];
    if(from == to) return visiting.concat(from);
    for(var index in this.UndirectedGraph[from]){
    	var vertex = this.UndirectedGraph[from][index];
    	if(visiting.indexOf(vertex)== -1){
        var visited = this.pathBetween(vertex,to,visiting.concat(from));
        if(visited[visited.length -1]==to) return visited;
      }
    }
    return [];
  },
  farthestVertex : function(vertex){
    var counter = 0;
    for(var index in this.UndirectedGraph){
    	var pathResult = this.pathBetween(vertex,index);
      	if(counter < pathResult.length){
        	counter = pathResult.length;
        	var farthestVertex = index;
      	}
    }
    return farthestVertex;
  },
  allPaths : function(from ,to ,visited ,paths){
    var visited = visited || [];
    var paths = paths || [];
    if(from == to)
      return visited.concat(from);
    for (var i = 0; i < this.UndirectedGraph[from].length ;i++) {
      if(visited.indexOf(this.UndirectedGraph[from][i]) == -1){
        var pathResult = this.allPaths(this.UndirectedGraph[from][i],to,visited.concat(from),paths);
        if(pathResult.slice(-1) == to) {
          paths.push(pathResult);
        };
      };
    }
    return paths;
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
	},
	pathBetween : function(from,to,visiting){
    var visiting = visiting || [];
    if(from == to) return visiting.concat(from);
    for(var index in this.DirectedGraph[from]){
      var vertex = this.DirectedGraph[from][index];
      if(visiting.indexOf(vertex)== -1){
        var visited = this.pathBetween(vertex,to,visiting.concat(from));
        if(visited[visited.length -1]==to) return visited;
      }	
    }
    return [];
  },
  farthestVertex : function(vertex){
    var counter = 0;
    for(var index in this.DirectedGraph){
    	var pathResult = this.pathBetween(vertex,index);
      if(counter < pathResult.length){
        counter = pathResult.length;
        var farthestVertex = index;
      }
    }
    return farthestVertex;
  },
	allPaths : function(from ,to ,visited ,paths){
    var visited = visited || [];
    var paths = paths || [];
    if(from == to)
      return visited.concat(from);
    for (var i = 0; i < this.DirectedGraph[from].length ;i++) {
      if(visited.indexOf(this.DirectedGraph[from][i]) == -1){
        var pathResult = this.allPaths(this.DirectedGraph[from][i],to,visited.concat(from),paths);
        if(pathResult.slice(-1) == to) {
          paths.push(pathResult)
        };
      };
    }
    return paths;
  } 
};

module.exports = graphs;
