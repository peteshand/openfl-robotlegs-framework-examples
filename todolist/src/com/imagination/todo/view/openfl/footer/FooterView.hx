package com.imagination.todo.view.openfl.footer;

import com.imagination.todo.definitions.app.App;
import com.imagination.todo.model.filter.FilterModel;
import com.imagination.todo.view.openfl.footer.clear.ClearCompletedView;
import com.imagination.todo.view.openfl.footer.filter.FilterButton;
import com.imagination.todo.view.openfl.footer.itemsLeft.ItemsLeft;
import openfl.display.Sprite;

/**
 * ...
 * @author P.J.Shand
 */
class FooterView extends Sprite
{
	public var listViewY:Float;

	public function new(listViewY:Float) 
	{
		super();
		this.listViewY = listViewY;
		
	}
	
	public function initialize() 
	{
		this.graphics.lineStyle(1, 0xDDDDDD);
		this.graphics.beginFill(0xEEEEEE);
		this.graphics.drawRect(0, 0, App.Width, 28);
		
		var itemsLeft:ItemsLeft = new ItemsLeft();
		addChild(itemsLeft);
		
		var centerContainer:Sprite = new Sprite();
		addChild(centerContainer);
		
		var allFilterButton:FilterButton = new FilterButton(FilterModel.FILTER_ALL);
		centerContainer.addChild(allFilterButton);
		
		var activeFilterButton:FilterButton = new FilterButton(FilterModel.FILTER_ACTIVE);
		centerContainer.addChild(activeFilterButton);
		activeFilterButton.x = allFilterButton.x + 30;
		
		var completedFilterButton:FilterButton = new FilterButton(FilterModel.FILTER_COMPLETED);
		centerContainer.addChild(completedFilterButton);
		completedFilterButton.x = activeFilterButton.x + 52;
		
		var clearCompletedView:ClearCompletedView = new ClearCompletedView();
		clearCompletedView.x = App.Width;
		addChild(clearCompletedView);
		
		centerContainer.x = (App.Width - 150) / 2;
	}
	
}