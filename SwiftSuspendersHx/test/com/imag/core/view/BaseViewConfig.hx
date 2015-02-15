package com.imag.core.view;

import robotlegs.bender.extensions.contextView.ContextView;
import robotlegs.bender.extensions.mediatorMap.api.IMediatorMap;
import robotlegs.bender.extensions.signalCommandMap.api.ISignalCommandMap;
import robotlegs.bender.extensions.stage3D.base.api.IRenderer;
import robotlegs.bender.extensions.stage3D.base.api.IStack;
import robotlegs.bender.framework.api.IConfig;
import robotlegs.bender.framework.api.IContext;

@:rtti
class BaseViewConfig implements IConfig
{
	@inject public var context:IContext;
	@inject public var commandMap:ISignalCommandMap;
	@inject public var mediatorMap:IMediatorMap;
	@inject public var stack:IStack;
	@inject public var renderer:IRenderer;
	@inject public var contextView:ContextView;
	
	private var profile:String;
	private var antiAlias:Int;
	
	public function new(profile:String = "baselineExtended", antiAlias:Int = 0)
	{
		this.profile = profile;
		this.antiAlias = antiAlias;
	}
	
	public function configure():Void
	{
		context.afterInitializing(init);
	}
	
	private function init():Void
	{
		renderer.onReady.addOnce(OnContext3DReady);
		renderer.init(profile, antiAlias);
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
		
	}
	
	private function initView():Void 
	{
		
	}
}