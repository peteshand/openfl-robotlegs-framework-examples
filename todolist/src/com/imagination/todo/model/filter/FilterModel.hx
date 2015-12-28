package com.imagination.todo.model.filter;
import msignal.Signal.Signal0;

/**
 * ...
 * @author P.J.Shand
 */
@:rtti
@:keepSub
class FilterModel 
{
	public static var FILTER_ALL:String = "All";
	public static var FILTER_ACTIVE:String = "Active";
	public static var FILTER_COMPLETED:String = "Completed";
	
	private var _value:String = FilterModel.FILTER_ALL;
	public var value(get, set):String;
	public var change = new Signal0();
	
	public function new() 
	{
		
	}
	
	private function get_value():String 
	{
		return _value;
	}
	
	private function set_value(v:String):String 
	{
		if (_value == v) return v;
		_value = v;
		change.dispatch();
		return v;
	}
}