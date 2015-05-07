package com.imagination.robotlegs.starling.view.away3d.display;

import robotlegs.bender.bundles.mvcs.Mediator;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class ExampleAwayObjectMediator extends Mediator 
{
	@inject public var view:ExampleAwayObject;
	
	public function new() 
	{
		
	}
	
	override public function initialize():Void
	{
		view.initialize();
	}
}