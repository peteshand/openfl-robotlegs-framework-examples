package com.imagination.todo.view.openfl.input;

import com.imagination.todo.definitions.app.App;
import msignal.Signal.Signal0;
import openfl.display.Sprite;
import openfl.events.KeyboardEvent;
import openfl.text.AntiAliasType;
import openfl.text.TextField;
import openfl.text.TextFieldType;
import openfl.text.TextFormat;

/**
 * ...
 * @author P.J.Shand
 */
class InputView extends Sprite
{
	private var format:TextFormat;
	private var label:TextField;
	public var input:TextField;
	public var submit = new Signal0();
	
	public function new() 
	{
		super();
		
	}
	
	public function initialize() 
	{
		createInputTextfield();
		createLabel();
		onTextfieldChange();
	}
	
	private function createInputTextfield():Void
	{
		format = new TextFormat();
		format.size = 30;
		format.font = "_sans";
		
		input = new TextField();
		input.type = TextFieldType.INPUT;
		input.width = App.Width;
		input.height = 40;
		input.multiline = false;
		input.antiAliasType = AntiAliasType.ADVANCED;
		input.border = true;
		input.borderColor = 0x555555;
		addChild(input);
		
		stage.focus = input;
		
		input.addEventListener(KeyboardEvent.KEY_DOWN, OnKey);
		input.addEventListener(KeyboardEvent.KEY_UP, OnKey);
		
		input.text = "Item";
		input.setSelection(0, input.text.length);
		
		
	}
	
	private function createLabel():Void
	{
		var labelFormat = new TextFormat();
		labelFormat.size = 30;
		labelFormat.color = 0x777777;
		labelFormat.font = "_sans";
		
		label = new TextField();
		label.width = App.Width;
		label.height = 40;
		label.antiAliasType = AntiAliasType.ADVANCED;
		label.mouseEnabled = false;
		addChild(label);
		label.text = "What needs to be done?";
		label.setTextFormat(labelFormat);
	}
	
	private function OnKey(e:KeyboardEvent):Void 
	{
		if (e.charCode == 13 && input.text != "" && e.type == KeyboardEvent.KEY_UP) {
			e.preventDefault();
			cleanText();
			submit.dispatch();
			clear();
		}
		else {
			onTextfieldChange();
		}
		
	}
	
	private function cleanText() 
	{
		input.text = input.text.split("\n").join("");
		input.text = input.text.split("\r").join("");
		input.text = input.text.split("<br>").join("");
		input.text = input.text.split("<div>").join("");
		input.text = input.text.split("</div>").join("");
	}
	
	private function onTextfieldChange():Void 
	{
		input.text == "" ? label.visible = true : label.visible = false;
		input.setTextFormat(format);
	}
	
	public function clear():Void
	{
		input.text = "";
		onTextfieldChange();
		cleanText();
	}
}