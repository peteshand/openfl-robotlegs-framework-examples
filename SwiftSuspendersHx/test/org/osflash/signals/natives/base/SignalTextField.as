package org.osflash.signals.natives.base 
{
	import flash.text.TextField;
	import org.osflash.signals.natives.sets.TextFieldSignalSet;
	
	class SignalTextField extends TextField
	{
		private var _signals:TextFieldSignalSet;
				
		public function get signals():TextFieldSignalSet 
		{ 
			return _signals ||= new TextFieldSignalSet(this);
		}
	}
}