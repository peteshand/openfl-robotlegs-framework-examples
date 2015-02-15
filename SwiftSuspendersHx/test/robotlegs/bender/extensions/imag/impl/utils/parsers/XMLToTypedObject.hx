package robotlegs.bender.extensions.imag.impl.utils.parsers;

/**
 * ...
 * @author P.J.Shand
 */
class XMLToTypedObject 
{
	private var typedObject:Dynamic;
	private var data:Xml;
	private var setObject:Dynamic;
	private var StaticRef:Class<Dynamic>;
	
	public function new() 
	{
		
	}
	
	public function populate(typedObject:Dynamic, data:Xml):Void 
	{
		this.data = data;
		this.typedObject = typedObject;
		
		
		StaticRef = Type.getClass(typedObject);
		
		// FIX
		/*var description:Xml = describeType (StaticRef); 
		
		// Set Static Vars
		setObject = StaticRef;
		parseVars(description);
		
		// Set Standard Vars
		var typedObjectXML:Xml = cast(description.factory, Xml);
		setObject = typedObject;
		parseVars(typedObjectXML);*/
	}
	
	private function parseVars(typedObjectXML:Xml):Void 
	{
		// FIX
		/*var numVars:Int = typedObjectXML.variable.length();
		
		var property:String;
		var type:String;
		var value:String;
		
		for (i in 0...numVars)
		{
			property = typedObjectXML.variable[i].@name;
			type = typedObjectXML.variable[i].@type;
			value = setFrom(property, data);
			if (value == '') continue;
			setVars(type, property, value);
		}
		
		var numAccessors:Int = typedObjectXML.accessor.length();
		for (j in 0...numAccessors)
		{
			if (String(typedObjectXML.accessor[j].@access).toLowerCase().indexOf('write') == -1) {
				continue;
			}
			property = typedObjectXML.accessor[j].@name;
			type = typedObjectXML.accessor[j].@type;
			value = setFrom(property, data);
			if (value == '') continue;
			setVars(type, property, value);
		}*/
	}
	
	private function setVars(type:String, property:String, value:String):Void 
	{
		// FIX
		/*var vectorType:String;
		if (type.indexOf("__AS3__.vec") != -1) {
			vectorType = type;
			type = 'Vector';
		}
		
		switch(type)
		{
			case 'String':
				setObject[property] = String(value);
				break;
			case 'Bool':
				if (value.toUpperCase() == 'TRUE') setObject[property] = true;
				else if (value.toUpperCase() == 'FALSE') setObject[property] = false;
				break;
			case 'Float':
				setObject[property] = Float(value);
				break;
			case 'Int':
				setObject[property] = Int(value);
				break;
			case 'UInt':
				if (new RegExp("(0x)([0-9a-fA-F])+").test(value)) {
					setObject[property] = UInt(value);
				}
				else if (new RegExp("(#)([0-9a-fA-F])+").test(value)) {
					value = String(value);
					value = value.substr(1, value.length - 1);
					setObject[property] = UInt("0x" + value);
				}
				break;
			case 'XML':
				setObject[property] = Xml(value).children()[0];
				break;
			case 'Object':
				setObject[property] = JSON.parse(value);
				break;	
			case 'Vector':
				var VectorClass:Class = Class(getDefinitionByName(vectorType));
				var vecSplit:Array = value.split(",");
				var vec:* = new VectorClass(false);
				for (j in 0...vecSplit.length) {vec.push(vecSplit[j]);}
				setObject[property] = vec;
				break;
			case 'Array':
				var arraySplit:Array = value.split(",");
				var array:Array = new Array();
				for (i in 0...arraySplit.length)
				{
					var str:String = arraySplit[i];
					if (str.toUpperCase() == 'TRUE') array.push(true);
					else if (str.toUpperCase() == 'FALSE') array.push(false);
					else if (new RegExp("(0x)([0-9a-fA-F])+").test(str)) {
						array.push(UInt(str));
					}
					else if (new RegExp("(#)([0-9a-fA-F])+").test(str)) {
						str = String(str);
						str = str.substr(1, str.length - 1);
						array.push(UInt("0x" + str));
					}
					else if (str.match(/([\/+\-*])?[0-9]+([0-9]?)?/)) {
						array.push(Float(str));
					}
					else {
						array.push(String(str));
					}
				}
				setObject[property] = array;
				break;
			default:
				trace("unrecognized config type", "type = " + type, "value = " + value);
		}*/
	}
	
	private function setFrom(property:String, data:Dynamic):String 
	{
		// FIX
		/*if (String(data[property]) != "") {
			return String(data[property]);
		}
		else if (String(data.@[property]) != "") {
			return String(data.@[property]);
		}
		
		var children:XMLList = data.children();
		var numChildren = children.length();
		for (i in 0...numChildren)
		{
			setFrom(property, XMLList(children[i]));
		}
		return '';*/
		return "";
	}
}