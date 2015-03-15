package com.imagination.robotlegs.basic.events;

import openfl.events.Event;

/**
 * ...
 * @author P.J.Shand
 */

class AppEvent extends Event
{
	static public var INIT:String = "init";
	static public var SETUP_COMPLETE:String = "setup_complete";

	public function new(type:String, bubbles:Bool=false, cancelable:Bool=false) 
	{
		super(type, bubbles, cancelable);
		
	}
	
}