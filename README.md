# proportionalDonut
based on D3.JS framework


![alt tag](https://raw.githubusercontent.com/vkuchinov/proportionalDonut/master/assets/sample.png)

<br>
If you want dynamic size for right part, please set <i>.fixed(false)</i> at line #96 
<br>
<h2>TODO LIST</H2>

[x] Parse CSV data set to JSON format<br>
[x] Legend with name & value<br>
[x] Static cloud icons with caption under both sides<br>
[x] Portfolio title between sides<br>
[x] Tooltip on hover + higlighting<br>
[x] I did diagram drawing (rendering) in that way, so it could be exported to SVG.<br>
    Uncomment line #2621 <i>saveSvg("Portfolio_" + data_.id + ".svg");</i><br>
Additional requests:<br>
[x] 0.00% format
[x] greyscale palette for left side<br>
[x] large left segments have naming at its center with auto abbreviation if name contains more than one word.

UPDATED [10.12.2019]

[x] fixed arc length of right and left pieces (line 96: .fixed(false)):
    This should definitely be false... the arc length of all pieces, and therefore also both the right and left chunks, must be     proportional to their associated value. 
    That means, with different data, the right side chunk of slices may represent between approximately 2-30% of 
    the total, and therefore the arc length of the right chunk of slices must vary accordingly. 
    The same goes for the left chunk of slices, except that it will typically represent between 70-95% of the data.
    
    So, set it alwsys to false, I was doing a flexible d3.proportional.js for developer community.
    Don't see any issue here.
    
[x] Ideally, when the right and left chunks change size with different data, 
    they should remain horizontally aligned, i.e. the center of both the right and left side arcs 
    should always be at the same horizontal line.
    
    With fixed set to false, both arcs have aligned in the way that median horizontal line always goes through
    donut centers, like this:
    
    ![alt tag](https://raw.githubusercontent.com/vkuchinov/proportionalDonut/master/assets/sample2.png)
    
[x] Adding the percentage to the labels
    
<br>[-] planned, [x] done, [!] see comments<br>
