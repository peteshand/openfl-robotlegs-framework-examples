package com.imag.core.utils.classTools 
{
	import flash.net.registerClassAlias;
	import flash.utils.describeType;
	import flash.utils.getDefinitionByName;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class ClassRegistrar 
	{
		private static var registeredClasses:Vector.<Class> = new Vector.<Class>();
		
		public function ClassRegistrar() 
		{
			
		}
		
		public static function register(_class:Class):void 
		{
			if (alreadyAdded(_class)) return;
			ClassRegistrar.registeredClasses.push(_class);
			
			var classXML:XML = XML(describeType(_class));
			
			var split:Array = classXML.@name.split("::");
			var path:String = split[0] + "." + split[1];
			registerClassAlias(path, _class);
			
			var numVars:int = classXML.factory.variable.length();
			for (var i:int = 0; i < numVars; i++) 
			{
				var type:String = classXML.factory.variable[i].@type;
				var VarClass:Class = Class(getDefinitionByName(type));
				if (alreadyAdded(VarClass)) continue;
				register(VarClass);
			}
		}
		
		private static function alreadyAdded(_class:Class):Boolean
		{
			for (var j:int = 0; j < ClassRegistrar.registeredClasses.length; j++) 
			{
				if (ClassRegistrar.registeredClasses[j] == _class) return true;
			}
			return false;
		}
	}
}