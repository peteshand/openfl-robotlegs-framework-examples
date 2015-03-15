package com.imagination.robotlegs.imagBasic.view.openfl;

import com.imagination.robotlegs.imagBasic.view.openfl.display.SubView;
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
		var subView:SubView = new SubView();
		addChild(subView);
	}
}