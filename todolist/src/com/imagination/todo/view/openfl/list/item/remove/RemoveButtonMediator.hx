package com.imagination.todo.view.openfl.list.item.remove;
import com.imagination.todo.model.todo.ToDoModel;
import openfl.events.MouseEvent;
import robotlegs.bender.bundles.mvcs.Mediator;

/**
 * ...
 * @author P.J.Shand
 */
@:rtti
@:keepSub
class RemoveButtonMediator extends Mediator 
{
	@inject public var view:RemoveButton;
	@inject public var toDoModel:ToDoModel;
	
	public function new() 
	{
		
	}
	
	override public function initialize():Void
	{
		view.initialize();
		view.addEventListener(MouseEvent.CLICK, OnClick);
	}
	
	private function OnClick(e:MouseEvent):Void 
	{
		toDoModel.removeItem(view.toDoItem);
	}
}