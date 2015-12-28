package com.imagination.todo.model.todo.items;

import msignal.Signal.Signal1;

/**
 * ...
 * @author P.J.Shand
 */
class ToDoItem
{
	public var title:String;
	private var _done:Bool;
	public var done(get, set):Bool;
	public var doneChange = new Signal1<ToDoItem>();
	
	public function new() 
	{
		
	}
	
	function get_done():Bool 
	{
		return _done;
	}
	
	function set_done(value:Bool):Bool 
	{
		if (done == value) return value;
		_done = value;
		doneChange.dispatch(this);
		return value;
	}
	
}