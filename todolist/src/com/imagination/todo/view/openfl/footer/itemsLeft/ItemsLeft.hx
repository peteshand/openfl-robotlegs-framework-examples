package com.imagination.todo.view.openfl.footer.itemsLeft;

import com.imagination.todo.definitions.app.App;
import openfl.display.Sprite;
import openfl.text.AntiAliasType;
import openfl.text.TextField;
import openfl.text.TextFieldAutoSize;
import openfl.text.TextFormat;

/**
 * ...
 * @author P.J.Shand
 */
class ItemsLeft extends Sprite
{
	private var textField:TextField;
	private var format:TextFormat;

	public function new() 
	{
		super();
		
	}
	
	public function initialize() 
	{
		format = new TextFormat();
		format.size = 14;
		format.color = 0x777777;
		format.font = "_sans";
		
		textField = new TextField();
		//textField.width = 100;
		textField.autoSize = TextFieldAutoSize.LEFT;
		textField.height = 40;
		textField.x = 2;
		textField.y = 5;
		textField.antiAliasType = AntiAliasType.ADVANCED;
		textField.mouseEnabled = false;
		addChild(textField);
		
		setNumberOfItems(0);
	}
	
	public function setNumberOfItems(value:Float) 
	{
		value == 1 ? textField.text = value + " item left" : textField.text = value + " items left";
		textField.setTextFormat(format);
	}
}