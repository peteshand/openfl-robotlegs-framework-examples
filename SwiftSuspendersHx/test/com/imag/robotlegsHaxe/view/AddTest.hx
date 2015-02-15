package com.imag.robotlegsHaxe.view;

import flash.events.Event;
import openfl.display.Sprite;

/**
 * ...
 * @author P.J.Shand
 */
class AddTest extends Sprite
{

	public function new() 
	{
		super();
		addEventListener(Event.ADDED_TO_STAGE, onViewAddedToStage);
	}
	
	private function onViewAddedToStage(e:Event):Void 
	{
		removeEventListener(Event.ADDED_TO_STAGE, onViewAddedToStage);
		
		trace("AddTest onViewAddedToStage");
		
		var test:Sprite = new Sprite();
		test.name = "child";
		addChild(test);
	}
	
}