package com.imagination.todo.view;

import robotlegs.bender.extensions.contextView.ContextView;
import robotlegs.bender.extensions.mediatorMap.api.IMediatorMap;
import robotlegs.bender.extensions.signalCommandMap.api.ISignalCommandMap;
import robotlegs.bender.framework.api.IConfig;
import robotlegs.bender.framework.api.IContext;
import com.imagination.todo.view.openfl.MainOpenFLLayer;
import com.imagination.todo.view.openfl.MainOpenFLLayerMediator;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class ViewConfig implements IConfig 
{
	@inject public var context:IContext;
	@inject public var commandMap:ISignalCommandMap;
	@inject public var mediatorMap:IMediatorMap;
	@inject public var contextView:ContextView;
	
	public function new()
	{
		
	}
	
	public function configure():Void
	{
		context.afterInitializing(init);
	}
	
	private function init():Void
	{
		mapMediators();
		initView();
	}
	
	private function mapMediators():Void 
	{
		mediatorMap.map(MainOpenFLLayer).toMediator(MainOpenFLLayerMediator);
	}
	
	private function initView():Void 
	{
		contextView.view.addChild(new MainOpenFLLayer());
	}
}