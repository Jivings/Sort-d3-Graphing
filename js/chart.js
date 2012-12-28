(function() {

  Sort = function(options) {
    this.name = options.name || 'Unamed';
    this.sort = options.sort || (function() {
      throw Error('Sort algorithm ' + this.name + ' not yet implemented');
    });
  };


  Bubble = new Sort({
    name : 'BubbleSort',
    sort : function(items) {
      return (function pass(items) {

        var swapped = false;
        for (var i = items.size() - 1; i >= 0; i--) {
          if (items.get(i-1) > items.get(i)) {
            items.swap(i, i-1);
            swapped = true;
          }
        };
        return swapped ? pass(items) : items;
      })(items);
    }
  });

  QuickSort = new Sort({
    name : 'QuickSort',
    sort : function(items) {
      var sorted = (function pass(items) {
        if(items.length <= 1) {
          return items;
        }
        var less    = [];
        var greater = [];
        var pivot   = items[Math.floor(Math.random() * items.length)];
        for (var i = items.length - 1; i >= 0; i--) {
          items[i] <= pivot ? less.push(items[i]) : greater.push(items[i]);
        };
        return pass(less).concat(pivot, pass(greater)); 
      })(items.getArray());

    }

  });

  Sorts = {
    'Bubble' : Bubble,
    'QuickSort' : QuickSort
  }
 
})();

/*
        function quicksort('array')
      if length('array') ≤ 1
          return 'array'  // an array of zero or one elements is already sorted
      select and remove a pivot value 'pivot' from 'array'
      create empty lists 'less' and 'greater'
      for each 'x' in 'array'
          if 'x' ≤ 'pivot' then append 'x' to 'less'
          else append 'x' to 'greater'
      return concatenate(quicksort('less'), 'pivot', quicksort('greater')) 
*/