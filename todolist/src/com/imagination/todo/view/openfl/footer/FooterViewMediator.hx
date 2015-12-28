package com.imagination.todo.view.openfl.footer;
import com.imagination.todo.model.filter.FilterModel;
import com.imagination.todo.model.todo.items.ToDoItem;
import com.imagination.todo.model.todo.ToDoModel;
import com.imagination.todo.view.openfl.footer.clear.ClearCompletedView;
import com.imagination.todo.view.openfl.footer.clear.ClearCompletedViewMediator;
import com.imagination.todo.view.openfl.footer.filter.FilterButton;
import com.imagination.todo.view.openfl.footer.filter.FilterButtonMediator;
import com.imagination.todo.view.openfl.footer.itemsLeft.ItemsLeft;
import com.imagination.todo.view.openfl.footer.itemsLeft.ItemsLeftMediator;
import robotlegs.bender.bundles.mvcs.Mediator;
import robotlegs.bender.extensions.mediatorMap.api.IMediatorMap;

/**
 * ...
 * @author P.J.Shand
 */
@:rtti
@:keepSub
class FooterViewMediator extends Mediator 
{
	@inject public var view:FooterView;
	@inject public var mediatorMap:IMediatorMap;
	@inject public var toDoModel:ToDoModel;
	@inject public var filterModel:FilterModel;
	
	public function new() 
	{
		
	}
	
	override public function initialize():Void
	{
		mediatorMap.map(ItemsLeft).toMediator(ItemsLeftMediator);
		mediatorMap.map(FilterButton).toMediator(FilterButtonMediator);
		mediatorMap.map(ClearCompletedView).toMediator(ClearCompletedViewMediator);
		
		
		
		view.initialize();
		toDoModel.onNewItem.add(ToDoModelChange);
		toDoModel.onRemoveItem.add(ToDoModelChange);
		toDoModel.onUpdateItem.add(ToDoModelChange);
		filterModel.change.add(FilterChange);
		ToDoModelChange(null);
	}
	
	private function FilterChange():Void
	{
		updatePlacement();
	}
	
	private function ToDoModelChange(toDoItem:ToDoItem):Void 
	{
		updatePlacement();
		toDoModel.numberOfItems == 0 ? view.visible = false : view.visible = true;
	}
	
	private function updatePlacement():Void 
	{
		var numOfItems = 0;
		if (filterModel.value == FilterModel.FILTER_ALL)			numOfItems = toDoModel.numberOfItems;
		else if (filterModel.value == FilterModel.FILTER_ACTIVE)	numOfItems = toDoModel.numberOfRemainingItems;
		else if (filterModel.value == FilterModel.FILTER_COMPLETED)	numOfItems = toDoModel.numberOfCompletedItems;
		view.y = view.listViewY + (numOfItems * 33) + 5;
	}
}