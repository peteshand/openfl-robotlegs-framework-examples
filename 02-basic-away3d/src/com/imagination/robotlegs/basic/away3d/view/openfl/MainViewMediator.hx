package com.imagination.robotlegs.basic.away3d.view.openfl;

import com.imagination.robotlegs.basic.away3d.events.AppEvent;
import com.imagination.robotlegs.basic.away3d.services.example.ExampleService;
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
		trace("MainViewMediator");
		dispatcher.dispatchEvent(new Event(AppEvent.INIT));
	}
}