package com.imagination.robotlegs.starling.view.starling;

import robotlegs.bender.extensions.stage3D.starling.impl.StarlingLayer;
import starling.display.Image;
import starling.textures.Texture;

/**
 * ...
 * @author P.J.Shand
 */
class MainStarlingLayer extends StarlingLayer
{

	public function new() 
	{
		super();
	}
	
	public function initialize():Void 
	{
		trace("MainStarlingLayer initialize");
		
		var background:Image = new Image(Texture.fromColor(16, 16, 0xFF5599DD));
		background.width = 256;
		background.height = 256;
		addChild(background);
	}
}