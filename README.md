# Simple drag'n'drop

## Javascript object for drag'n'drop functionality

I have created this little javascript file to step in place of the famous scriptaculous library's (http://madrobby.github.com/scriptaculous/draggable/) Draggable and Droppable classes.

It's lightweight and easy to use. The API is somewhat resembling to the original, but uses less memory. It could be crucial in building applications with hundreds of draggable and droppable objects.

###Drag object 

The drag(gable) object can be prepared to travel with the mouse cursor. It can fire special events on starting, ending and running through a drag-phase.

######methods and fields:

 * `start(drag, event)` function, runs at drag start

 * `move(drag, event)` function, runs at every mousemove during dragging

 * `end(drag, event)` function, runs at the end of a dragging

 * `movable true|false` should the given object move along the mouse pointer


###Drop object 

A drop(pable) object waits for draggable to be dropped or hovered on itself. Its event listeners accept both objects. 

######methods and fields:

 * `drop(drag, drop, event)` function, runs when a drag object is dropped onto a drop object

 * `hover(drag, drop, event)` function runs at every mousemove when a drag object hovers above a drop object

 * `leave(drop, event)` function, runs after hovering

 * `hoverclass` string css class of drop object only if a drag object hovers above it


###Observer object 

The observer can be attached to the Dnd object to run global, draggable- and droppable-independent functions. It accepts all of the previous two's event listeners.

######methods:

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
    

# License

This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License found here:

http://creativecommons.org/license/results-one?license_code=by-nc-sa

To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/ or 
send a letter to Creative Commons, 171 Second Street, Suite 300, San Francisco, California, 94105, USA.