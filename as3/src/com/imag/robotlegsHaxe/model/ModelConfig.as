package com.imag.robotlegsHaxe.model
{
	import com.imag.core.model.scene.SceneModel;
	import com.imag.robotlegsHaxe.model.config.ConfigModel;
	import com.imag.robotlegsHaxe.model.example.ExampleModel;
	import robotlegs.bender.framework.api.IConfig;
	import robotlegs.bender.framework.api.IInjector;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class ModelConfig implements IConfig 
	{
		[Inject] public var injector:IInjector;
		[Inject] public var configModel:ConfigModel;
		
		public function ModelConfig() { }
		
		public function configure():void
		{
			injector.map(ExampleModel).asSingleton();
			injector.map(SceneModel).asSingleton();
		}
	}
}