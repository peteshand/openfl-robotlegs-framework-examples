package com.imagination.todo.view.openfl.list.item.remove;

import com.imagination.todo.model.todo.items.ToDoItem;
import openfl.display.Sprite;

/**
 * ...
 * @author P.J.Shand
 */
class RemoveButton extends Sprite
{
	public var toDoItem:ToDoItem;

	public function new(toDoItem:ToDoItem) 
	{
		super();
		this.toDoItem = toDoItem;
		
	}
	
	public function initialize() 
	{
		//this.graphics.lineStyle(0x333333);
		
		var bg:Sprite = createRect(0xFF0000, -15, -15, 30, 30);
		bg.alpha = 0;
		addChild(bg);
		
		var crossContainer:Sprite = new Sprite();
		crossContainer.rotation = 45;
		addChild(crossContainer);
		
		crossContainer.addChild(createRect(0x333333, -10, -2, 20, 4));
		crossContainer.addChild(createRect(0x333333, -2, -10, 4, 20));
		
		this.buttonMode = true;
	}
	
	private function createRect(colour:UInt, _x:Float, _y:Float, _width:Float, _height:Float):Sprite
	{
		var sprite:Sprite = new Sprite();
		sprite.graphics.beginFill(colour);
		sprite.graphics.drawRect(_x, _y, _width, _height);
		return sprite;
	}
	
}