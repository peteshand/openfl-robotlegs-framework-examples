package com.imagination.interoperation.view;

import com.imagination.interoperation.view.away3d.cubes.cube.Cube;
import com.imagination.interoperation.view.away3d.cubes.Cubes;
import com.imagination.interoperation.view.away3d.cubes.CubesMediator;
import com.imagination.interoperation.view.away3d.MainAwayLayer;
import com.imagination.interoperation.view.away3d.MainAwayLayer2;
import com.imagination.interoperation.view.away3d.MainAwayLayerMediator;
import com.imagination.interoperation.view.away3d.MainAwayLayerMediator2;
import com.imagination.interoperation.view.openfl.MainView;
import com.imagination.interoperation.view.starling.CheckerboardStarlingLayer;
import com.imagination.interoperation.view.starling.CheckerboardStarlingLayerMediator;
import com.imagination.interoperation.view.starling.MainStarlingLayer;
import com.imagination.interoperation.view.starling.MainStarlingLayerMediator;
import openfl.display3D.Context3DProfile;
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
		renderer.init(Context3DProfile.BASELINE_EXTENDED, 2);
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
		mediatorMap.map(Cubes).toMediator(CubesMediator);
		
		mediatorMap.map(MainAwayLayer).toMediator(MainAwayLayerMediator);
		mediatorMap.map(MainAwayLayer2).toMediator(MainAwayLayerMediator2);
		
		mediatorMap.map(MainStarlingLayer).toMediator(MainStarlingLayerMediator);
		mediatorMap.map(CheckerboardStarlingLayer).toMediator(CheckerboardStarlingLayerMediator);
	}
	
	private function initView():Void 
	{
		stack.addLayer(CheckerboardStarlingLayer);
		stack.addLayer(MainAwayLayer);
		stack.addLayer(MainStarlingLayer);
		stack.addLayer(MainAwayLayer2);
		
		contextView.view.addChild(new MainView());
	}
}