package com.imag.robotlegsHaxe.view.away3d
{
	import robotlegs.bender.bundles.mvcs.Mediator;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class MainAwayLayerMediator extends Mediator 
	{
		[Inject] public var view:MainAwayLayer;
		
		public function MainAwayLayerMediator():void 
		{
			super();
		}
		
		override public function initialize():void
		{
			view.initialize();
		}
	}
}