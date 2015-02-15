package robotlegs.bender.extensions.imag.impl.commands 
{
	import robotlegs.bender.extensions.imag.api.model.config.IConfigModel;
	import robotlegs.bender.extensions.imag.ImagModelExtension;
	import robotlegs.bender.extensions.imag.impl.commands.config.ConfigCommand;
	import robotlegs.bender.extensions.imag.impl.commands.contextMenu.ContextMenuCommand;
	import robotlegs.bender.extensions.imag.impl.commands.errorLogging.ErrorLogCommand;
	import robotlegs.bender.extensions.imag.impl.commands.fullscreen.AndroidFullscreenCommand;
	import robotlegs.bender.extensions.imag.impl.commands.fullscreen.FullscreenCommand;
	import robotlegs.bender.extensions.imag.impl.commands.nativeWindow.AlwaysOnTopCommand;
	import robotlegs.bender.extensions.imag.impl.commands.stageSetup.StageSetupCommand;
	import robotlegs.bender.extensions.imag.impl.commands.viewportResize.FullStageViewportCommand;
	import robotlegs.bender.extensions.imag.impl.commands.webFocus.WebFocusCommand;
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
	public class ExecuteImagCommands implements IConfig 
	{
		[Inject] public var commandMap:ISignalCommandMap;
		[Inject] public var injector:IInjector;
		[Inject] public var configModel:IConfigModel;
		
		[Inject] public var initializeAppSignal:InitializeAppSignal;
		[Inject] public var loadConfigSignal:LoadConfigSignal;
		
		public function ExecuteImagCommands() 
		{
			
		}
		
		public function configure():void
		{
			commandMap.map(InitializeAppSignal).toCommand(StageSetupCommand).once();
			commandMap.map(InitializeAppSignal).toCommand(AlwaysOnTopCommand).once();
			CONFIG::air {
				if (CONFIG::desktop){
					commandMap.map(InitializeAppSignal).toCommand(FullscreenCommand).once();
				}
				else {
					commandMap.map(InitializeAppSignal).toCommand(AndroidFullscreenCommand).once();
				}
			}
			commandMap.map(InitializeAppSignal).toCommand(ContextMenuCommand).once();
			commandMap.map(InitializeAppSignal).toCommand(ErrorLogCommand).once();
			
			setupSwfCommands();
			
			initializeAppSignal.dispatch();
			
			injector.map(ImagModelExtension.ConfigClass).toValue(configModel);
			
			commandMap.map(LoadConfigSignal).toCommand(ConfigCommand);
			loadConfigSignal.dispatch();
			
			commandMap.map(AppSetupCompleteSignal).toCommand(FullStageViewportCommand).once();
			
			
		}
		
		private function setupSwfCommands():void 
		{
			CONFIG::air {
				return;
			}
			// only run this if swf
			commandMap.map(InitializeAppSignal).toCommand(WebFocusCommand).once();
		}
	}
}