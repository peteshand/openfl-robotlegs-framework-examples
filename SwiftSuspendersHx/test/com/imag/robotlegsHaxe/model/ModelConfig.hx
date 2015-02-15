package com.imag.robotlegsHaxe.model;

import com.imag.core.model.scene.SceneModel;
import com.imag.robotlegsHaxe.model.config.ConfigModel;
import com.imag.robotlegsHaxe.model.example.ExampleModel;
import robotlegs.bender.framework.api.IConfig;
import robotlegs.bender.framework.api.IInjector;

/**
 * ...
 * @author P.J.Shand
 */
@:rtti
class ModelConfig implements IConfig 
{
	@inject public var injector:IInjector;
	@inject public var configModel:ConfigModel;
	
	public function new() { }
	
	public function configure():Void
	{
		injector.map(ExampleModel).asSingleton();
		injector.map(SceneModel).asSingleton();
	}
}