package com.imagination.openFl.robotAwayExample.view.away3d;

import openfl.events.MouseEvent;
import openfl.geom.Point;
import robotlegs.bender.bundles.mvcs.Mediator;
import robotlegs.bender.extensions.imag.api.services.keyboard.IKeyboardMap;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
class MainAwayLayerMediator extends Mediator 
{
	@inject public var view:MainAwayLayer;
	@inject public var keyboardMap:IKeyboardMap;
	
	
	private var clickMouseLoc:Point = new Point();
	private var clickRotation:Point = new Point();
	
	public function new() 
	{
		
	}
	
	override public function initialize():Void
	{
		view.initialize();
		
		view.stage.addEventListener(MouseEvent.MOUSE_DOWN, OnMouseDown);
		view.stage.addEventListener(MouseEvent.MOUSE_UP, OnMouseUp);
		
		keyboardMap.map(KeyboardMapTest, 49);
		keyboardMap.map(KeyboardMapTest, "q");
	}
	
	private function KeyboardMapTest() 
	{
		trace("KeyboardMapTest");
	}
	
	private function OnMouseDown(e:MouseEvent):Void 
	{
		clickMouseLoc.x = e.stageX;
		clickMouseLoc.y = e.stageY;
		
		clickRotation.x = view.targetRotation.x;
		clickRotation.y = view.targetRotation.y;
		
		view.stage.addEventListener(MouseEvent.MOUSE_MOVE, OnMouseMove);
	}
	
	private function OnMouseUp(e:MouseEvent):Void 
	{
		view.stage.removeEventListener(MouseEvent.MOUSE_MOVE, OnMouseMove);
	}
	
	private function OnMouseMove(e:MouseEvent):Void 
	{
		view.targetRotation.x = clickRotation.x - ((clickMouseLoc.y - e.stageY) / 2);
		view.targetRotation.y = clickRotation.y - ((clickMouseLoc.x - e.stageX) / 2);
		
		if (view.targetRotation.x > 90) view.targetRotation.x = 90;
		if (view.targetRotation.x < -90) view.targetRotation.x = -90;
		
	}
}