package com.imagination.todo.model;

import com.imagination.todo.model.filter.FilterModel;
import com.imagination.todo.model.todo.ToDoModel;
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
	
	public function new() { }
	
	public function configure():Void
	{
		injector.map(ToDoModel).asSingleton();
		injector.map(FilterModel).asSingleton();
	}
}