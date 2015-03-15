package com.imagination.robotlegs.basic.away3d.model.example;
import msignal.Signal.Signal0;
	
/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class ExampleModel 
{
	private var _value:Int;
	public var change = new Signal0();
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
		change.dispatch();
		return value;
	}
}