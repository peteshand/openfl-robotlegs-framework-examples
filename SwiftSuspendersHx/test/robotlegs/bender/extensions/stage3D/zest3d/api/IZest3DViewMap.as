// ------------------------------------------------------------------------------
// Copyright (c) 2011 the original author or authors. All Rights Reserved.
//
// NOTICE: You are permitted to use, modify, and distribute this file
// in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------
package robotlegs.bender.extensions.stage3D.zest3d.api
{
	/**
	 * The <code>IZest3DViewMap</code> interface defines methods which will enable
	 * view instance to be added or removed from mediation.
	 */	
	public interface IZest3DViewMap
	{
		/**
		 * Add view to mediator map.
		 * 
		 * @param view View instance that needs to be mediated.
		 */		
		function addZest3DView(view:*):void;
		
		/**
		 * Remove view from mediator map.
		 * 
		 * @param view View instance that needs to remove mediation.
		 */		
		function removeZest3DView(view:*):void;
	}
}
