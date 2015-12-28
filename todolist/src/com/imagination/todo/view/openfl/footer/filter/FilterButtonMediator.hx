package com.imagination.todo.view.openfl.footer.filter;
import com.imagination.todo.model.filter.FilterModel;
import openfl.events.MouseEvent;
import robotlegs.bender.bundles.mvcs.Mediator;

/**
 * ...
 * @author P.J.Shand
 */
@:rtti
@:keepSub
class FilterButtonMediator extends Mediator 
{
	@inject public var view:FilterButton;
	@inject public var filterModel:FilterModel;
	
	public function new() 
	{
		
	}
	
	override public function initialize():Void
	{
		view.initialize();
		view.addEventListener(MouseEvent.CLICK, OnClick);
		filterModel.change.add(OnFilterChange);
		OnFilterChange();
	}
	
	private function OnFilterChange() 
	{
		filterModel.value == view.titleText ? view.selected.visible = true : view.selected.visible = false;
	}
	
	private function OnClick(e:MouseEvent):Void 
	{
		filterModel.value = view.titleText;
	}
}