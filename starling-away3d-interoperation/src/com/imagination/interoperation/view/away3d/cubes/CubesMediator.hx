package com.imagination.interoperation.view.away3d.cubes;

import robotlegs.bender.bundles.mvcs.Mediator;
import robotlegs.bender.extensions.mediatorMap.api.IMediatorMap;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class CubesMediator extends Mediator 
{
	@inject public var view:Cubes;
	@inject public var mediatorMap:IMediatorMap;
	
	public function new() 
	{
		
	}
	
	override public function initialize():Void
	{
		view.initialize();
	}
}