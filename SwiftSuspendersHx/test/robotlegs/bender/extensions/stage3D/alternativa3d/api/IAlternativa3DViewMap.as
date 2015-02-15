// ------------------------------------------------------------------------------
// Copyright (c) 2011 the original author or authors. All Rights Reserved.
//
// NOTICE: You are permitted to use, modify, and distribute this file
// in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------
package robotlegs.bender.extensions.stage3D.alternativa3d.api
{
	/**
	 * The <code>IAlternativa3DViewMap</code> interface defines methods which will enable
	 * view instance to be added or removed from mediation.
	 */	
	public interface IAlternativa3DViewMap
	{
		/**
		 * Add view to mediator map.
		 * 
		 * @param view View instance that needs to be mediated.
		 */		
		function addAlternativa3DView(view : *) : void;
		
		/**
		 * Remove view from mediator map.
		 * 
		 * @param view View instance that needs to remove mediation.
		 */		
		function removeAlternativa3DView(view : *) : void;
	}
}
