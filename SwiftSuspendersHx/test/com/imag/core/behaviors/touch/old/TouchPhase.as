// =================================================================================================
//
//	Starling Framework
//	Copyright 2011 Gamua OG. All Rights Reserved.
//
//	This program is free software. You can redistribute and/or modify it
//	in accordance with the terms of the accompanying license agreement.
//
// =================================================================================================

package com.imag.core.behaviors.touch.old
{
    
    public final class TouchPhase
    {
        /** Only available for mouse input: the cursor hovers over an object <em>without</em> a 
         *  pressed button. */
       // public static const HOVER:String = "hover";
        
        /** The finger touched the screen just now, or the mouse button was pressed. */
        public static const BEGAN:String = "began";
        
        /** The finger moves around on the screen, or the mouse is moved while the button is 
         *  pressed. */
        public static const MOVED:String = "moved";
        
        /** The finger or mouse (with pressed button) has not moved since the last frame. */
        public static const STATIONARY:String = "stationary";
        
        /** The finger was lifted from the screen or from the mouse button. */
        public static const ENDED:String = "ended";
		
		public static const OVER:String = "over";
		public static const OUT:String = "out";
		
		public static const HOVER_CLICK:String = "hoverClick3d";
    }
}