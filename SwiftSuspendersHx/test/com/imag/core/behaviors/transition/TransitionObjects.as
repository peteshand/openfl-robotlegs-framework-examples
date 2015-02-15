package com.imag.core.behaviors.transition 
{
	import com.greensock.easing.Ease;
	import com.greensock.easing.Strong;
	import flash.utils.getDefinitionByName;
	import flash.utils.getQualifiedClassName;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	internal class TransitionObjects 
	{
		public var target:Object;
		private var transitionObject:Object = new Object();
		private var transitingIn:Boolean;
		
		private var tweeingAlpha:Boolean = false;
		private var autoVisible:Boolean = true;
		private var value:Number = -2;
		
		public function TransitionObjects(target:Object) 
		{
			this.target = target;
		}
		
		public function add(startFraction:Number, endFraction:Number, propertiesToAdd:Object):void 
		{
			if (!propertiesToAdd) {
				tweeingAlpha = true;
				propertiesToAdd = { autoVisible:true };
			}
			
			var ease:Array = [Strong.easeInOut, Strong.easeInOut];
			
			if (propertiesToAdd['ease'] != undefined) {
				if (propertiesToAdd['showEase'] == undefined) propertiesToAdd['showEase'] = propertiesToAdd['ease'];
				if (propertiesToAdd['hideEase'] == undefined) propertiesToAdd['hideEase'] = propertiesToAdd['ease'];
			}
			if (propertiesToAdd['showEase'] != undefined) ease[0] = propertiesToAdd['showEase'];
			if (propertiesToAdd['hideEase'] != undefined) ease[1] = propertiesToAdd['hideEase'];
			if (propertiesToAdd['autoVisible'] != undefined) autoVisible = propertiesToAdd['autoVisible'];
			
			
			for (var property:String in propertiesToAdd) {
				if (property == 'showEase' || property == 'hideEase' || property == 'autoVisible' || property == 'ease') continue;
				
				var classType:Class = getClass(propertiesToAdd[property]);
				if (classType != Array) {
					throw new Error("Incorrect property type: " + classType + ". Expecting Array of length 2, [ShowValue, HideValue]");
					continue;
				}
				if (propertiesToAdd[property]['length'] < 2 || propertiesToAdd[property]['length'] > 3) {
					throw new Error("Expecting Array of length 2, [HideValue, ShowValue]\nor or 3 [StartHideValue, ShowValue, EndHideValue]");
					continue;
				}
				if (propertiesToAdd[property].length == 2) {
					propertiesToAdd[property][2] = propertiesToAdd[property][0];
				}
				transitionObject[property] = { startFraction:startFraction, endFraction:endFraction, ease:ease, value:propertiesToAdd[property] };
				
				if (property == 'alpha') tweeingAlpha = true;
			}
		}
		
		private function getClass(obj:Object):Class {
			return Class(getDefinitionByName(getQualifiedClassName(obj)));
		}
		
		public function remove(propertiesToRemove:Object):void 
		{
			for (var property:String in propertiesToRemove) {
				if (transitionObject.hasOwnProperty(property)) delete(transitionObject[property])
			}
		}
		
		public function dispose():void 
		{
			target = null;
			transitionObject = null;
		}
		
		public function update(value:Number):void 
		{
			if (this.value == value) return;
			
			this.value = value;
			var startValue:Number;
			var endValue:Number;
			var startFraction:Number;
			var endFraction:Number;
			var showEase:Ease;
			var hideEase:Ease;
			var correntedValue:Number;
			var newValue:Number;
			
			for (var property:String in transitionObject) {
				
				if (value <= 0){
					startValue = transitionObject[property]["value"][0];
					endValue = transitionObject[property]["value"][1];
					newValue = value + 1;
				}
				else {
					startValue = transitionObject[property]["value"][1];
					endValue = transitionObject[property]["value"][2];
					newValue = value;
				}
				
				startFraction = transitionObject[property]["startFraction"];
				endFraction = transitionObject[property]["endFraction"];
				correntedValue = newValue / (endFraction - startFraction);
				correntedValue -= startFraction / (endFraction - startFraction);
				if (correntedValue < 0) correntedValue = 0;
				if (correntedValue > 1) correntedValue = 1;
				
				showEase = transitionObject[property]["ease"][0];
				hideEase = transitionObject[property]["ease"][1];
				
				if (transitingIn) correntedValue = showEase.getRatio(correntedValue);
				else correntedValue = hideEase.getRatio(correntedValue);
				
				if (correntedValue < 0) correntedValue = 0;
				if (correntedValue > 1) correntedValue = 1;
				
				target[property] = startValue + ((endValue - startValue) * correntedValue);
				if (property == "x" || property == "y") {
					target[property] = Math.round(target[property]);
				}
			}
			
			if (autoVisible && tweeingAlpha) {
				if (value <= -1 || value >= 1) target['visible'] = false;
				else target['visible'] = true;
			}
		}
		
		public function showBegin():void 
		{
			transitingIn = true;
			if (autoVisible && tweeingAlpha) target['visible'] = true;
		}
		
		public function showEnd():void 
		{
			
		}
		
		public function hideBegin():void 
		{
			transitingIn = false;
		}
		
		public function hideEnd():void 
		{
			if (autoVisible && tweeingAlpha) target['visible'] = false;
		}
	}
}