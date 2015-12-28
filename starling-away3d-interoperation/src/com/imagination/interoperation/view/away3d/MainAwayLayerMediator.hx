package com.imagination.interoperation.view.away3d;

import robotlegs.bender.bundles.mvcs.Mediator;
import robotlegs.bender.extensions.mediatorMap.api.IMediatorMap;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class MainAwayLayerMediator extends Mediator 
{
	@inject public var view:MainAwayLayer;
	@inject public var mediatorMap:IMediatorMap;
	
	public function new() 
	{
		
	}
	
	override public function initialize():Void
	{
		view.initialize();
	}
}