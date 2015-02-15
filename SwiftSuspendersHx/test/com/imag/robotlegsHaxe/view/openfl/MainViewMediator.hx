package com.imag.robotlegsHaxe.view.openfl;

import com.imag.robotlegsHaxe.events.AppEvent;
import com.imag.robotlegsHaxe.services.ExampleService;
import openfl.events.Event;
import openfl.events.IEventDispatcher;
import robotlegs.bender.bundles.mvcs.Mediator;

/**
 * ...
 * @author P.J.Shand
 */
@:rtti
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