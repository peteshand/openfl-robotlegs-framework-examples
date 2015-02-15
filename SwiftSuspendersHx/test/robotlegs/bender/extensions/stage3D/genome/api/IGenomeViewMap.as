//------------------------------------------------------------------------------
//  Copyright (c) 2011 the original author or authors. All Rights Reserved. 
// 
//  NOTICE: You are permitted to use, modify, and distribute this file 
//  in accordance with the terms of the license agreement accompanying it. 
//------------------------------------------------------------------------------

package robotlegs.bender.extensions.stage3D.genome.api
{
	import flash.display.DisplayObject;
	
	/**
	 * The <code>IGenomeViewMap</code> interface defines methods which will enable
	 * view instance to be added or removed from mediation.
	 */	
	public interface IGenomeViewMap
	{
		/**
		 * Add view to mediator map.
		 * 
		 * @param view View instance that needs to be mediated.
		 */	
		function addGenomeView( view:DisplayObject ):void;
		
		/**
		 * Remove view from mediator map.
		 * 
		 * @param view View instance that needs to remove mediation.
		 */	
		function removeGenomeView( view:DisplayObject ):void;
	}
}