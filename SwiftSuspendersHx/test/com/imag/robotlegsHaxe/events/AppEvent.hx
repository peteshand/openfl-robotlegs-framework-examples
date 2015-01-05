package com.imag.robotlegsHaxe.events;

import openfl.events.Event;

/**
 * ...
 * @author P.J.Shand
 */
class AppEvent extends Event
{
	static public var INIT:String = "init";

	public function new(type:String, bubbles:Bool=false, cancelable:Bool=false) 
	{
		super(type, bubbles, cancelable);
		
	}
	
}