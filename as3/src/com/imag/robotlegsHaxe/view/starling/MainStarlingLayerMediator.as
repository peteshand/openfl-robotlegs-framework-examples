package com.imag.robotlegsHaxe.view.starling
{
	import robotlegs.bender.bundles.mvcs.Mediator;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class MainStarlingLayerMediator extends Mediator 
	{
		[Inject] public var view:MainStarlingLayer;
		
		public function MainStarlingLayerMediator():void 
		{
			super();
		}
		
		override public function initialize():void
		{
			view.initialize();
		}
	}
}