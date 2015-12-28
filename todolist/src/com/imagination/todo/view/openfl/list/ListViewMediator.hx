package com.imagination.todo.view.openfl.list;
import com.imagination.todo.model.filter.FilterModel;
import com.imagination.todo.model.todo.items.ToDoItem;
import com.imagination.todo.model.todo.ToDoModel;
import com.imagination.todo.view.openfl.list.item.ListItemView;
import com.imagination.todo.view.openfl.list.item.ListItemViewMediator;
import robotlegs.bender.bundles.mvcs.Mediator;
import robotlegs.bender.extensions.mediatorMap.api.IMediatorMap;

/**
 * ...
 * @author P.J.Shand
 */
@:rtti
@:keepSub
class ListViewMediator extends Mediator 
{
	private var listItemViews = new Array<ListItemView>();
	@inject public var view:ListView;
	@inject public var mediatorMap:IMediatorMap;
	@inject public var toDoModel:ToDoModel;
	@inject public var filterModel:FilterModel;
	
	public function new() 
	{
		
	}
	
	override public function initialize():Void
	{
		mediatorMap.map(ListItemView).toMediator(ListItemViewMediator);
		
		view.initialize();
		toDoModel.onNewItem.add(OnNewToDoItem);
		toDoModel.onRemoveItem.add(OnItemRemoved);
		toDoModel.onUpdateItem.add(OnItemUpdated);
		filterModel.change.add(OnFilterChange);
	}
	
	private function OnItemUpdated(toDoItem:ToDoItem):Void
	{
		organizePlacement();
	}
	
	private function OnNewToDoItem(toDoItem:ToDoItem):Void
	{
		var listItemView:ListItemView = new ListItemView(toDoItem);
		view.addChild(listItemView);
		listItemViews.push(listItemView);
		organizePlacement();
	}
	
	private function OnItemRemoved(removedToDoItem:ToDoItem):Void 
	{
		var i = listItemViews.length - 1;
		while (i >= 0) 
		{
			if (listItemViews[i].toDoItem == removedToDoItem) {
				var listItemView:ListItemView = listItemViews[i];
				if (listItemView.parent != null) {
					listItemView.parent.removeChild(listItemView);
					listItemView.dispose();
					listItemView = null;
				}
				listItemViews.splice(i, 1);
			}
			i--;
		}
		organizePlacement();
	}
	
	private function OnFilterChange():Void
	{
		organizePlacement();
	}
	
	private function organizePlacement() 
	{
		var locY:Float = 0;
		for (i in 0...listItemViews.length) 
		{
			listItemViews[i].visible = false;
			if (filterModel.value == FilterModel.FILTER_ALL) {
				listItemViews[i].visible = true;	
				listItemViews[i].y = locY;
				locY += (listItemViews[i].height + 5);
			}
			else if (filterModel.value == FilterModel.FILTER_COMPLETED) {
				if (listItemViews[i].toDoItem.done){
					listItemViews[i].visible = true;	
					listItemViews[i].y = locY;
					locY += (listItemViews[i].height + 5);
				}
			}
			else if (filterModel.value == FilterModel.FILTER_ACTIVE) {
				if (!listItemViews[i].toDoItem.done){
					listItemViews[i].visible = true;	
					listItemViews[i].y = locY;
					locY += (listItemViews[i].height + 5);
				}
			}
		}
	}
}