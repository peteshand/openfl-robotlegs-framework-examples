package com.imagination.robotlegs.starling.model;

import com.imagination.robotlegs.starling.model.config.ConfigModel;
import com.imagination.robotlegs.starling.model.example.ExampleModel;
import robotlegs.bender.framework.api.IConfig;
import robotlegs.bender.framework.api.IInjector;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class ModelConfig implements IConfig 
{
	@inject public var injector:IInjector;
	@inject public var configModel:ConfigModel;
	
	public function new() { }
	
	public function configure():Void
	{
		injector.map(ExampleModel).asSingleton();
	}
}