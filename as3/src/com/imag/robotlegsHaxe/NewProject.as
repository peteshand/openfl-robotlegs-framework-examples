package com.imag.robotlegsHaxe
{
	import com.imag.robotlegsHaxe.commands.CommandConfig;
	import com.imag.robotlegsHaxe.model.config.ConfigModel;
	import com.imag.robotlegsHaxe.model.ModelConfig;
	import com.imag.robotlegsHaxe.services.ServiceConfig;
	import com.imag.robotlegsHaxe.view.ViewConfig;
	
	import robotlegs.bender.framework.api.IContext;
	import robotlegs.bender.framework.impl.Context;
	import robotlegs.bender.bundles.mvcs.MVCSBundle;
	import robotlegs.bender.bundles.ImagBundle;
	import robotlegs.bender.bundles.Away3DBundle;
	import robotlegs.bender.bundles.StarlingBundle;
	import robotlegs.bender.extensions.contextView.ContextView;
	
	import flash.display.Sprite;
	import flash.events.Event;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class NewProject extends Sprite 
	{
		private var _context:IContext;
		
		public function NewProject():void 
		{
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(event:Event = null):void
		{
			removeEventListener(Event.ADDED_TO_STAGE, init);
			_context = new Context()
				.install(MVCSBundle)
				.install(ImagBundle)
				.install(Away3DBundle)
				.install(StarlingBundle)
				.configure(new ConfigModel())
				.configure(CommandConfig, ModelConfig, ServiceConfig, ViewConfig)
				.configure(new ContextView(this));
		}
	}
}