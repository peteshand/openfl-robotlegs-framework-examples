package robotlegs.bender.extensions.imag.impl.services.keyboard;

import openfl.events.EventDispatcher;
import openfl.events.KeyboardEvent;
import robotlegs.bender.extensions.contextView.ContextView;
import robotlegs.bender.extensions.imag.api.services.keyboard.IKeyboardMap;
import robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap;

/**
 * @author P.J.Shand
 */

class KeyboardMap extends EventDispatcher implements IKeyboardMap
{
	@inject public var contextView:ContextView;
	private var initiated:Bool = false;
	
	private var _keyLookup:Map<Int,KeyboardEvent>;
	private var _charLookup:Map<String, KeyboardEvent>;
	private var _shortcuts:Array<Shortcut>;
	
	public static var ACTION_DOWN:String = 'keyDown';
	public static var ACTION_UP:String = 'keyUp';
	private var _traceKeyIDs:Bool = false;
	
	//private var booleanMaps = new Map<String,BoolMap>();
	
	public function KeyboardMap() { }
	
	private function init():Void 
	{
		if (initiated) return;
		initiated = true;
		
		_shortcuts = new Array<Shortcut>();
		_keyLookup = new Map<Int,KeyboardEvent>();
		_charLookup = new Map<String, KeyboardEvent>();
		
		contextView.view.stage.addEventListener(KeyboardEvent.KEY_DOWN, OnKeyDown);
		contextView.view.stage.addEventListener(KeyboardEvent.KEY_UP, OnKeyUp);
	}
	
	private function OnKeyDown(e:KeyboardEvent):Void 
	{
		this.dispatchEvent(e);
		if (traceKeyIDs) trace("[KeyboardMap] Down: " + e.keyCode, String.fromCharCode(e.charCode).toLowerCase());
		executeList(_keyLookup[e.keyCode], e);
		executeList(_charLookup[String.fromCharCode(e.charCode).toLowerCase()], e);
	}
	
	private function OnKeyUp(e:KeyboardEvent):Void 
	{
		this.dispatchEvent(e);
		if (traceKeyIDs) trace("[KeyboardMap] Up: " + e.keyCode, String.fromCharCode(e.charCode).toLowerCase());
		executeList(_keyLookup[e.keyCode], e);
		executeList(_charLookup[String.fromCharCode(e.charCode).toLowerCase()], e);
	}
	
	public function map(callback:Dynamic, charOrKeycode:Dynamic, options:Dynamic = null):Void
	{
		init();
		if (Std.is(charOrKeycode, String)) {
			if (String(charOrKeycode).length == 1) addCharShortcut(callback, cast(charOrKeycode, String), options);
			else {
				var keyboardWord:KeyboardWord = new KeyboardWord(this, callback, cast(charOrKeycode, String), options);
			}
		}
		else if (Std.is(charOrKeycode, Int)) addKeyShortcut(callback, cast(charOrKeycode, Int), options);
		else {
			throw new Error("unknown charOrKeycode type, should be String or Int");
		}
	}
	
	/*public function mapBool(object:Dynamic, property:String, charOrKeycode:Dynamic, options:Dynamic = null):Void 
	{
		booleanMap(cast(charOrKeycode, String)).map(object, property, charOrKeycode, options);
	}
	
	private function booleanMap(charOrKeycode:String):BoolMap 
	{
		if (!booleanMaps[charOrKeycode]) {
			booleanMaps[charOrKeycode] = new BoolMap(this);
		}
		return BoolMap(booleanMaps[charOrKeycode]);
	}*/
	
	private function addCharShortcut(callback:Dynamic, char:String, options:Dynamic=null):Void {
		addShortcut(callback, [char], [], options);
	}
	
	private function addKeyShortcut(callback:Dynamic, key:Int, options:Dynamic=null):Void {
		addShortcut(callback, [], [key], options);
	}
	
	private function addShortcut(callback:Dynamic, chars:Array<String>, keys:Array<Int>, options:Dynamic = null):Void 
	{	
		var ctrl = false;
		var alt = false;
		var shift = false;
		var action = KeyboardMap.ACTION_UP;
		var params:Array;
		
		if (options) {
			if (options['ctrl']) ctrl = options['ctrl'];
			if (options['alt']) alt = options['alt'];
			if (options['shift']) shift = options['shift'];
			if (options['action']) action = options['action'];
			if (options['params']) params = options['params'];
		}
		
		var shortcut = new Shortcut(callback, chars, keys, ctrl, alt, shift, action, params);
		for (char in chars) {
			addToList(_charLookup, char, shortcut);
		}
		for (key in keys) {
			addToList(_keyLookup, key, shortcut);
		}
	}
	
	private function executeList(shortcuts:Array<Shortcut>, e:KeyboardEvent):Void 
	{
		if (!shortcuts) return;
		
		for (shortcut in shortcuts) {
			if (shortcut.ctrl == e.ctrlKey && shortcut.shift == e.shiftKey && shortcut.alt == e.altKey && shortcut.action == e.type) {	
				if (shortcut.params) shortcut.callback(shortcut.params);
				else shortcut.callback();
			}
		}
	}
	
	private function addToList(lookup:Map<String, KeyboardEvent>, key:Dynamic, shortcut:Shortcut):Void 
	{
		var list:Array<Shortcut> = lookup[key];
		if (list == null) {
			list = new Array<Shortcut>();
			lookup[key] = list;
		}
		list.push(shortcut);
	}
	
	public var traceKeyIDs(get, set):Bool;
	
	public function get_traceKeyIDs():Bool 
	{
		return _traceKeyIDs;
	}
	
	public function set_traceKeyIDs(value:Bool):Void 
	{
		_traceKeyIDs = value;
	}
}

class Shortcut {
	
	public var callback:Dynamic;
	
	public var ctrl:Bool;
	public var shift:Bool;
	public var alt:Bool;
	public var action:String;
	public var params:Array<Dynamic>;
	
	public var chars:Array<String>;
	public var keys:Array<Int>;
	
	public function Shortcut(callback:Dynamic, chars:Array<String>, keys:Array<Int>, ctrl:Bool, alt:Bool, shift:Bool, action:String, params:Array<Dynamic>) {
		this.callback = callback;
		this.chars = chars;
		this.keys = keys;
		this.ctrl = ctrl;
		this.alt = alt;
		this.shift = shift;
		this.action = action;
		this.params = params;
	}
}

class KeyboardWord
{
	private var count:Int = 0;
	private var split:Array<String>;
	private var callback:Dynamic;
	private var params:Dynamic;
	
	public function KeyboardWord(keyboardMap:KeyboardMap, callback:Dynamic, charOrKeycode:String, options:Dynamic = null)
	{
		if (options != null) {
			params = options["params"];
		}
		else {
			options = new Dynamic();
		}
		
		this.callback = callback;
		split = charOrKeycode.split("");
		for (i in 0...split.length)
		{
			options["params"] = [i];
			keyboardMap.map(CountFunction, split[i], options );
		}	
		keyboardMap.addEventListener(KeyboardEvent.KEY_UP, OnKeyUp);
	}
	
	private function OnKeyUp(e:KeyboardEvent):Void 
	{
		var character:String = String.fromCharCode(e.charCode);
		for (i in 0...split.length)
		{
			if (split[i] == character) return;
		}
		count = 0;
	}
	
	private function CountFunction(index:Int):Void 
	{
		if (count == index) {
			trace("index = " + index);
			count++;
			if (count == split.length) {
				count = 0;
				if (params != null) callback(params);
				else callback();
			}
		}
	}
}