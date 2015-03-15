package com.imagination.robotlegs.basic.view;

import robotlegs.bender.extensions.contextView.ContextView;
import robotlegs.bender.extensions.mediatorMap.api.IMediatorMap;
import robotlegs.bender.extensions.eventCommandMap.api.IEventCommandMap;
import robotlegs.bender.framework.api.IConfig;
import robotlegs.bender.framework.api.IContext;

import com.imagination.robotlegs.basic.view.openfl.MainView;
import com.imagination.robotlegs.basic.view.openfl.MainViewMediator;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class ViewConfig implements IConfig 
{
	@inject public var context:IContext;
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
		mediatorMap.map(MainView).toMediator(MainViewMediator);
	}
	
	private function initView():Void 
	{
		contextView.view.addChild(new MainView());
	}
}