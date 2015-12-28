package com.imagination.todo.view.openfl.footer.clear;

import openfl.display.Sprite;
import openfl.text.AntiAliasType;
import openfl.text.TextField;
import openfl.text.TextFieldAutoSize;
import openfl.text.TextFormat;

/**
 * ...
 * @author P.J.Shand
 */
class ClearCompletedView extends Sprite
{

	public function new() 
	{
		super();
		
	}
	
	public function initialize():Void
	{
		var format = new TextFormat();
		format.size = 14;
		format.color = 0x777777;
		format.font = "_sans";
		
		var textField = new TextField();
		textField.autoSize = TextFieldAutoSize.RIGHT;
		textField.height = 30;
		textField.y = 5;
		textField.antiAliasType = AntiAliasType.ADVANCED;
		addChild(textField);
		textField.mouseEnabled = false;
		
		textField.text = "Clear completed";
		textField.setTextFormat(format);
		textField.x = -textField.width;
		
		var clickArea:Sprite = new Sprite();
		clickArea.graphics.beginFill(0xFF0000);
		clickArea.graphics.drawRect(0, 0, textField.textWidth, 30);
		addChild(clickArea);
		clickArea.alpha = 0;
		clickArea.x = -textField.width;
		
		this.buttonMode = true;
	}
}