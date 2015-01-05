package com.imag.robotlegsHaxe.config;

import com.imag.robotlegsHaxe.commands.ConfigCommand;
import com.imag.robotlegsHaxe.events.AppEvent;
import com.imag.robotlegsHaxe.services.ExampleService;
import com.imag.robotlegsHaxe.view.MainView;
import com.imag.robotlegsHaxe.view.MainViewMediator;
import com.imag.robotlegsHaxe.view.SubView;
import com.imag.robotlegsHaxe.view.SubViewMediator;
import robotlegs.bender.extensions.contextView.ContextView;
import robotlegs.bender.extensions.eventCommandMap.api.IEventCommandMap;
import robotlegs.bender.extensions.mediatorMap.api.IMediatorMap;
import robotlegs.bender.framework.api.IConfig;
import robotlegs.bender.framework.api.IInjector;

/**
 * ...
 * @author P.J.Shand
 */
@:rtti
class AppConfig implements IConfig
{
	@inject public var contextView:ContextView;
	@inject public var mediatorMap:IMediatorMap;
	@inject public var injector:IInjector;
	@inject public var commandMap:IEventCommandMap;
	
	public function new() 
	{
		
	}
	
	public function configure():Void 
	{
		commandMap.map(AppEvent.INIT).toCommand(ConfigCommand);
		
		injector.map(ExampleService).asSingleton();
		
		mediatorMap.map(MainView).toMediator(MainViewMediator);
		mediatorMap.map(SubView).toMediator(SubViewMediator);
		
		var mainView:MainView = new MainView();
		contextView.view.addChild(mainView);
	}
}