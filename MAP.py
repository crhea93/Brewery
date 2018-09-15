# Import libraries
import pandas as pd
import folium
import os
# Load the shape of the zone (US states)
# Find the original file here: https://github.com/python-visualization/folium/tree/master/examples/data
# You have to download this file and set the directory where you saved it
state_geo = 'us-states.json'

# Load the unemployment value of each state
# Find the original file here: https://github.com/python-visualization/folium/tree/master/examples/data
state_data = pd.read_table('StateTaxes.txt', delim_whitespace=True, names=('State','TaxRate'))

# Initialize the map:
m = folium.Map(location=[37, -102], zoom_start=5)

# Add the color for the chloropleth:
m.choropleth(
    geo_data=state_geo,
    name='choropleth',
    data=state_data,
    columns=['State', 'TaxRate'],
    key_on='feature.id',
    fill_color='YlGn',
    fill_opacity=0.7,
    line_opacity=0.2,
    legend_name='State Tax Rate (%)'
)
for name, location in locations.items():
    m.simple_marker(location=location, popup=name)


# Save to html
m.save('BeerTaxes.html')
