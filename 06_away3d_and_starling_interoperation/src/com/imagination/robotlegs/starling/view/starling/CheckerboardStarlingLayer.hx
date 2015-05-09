package com.imagination.robotlegs.starling.view.starling;

import openfl.Assets;
import openfl.display.BitmapData;
import openfl.display.GradientType;
import openfl.display.Sprite;
import openfl.geom.Matrix;
import openfl.geom.Rectangle;
import robotlegs.bender.extensions.stage3D.starling.impl.StarlingLayer;
import starling.display.Image;
import starling.display.Sprite;
import starling.textures.Texture;
import starling.utils.AssetManager;

/**
 * ...
 * @author P.J.Shand
 */
class CheckerboardStarlingLayer extends StarlingLayer
{
	public function new() 
	{
		super();
	}
	
	public function initialize():Void 
	{
		var landscape:BitmapData = Assets.getBitmapData("img/landscape.jpg");
		var image:Image = new Image(Texture.fromBitmapData(landscape));
		addChild(image);
	}
}