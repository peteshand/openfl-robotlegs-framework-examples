package com.imagination.robotlegs.starling.commands;

import com.imagination.robotlegs.starling.commands.keyboard.KeyboardCommand;
import robotlegs.bender.extensions.imag.impl.signals.AppSetupCompleteSignal;
import robotlegs.bender.extensions.signalCommandMap.api.ISignalCommandMap;
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
		commandMap.map(AppSetupCompleteSignal).toCommand(KeyboardCommand);
		
		// Only if not already mapped to a command
		//injector.map(ExampleSignal).asSingleton();
	}
}