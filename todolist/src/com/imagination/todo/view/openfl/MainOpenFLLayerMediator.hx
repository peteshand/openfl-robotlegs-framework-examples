package com.imagination.todo.view.openfl;

import com.imagination.todo.events.AppEvent;
import com.imagination.todo.services.example.ExampleService;
import com.imagination.todo.view.openfl.footer.FooterView;
import com.imagination.todo.view.openfl.footer.FooterViewMediator;
import com.imagination.todo.view.openfl.input.InputView;
import com.imagination.todo.view.openfl.input.InputViewMediator;
import com.imagination.todo.view.openfl.list.ListView;
import com.imagination.todo.view.openfl.list.ListViewMediator;

import openfl.events.Event;
import openfl.events.IEventDispatcher;
import robotlegs.bender.bundles.mvcs.Mediator;
import robotlegs.bender.extensions.mediatorMap.api.IMediatorMap;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class MainOpenFLLayerMediator extends Mediator
{
	@inject public var view:MainOpenFLLayer;
	@inject public var mediatorMap:IMediatorMap;
	@inject public var exampleService:ExampleService;
	@inject public var dispatcher:IEventDispatcher;
	
	public function new() 
	{
		
	}
	
	override public function initialize():Void
	{
		mediatorMap.map(InputView).toMediator(InputViewMediator);
		mediatorMap.map(ListView).toMediator(ListViewMediator);
		mediatorMap.map(FooterView).toMediator(FooterViewMediator);
		
		
		view.initialize();
		
		dispatcher.dispatchEvent(new Event(AppEvent.INIT));
	}
}