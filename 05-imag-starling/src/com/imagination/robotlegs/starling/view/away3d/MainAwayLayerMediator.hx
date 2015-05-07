package com.imagination.robotlegs.starling.view.away3d;

import robotlegs.bender.bundles.mvcs.Mediator;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class MainAwayLayerMediator extends Mediator 
{
	@inject public var view:MainAwayLayer;
	
	public function new() 
	{
		
	}
	
	override public function initialize():Void
	{
		view.initialize();
	}
}