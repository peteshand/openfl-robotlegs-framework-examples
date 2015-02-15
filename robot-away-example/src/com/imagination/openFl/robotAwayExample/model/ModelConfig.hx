package com.imagination.openFl.robotAwayExample.model;

import com.imagination.core.model.scene.SceneModel;
import com.imagination.openFl.robotAwayExample.model.config.ConfigModel;
import com.imagination.openFl.robotAwayExample.model.example.ExampleModel;
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