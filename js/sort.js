(function() {

	/**
	 * An unsorted array of Integers shuffled using the 
	 * Fisher-Yates algorithm.
	 */
	UnsortedArray = function(length, arr) {
		this.arr = arr || [];
		for (var i = length - 1; i >= 0; i--) {
			this.put(i);
		};

		this.render();
		this.shuffle();
	};

	UnsortedArray.prototype.swap = function(i1, i2) {
		var b = this.arr[i1];
		this.arr[i1] = this.arr[i2];
		this.arr[i2] = b;
	//	this.highlight(i1, i2);
		this.redraw();
	};

  UnsortedArray.prototype.get = function(index) {
  	return this.arr[index];
  };

	UnsortedArray.prototype.put = function(item, index) {
		if (typeof index !== 'undefined') {
			this.arr[index] = item;
		}
		else {
			this.arr.push(item);
		}
		//this.trigger('add');
		return this;
	};

	UnsortedArray.prototype.shuffle = function() {
		var i = this.arr.length;
  		if ( i == 0 ) return false;
  		while ( --i ) {
		    var j = Math.floor( Math.random() * ( i + 1 ) );
		    this.swap(i, j);
   		}
   		return this;
	}

	UnsortedArray.prototype.getArray = function() {
		return this.arr;
	}

	UnsortedArray.prototype.size = function() {
		return this.arr.length;
	};

  UnsortedArray.prototype.highlight = function(i1) {
  	var x = (i1 * 5) - 0.5;
  	$('rect').css('fill', 'steelBlue')
  	$('rect[y="'+ x +'"]').css({
  		fill : 'yellow'
  	});
  };
  UnsortedArray.prototype.redraw = function() {
    var w = 20,
        h = 150;
    var data = this.getArray();
    var x = d3.scale.linear()
      .domain([0, 1])
      .range([0, w]);
    
    var y = d3.scale.linear()
      .domain([0, d3.max(data)])
      .rangeRound([0, h]);

	  this.chart.selectAll("rect")
	    .data(data)
	    .transition()
	    .duration(1000)
	    .attr("y", function(d) { 
	    	return h - y(d) - .5; 
	    })
	    .attr("height", function(d) { 
	    	return y(d); 
	    });
	};

	UnsortedArray.prototype.render = function() {
    var w = 20,
        h = 150;
    var data = this.arr;
    var x = d3.scale.linear()
      .domain([0, 1])
      .range([0, w]);
    
    var y = d3.scale.linear()
      .domain([0, d3.max(data)])
      .rangeRound([0, h]);

    var chart = d3.select("#graph").append("svg")
      .attr("class", "chart")
      .attr("width", w * data.length - 1)
      .attr("height", h);

    chart.selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("x", function(d, i) { 
        return x(i) - .5; 
      })
      .attr("y", function(d) { 
        return h - y(d) - .5; 
      })
      .attr("width", w)
      .attr("height", function(d) { 
        return y(d); 
      });
    chart.append("line")
      .attr("x1", 0)
      .attr("x2", w * data.length)
      .attr("y1", h - .5)
      .attr("y2", h - .5)
      .style("stroke", "#000");
    this.chart = chart;
  }

})();