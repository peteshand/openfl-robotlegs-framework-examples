package com.imagination.todo.view.openfl.list.item.done;

import com.imagination.todo.model.todo.items.ToDoItem;
import openfl.display.Sprite;

/**
 * ...
 * @author P.J.Shand
 */
class DoneButton extends Sprite
{
	public var tick:Sprite;
	public var toDoItem:ToDoItem;

	public function new(toDoItem:ToDoItem) 
	{
		super();
		this.toDoItem = toDoItem;
		
	}
	
	public function initialize() 
	{
		//this.graphics.lineStyle(0x333333);
		this.graphics.beginFill(0xFFFFFF);
		this.graphics.drawCircle(0, 0, 10);
		
		tick = new Sprite();
		tick.graphics.beginFill(0x77BB77);
		tick.graphics.moveTo(4, -5);
		tick.graphics.lineTo(5, -4);
		tick.graphics.lineTo(-1, 7);
		tick.graphics.lineTo(-5, 1);
		tick.graphics.lineTo(-4, 0);
		tick.graphics.lineTo(-1, 5);
		tick.graphics.lineTo(4, -5);
		tick.graphics.endFill();
		addChild(tick);
		
		this.buttonMode = true;
	}
}