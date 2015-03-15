package com.imagination.robotlegs.basic.model.example;

import openfl.events.Event;
import openfl.events.EventDispatcher;
	
/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class ExampleModel 
{
	private var _value:Int;
	public var change = new EventDispatcher();
	public var value(get, set):Int;
	
	public function new() 
	{
		
	}
	
	public function get_value():Int 
	{
		return _value;
	}
	
	public function set_value(value:Int):Int 
	{
		if (_value == value) return value;
		_value = value;
		change.dispatchEvent(new Event(Event.CHANGE));
		return value;
	}
}