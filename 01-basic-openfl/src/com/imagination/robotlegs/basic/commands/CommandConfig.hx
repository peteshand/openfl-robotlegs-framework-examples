package com.imagination.robotlegs.basic.commands;

import com.imagination.robotlegs.basic.events.AppEvent;
import robotlegs.bender.extensions.eventCommandMap.api.IEventCommandMap;
import robotlegs.bender.framework.api.IConfig;
import robotlegs.bender.framework.api.IInjector;
import com.imagination.robotlegs.basic.commands.example.ExampleCommand;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class CommandConfig implements IConfig 
{
	@inject public var commandMap:IEventCommandMap;
	@inject public var injector:IInjector;
	
	public function new() { }
	
	public function configure():Void
	{
		//commandMap.map(ExampleSignal).toCommand(ExampleCommand);
		commandMap.map(AppEvent.SETUP_COMPLETE).toCommand(ExampleCommand);
		
		// Only if not already mapped to a command
		//injector.map(ExampleSignal).asSingleton();
	}
}