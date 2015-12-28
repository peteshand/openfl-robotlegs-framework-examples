package com.imagination.todo.view.openfl.list.item;
import com.imagination.todo.model.todo.items.ToDoItem;
import com.imagination.todo.view.openfl.list.item.done.DoneButton;
import com.imagination.todo.view.openfl.list.item.done.DoneButtonMediator;
import com.imagination.todo.view.openfl.list.item.remove.RemoveButton;
import com.imagination.todo.view.openfl.list.item.remove.RemoveButtonMediator;
import robotlegs.bender.bundles.mvcs.Mediator;
import robotlegs.bender.extensions.mediatorMap.api.IMediatorMap;

/**
 * ...
 * @author P.J.Shand
 */
@:rtti
@:keepSub
class ListItemViewMediator extends Mediator 
{
	@inject public var view:ListItemView;
	@inject public var mediatorMap:IMediatorMap;
	
	public function new() 
	{
		
	}
	
	override public function initialize():Void
	{
		mediatorMap.map(DoneButton).toMediator(DoneButtonMediator);
		mediatorMap.map(RemoveButton).toMediator(RemoveButtonMediator);
		
		view.initialize();
		
		view.toDoItem.doneChange.add(OnDoneStatusChange);
		OnDoneStatusChange(null);
	}
	
	private function OnDoneStatusChange(toDoItem:ToDoItem):Void 
	{
		view.toDoItem.done ? view.inactive() : view.active();
	}
}