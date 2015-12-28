package com.imagination.todo.view.openfl.footer.itemsLeft;
import com.imagination.todo.model.todo.items.ToDoItem;
import com.imagination.todo.model.todo.ToDoModel;
import robotlegs.bender.bundles.mvcs.Mediator;

/**
 * ...
 * @author P.J.Shand
 */
@:rtti
@:keepSub
class ItemsLeftMediator extends Mediator 
{
	@inject public var view:ItemsLeft;
	@inject public var toDoModel:ToDoModel;
	
	public function new() 
	{
		
	}
	
	override public function initialize():Void
	{
		view.initialize();
		
		toDoModel.onNewItem.add(ToDoModelChange);
		toDoModel.onRemoveItem.add(ToDoModelChange);
		toDoModel.onUpdateItem.add(ToDoModelChange);
		ToDoModelChange(null);
	}
	
	private function ToDoModelChange(toDoItem:ToDoItem):Void 
	{
		view.setNumberOfItems(toDoModel.numberOfRemainingItems);
	}
}