package com.imagination.todo.view.openfl.footer.filter;

import openfl.display.Sprite;
import openfl.text.AntiAliasType;
import openfl.text.TextField;
import openfl.text.TextFieldAutoSize;
import openfl.text.TextFormat;

/**
 * ...
 * @author P.J.Shand
 */
class FilterButton extends Sprite
{
	public var titleText:String;
	public var selected:Sprite;

	public function new(titleText:String) 
	{
		super();
		this.titleText = titleText;
	}
	
	public function initialize() 
	{
		selected = new Sprite();
		addChild(selected);
		
		var format = new TextFormat();
		format.size = 14;
		format.color = 0x777777;
		format.font = "_sans";
		
		var textField = new TextField();
		textField.autoSize = TextFieldAutoSize.LEFT;
		textField.height = 40;
		textField.x = 2;
		textField.y = 5;
		textField.antiAliasType = AntiAliasType.ADVANCED;
		textField.mouseEnabled = false;
		addChild(textField);
		
		textField.text = titleText;
		textField.setTextFormat(format);
		
		selected.graphics.lineStyle(1, 0x555555);
		selected.graphics.drawRect( -2, 4, textField.width + 8, textField.height + 1);
		
		this.buttonMode = true;
		
		var clickArea:Sprite = new Sprite();
		clickArea.graphics.beginFill(0xFF0000, 0);
		clickArea.graphics.drawRect( -2, 4, textField.width + 8, textField.height + 1);
		addChild(clickArea);
	}
}