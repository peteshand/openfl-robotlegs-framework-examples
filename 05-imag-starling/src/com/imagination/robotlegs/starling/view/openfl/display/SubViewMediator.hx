package com.imagination.robotlegs.starling.view.openfl.display;

import com.imagination.robotlegs.starling.services.ExampleService;
import robotlegs.bender.bundles.mvcs.Mediator;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class SubViewMediator extends Mediator
{
	@inject public var view:SubView;
	@inject public var exampleService:ExampleService;
	
	public function new() 
	{
		
	}
	
	override public function initialize():Void
	{
		view.initialize();
		trace("exampleService = " + exampleService);
	}
}