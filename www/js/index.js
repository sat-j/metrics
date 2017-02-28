/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        //this.receivedEvent('deviceready');
        ScaleContentToDevice();
        this.plotChart();
        
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    plotChart: function () {
        google.charts.load('current', {
            packages: ['corechart', 'bar']
        });
        //google.charts.setOnLoadCallback(drawChart);
        //google.charts.setOnLoadCallback(drawBar);

        google.charts.setOnLoadCallback(
            function () { // Anonymous function that calls drawChart1 and drawChart2
                drawChart();
                newBar();
            });

        $(document).on("pagecontainershow", function () {
            ScaleContentToDevice();
        });

        $(window).on("resize orientationchange", function () {
            ScaleContentToDevice();
        });


        function drawChart() {
            // Define the chart to be drawn.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Element');
            data.addColumn('number', 'Percentage');
            data.addRows([
        ['Nitrogen', 0.78],
        ['Oxygen', 0.21],
        ['Other', 0.01]
      ]);

            var options = {
                    title: 'Atmosphere Percentage',
                    legend: 'top',
                    width: '100%'
                }
                // Instantiate and draw the chart.
            var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
            chart.draw(data, options);
        }

        function newBar() {
            var data = new google.visualization.DataTable();
            data.addColumn('timeofday', 'Time of Day');
            data.addColumn('number', 'Motivation Level');
            data.addColumn('number', 'Energy Level');

            data.addRows([
        [{
                    v: [8, 0, 0],
                    f: 'this is a long text to test1'
                }, 1, .25],
        [{
                    v: [9, 0, 0],
                    f: 'this is a long text to test1'
                }, 2, .5],
        [{
                    v: [10, 0, 0],
                    f: 'this is a long text to test1'
                }, 3, 1],
        [{
                    v: [11, 0, 0],
                    f: '11 this is a long text to test1'
                }, 4, 2.25],
        [{
                    v: [12, 0, 0],
                    f: '12 this is a long text to test1'
                }, 5, 2.25],
        [{
                    v: [13, 0, 0],
                    f: '1 this is a long text to test1'
                }, 6, 3],
        [{
                    v: [14, 0, 0],
                    f: '2 this is a long text to test1'
                }, 7, 4],
        [{
                    v: [15, 0, 0],
                    f: '3 this is a long text to test1'
                }, 8, 5.25],
        [{
                    v: [16, 0, 0],
                    f: '4 this is a long text to test1'
                }, 9, 7.5],
        [{
                    v: [17, 0, 0],
                    f: '5 this is a long text to test1'
                }, 10, 10],
      ]);

            var options = {
                title: 'Motivation and Energy Level Throughout the Day',
                colors: ['#9575cd', '#33ac71'],
                legend: 'top',
                width: '100%',
                hAxis: {
                    title: 'Time of Day'/*,
                    format: 'h:mm a',
                    viewWindow: {
                        min: [7, 30, 0],
                        max: [17, 30, 0]
                    }*/
                },
                vAxis: {
                    title: 'Rating (scale of 1-10)'
                }
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('columnChart'));
            chart.draw(data, options);
        }

    }

};

app.initialize();

function navnext( next ) {
    $( ":mobile-pagecontainer" ).pagecontainer( "change", next, {
        transition: "slide"
    });
}
function navprev( prev ) {
    $( ":mobile-pagecontainer" ).pagecontainer( "change", prev, {
        transition: "slide",
        reverse: true
    });
}


$( document ).one( "pagecreate", "#chartPage1", function() {
    // Handler for navigating to the next page
    // Navigate to the next page on swipeleft
    $( document ).on( "swipeleft", ".chart-container", function( event ) {
        // Get the filename of the next page. We stored that in the data-next
        // attribute in the original markup.
        event.preventDefault();
        var next = $( this ).jqmData( "next" );
        if ( next ) {
            navnext( next );
        }
    });
    // The same for the navigating to the previous page
    $( document ).on( "swiperight", ".chart-container", function( event ) {
        event.preventDefault();
        var prev = $( this ).jqmData( "prev" );
        if (prev) {
            navprev( prev );
        }
    });
});