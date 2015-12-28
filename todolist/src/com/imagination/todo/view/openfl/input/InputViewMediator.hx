package com.imagination.todo.view.openfl.input;
import com.imagination.todo.model.todo.items.ToDoItem;
import com.imagination.todo.model.todo.ToDoModel;
import openfl.events.KeyboardEvent;
import robotlegs.bender.bundles.mvcs.Mediator;

/**
 * ...
 * @author P.J.Shand
 */
@:rtti
@:keepSub
class InputViewMediator extends Mediator 
{
	@inject public var view:InputView;
	@inject public var toDoModel:ToDoModel;
	
	public function new() 
	{
		
	}
	
	override public function initialize():Void
	{
		view.initialize();
		view.submit.add(OnEnterPressed);
	}
	
	private function OnEnterPressed():Void
	{
		// if the key is ENTER
		var toDoItem:ToDoItem = new ToDoItem();
		toDoItem.title = view.input.text;
		toDoItem.done = false;
		toDoModel.addItem(toDoItem);
	}
}