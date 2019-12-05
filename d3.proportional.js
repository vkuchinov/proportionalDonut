/*

PROPORTIONAL DONUT CHART 
based on CVS data

@author Vladimir V. KUCHINOV
@email  helloworld@vkuchinov.co.uk

*/

d3.proportional = function(){
    
    proportional = {},
    size = [768, 384],
    sum = 0,
    leftOffset = 0.33,
    rightOffset = 0.60,
    rightLabelXOffset = 12.0,
    labelOffset = 1.15,
    padding = 0,
    fontSize = 12,
    innerRadius = size[0] / 2.0 * 0.12,
    outerRadius = size[0] / 2.0 * 0.36,
    dotRadius = 3,
    startAngle = Math.PI /2 * 1.5,
    endAngle = 2 * Math.PI + Math.PI / 2 * 1.5,
    pie = d3.pie().padAngle(0).startAngle(startAngle).endAngle(endAngle).value(function(d_) { return d_.value; }).sort(null),
    arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius),
    colors = d3.scaleOrdinal(d3.schemeCategory20),
    left = {}
    right = {};
    
    size[0] > size[1]? layout = "landscape" : layout = "portrait";

    proportional.size = function (_) {

        if (!arguments.length) return size;
        size = _;
        return proportional;

    };

    proportional.colors = function (_) {

        if (!arguments.length) return colors;
        colors = _;
        return proportional;

    };

    proportional.innerRadius = function (_) {

        if (!arguments.length) return innerRadius;
        innerRadius = _;
        return proportional;

    };
    
    proportional.leftOffset = function (_) {

        if (!arguments.length) return leftOffset ;
        leftOffset  = _;
        return proportional;

    };
    
    proportional.rightOffset  = function (_) {

        if (!arguments.length) return rightOffset;
        rightOffset = _;
        return proportional;

    };
    
    proportional.padding  = function (_) {

        if (!arguments.length) return padding;
        padding = _;
        return proportional;

    };

    proportional.outerRadius = function (_) {

        if (!arguments.length) return outerRadius;
        outerRadius = _;
        return proportional;

    };

    proportional.startAngle = function (_) {

        if (!arguments.length) return startAngle;
        startAngle = _;
        return proportional;

    };

    proportional.endAngle = function (_) {

        if (!arguments.length) return endAngle;
        endAngle = _;
        return proportional;

    };

    proportional.labelOffset = function (_) {

        if (!arguments.length) return labelOffset;
        labelOffset = _;
        return proportional;

    };
    
    proportional.fontSize = function (_) {

        if (!arguments.length) return fontSize;
        fontSize = _;
        return proportional;

    };
    
    proportional.arc = function (_) {

        if (!arguments.length) return arc;
        arc = _;
        return proportional;

    };
    
    proportional.left = function (_) {
		if (!arguments.length) return left;
		left = _;
		return proportional;
	};
    
    proportional.right = function (_) {

        if (!arguments.length) return right;
        right = _;
        return proportional;

    };
    
    proportional.setup = function(){
        
        setupPlaceholders();
        
        left.dy = right.dy = size[1] / 2.0;
        
        setupLeftPart();
        setupRightPart();
        
    }
    
    setupPlaceholders = function(){

        var getSum = function(sum_, segment_) { return sum_ + Number(segment_.value); };
        
        left.checksum = left.segments.reduce(getSum, 0);
        right.checksum = right.segments.reduce(getSum, 0);
        sum = left.checksum + right.checksum;
        
        var leftPlaceholder = (sum - right.checksum) / 3.0;
        var rightPlaceholder = right.checksum * 3.0;
        
        left.segments.push({name: "leftPlaceholder", value: leftPlaceholder });
        right.segments.unshift({name: "rightPlaceholder", value: rightPlaceholder });
        
    }
    
    setupLeftPart = function() {

        left.donut = { dots: [], labels: [], guiders: []};
        left.dx = size[0] * leftOffset;
        
        var trbl = {tl: 0, tr: 0, bl: 0, br: 0};
        
        left.arc = arc;
        left.donut.segments = pie(left.segments);
        left.donut.segments.pop();
        
        setMedians(left.donut.segments);

        left.donut.segments.forEach(function(d_, i_){ 
        
            d_.id = i_;
            d_.color = colors(d_.id); 
            
                var dx = 0, dy = 0, direction = -1, align = "start", path;

                var median = d_.startAngle + (d_.endAngle - d_.startAngle) / 2.0;
            
                //bottom right
                if(median < Math.PI){

                    dx = outerRadius * labelOffset;
                    dy = outerRadius * labelOffset - fontSize * (left.trbl.br - trbl.br - 1);
                    dx = outerRadius * labelOffset;
                    trbl.br++;

                }
                //top right
                else if(median > 2.0 * Math.PI){

                    dx = outerRadius * labelOffset;
                    dy = -outerRadius * labelOffset + fontSize * trbl.tr;
                    trbl.tr++;
                

                }
                //bottom left
                else if(median > Math.PI && median < Math.PI * 1.5){ 

                    align = "end";
                    dx = -outerRadius * labelOffset;
                    dy = outerRadius * labelOffset - fontSize * trbl.bl;
                    direction = 1;
                    trbl.bl++;

                }
                //top left
                else{

                    align = "end";
                    dx = -outerRadius * labelOffset;
                    dy = -outerRadius * labelOffset + fontSize * (left.trbl.tl - trbl.tl - 1);
                    direction = 1;
                    trbl.tl++;

                }

                d_.data.dx = dx;
          
                var x0 = outerRadius * Math.cos(-Math.PI / 2.0 + median);
                var y0 = outerRadius * Math.sin(-Math.PI / 2.0 + median);
            
                var x1 = dx + 8 * direction;
                var y1 = dy - dotRadius;
            
                path = "M" + (outerRadius * Math.cos(-Math.PI / 2.0 + median)) + " " + y0 + " L" + (x1 + direction * 16) + " " + y1 + " L" + x1 + " " + y1;

                left.donut.dots.push({
                    
                    parent: d_.id,
                    cx: x0,
                    cy: y0,
                    r: dotRadius,
                    color: d_.color
                    
                });
            
                left.donut.dots.push({
                    
                    parent: d_.id,
                    cx: dx + 8 * direction,
                    cy: dy - dotRadius,
                    r: dotRadius,
                    color: d_.color
                    
                });
            
                left.donut.labels.push({
                    
                    parent: d_.id,
                    name: d_.data.name,
                    align: align,
                    dx: dx,
                    dy: dy,
                    color: d_.color
                    
                });
            
                left.donut.guiders.push({
                    
                    parent: d_.id,
                    path: path,
                    color: d_.color
                    
                });

        });

    }
    
    setupRightPart = function() {

        right.donut = { dots: [], labels: [], guiders: [] };
        right.dx = size[0] * rightOffset;
        
        var trbl = {tl: 0, tr: 0, bl: 0, br: 0};
        
        right.arc = arc;
        right.donut.segments = pie(right.segments);
        right.donut.segments.shift();
        right.donut.segments.forEach(function(d_, i_){ 
            
            d_.id = left.donut.segments.length + i_;
            d_.color = colors(d_.id); 
            
            var dx = 0, dy = 0, direction = 1, align = "start", path, half;
          
            var median = d_.startAngle + (d_.endAngle - d_.startAngle) / 2.0;

            dx = outerRadius * labelOffset * 1.2;
            dy = -(fontSize* left.segments.length - 2) / 3.0 + trbl.tr * 16;
            trbl.tr++;

            var x0 = outerRadius * Math.cos(-Math.PI/ 2.0 + median);
            var y0 = outerRadius * Math.sin(-Math.PI / 2.0 + median);
            var x1 = dx - 8 * direction;
            var y1 = dy - dotRadius;
            
            right.donut.segments.length % 2 == 0 ? half = (right.donut.segments.length) / 2.0 : half = (right.donut.segments.length - 1) / 2.0;
            var xOffset = Math.abs(half - i_)
            
            path = "M" + (outerRadius * Math.cos(-Math.PI / 2.0 + median)) + " " + y0 + " L" + (x0 + rightLabelXOffset * xOffset) + " " + y0 + " L" + x1 + " " + y1
            
            right.donut.dots.push({
                    
                    parent: d_.id,
                    cx: x0,
                    cy: y0,
                    r: 4,
                    color: d_.color
                    
            });
            
             right.donut.dots.push({
                    
                    parent: d_.id,
                    cx: x1,
                    cy: y1,
                    r: dotRadius,
                    color: d_.color
                    
            });
            
            right.donut.labels.push({
                    
                    parent: d_.id,
                    name: d_.data.name,
                    align: align,
                    dx: dx,
                    dy: dy,
                    color: d_.color
                    
             });
            
            right.donut.guiders.push({
                    
                    parent: d_.id,
                    path: path,
                    color: d_.color
                    
            });
        

        });
  
    }
    
    setMedians = function(segments_){
        
        left.trbl = {tr: 0, br: 0, bl: 0, tl: 0 };
        
        segments_.forEach(function(d_){
            
            var median = d_.startAngle + (d_.endAngle - d_.startAngle) / 2.0;
            
            if(median < Math.PI){ left.trbl.br++; }
            else if(median > 2.0 * Math.PI){ left.trbl.tr++; }
            else if(median > Math.PI && median < Math.PI * 1.5){ left.trbl.bl++; }
            else{ left.trbl.tl++; }
            
        })
        
    }

    return proportional;
    
}