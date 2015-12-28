package com.imagination.interoperation.commands;

import com.imagination.interoperation.commands.example.ExampleCommand;
import robotlegs.bender.extensions.signalCommandMap.api.ISignalCommandMap;
import robotlegs.bender.extensions.signalCommandMap.impl.signals.AppSetupCompleteSignal;
import robotlegs.bender.framework.api.IConfig;
import robotlegs.bender.framework.api.IInjector;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class CommandConfig implements IConfig 
{
	@inject public var commandMap:ISignalCommandMap;
	@inject public var injector:IInjector;
	
	public function new() { }
	
	public function configure():Void
	{
		commandMap.map(AppSetupCompleteSignal).toCommand(ExampleCommand);
		
		// Only if not already mapped to a command
		//injector.map(ExampleSignal).asSingleton();
	}
}