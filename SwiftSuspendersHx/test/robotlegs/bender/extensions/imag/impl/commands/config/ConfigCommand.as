package robotlegs.bender.extensions.imag.impl.commands.config 
{
	/**
	 * ...
	 * @author P.J.Shand
	 */
	
	CONFIG::air import flash.desktop.NativeApplication;
	CONFIG::air import flash.filesystem.File;
	import robotlegs.bender.bundles.mvcs.Command;
	import robotlegs.bender.extensions.imag.api.model.config.IConfigModel;
	import robotlegs.bender.extensions.imag.impl.signals.AppSetupCompleteSignal;
	import robotlegs.bender.extensions.imag.impl.utils.loaders.XMLLoaderService;
	import robotlegs.bender.extensions.imag.impl.utils.parsers.XMLToTypedObject;
	
	public class ConfigCommand extends Command
	{	
		[Inject] public var configModel:IConfigModel;
		[Inject] public var appSetupCompleteSignal:AppSetupCompleteSignal;
		
		public var xmlLoaderService:XMLLoaderService;
		public var xmlToTypedObject:XMLToTypedObject;
		
		private var loadCount:int = 0;
		private var totalAssets:int = 0;
		
		public function ConfigCommand()
		{
			xmlLoaderService = new XMLLoaderService();
			xmlToTypedObject = new XMLToTypedObject();
		}
		
		override public function execute():void
		{
			CONFIG::air {
				copyToStorage(configModel.configURL);
				return;
			}
			load("xml/config.xml");
		}	
		
		CONFIG::air
		protected function copyToStorage(url:String):void 
		{
			var source:File = File.applicationDirectory.resolvePath(url);
			if (!source.exists) {
				throw new Error("No config.xml found at bin/xml/config.xml, please add config xml file and recompile");
				return;
			}
			
			var destinationPath:String = "imagination/" + NativeApplication.nativeApplication.applicationID + "/config/";
			var destinationPathFile:File = File.documentsDirectory.resolvePath(destinationPath);
			if (!destinationPathFile.exists) {
				destinationPathFile.createDirectory();
			}
			var destinationFileName:String = "config.xml";
			var destination:File = File.documentsDirectory.resolvePath(destinationPath + destinationFileName);
			var configURL:String = copy(source, destination, false);
			trace("source = " + source.url);
			trace("destination = " + destination.url);
			
			load(configURL);
		}
		
		CONFIG::air
		private function copy(source:File, destination:File, Override:Boolean=true):String 
		{
			if (!destination.exists || Override){
				source.copyTo(destination, Override);
			}
			return destination.url;
		}
		
		protected function load(url:String):void 
		{
			totalAssets++;
			xmlLoaderService.load(url).onComplete.addOnce(OnLoadComplete);
		}
		
		private function OnLoadComplete(data:XML, id:String):void 
		{
			xmlToTypedObject.populate(configModel, data);
			
			loadCount++;
			if (loadCount == totalAssets){
				AllFilesLoaded();
			}
		}
		
		protected function AllFilesLoaded():void 
		{
			appSetupCompleteSignal.dispatch();
		}
	}	
}