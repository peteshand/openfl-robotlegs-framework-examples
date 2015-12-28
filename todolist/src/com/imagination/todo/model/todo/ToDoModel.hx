package com.imagination.todo.model.todo;
import com.imagination.todo.model.todo.items.ToDoItem;
import msignal.Signal.Signal1;

/**
 * ...
 * @author P.J.Shand
 */
@:rtti
@:keepSub
class ToDoModel
{
	private var items = new Array<ToDoItem>();
	public var onNewItem = new Signal1<ToDoItem>();
	public var onRemoveItem = new Signal1<ToDoItem>();
	public var onUpdateItem = new Signal1<ToDoItem>();
	public var numberOfItems(get, null):Int;
	public var numberOfCompletedItems(get, null):Int;
	public var numberOfRemainingItems(get, null):Int;
	
	public function new() 
	{
		
	}
	
	public function addItem(toDoItem:ToDoItem):Void
	{
		items.push(toDoItem);
		toDoItem.doneChange.add(onUpdateItem.dispatch);
		onNewItem.dispatch(toDoItem);
		trace(toDoItem.title);
	}
	
	public function updateItem(toDoItem:ToDoItem):Void
	{
		var i = items.length;
		while (i >= 0) 
		{
			if (items[i] == toDoItem) {
				onUpdateItem.dispatch(toDoItem);
			}
		}
	}
	
	public function removeItem(toDoItem:ToDoItem):Void
	{
		var i = items.length - 1;
		while (i >= 0) 
		{
			if (items[i] == toDoItem) {
				var _toDoItem = items[i];
				_toDoItem.doneChange.remove(onUpdateItem.dispatch);
				items.splice(i, 1);
				onRemoveItem.dispatch(_toDoItem);
			}
			i--;
		}
	}
	
	public function clearComplete():Void
	{
		var i = items.length - 1;
		while (i >= 0) 
		{
			if (items[i].done) {
				var _toDoItem = items[i];
				_toDoItem.doneChange.remove(onUpdateItem.dispatch);
				items.splice(i, 1);
				onRemoveItem.dispatch(_toDoItem);
			}
			i--;
		}
	}
	
	private function get_numberOfItems():Int 
	{
		return items.length;
	}
	
	private function get_numberOfCompletedItems():Int 
	{
		var value:Int = 0;
		for (i in 0...items.length) 
		{
			if (items[i].done) value++;
		}
		return value;
	}
	
	private function get_numberOfRemainingItems():Int 
	{
		var value:Int = 0;
		for (i in 0...items.length) 
		{
			if (items[i].done == false) value++;
		}
		return value;
	}
}