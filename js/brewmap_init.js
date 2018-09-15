    Plotly.d3.csv('https://raw.githubusercontent.com/crhea93/Brewery/master/StateTaxes.csv', function (err, rows) {


        function unpack(rows, key) {
            return rows.map(function (row) {
                return row[key];
            });
        }

        var taxes = unpack(rows, 'Taxes');
        for (i=0;i<taxes.length;i++){
            taxes[i] = taxes[i]*43; // 43 gallons in a barrel
        }

        var data = [{
            type: 'choropleth',
            locationmode: 'USA-states',
            locations: unpack(rows, 'code'),
            z: taxes,
            text: unpack(rows, 'state'),
            zmin: 0,
            zmax: Math.max(taxes),
            colorscale: [
                [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
                [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
                [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
            ],
            colorbar: {
                title: 'Taxes per Gallon (USD)',
                thickness: 0.2
            },
            marker: {
                line: {
                    color: 'rgb(255,255,255)',
                    width: 2
                }
            }
        }];


        var layout = {
            title: '2018 State Tax For Beers per barrel',
            geo: {
                scope: 'usa',
                showlakes: true,
                lakecolor: 'rgb(255,255,255)'
            }
        };

        Plotly.plot("brewtaxmap", data, layout, {showLink: false});



    });
