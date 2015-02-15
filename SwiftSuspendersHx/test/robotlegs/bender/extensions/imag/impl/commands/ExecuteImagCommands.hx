package robotlegs.bender.extensions.imag.impl.commands;

import robotlegs.bender.extensions.imag.api.model.config.IConfigModel;
import robotlegs.bender.extensions.imag.ImagModelExtension;
import robotlegs.bender.extensions.imag.impl.commands.config.ConfigCommand;
import robotlegs.bender.extensions.imag.impl.commands.stageSetup.StageSetupCommand;
import robotlegs.bender.extensions.imag.impl.commands.viewportResize.FullStageViewportCommand;
import robotlegs.bender.extensions.imag.impl.signals.AppSetupCompleteSignal;
import robotlegs.bender.extensions.imag.impl.signals.InitializeAppSignal;
import robotlegs.bender.extensions.imag.impl.signals.LoadConfigSignal;
import robotlegs.bender.extensions.signalCommandMap.api.ISignalCommandMap;
import robotlegs.bender.framework.api.IConfig;
import robotlegs.bender.framework.api.IInjector;

/**
 * ...
 * @author P.J.Shand
 */
@:rtti
class ExecuteImagCommands implements IConfig 
{
	@inject public var commandMap:ISignalCommandMap;
	@inject public var injector:IInjector;
	@inject public var configModel:IConfigModel;
	
	@inject public var initializeAppSignal:InitializeAppSignal;
	@inject public var loadConfigSignal:LoadConfigSignal;
	
	public function new() 
	{
		
	}
	
	public function configure():Void
	{
		trace("ExecuteImagCommands");
		commandMap.map(InitializeAppSignal).toCommand(StageSetupCommand).once();
		commandMap.map(InitializeAppSignal).toCommand(FullStageViewportCommand).once();
		
		setupSwfCommands();
		
		initializeAppSignal.dispatch();
		
		injector.map(ImagModelExtension.ConfigClass).toValue(configModel);
		
		commandMap.map(LoadConfigSignal).toCommand(ConfigCommand);
		loadConfigSignal.dispatch();
	}
	
	private function setupSwfCommands():Void 
	{
		
	}
}