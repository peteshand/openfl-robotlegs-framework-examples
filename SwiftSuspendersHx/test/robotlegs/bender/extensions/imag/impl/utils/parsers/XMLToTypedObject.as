package robotlegs.bender.extensions.imag.impl.utils.parsers
{
	import flash.utils.describeType;
	import flash.utils.getDefinitionByName;
	import flash.utils.getQualifiedClassName;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class XMLToTypedObject 
	{
		private var typedObject:*;
		private var data:XML;
		private var setObject:*;
		private var StaticRef:Class;
		
		public function XMLToTypedObject() 
		{
			
		}
		
		public function populate(typedObject:*, data:XML):void 
		{
			this.data = data;
			this.typedObject = typedObject;
			
			StaticRef = getDefinitionByName (getQualifiedClassName (typedObject)) as Class;
			var description:XML = describeType (StaticRef); 
			
			// Set Static Vars
			setObject = StaticRef;
			parseVars(description);
			
			// Set Standard Vars
			var typedObjectXML:XML = XML(description.factory);
			setObject = typedObject;
			parseVars(typedObjectXML);
		}
		
		private function parseVars(typedObjectXML:XML):void 
		{
			var numVars:int = typedObjectXML.variable.length();
			
			var property:String;
			var type:String;
			var value:String;
			
			for (var i:int = 0; i < numVars; i++) 
			{
				property = typedObjectXML.variable[i].@name;
				type = typedObjectXML.variable[i].@type;
				value = setFrom(property, data);
				if (value == '') continue;
				setVars(type, property, value);
			}
			
			var numAccessors:int = typedObjectXML.accessor.length();
			for (var j:int = 0; j < numAccessors; j++) 
			{
				if (String(typedObjectXML.accessor[j].@access).toLowerCase().indexOf('write') == -1) {
					continue;
				}
				property = typedObjectXML.accessor[j].@name;
				type = typedObjectXML.accessor[j].@type;
				value = setFrom(property, data);
				if (value == '') continue;
				setVars(type, property, value);
			}
		}
		
		private function setVars(type:String, property:String, value:String):void 
		{
			var vectorType:String;
			if (type.indexOf("__AS3__.vec") != -1) {
				vectorType = type;
				type = 'Vector';
			}
			
			switch(type)
			{
				case 'String':
					setObject[property] = String(value);
					break;
				case 'Boolean':
					if (value.toUpperCase() == 'TRUE') setObject[property] = true;
					else if (value.toUpperCase() == 'FALSE') setObject[property] = false;
					break;
				case 'Number':
					setObject[property] = Number(value);
					break;
				case 'int':
					setObject[property] = int(value);
					break;
				case 'uint':
					if (new RegExp("(0x)([0-9a-fA-F])+").test(value)) {
						setObject[property] = uint(value);
					}
					else if (new RegExp("(#)([0-9a-fA-F])+").test(value)) {
						value = String(value);
						value = value.substr(1, value.length - 1);
						setObject[property] = uint("0x" + value);
					}
					break;
				case 'XML':
					setObject[property] = XML(value).children()[0];
					break;
				case 'Object':
					setObject[property] = JSON.parse(value);
					break;	
				case 'Vector':
					var VectorClass:Class = Class(getDefinitionByName(vectorType));
					var vecSplit:Array = value.split(",");
					var vec:* = new VectorClass(false);
					for (var j:int = 0; j < vecSplit.length; j++) {vec.push(vecSplit[j]);}
					setObject[property] = vec;
					break;
				case 'Array':
					var arraySplit:Array = value.split(",");
					var array:Array = new Array();
					for (var i:int = 0; i < arraySplit.length; i++)
					{
						var str:String = arraySplit[i];
						if (str.toUpperCase() == 'TRUE') array.push(true);
						else if (str.toUpperCase() == 'FALSE') array.push(false);
						else if (new RegExp("(0x)([0-9a-fA-F])+").test(str)) {
							array.push(uint(str));
						}
						else if (new RegExp("(#)([0-9a-fA-F])+").test(str)) {
							str = String(str);
							str = str.substr(1, str.length - 1);
							array.push(uint("0x" + str));
						}
						else if (str.match(/([\/+\-*])?[0-9]+([0-9]?)?/)) {
							array.push(Number(str));
						}
						else {
							array.push(String(str));
						}
					}
					setObject[property] = array;
					break;
				default:
					trace("unrecognized config type", "type = " + type, "value = " + value);
			}
		}
		
		private function setFrom(property:String, data:*):String 
		{
			if (String(data[property]) != "") {
				return String(data[property]);
			}
			else if (String(data.@[property]) != "") {
				return String(data.@[property]);
			}
			
			var children:XMLList = data.children();
			for (var i:int = 0; i < children.length(); i++) 
			{
				setFrom(property, XMLList(children[i]));
			}
			return '';
		}
	}
}