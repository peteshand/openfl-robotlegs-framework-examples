package com.imagination.todo.view.openfl;

import com.imagination.todo.definitions.app.App;
import com.imagination.todo.view.openfl.footer.FooterView;
import com.imagination.todo.view.openfl.input.InputView;
import com.imagination.todo.view.openfl.list.ListView;
import openfl.display.Sprite;
import openfl.text.AntiAliasType;
import openfl.text.TextField;
import openfl.text.TextFieldAutoSize;
import openfl.text.TextFieldType;
import openfl.text.TextFormat;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class MainOpenFLLayer extends Sprite
{

	public function new() 
	{
		super();
	}
	
	public function initialize() 
	{
		var format:TextFormat = new TextFormat();
		format.size = 100;
		format.font = "_sans";
		
		var title:TextField = new TextField();
		title.text = "To Do";
		title.width = App.Width;
		title.autoSize = TextFieldAutoSize.CENTER;
		title.antiAliasType = AntiAliasType.ADVANCED;
		addChild(title);
		title.setTextFormat(format);
		
		var inputView:InputView = new InputView();
		addChild(inputView);
		inputView.y = title.y + title.height - 10;
		
		var listView:ListView = new ListView();
		addChild(listView);
		listView.y = inputView.y + 40 + 5;
		
		var footerView:FooterView = new FooterView(listView.y);
		addChild(footerView);
		footerView.y = listView.y + listView.height + 5;
	}
}