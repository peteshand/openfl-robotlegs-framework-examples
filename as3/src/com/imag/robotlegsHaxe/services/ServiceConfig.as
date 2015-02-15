package com.imag.robotlegsHaxe.services
{
	import com.imag.robotlegsHaxe.services.example.ExampleService;
	import robotlegs.bender.framework.api.IConfig;
	import robotlegs.bender.framework.api.IInjector;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class ServiceConfig implements IConfig 
	{
		[Inject] public var injector:IInjector;
		
		public function ServiceConfig() { }
		
		public function configure():void
		{
			injector.map(ExampleService).asSingleton();
		}
	}
}