/* svg size */
const width = $(window).width();
const height = 50;

/* create timeline scale */
const timelineScale = d3.scaleTime()
    .domain([new Date(1790, 0, 1), new Date(2060, 0, 1)])
    .range([0, width]);

/* create axis from timeline scale */
const xAxis = d3.axisBottom()
    .scale(timelineScale)
    .ticks(d3.timeYear.every(50))
    .tickFormat(d3.timeFormat("%Y"))
    .tickSizeOuter(0);

let timelineSVG = d3.select("#timeline").append("svg")
    .attr("width", width)
    .attr("height", height)

let timelineG = timelineSVG.append("g")
    .attr("transform", "translate(0,10)")
    .call(xAxis);

/* transition for timeline dot */
let timelineTransition = d3.transition()
    .duration(750)
    .ease(d3.easeLinear);

function updateTimeline(newData) {
    const t = d3.transition()
        .duration(750);

    const dots = timelineSVG.selectAll(".dot")
        .data(newData, function(d) { return d.key; });

    dots.exit()
        .transition(t)
        .attr("cx", width)
        .style("fill-opacity", 1e-6)
        .remove();

    dots.transition(t)
        .attr("cx", function (d) { console.log('here'); return timelineScale(new Date(d.startDate, 0, 1)); });
    
    dots.enter().append("circle")
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cy", 10.5)
        .attr("cx", 0)
        .transition(t)
        .attr("cx", function (d) { console.log('here'); return timelineScale(new Date(d.startDate, 0, 1)); });
}

// updateTimeline([{ key: "date1", startDate: 1925 }]);

// d3.interval(function() {
//   updateTimeline([1975]);
// }, 1500);

// function update(data) {
//   var t = d3.transition()
//       .duration(750);

//   // JOIN new data with old elements.
//   var text = g.selectAll("text")
//     .data(data, function(d) { return d; });

//   // EXIT old elements not present in new data.
//   text.exit()
//       .attr("class", "exit")
//     .transition(t)
//       .attr("y", 60)
//       .style("fill-opacity", 1e-6)
//       .remove();

//   // UPDATE old elements present in new data.
//   text.attr("class", "update")
//       .attr("y", 0)
//       .style("fill-opacity", 1)
//     .transition(t)
//       .attr("x", function(d, i) { return i * 32; });

//   // ENTER new elements present in new data.
//   text.enter().append("text")
//       .attr("class", "enter")
//       .attr("dy", ".35em")
//       .attr("y", -60)
//       .attr("x", function(d, i) { return i * 32; })
//       .style("fill-opacity", 1e-6)
//       .text(function(d) { return d; })
//     .transition(t)
//       .attr("y", 0)
//       .style("fill-opacity", 1);
// }

// // The initial display.
// update(alphabet);

// // Grab a random sample of letters from the alphabet, in alphabetical order.
// d3.interval(function() {
//   update(d3.shuffle(alphabet)
//       .slice(0, Math.floor(Math.random() * 26))
//       .sort());
// }, 1500);