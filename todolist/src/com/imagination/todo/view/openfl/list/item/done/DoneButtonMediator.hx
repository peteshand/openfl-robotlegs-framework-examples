package com.imagination.todo.view.openfl.list.item.done;
import com.imagination.todo.model.todo.items.ToDoItem;
import com.imagination.todo.model.todo.ToDoModel;
import openfl.events.MouseEvent;
import robotlegs.bender.bundles.mvcs.Mediator;

/**
 * ...
 * @author P.J.Shand
 */
@:rtti
@:keepSub
class DoneButtonMediator extends Mediator 
{
	@inject public var view:DoneButton;
	@inject public var toDoModel:ToDoModel;
	
	public function new() 
	{
		
	}
	
	override public function initialize():Void
	{
		view.initialize();
		view.toDoItem.doneChange.add(updateTickVis);
		updateTickVis(null);
		view.addEventListener(MouseEvent.CLICK, OnClick);
	}
	
	private function OnClick(e:MouseEvent):Void 
	{
		view.toDoItem.done = view.toDoItem.done ? false : true;
	}
	
	private function updateTickVis(toDoItem:ToDoItem):Void
	{
		view.tick.visible = view.toDoItem.done;
	}
}