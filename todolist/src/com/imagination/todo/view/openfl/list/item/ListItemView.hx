package com.imagination.todo.view.openfl.list.item;

import com.imagination.todo.definitions.app.App;
import com.imagination.todo.model.todo.items.ToDoItem;
import com.imagination.todo.view.openfl.list.item.done.DoneButton;
import com.imagination.todo.view.openfl.list.item.remove.RemoveButton;
import openfl.display.Sprite;
import openfl.text.AntiAliasType;
import openfl.text.TextField;
import openfl.text.TextFieldAutoSize;
import openfl.text.TextFormat;

/**
 * ...
 * @author P.J.Shand
 */
class ListItemView extends Sprite
{
	var format:TextFormat;
	var title:TextField;
	public var toDoItem:ToDoItem;

	public function new(toDoItem:ToDoItem) 
	{
		super();
		this.toDoItem = toDoItem;
		
	}
	
	public function initialize():Void
	{
		this.graphics.lineStyle(1, 0xDDDDDD);
		this.graphics.beginFill(0xEEEEEE);
		this.graphics.drawRect(0, 0, App.Width, 28);
		
		format = new TextFormat();
		format.size = 20;
		format.font = "_sans";
		
		title = new TextField();
		title.text = toDoItem.title;
		title.x = 28;
		title.y = 1;
		title.autoSize = TextFieldAutoSize.LEFT;
		title.antiAliasType = AntiAliasType.ADVANCED;
		addChild(title);
		title.setTextFormat(format);
		
		var removeButton:RemoveButton = new RemoveButton(toDoItem);
		removeButton.x = App.Width - 15;
		removeButton.y = 14;
		addChild(removeButton);
		
		var removeButton:DoneButton = new DoneButton(toDoItem);
		removeButton.x = 15;
		removeButton.y = 14;
		addChild(removeButton);
	}
	
	public function dispose():Void
	{
		
	}
	
	public function inactive() 
	{
		format.color = 0xAAAAAA;
		title.setTextFormat(format);
	}
	
	public function active() 
	{
		format.color = 0x333333;
		title.setTextFormat(format);
	}
}