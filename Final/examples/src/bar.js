

       



var barWidth = 600;
    var barScale = d3.scaleLinear().domain([0, 900]).range([0, barWidth]);

    // ---------- Load JSON file
    d3.json("data/d3data/test_data.json", function(err, data) {
      if (err) { console.log("Error loading file ", err); }
      console.log(data);

      var u = d3.select('#container2')
        .selectAll('.person')
        .data(data, function(d) {
          return d.name;
        });

      var eachRow = u.enter()
        .append('div')
        .classed('person', true);

      eachRow.append('div')
        .classed('label', true)
        .text(function(d) {
          return d.name;
        });

      eachRow.append('div')
        .classed('bar', true);

      eachRow.select('.bar')
        .style('width', function(d) {
          return barScale(d.age) + 'px';
        })
        .text(function(d){
          return d.age;
        });

    });