package com.imagination.robotlegs.imagBasic.view.openfl.display;

import openfl.display.Sprite;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class SubView extends Sprite
{

	public function new() 
	{
		super();
	}
	
	public function initialize() 
	{
		this.graphics.beginFill(0x77EEAA);
		this.graphics.drawRect(100, 0, 100, 100);
	}
	
}