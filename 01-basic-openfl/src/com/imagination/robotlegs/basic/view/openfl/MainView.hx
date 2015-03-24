package com.imagination.robotlegs.basic.view.openfl;

import com.imagination.robotlegs.basic.view.openfl.display.SubView;
import openfl.display.Sprite;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class MainView extends Sprite
{
	public function new()
	{
		super();
		trace("MainView");
	}
	
	public function initialize() 
	{
		trace("initialize");
		this.graphics.beginFill(0xEE77AA);
		this.graphics.drawRect(0, 0, 100, 100);
		
		var subView:SubView = new SubView();
		addChild(subView);
	}
}