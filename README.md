# Simple drag'n'drop

## Javascript object for drag'n'drop functionality

I have created this little javascript file to step in place of the famous scriptaculous library's (http://madrobby.github.com/scriptaculous/draggable/) Draggable and Droppable classes.

It's lightweight and easy to use. The API is somewhat resembling to the original, but uses less memory. It could be crucial in building applications with hundreds of draggable and droppable objects.

####drag object methods and fields:

 * `start(drag, event)` function, runs at drag start

 * `move(drag, event)` function, runs at every mousemove during dragging

 * `end(drag, event)` function, runs at the end of a dragging

 * `movable true|false` should the given object move along the mouse pointer


####drop object methods and fields:

 * `drop(drag, drop, event)` function, runs when a drag object is dropped onto a drop object

 * `hover(drag, drop, event)` function runs at every mousemove when a drag object hovers above a drop object

 * `leave(drop, event)` function, runs after hovering

 * `hoverclass` string css class of drop object only if a drag object hovers above it


####observer object methods:

 * `start(drag, event)` function, runs at drag start

 * `move(drag, event)` function, runs at every mousemove during dragging

 * `end(drag, event)` function, runs at the end of a dragging

 * `drop(drag, drop, event)` function, runs when a drag object is dropped onto a drop object

 * `hover(drag, drop, event)` function runs at every mousemove when a drag object hovers above a drop object

 * `leave(drop, event)` function, runs after hovering


# Example

    
    Dnd.addDrop(htmlelement, {
    hover: function(drag, drop, e) {
    	$$('.draganddrop-sortinfo').each(function(f){
    		f.removeClassName('draganddrop-hoverinfo');
    	});
    	var ss = drop.siblings();
    	ss.push(drop);
    	ss.each(function(sib){
    		sib.addClassName('draganddrop-hoverinfo');
    	});
    },
    drop: function(drag, drop, e) {
    	getCurrentTable(drop).startDoingSomething(drag, drop);
    }
    });
    
