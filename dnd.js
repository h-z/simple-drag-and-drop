/**
 * Class for drag'n'drop functionality
 * drag object methods and fields:
 *  - start(drag, event) function, runs at drag start
 *  - move(drag, event) function, runs at every mousemove during dragging
 *  - end(drag, event) function, runs at the end of a dragging
 *  - movable true|false should the given object move along the mouse pointer
 * 
 * drop object methods and fields:
 *  - drop(drag, drop, event) function, runs when a drag object is dropped onto a drop object
 *  - hover(drag, drop, event) function runs at every mousemove when a drag object hovers above a drop object
 *  - leave(drop, event) function, runs after hovering
 *  - hoverclass string css class of drop object only if a drag object hovers above it
 * 
 * observer object methods:
 *  - start(drag, event) function, runs at drag start
 *  - move(drag, event) function, runs at every mousemove during dragging
 *  - end(drag, event) function, runs at the end of a dragging
 *  - drop(drag, drop, event) function, runs when a drag object is dropped onto a drop object
 *  - hover(drag, drop, event) function runs at every mousemove when a drag object hovers above a drop object
 *  - leave(drop, event) function, runs after hovering
 */
var Dnd = {
	drops: [],
	drags: [],
	lastDrag: null,
	lastDrop: null,
	observer: null,
	_dragsCnt: 0,
	
	addEvent: function(el, evname, func) {
		if (el.attachEvent) {
			el.attachEvent("on" + evname, func);
		}
		else if (el.addEventListener) {
			el.addEventListener(evname, func, false);	//bubbling
		}
	},
	
	addDrag: function(o, options) {
		o = $(o);
		if(o.options) {
			for(attr in options) {
				o.options[attr] = options[attr];
			}
		} else {
			o.options = options;
		}
		this.addEvent(o, 'mousedown', function(e) {Dnd._startDrag(e, o);});
		this._dragsCnt++;
	},

	removeDrag: function(o) {
		try {
			o = $(o);
			o.onmousedown = {};
		}
		catch(e) {}
	},

	addDrop: function(o, options) {
		o = $(o);
		if(o.options) {
			for(attr in options) {
				o.options[attr] = options[attr];
			}
		} else {
			o.options = options;
		}
		this.addEvent(o, 'mouseup', function(e) {Dnd._startDrop(e, o);});
		this.addEvent(o, 'mouseover', function(e) {Dnd._startHover(e, o);});
		this.addEvent(o, 'mouseout', function(e) {Dnd._endHover(e, o);});
	},

	removeDrop: function(o) {
		o = $(o);
		o.onmouseup = {};
		o.onmouseover = {};
	},

	addObserver: function(o) {
		this.observer = o;
	},

	_startDrag: function(ev, o) {
		if(!ev) {
			ev = window.event;
		}
		document.onmousemove = this._dragging;
		document.body.onmouseup = this._endDrag;
		var drag = $(o);
		Dnd.lastDrag = drag;
		if(Dnd.observer) {
			if(Dnd.observer.start) {
				Dnd.observer.start(drag, ev);
			}
		}
		if(drag.options.start) {
			drag.options.start(drag, ev);
		}
	},

	_dragging: function(ev) {
		if(!ev) {
			ev = window.event;
		}

		var sel ;
		if(document.selection && document.selection.empty){
			document.selection.empty() ;
		} else if(window.getSelection) {
			sel=window.getSelection();
			if(sel && sel.removeAllRanges) {
				sel.removeAllRanges();
			}
		}

		if(Dnd.lastDrag) {
			var drag = Dnd.lastDrag;
			if(Dnd.observer) {
				if(Dnd.observer.move) {
					Dnd.observer.move(drag, ev);
				}
			}
			if(drag.options.movable) {
				drag.setStyle({ 
					left: 10+(ev.pageX | ev.clientX)+'px', 
					top: 10+(ev.pageY | ev.clientY)+'px', 
					position: 'absolute', 
					zIndex: '1000'});
			}
			if(drag.options.move) {
				drag.options.move(drag, ev);
			}
		}
	},

	_endDrag: function(ev) {
		if(!ev) {
			ev = window.event;
		}
		document.onmousemove = {};
		document.body.onmouseup = {};
		if(Dnd.lastDrag) {
			var drag = Dnd.lastDrag;
			if(Dnd.observer) {
				if(Dnd.observer.end) {
					Dnd.observer.end(drag, ev);
				}
			}
			if(drag.options.end) {
				drag.options.end(drag, ev);
			}
			Dnd.lastDrag = null;
			if(Dnd.lastDrop) {
				if(Dnd.lastDrop.options.hoverclass) {
					Dnd.lastDrop.removeClassName(Dnd.lastDrop.options.hoverclass);
				}
				Dnd.lastDrop = null;
			}
		}
	},

	_startDrop: function(ev, o) {
		if(!ev) {
			ev = window.event;
		}
		if(Dnd.lastDrag) {
			Event.stopPropagation(ev);
			var drop = $(o);
			if(drop.options.accept) {
				if(!drag.hasClassName(drop.options.accept)) {
					return;
				}
			}
			var drag = Dnd.lastDrag;
			if(drop != drag) {
				if(Dnd.observer) {
					if(Dnd.observer.drop) {
						Dnd.observer.drop(drag, drop, ev);
					}
				}
				if(drop.options.drop) {
					drop.options.drop(drag, drop, ev);
				}
			} else {
				Dnd._endDrag(ev);
			}
			Dnd.lastDrag = null;
		}
	},

	_startHover: function(ev, o) {
		if(!ev) {
			ev = window.event;
		}
		var drop = $(o);
		if(Dnd.lastDrag) {
			var drag = Dnd.lastDrag;
			if(drop.options.hoverclass) {
				drop.addClassName(drop.options.hoverclass);
			}
			if(Dnd.observer) {
				if(Dnd.observer.hover) {
					Dnd.observer.hover(drag, drop, ev);
				}
			}
			if(drop.options.hover) {
				drop.options.hover(drag, drop, ev);
			}
		}
		Dnd.lastDrop = drop;
	},

	_endHover: function(ev, o) {
		if(!ev) {
			ev = window.event;
		}
		if(Dnd.lastDrop) {
			if(Dnd.lastDrop.options.hoverclass) {
				Dnd.lastDrop.removeClassName(Dnd.lastDrop.options.hoverclass);
			}
			if(Dnd.lastDrop.options.leave) {
				Dnd.lastDrop.options.leave(Dnd.lastDrop, ev);
			}
			if(Dnd.observer) {
				if(Dnd.observer.leave) {
					Dnd.observer.leave(Dnd.lastDrop, ev);
				}
			}
			Dnd.lastDrop = null;
		}
	}
};


/*
typical uses:
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
*/

