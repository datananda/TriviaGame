/* svg size */
const width = $(window).width(); // TODO: UPDATE WIDTH ON WINDOW RESIZE AND REDISPLAY TIMELINE
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

/* update timeline dot position with new data */
function updateTimeline(newData) {
    const t = d3.transition()
        .duration(750);

    const dots = timelineSVG.selectAll(".dot")
        .data(newData, function (d) { return d.key; });

    dots.exit()
        .transition(t)
        .attr("cx", width)
        .style("fill-opacity", 1e-6)
        .remove();

    dots.transition(t)
        .attr("cx", function (d) { console.log('here'); return timelineScale(new Date(d.startDate, 0, 1)); });

    dots.enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5)
        .attr("cy", 10.5)
        .attr("cx", 0)
        .transition(t)
        .attr("cx", function (d) { console.log('here'); return timelineScale(new Date(d.startDate, 0, 1)); });
}
