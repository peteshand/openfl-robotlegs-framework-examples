package com.imagination.robotlegs.starling.view.starling;

import openfl.display.BitmapData;
import openfl.display.GradientType;
import openfl.display.Sprite;
import openfl.geom.Matrix;
import openfl.geom.Rectangle;
import robotlegs.bender.extensions.stage3D.starling.impl.StarlingLayer;
import starling.display.Image;
import starling.display.Sprite;
import starling.textures.Texture;

/**
 * ...
 * @author P.J.Shand
 */
class CheckerboardStarlingLayer extends StarlingLayer
{
	private var container:starling.display.Sprite;
	
	public function new() 
	{
		super();
	}
	
	public function initialize():Void 
	{
		trace("CheckerboardStarlingLayer initialize");
		
		/*var background:Image = new Image(Texture.fromColor(16, 16, 0xFF5599DD));
		background.width = 256;
		background.height = 256;
		addChild(background);*/
		
		// Draw the checkerboard pattern to a bitmap data - using a flash Sprite gradien
		var m:Matrix = new Matrix();
		m.createGradientBox(512, 512, 0, 0, 0);
		
		// Create gradient background
		var fS:flash.display.Sprite = new flash.display.Sprite();
		fS.graphics.beginGradientFill(GradientType.RADIAL, [ 0xaa0000, 0x00bb00 ], [ 1, 1 ], [ 0, 255 ], m);
		fS.graphics.drawRect(0, 0, 512, 512);
		fS.graphics.endFill();
		
		// Draw the gradient to the bitmap data
		var checkers:BitmapData = new BitmapData(512, 512, true, 0x0);
		checkers.draw(fS);
		
		// Create the holes in the board (bitmap data)
		for (yP in 0...16) {
			for (xP in 0...16) {
				if ((yP + xP) % 2 == 0) {
					checkers.fillRect(new Rectangle(xP * 32, yP * 32, 32, 32), 0x0);
				}
			}
		}
		
		// Create the Starling texture from the bitmapdata
		var checkerTx:Texture = Texture.fromBitmapData(checkers);
		
		// Create a sprite and add an image using the checker texture
		// Assign the pivot point in the centre of the sprite
		container = new starling.display.Sprite();
		container.pivotX = container.pivotY = 256;
		container.x = 400;
		container.y = 300;
		container.scaleX = container.scaleY = 2;
		
		
		container.addChild(new Image(checkerTx));			
		// Add the container sprite to the Starling stage
		addChild(container);
	}
	
	public function update():Void 
	{
		container.rotation += 0.005;
	}
}