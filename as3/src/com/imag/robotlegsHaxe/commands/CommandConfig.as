package com.imag.robotlegsHaxe.commands
{
	import com.imag.robotlegsHaxe.commands.example.ExampleCommand;
	import com.imag.robotlegsHaxe.signals.example.ExampleSignal;
	import robotlegs.bender.extensions.imag.impl.signals.AppSetupCompleteSignal;
	import robotlegs.bender.extensions.signalCommandMap.api.ISignalCommandMap;
	import robotlegs.bender.framework.api.IConfig;
	import robotlegs.bender.framework.api.IInjector;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class CommandConfig implements IConfig 
	{
		[Inject] public var commandMap:ISignalCommandMap;
		[Inject] public var injector:IInjector;
		
		public function CommandConfig() { }
		
		public function configure():void
		{
			//commandMap.map(ExampleSignal).toCommand(ExampleCommand);
			commandMap.map(AppSetupCompleteSignal).toCommand(ExampleCommand);
			
			// Only if not already mapped to a command
			//injector.map(ExampleSignal).asSingleton();
		}
	}
}