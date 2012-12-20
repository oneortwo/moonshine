
$(document).ready(function() {
	fetch("text/data.csv", draw);
});


function fetch(url, onSuccess) {

	$.ajax({
		url : url,
		dataType : "text",
		ifModified : true,
		success : function(data, textStatus) {
			if (textStatus !== "notmodified") {
				onSuccess(data);
				$('#last-update').text((new Date()).toLocaleTimeString());
			}
		}
	});
}

function draw(data) {
	var a = CSVToArray(data,',');

	var elapsed = [];
	var cpu = [];
	var mem = [];
	var rx = [];
	var tx = [];

	for (var i = 2 ; i < a.length - 1; i++) {
		var row = a[i];
		elapsed.push(row[0]);
		cpu.push(row[1]);
		mem.push(row[2]);
		rx.push(row[3]);
		tx.push(row[4]);
	};
	var started = elapsed[0];
	for (var i = 0; i < elapsed.length; i++) {
		elapsed[i] -= started;
	};
	var length = elapsed[elapsed.length - 1];

	txtattr = { font: "12px sans-serif" };

	color(Raphael("cpu", 420, 320).linechart(10, 10, 400, 300, elapsed,cpu,{axis: '0 0 1 1',
		colors: ['#8F1']}));
	color(Raphael("mem", 420, 320).linechart(10, 10, 400, 300, elapsed,mem,{axis: '0 0 1 1',
		colors: ['#8F1']}));
	color(Raphael("network", 420, 320).linechart(10, 10, 400, 300, [elapsed,elapsed],[tx, rx],{
		axis: '0 0 1 1',
		colors: [
         "#8F1",         
         "#555599"        // the second line is blue
         ]
     }));
	$('#cpu').append("<p>Peak cpu: <span class=\"highlight\">" + Math.max.apply(Math, cpu) + "</span>%</p>");
	$('#mem').append("<p>Peak memory: <span class=\"highlight\">" + Math.max.apply(Math, mem) + "</span>%</p>");
	$('#network').append("<p>Peak tx: <span class=\"highlight\">" + (Math.max.apply(Math, tx)/1000.0).toFixed(2) + "</span>kB</p>");
	$('#network').append("<p>Peak rx: <span style=\"color:#555599\">" + (Math.max.apply(Math, rx)/1000.0).toFixed(2) + "</span>kB</p>");
	var date = new Date(started * 1000);
	var time = date.toLocaleTimeString();
	$('#header').append("<p>First sample at <span class=\"highlight\">" + time + "</span></p>");
	$('#header').append("<p>Ran for <span class=\"highlight\">" + length + "</span> seconds</p>");
}

function color(chart) {
	for( var i = 0, l = chart.axis.length; i < l; i++ ) {
		chart.axis[i].attr("stroke", "#999999");
		var axisItems = chart.axis[i].text.items
		for( var ii = 0, ll = axisItems.length; ii < ll; ii++ ) {
			axisItems[ii].attr("fill", "#999999");
		}
	}
}