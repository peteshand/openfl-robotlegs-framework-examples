package com.imag.robotlegsHaxe;

import com.imag.robotlegsHaxe.commands.CommandConfig;
import com.imag.robotlegsHaxe.model.config.ConfigModel;
import com.imag.robotlegsHaxe.model.ModelConfig;
import com.imag.robotlegsHaxe.services.ServiceConfig;
import com.imag.robotlegsHaxe.view.ViewConfig;
import openfl.display.Sprite;
import robotlegs.bender.bundles.Away3DBundle;
import robotlegs.bender.bundles.ImagBundle;
import robotlegs.bender.extensions.contextView.ContextView;
import robotlegs.bender.framework.api.IContext;
import robotlegs.bender.framework.impl.Context;

/**
 * ...
 * @author P.J.Shand
 */
class Main extends Sprite
{
	private var _context:IContext;
	
	public function new() 
	{
		super();
		
		_context = new Context()
			.install([ImagBundle, Away3DBundle])
			.configure([new ConfigModel()])
			.configure([CommandConfig, ModelConfig, ServiceConfig, ViewConfig])
			.configure([new ContextView(this)]);
			
		//var awayTest:AwayTest = new AwayTest();
		//addChild(awayTest);
		
	}
}