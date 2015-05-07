package com.imagination.robotlegs.starling.view.openfl;

import com.imagination.robotlegs.starling.events.AppEvent;
import com.imagination.robotlegs.starling.services.ExampleService;
import openfl.events.Event;
import openfl.events.IEventDispatcher;
import robotlegs.bender.bundles.mvcs.Mediator;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class MainViewMediator extends Mediator
{
	@inject public var view:MainView;
	@inject public var exampleService:ExampleService;
	@inject public var dispatcher:IEventDispatcher;
	
	public function new() 
	{
		
	}
	
	override public function initialize():Void
	{
		view.initialize();
		trace("exampleService = " + exampleService);
		
		
		dispatcher.dispatchEvent(new Event(AppEvent.INIT));
	}
}