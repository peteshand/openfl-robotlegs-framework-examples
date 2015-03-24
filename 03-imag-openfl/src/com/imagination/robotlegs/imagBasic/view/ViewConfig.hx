package com.imagination.robotlegs.imagBasic.view;

import com.imagination.robotlegs.imagBasic.view.openfl.display.SubView;
import com.imagination.robotlegs.imagBasic.view.openfl.display.SubViewMediator;
import com.imagination.robotlegs.imagBasic.view.openfl.MainView;
import com.imagination.robotlegs.imagBasic.view.openfl.MainViewMediator;
import robotlegs.bender.extensions.contextView.ContextView;
import robotlegs.bender.extensions.mediatorMap.api.IMediatorMap;
import robotlegs.bender.extensions.signalCommandMap.api.ISignalCommandMap;
import robotlegs.bender.extensions.stage3D.base.api.IRenderer;
import robotlegs.bender.extensions.stage3D.base.api.IStack;
import robotlegs.bender.framework.api.IConfig;
import robotlegs.bender.framework.api.IContext;

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
	@inject public var stack:IStack;
	@inject public var renderer:IRenderer;
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
		renderer.onReady.addOnce(OnContext3DReady);
		renderer.init("baseline", 0);
		renderer.start();
	}
	
	private function OnContext3DReady():Void 
	{
		mapMediators();
		initView();
		renderer.start();
	}
	
	private function mapMediators():Void 
	{
		mediatorMap.map(MainView).toMediator(MainViewMediator);
		mediatorMap.map(SubView).toMediator(SubViewMediator);
	}
	
	private function initView():Void 
	{
		contextView.view.addChild(new MainView());
	}
}