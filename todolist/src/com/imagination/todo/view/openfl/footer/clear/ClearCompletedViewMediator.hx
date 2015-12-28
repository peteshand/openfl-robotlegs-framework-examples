package com.imagination.todo.view.openfl.footer.clear;
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
class ClearCompletedViewMediator extends Mediator 
{
	@inject public var view:ClearCompletedView;
	@inject public var toDoModel:ToDoModel;
	
	public function new() 
	{
		
	}
	
	override public function initialize():Void
	{
		view.initialize();
		view.addEventListener(MouseEvent.CLICK, OnClick);
		toDoModel.onNewItem.add(OnToDoModelChange);
		toDoModel.onRemoveItem.add(OnToDoModelChange);
		toDoModel.onUpdateItem.add(OnToDoModelChange);
		OnToDoModelChange(null);
	}
	
	private function OnToDoModelChange(toDoItem:ToDoItem):Void
	{
		toDoModel.numberOfCompletedItems > 0 ? view.visible = true : view.visible = false;
	}
	
	private function OnClick(e:MouseEvent):Void 
	{
		toDoModel.clearComplete();
	}
}